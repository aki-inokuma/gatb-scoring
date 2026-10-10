import Link from 'next/link'
import { getAllResults } from '@/lib/db'
import DeleteButton from '@/components/DeleteButton'

export const dynamic = 'force-dynamic'

const EVAL_COLOR: Record<string, string> = {
  A: 'bg-red-100 text-red-800',
  B: 'bg-orange-100 text-orange-800',
  '+C': 'bg-yellow-100 text-yellow-800',
  C: 'bg-green-100 text-green-800',
  D: 'bg-gray-100 text-gray-600',
  E: 'bg-slate-100 text-slate-500',
  '―': 'bg-white text-gray-300',
}

export default async function HistoryPage() {
  const records = await getAllResults()

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">検査結果データベース</h1>
            <p className="text-sm text-gray-500 mt-0.5">保存済み {records.length} 件</p>
          </div>
          <Link
            href="/result"
            className="text-sm border border-blue-300 rounded px-3 py-1.5 text-blue-600 hover:bg-blue-50"
          >
            ← 結果票へ
          </Link>
        </div>

        {records.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-400">
            <div className="text-4xl mb-3">📂</div>
            <p>保存済みデータがありません。</p>
            <p className="text-sm mt-1">結果票画面の「DB保存」ボタンで保存してください。</p>
          </div>
        ) : (
          <>
            {/* モバイル: カード表示 */}
            <div className="flex flex-col gap-3 md:hidden">
              {records.map((rec) => {
                const aptMap = Object.fromEntries(rec.result.aptitudes.map((a) => [a.key, a]))
                const savedAt = new Date(rec.savedAt).toLocaleString('ja-JP', {
                  year: 'numeric', month: '2-digit', day: '2-digit',
                  hour: '2-digit', minute: '2-digit',
                })
                return (
                  <div key={rec.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-gray-800 text-base">{rec.result.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {rec.result.date}　{rec.result.age ? `${rec.result.age}歳` : ''}　{rec.result.sex ?? ''}　担当：{rec.result.staff}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Link
                          href={`/history/${rec.id}`}
                          className="text-sm border border-blue-300 rounded px-3 py-1 text-blue-600 hover:bg-blue-50"
                        >
                          閲覧
                        </Link>
                        <DeleteButton id={rec.id} />
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap mt-2">
                      {(['G','V','N','Q','S','P'] as const).map((k) => {
                        const a = aptMap[k]
                        const ev = a?.evaluation ?? '―'
                        return (
                          <div key={k} className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] text-gray-400 font-medium">{k}</span>
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${EVAL_COLOR[ev] ?? ''}`}>
                              {ev}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-2">保存：{savedAt}</div>
                  </div>
                )
              })}
            </div>

            {/* PC: テーブル表示 */}
            <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="px-4 py-3 font-semibold border-b border-gray-200">氏名</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200">実施日</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200">年齢</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200">性別</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200">担当</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200 text-center">G</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200 text-center">V</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200 text-center">N</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200 text-center">Q</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200 text-center">S</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200 text-center">P</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-200">保存日時</th>
                    <th className="px-4 py-3 border-b border-gray-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, i) => {
                    const aptMap = Object.fromEntries(rec.result.aptitudes.map((a) => [a.key, a]))
                    const savedAt = new Date(rec.savedAt).toLocaleString('ja-JP', {
                      year: 'numeric', month: '2-digit', day: '2-digit',
                      hour: '2-digit', minute: '2-digit',
                    })
                    return (
                      <tr key={rec.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2.5 font-semibold text-gray-800 border-b border-gray-100">
                          {rec.result.name}
                        </td>
                        <td className="px-4 py-2.5 text-gray-600 border-b border-gray-100">{rec.result.date}</td>
                        <td className="px-4 py-2.5 text-gray-600 border-b border-gray-100">{rec.result.age}</td>
                        <td className="px-4 py-2.5 text-gray-600 border-b border-gray-100">{rec.result.sex ?? '―'}</td>
                        <td className="px-4 py-2.5 text-gray-600 border-b border-gray-100">{rec.result.staff}</td>
                        {(['G','V','N','Q','S','P'] as const).map((k) => {
                          const a = aptMap[k]
                          const ev = a?.evaluation ?? '―'
                          return (
                            <td key={k} className="px-2 py-2.5 text-center border-b border-gray-100">
                              <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-bold ${EVAL_COLOR[ev] ?? ''}`}>
                                {ev}
                              </span>
                            </td>
                          )
                        })}
                        <td className="px-4 py-2.5 text-gray-400 text-xs border-b border-gray-100 whitespace-nowrap">{savedAt}</td>
                        <td className="px-4 py-2.5 border-b border-gray-100">
                          <div className="flex gap-2 justify-end">
                            <Link
                              href={`/history/${rec.id}`}
                              className="text-xs border border-blue-300 rounded px-2 py-0.5 text-blue-600 hover:bg-blue-50"
                            >
                              閲覧
                            </Link>
                            <DeleteButton id={rec.id} />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

import { readFile } from 'fs/promises'
import path from 'path'
import ScoreTable from '@/components/ScoreTable'
import ResultActions from '@/components/ResultActions'
import JobMatchingTable from '@/components/JobMatchingTable'
import AptitudeProfileChart from '@/components/AptitudeProfileChart'
import SubtestBarChart from '@/components/SubtestBarChart'
import { sampleResult } from '@/data/sampleData'
import type { GatbResult } from '@/types/gatb'

async function getResult(): Promise<GatbResult> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'result.json')
    const raw = await readFile(filePath, 'utf-8')
    const data = JSON.parse(raw) as GatbResult
    if (!data.name) return sampleResult
    return data
  } catch {
    return sampleResult
  }
}

export const dynamic = 'force-dynamic'

export default async function ResultPage() {
  const result = await getResult()
  const isSample = result === sampleResult

  return (
    <div id="result-page" className="min-h-screen print:min-h-0 bg-white p-3 sm:p-4 print:p-2 overflow-x-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-2">
        <div>
          <div className="text-[11px] font-bold">厚生労働省編一般職業適性検査（改訂新版）結果票</div>
          <div className="text-[10px]">★面談担当者閲覧用★　　【{result.version}】</div>
        </div>
        <div className="text-sm sm:text-[13px] font-bold tracking-wide">
          {result.name}　様{result.sex ? `（${result.sex}）` : ''}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <div className="text-[10px] text-gray-500">
            実施日：{result.date}　担当：{result.staff}
          </div>
          <ResultActions result={result} />
        </div>
      </div>

      {isSample && (
        <div className="print:hidden bg-yellow-50 border border-yellow-300 rounded px-3 py-1.5 mb-2 text-[11px] text-yellow-800">
          サンプルデータを表示しています。
          <a href="/input" className="underline ml-1">データ入力</a>
          するか、VBAの「JSON出力」ボタンで result.json をエクスポートしてください。
        </div>
      )}

      {/* モバイル: スコア表 → 棒グラフ → プロフィール を縦積み */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="overflow-x-auto">
          <ScoreTable result={result} />
        </div>
        <div>
          <div className="text-[10px] font-bold text-center mb-0.5">検査得点グラフ</div>
          <SubtestBarChart subtests={result.subtests} />
        </div>
        <div>
          <div className="text-[10px] font-bold text-center mb-0.5">適性能プロフィール</div>
          <AptitudeProfileChart aptitudes={result.aptitudes} />
        </div>
      </div>

      {/* PC: スコア表 | 棒グラフ | プロフィール を横並び */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: 'auto 1fr 1fr', gap: '8px', alignItems: 'start' }}>
        <div>
          <ScoreTable result={result} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="text-[10px] font-bold text-center mb-0.5">検査得点グラフ</div>
          <SubtestBarChart subtests={result.subtests} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="text-[10px] font-bold text-center mb-0.5">適性能プロフィール</div>
          <AptitudeProfileChart aptitudes={result.aptitudes} />
          <div className="text-[8px] text-gray-400 mt-1 print:hidden">
            ※評価帯はSETTINGの正式値を参照してください（現在はサンプル値）
          </div>
        </div>
      </div>

      {/* 適性グラフ（器具検査除く） */}
      <div className="mt-3">
        <div className="text-[10px] font-bold mb-1">適性グラフ（G・V・N・Q・S・P・K）</div>
        <JobMatchingTable aptitudes={result.aptitudes} />
      </div>

    </div>
  )
}

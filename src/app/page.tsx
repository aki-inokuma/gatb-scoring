import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border border-gray-300 rounded p-8 shadow-sm w-80">
        <h1 className="text-lg font-bold text-center mb-1">GATB 採点システム</h1>
        <p className="text-[11px] text-gray-500 text-center mb-6">一般職業適性検査</p>
        <nav className="flex flex-col gap-3">
          <Link
            href="/input"
            className="block text-center bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            粗点入力
          </Link>
          <Link
            href="/result"
            className="block text-center border border-blue-600 text-blue-600 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            結果票を表示
          </Link>
        </nav>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            VBAからJSON出力した場合は<br />
            「結果票を表示」で自動反映されます
          </p>
        </div>
      </div>
    </div>
  )
}

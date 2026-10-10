import { notFound } from 'next/navigation'
import { getResultById } from '@/lib/db'

import ScoreTable from '@/components/ScoreTable'
import AptitudeProfileChart from '@/components/AptitudeProfileChart'
import SubtestBarChart from '@/components/SubtestBarChart'
import JobMatchingTable from '@/components/JobMatchingTable'
import HistoryActions from '@/components/HistoryActions'

export const dynamic = 'force-dynamic'

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const record = await getResultById(id)
  if (!record) notFound()

  const { result } = record
  const savedAt = new Date(record.savedAt).toLocaleString('ja-JP')

  return (
    <div id="result-page" className="bg-white p-3 sm:p-4 overflow-x-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
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
          <div className="flex flex-col gap-1 items-end">
            <HistoryActions result={result} />
            <span className="text-[9px] text-gray-400">保存：{savedAt}</span>
          </div>
        </div>
      </div>

      {/* モバイル: 縦積み */}
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

      {/* PC: 横並び */}
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
        </div>
      </div>

      {/* 適性グラフ */}
      <div className="mt-3">
        <div className="text-[10px] font-bold mb-1">適性グラフ（G・V・N・Q・S・P・K）</div>
        <JobMatchingTable aptitudes={result.aptitudes} />
      </div>
    </div>
  )
}

'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { SubtestResult } from '@/types/gatb'

interface Props {
  subtests: SubtestResult[]
}

export default function SubtestBarChart({ subtests }: Props) {
  const data = subtests.map((t) => ({
    name: t.name,
    得点: t.convertedScore,
  }))

  const maxScore = Math.max(...subtests.map((t) => t.convertedScore), 140)
  const domainMax = Math.ceil(maxScore / 20) * 20
  const ticks = Array.from({ length: domainMax / 20 }, (_, i) => (i + 1) * 20)

  const h = 356

  return (
    <div className="border border-gray-400 p-1" style={{ width: '100%', height: h + 4 }}>
      <ResponsiveContainer width="100%" height={h}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 4, right: 4, left: 52, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, domainMax]}
            ticks={ticks}
            tick={{ fontSize: 10 }}
          />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={52} />
          <Tooltip />
          <ReferenceLine x={100} stroke="#999" strokeDasharray="4 2" />
          <Bar dataKey="得点" fill="#4472C4" barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

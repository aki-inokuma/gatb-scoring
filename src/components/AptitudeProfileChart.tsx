'use client'

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

import { EVALUATION_BANDS, APTITUDE_LABELS } from '@/types/gatb'
import type { AptitudeResult, AptitudeKey } from '@/types/gatb'

const PROFILE_KEYS: AptitudeKey[] = ['G', 'V', 'N', 'Q', 'S', 'P', 'K']

interface Props {
  aptitudes: AptitudeResult[]
}

function CustomXTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const key = payload?.value as AptitudeKey
  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="middle" dy={12} fontSize={10} fill="#333">{key}</text>
      <text textAnchor="middle" dy={23} fontSize={8} fill="#666">{APTITUDE_LABELS[key]}</text>
    </g>
  )
}

export default function AptitudeProfileChart({ aptitudes }: Props) {
  const data = aptitudes
    .filter((a) => PROFILE_KEYS.includes(a.key) && a.evaluation !== '―')
    .map((a) => ({ key: a.key, 適性能得点: a.score, 加算得点: a.adjustedScore }))

  const h = 256

  return (
    <div className="border border-gray-400 p-1" style={{ width: '100%', height: h + 4 }}>
      <ResponsiveContainer width="100%" height={h}>
        <ComposedChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 28 }}>
          {EVALUATION_BANDS.map((band) => (
            <ReferenceArea
              key={band.level}
              y1={band.min}
              y2={band.max}
              fill={band.color}
              fillOpacity={1}
              ifOverflow="visible"
              label={{ value: band.level, position: 'insideRight', fontSize: 9, fill: '#444' }}
            />
          ))}
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="key"
            tick={<CustomXTick />}
            scale="point"
            padding={{ left: 20, right: 4 }}
            height={36}
          />
          <YAxis
            domain={[50, 150]}
            ticks={[50, 60, 70, 75, 80, 90, 100, 110, 120, 130, 140, 150]}
            tick={{ fontSize: 10 }}
            width={28}
          />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <ReferenceLine y={100} stroke="#000" strokeWidth={2} />
          <Line
            type="linear"
            dataKey="適性能得点"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4, fill: '#2563eb' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="linear"
            dataKey="加算得点"
            stroke="#dc2626"
            strokeWidth={2}
            dot={{ r: 4, fill: '#dc2626' }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

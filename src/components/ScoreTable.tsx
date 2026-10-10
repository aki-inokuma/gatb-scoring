import type { GatbResult, AptitudeKey } from '@/types/gatb'
import { APTITUDE_KEYS } from '@/types/gatb'

interface Props {
  result: GatbResult
}

const APT_COLORS: Record<AptitudeKey, string> = {
  G: '#dbeafe', V: '#e0e7ff', N: '#fce7f3',
  Q: '#d1fae5', S: '#fef3c7', P: '#ffedd5',
  K: '#f3e8ff', F: '#fee2e2', M: '#ecfdf5',
}

export default function ScoreTable({ result }: Props) {
  const { subtests, aptitudes } = result
  const aptMap = Object.fromEntries(aptitudes.map((a) => [a.key, a])) as Record<AptitudeKey, (typeof aptitudes)[0]>
  const activeKeys = APTITUDE_KEYS.filter((k) => aptMap[k]?.evaluation !== '―')

  const th = 'border border-gray-400 text-center text-[11px] font-bold px-1 py-1 bg-gray-200 text-gray-900'
  const td = 'border border-gray-300 text-center text-[11px] px-1 py-1 text-gray-900'

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse" style={{ minWidth: 460 }}>
        <thead>
          <tr>
            <th className={`${th} text-left w-20`} rowSpan={2}>検査名</th>
            <th className={`${th} w-10`} rowSpan={2}>粗点</th>
            <th className={`${th} w-10`} rowSpan={2}>換算点</th>
            {activeKeys.map((k) => (
              <th key={k} className={`${th} w-8`} style={{ backgroundColor: APT_COLORS[k] }}>
                {k}
              </th>
            ))}
          </tr>
          <tr>
            {activeKeys.map((k) => (
              <th key={k} className="border border-gray-400 text-center text-[10px] font-bold px-0.5 py-0.5" style={{ backgroundColor: APT_COLORS[k] }}>
                {aptMap[k].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subtests.map((test, i) => (
            <tr key={test.code} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className={`${td} text-left px-1.5 font-medium`}>{test.name}</td>
              <td className={`${td} font-mono font-semibold`}>{test.rawScore}</td>
              <td className={`${td} font-mono font-bold`}>{test.convertedScore}</td>
              {activeKeys.map((k) => {
                const active = test.aptitudes.includes(k)
                return (
                  <td
                    key={k}
                    className={`${td} font-mono font-bold`}
                    style={active
                      ? { backgroundColor: APT_COLORS[k], color: '#1e3a5f' }
                      : { color: '#cbd5e1', backgroundColor: '#f8fafc' }}
                  >
                    {active ? test.convertedScore : ''}
                  </td>
                )
              })}
            </tr>
          ))}

          {/* 通性能得点 */}
          <tr className="bg-blue-50 border-t-2 border-blue-300">
            <td colSpan={3} className={`${td} text-left px-1.5 font-bold text-[11px] bg-blue-100`}>通性能得点</td>
            {activeKeys.map((k) => {
              const na = aptMap[k].evaluation === '―'
              return (
                <td key={k} className={`${td} font-bold font-mono`}
                  style={na ? { backgroundColor: '#f1f5f9', color: '#94a3b8' } : { backgroundColor: APT_COLORS[k], color: '#1e3a5f' }}>
                  {na ? '―' : aptMap[k].score}
                </td>
              )
            })}
          </tr>

          {/* 加算得点 */}
          <tr className="bg-orange-50">
            <td colSpan={3} className={`${td} text-left px-1.5 font-bold text-[11px] bg-orange-100`}>加算得点</td>
            {activeKeys.map((k) => {
              const na = aptMap[k].evaluation === '―'
              return (
                <td key={k} className={`${td} font-bold font-mono`}
                  style={na ? { backgroundColor: '#f1f5f9', color: '#94a3b8' } : { backgroundColor: APT_COLORS[k], color: '#7c2d12' }}>
                  {na ? '―' : aptMap[k].adjustedScore}
                </td>
              )
            })}
          </tr>

          {/* 評価段階 */}
          <tr className="bg-green-50">
            <td colSpan={3} className={`${td} text-left px-1.5 font-bold text-[11px] bg-green-100`}>評価段階</td>
            {activeKeys.map((k) => {
              const ev = aptMap[k].evaluation
              const evColor =
                ev === 'A'  ? 'bg-red-100 text-red-800' :
                ev === 'B'  ? 'bg-orange-100 text-orange-800' :
                ev === '+C' ? 'bg-yellow-100 text-yellow-800' :
                ev === 'C'  ? 'bg-green-100 text-green-800' :
                ev === 'D'  ? 'bg-gray-100 text-gray-700' :
                ev === '―'  ? 'bg-slate-100 text-slate-400' :
                              'bg-gray-200 text-gray-500'
              return (
                <td key={k} className={`border border-gray-300 text-center text-[11px] px-1 py-1 font-bold rounded-none ${evColor}`}>
                  {ev}
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

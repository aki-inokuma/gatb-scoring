import { Fragment } from 'react'
import type { AptitudeResult, AptitudeKey } from '@/types/gatb'
import { APTITUDE_LABELS } from '@/types/gatb'

const JOB_DISPLAY_KEYS: AptitudeKey[] = ['G', 'V', 'N', 'Q', 'S', 'P', 'K']
import { JOB_MASTER, groupByDomain } from '@/data/jobMasterData'

interface Props {
  aptitudes: AptitudeResult[]
}

// A: adjDiff >= 20 / B: adjDiff >= 0 / C: adjDiff < 0
function jobGrade(adjDiff: number): 'A' | 'B' | 'C' {
  if (adjDiff >= 20) return 'A'
  if (adjDiff >= 0) return 'B'
  return 'C'
}

const gradeStyle: Record<string, string> = {
  A: 'bg-blue-200 font-bold text-black',
  B: 'bg-blue-100 font-bold text-black',
  C: 'bg-gray-100 text-black',
}

const diffStyle = (v: number) => (v >= 0 ? 'text-black' : 'text-black')

const th = 'border border-gray-500 bg-gray-200 text-center text-[8px] font-bold px-0 py-0.5 text-black'
const td = 'border border-gray-400 text-center text-[8px] px-0 py-0.5 leading-tight text-black'

export default function JobMatchingTable({ aptitudes }: Props) {
  const aptMap = Object.fromEntries(aptitudes.map((a) => [a.key, a])) as Record<AptitudeKey, AptitudeResult>
  const domains = groupByDomain(JOB_MASTER)

  let rowNum = 0

  return (
    <div className="overflow-x-auto mt-2">
      <table className="border-collapse text-[8px] w-full" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '2%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '2%' }} />
          {JOB_DISPLAY_KEYS.flatMap((k) => [
            <col key={`col-${k}-1`} style={{ width: '2.3%' }} />,
            <col key={`col-${k}-2`} style={{ width: '2.3%' }} />,
            <col key={`col-${k}-3`} style={{ width: '2.3%' }} />,
            <col key={`col-${k}-4`} style={{ width: '2%' }} />,
          ])}
        </colgroup>

        <thead>
          <tr>
            <th className={th} rowSpan={3}>№</th>
            <th className={th} rowSpan={3}>職業領域</th>
            <th className={th} rowSpan={3}>適性職業群</th>
            <th className={th} rowSpan={3} style={{ fontSize: '7px' }}>照合<br />結果</th>
            {JOB_DISPLAY_KEYS.map((k) => (
              <th key={k} className={th} colSpan={4}>
                {k}<br /><span className="font-normal">{APTITUDE_LABELS[k]}</span>
              </th>
            ))}
          </tr>
          <tr>
            {JOB_DISPLAY_KEYS.map((k) => (
              <Fragment key={k}>
                <th className={th}>I</th>
                <th className={th}>II</th>
                <th className={th}>III</th>
                <th className={th}>計</th>
              </Fragment>
            ))}
          </tr>
          <tr>
            {JOB_DISPLAY_KEYS.map((k) => (
              <Fragment key={k}>
                <th className={`${th} font-normal`} style={{ fontSize: '6px' }}>基準</th>
                <th className={`${th} font-normal`} style={{ fontSize: '6px' }}>能差</th>
                <th className={`${th} font-normal`} style={{ fontSize: '6px' }}>加差</th>
                <th className={`${th} font-normal`} style={{ fontSize: '6px' }}>判</th>
              </Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {domains.map((domain) =>
            domain.groups.map((group, gi) => {
              rowNum++
              const num = rowNum
              return (
                <tr key={group.id} className="hover:bg-yellow-50">
                  <td className={`${td}`}>{num}</td>
                  {gi === 0 && (
                    <td
                      className={`${td} font-semibold bg-gray-50 text-[7px] leading-tight px-0.5`}
                      rowSpan={domain.groups.length}
                    >
                      {domain.domain}
                    </td>
                  )}
                  <td className={`${td} text-left px-0.5 text-[7px] leading-tight`}>{group.name}</td>
                  <td className={`${td} font-bold`}>
                    {group.level && (
                      <span className="text-black">
                        {group.level}
                      </span>
                    )}
                  </td>

                  {JOB_DISPLAY_KEYS.map((k) => {
                    const req = group.requirements[k]
                    const apt = aptMap[k]
                    if (!req || !apt || apt.evaluation === '―') {
                      return (
                        <Fragment key={k}>
                          <td className={td}></td>
                          <td className={td}></td>
                          <td className={td}></td>
                          <td className={td}></td>
                        </Fragment>
                      )
                    }
                    const scoreDiff = apt.score - req.score
                    const adjDiff = apt.adjustedScore - req.score
                    const grade = jobGrade(adjDiff)
                    return (
                      <Fragment key={k}>
                        <td className={`${td}`}>{req.score}</td>
                        <td className={`${td} ${diffStyle(scoreDiff)}`}>
                          {scoreDiff >= 0 ? `+${scoreDiff}` : scoreDiff}
                        </td>
                        <td className={`${td} ${diffStyle(adjDiff)}`}>
                          {adjDiff >= 0 ? `+${adjDiff}` : adjDiff}
                        </td>
                        <td className={`${td} ${gradeStyle[grade]}`}>{grade}</td>
                      </Fragment>
                    )
                  })}
                </tr>
              )
            })
          )}
        </tbody>
      </table>

      <div className="text-[7px] text-gray-600 mt-0.5">
        ※I＝基準得点　II＝適性能得点差　III＝加算得点差　計＝判定（A：大きく超過 B：達成 C：未達成）　F・Mは除く
      </div>
    </div>
  )
}

import type { GatbResult, AptitudeKey, EvaluationLevel } from '@/types/gatb'
import { APTITUDE_KEYS, APTITUDE_LABELS } from '@/types/gatb'
import { lookupSimple, lookupMulti, SIMPLE_TABLES, MULTI_TABLES } from '@/data/conversionTables'

// 各適性能に寄与する検査（multi テーブルはどの列を使うか col で指定）
type AptTest = { code: string; col?: string }
const APT_TESTS: Record<AptitudeKey, AptTest[]> = {
  G: [{ code: 'T09', col: 'G' }, { code: 'T10', col: 'G' }, { code: 'T11', col: 'G' }],
  V: [{ code: 'T08' }, { code: 'T10', col: 'V' }],
  N: [{ code: 'T07' }, { code: 'T11', col: 'N' }],
  Q: [{ code: 'T04' }],
  S: [{ code: 'T06' }, { code: 'T09', col: 'S' }],
  P: [{ code: 'T03' }, { code: 'T05' }],
  K: [{ code: 'T01' }, { code: 'T02' }],
  F: [{ code: 'T14' }, { code: 'T15' }],
  M: [{ code: 'T12' }, { code: 'T13' }],
}

// 加算得点の補正値
const ADJ_BONUS: Record<AptitudeKey, number> = {
  G: 8, V: 8, N: 8, Q: 8,
  S: 10, P: 10, K: 10,
  F: 12, M: 12,
}

// 評価段階の境界値
const EVAL_BANDS: { min: number; level: EvaluationLevel }[] = [
  { min: 120, level: 'A'  },
  { min: 110, level: 'B'  },
  { min: 100, level: '+C' },
  { min:  90, level: 'C'  },
  { min:  75, level: 'D'  },
  { min:   0, level: 'E'  },
]

// t得点表示用ノルム（紙の換算表から確認済）
const DISPLAY_NORMS: Record<string, { mean: number; sd: number }> = {
  T01: { mean: 101.98, sd: 13.97 },
  T02: { mean:  49.54, sd:  5.77 },
  T03: { mean:  17.85, sd:  3.42 },
  T04: { mean:  42.19, sd:  5.68 },
  T05: { mean:  16.86, sd:  2.15 },
  T06: { mean:  13.05, sd:  2.64 },
  T07: { mean:  17.88, sd:  3.55 },
  T08: { mean:  17.79, sd:  4.12 },
  T09: { mean:  14.64, sd:  2.61 },
  T10: { mean:  28.60, sd:  6.77 },
  T11: { mean:   8.37, sd:  2.35 },
  T12: { mean:  88.00, sd:  7.38 },
  T13: { mean:  91.43, sd:  9.41 },
  T14: { mean:  37.16, sd:  4.26 },
  T15: { mean:  29.49, sd:  3.63 },
}

/** 粗点 → t得点（表示用）: 100 + 20*(raw - mean) / sd */
export function calcConverted(code: string, raw: number): number {
  const n = DISPLAY_NORMS[code]
  if (n && n.sd !== 0) return Math.round(100 + 20 * (raw - n.mean) / n.sd)
  return 0
}

/** 適性能計算用の換算点（multi テーブルは col 指定） */
function convertedForApt(code: string, raw: number, col?: string): number | null {
  if (col && MULTI_TABLES[code]) return lookupMulti(code, raw, col)
  if (SIMPLE_TABLES[code])       return lookupSimple(code, raw)
  return null
}

export function calcMean(code: string): number { return DISPLAY_NORMS[code]?.mean ?? 0 }
export function calcSd(code: string):   number { return DISPLAY_NORMS[code]?.sd   ?? 0 }

function aptScore(apt: AptitudeKey, rawMap: Record<string, number>): number | null {
  const tests = APT_TESTS[apt]
  let sum = 0
  for (const { code, col } of tests) {
    if (!(code in rawMap)) return null
    const v = convertedForApt(code, rawMap[code], col)
    if (v === null) return null
    sum += v
  }
  return sum
}

function evalLevel(score: number): EvaluationLevel {
  return EVAL_BANDS.find((b) => score >= b.min)?.level ?? 'E'
}

export interface TestInput {
  code: string
  name: string
  rawScore: number
  aptitudes: AptitudeKey[]
}

export function calculate(
  basicInfo: { name: string; date: string; age: string; sex: string; staff: string; version: string },
  tests: TestInput[]
): GatbResult {
  const rawMap: Record<string, number> = {}
  tests.forEach((t) => { rawMap[t.code] = t.rawScore })

  const aptitudes = APTITUDE_KEYS.map((k) => {
    const score = aptScore(k, rawMap)
    if (score === null) {
      return { key: k, label: APTITUDE_LABELS[k], score: 0, adjustedScore: 0, evaluation: '―' as EvaluationLevel }
    }
    return {
      key: k,
      label: APTITUDE_LABELS[k],
      score,
      adjustedScore: score + ADJ_BONUS[k],
      evaluation: evalLevel(score),
    }
  })

  const subtests = tests.map((t) => ({
    code:           t.code,
    name:           t.name,
    rawScore:       t.rawScore,
    convertedScore: calcConverted(t.code, t.rawScore),
    mean:           calcMean(t.code),
    sd:             calcSd(t.code),
    aptitudes:      t.aptitudes,
  }))

  return {
    ...basicInfo,
    subtests,
    aptitudes,
    jobDomains: [],
  }
}

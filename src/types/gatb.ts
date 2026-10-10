export type AptitudeKey = 'G' | 'V' | 'N' | 'Q' | 'S' | 'P' | 'K' | 'F' | 'M'
export type EvaluationLevel = 'A' | 'B' | '+C' | 'C' | 'D' | 'E' | '―'

export interface SubtestResult {
  code: string
  name: string
  rawScore: number
  convertedScore: number
  aptitudes: AptitudeKey[]
  mean: number
  sd: number
}

export interface AptitudeResult {
  key: AptitudeKey
  label: string
  score: number
  adjustedScore: number
  evaluation: EvaluationLevel
}

export interface JobGroup {
  id: string
  name: string
  level: 'M' | 'L' | ''
  requirements: Partial<Record<AptitudeKey, { score: number; diff: number; grade: string } | null>>
}

export interface JobDomain {
  domain: string
  groups: JobGroup[]
}

export interface GatbResult {
  name: string
  date: string
  age: string
  sex?: string
  staff: string
  version: string
  subtests: SubtestResult[]
  aptitudes: AptitudeResult[]
  jobDomains: JobDomain[]
}

export const APTITUDE_LABELS: Record<AptitudeKey, string> = {
  G: '知的',
  V: '言語',
  N: '数理',
  Q: '書記',
  S: '空間',
  P: '形態',
  K: '共応',
  F: '指先',
  M: '手腕',
}

export const APTITUDE_KEYS: AptitudeKey[] = ['G', 'V', 'N', 'Q', 'S', 'P', 'K', 'F', 'M']

// 器具検査を除いた6適性能（適性グラフ表示用）
export const NON_INSTRUMENT_KEYS: AptitudeKey[] = ['G', 'V', 'N', 'Q', 'S', 'P']

export const EVALUATION_BANDS = [
  { level: 'A',  min: 120, max: 150, color: '#b8c8d8' },
  { level: 'B',  min: 110, max: 120, color: '#c8d8e8' },
  { level: '+C', min: 100, max: 110, color: '#d8e8f0' },
  { level: 'C',  min:  90, max: 100, color: '#e8f0f8' },
  { level: 'D',  min:  75, max:  90, color: '#f0f4f8' },
  { level: 'E',  min:  50, max:  75, color: '#f8f8f8' },
]

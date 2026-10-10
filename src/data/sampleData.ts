import type { GatbResult } from '@/types/gatb'

export const sampleResult: GatbResult = {
  name: '三石 弘美',
  date: '2026-08-11',
  age: '18',
  staff: '担当者',
  version: '高校・一般用',
  subtests: [
    { code: 'T01', name: '円打点',   rawScore: 89, convertedScore: 81, aptitudes: ['M'],      mean: 101.96, sd: 13.97 },
    { code: 'T02', name: '記号記入', rawScore: 39, convertedScore: 63, aptitudes: ['Q'],      mean: 49.54,  sd: 5.77  },
    { code: 'T03', name: '形態照合', rawScore: 15, convertedScore: 83, aptitudes: ['P'],      mean: 17.85,  sd: 3.42  },
    { code: 'T04', name: '名詞比較', rawScore: 43, convertedScore: 63, aptitudes: ['Q'],      mean: 42.19,  sd: 9.41  },
    { code: 'T05', name: '図柄照合', rawScore: 16, convertedScore: 83, aptitudes: ['P'],      mean: 16.86,  sd: 2.15  },
    { code: 'T06', name: '平面判断', rawScore: 12, convertedScore: 92, aptitudes: ['S'],      mean: 17.88,  sd: 3.05  },
    { code: 'T07', name: '計算',     rawScore: 4,  convertedScore: 33, aptitudes: ['G', 'N'], mean: 47.79,  sd: 4.72  },
    { code: 'T08', name: '語意',     rawScore: 9,  convertedScore: 57, aptitudes: ['G', 'V'], mean: 28.60,  sd: 6.52  },
    { code: 'T09', name: '立体判断', rawScore: 9,  convertedScore: 57, aptitudes: ['G', 'S'], mean: 14.64,  sd: 2.61  },
    { code: 'T10', name: '文章完成', rawScore: 20, convertedScore: 71, aptitudes: ['G', 'V'], mean: 91.43,  sd: 9.41  },
    { code: 'T11', name: '算数応用', rawScore: 20, convertedScore: 77, aptitudes: ['G', 'N'], mean: 8.37,   sd: 2.35  },
    { code: 'T12', name: 'さし込み', rawScore: 52, convertedScore: 2,  aptitudes: ['K', 'F'], mean: 88.00,  sd: 7.38  },
    { code: 'T13', name: 'さし替え', rawScore: 87, convertedScore: 91, aptitudes: ['K'],      mean: 37.16,  sd: 4.26  },
    { code: 'T14', name: '組み合せ', rawScore: 34, convertedScore: 85, aptitudes: ['F', 'M'], mean: 29.49,  sd: 3.63  },
    { code: 'T15', name: '分解',     rawScore: 27, convertedScore: 86, aptitudes: ['M'],      mean: 29.00,  sd: 3.50  },
  ],
  aptitudes: [
    { key: 'G', label: '知的', score: 68, adjustedScore: 70, evaluation: 'E' },
    { key: 'V', label: '言語', score: 44, adjustedScore: 52, evaluation: 'E' },
    { key: 'N', label: '数理', score: 66, adjustedScore: 74, evaluation: 'E' },
    { key: 'Q', label: '書記', score: 64, adjustedScore: 84, evaluation: 'E' },
    { key: 'S', label: '空間', score: 74, adjustedScore: 88, evaluation: 'D' },
    { key: 'P', label: '形態', score: 78, adjustedScore: 80, evaluation: 'D' },
    { key: 'K', label: '共応', score: 70, adjustedScore: 85, evaluation: 'C' },
    { key: 'F', label: '指先', score: 72, adjustedScore: 72, evaluation: 'D' },
    { key: 'M', label: '手腕', score: 72, adjustedScore: 84, evaluation: 'D' },
  ],
  jobDomains: [
    {
      domain: '農林漁業',
      groups: [
        { id: 'J01', name: '動物の採取、飼育、畜産', level: '', requirements: {} },
        { id: 'J02', name: '動物管理、木花業等、展示', level: 'M', requirements: { G: { score: 90, diff: -22, grade: 'C' }, N: { score: 75, diff: -31, grade: 'C' } } },
      ],
    },
    {
      domain: '運搬、加工、組立の簡易技能',
      groups: [
        { id: 'J03', name: '身体作業', level: 'M', requirements: {} },
        { id: 'J04', name: '手指作業', level: 'M', requirements: {} },
        { id: 'J05', name: '機械操作', level: 'M', requirements: {} },
        { id: 'J06', name: '加工、組立', level: 'L',  requirements: {} },
      ],
    },
    {
      domain: '加工、組立、造形の熟練技能',
      groups: [
        { id: 'J07', name: '建設設備工事', level: 'M', requirements: {} },
        { id: 'J08', name: '切削加工、造形', level: '', requirements: {} },
        { id: 'J09', name: '手工技術', level: '', requirements: {} },
        { id: 'J10', name: '製図関連', level: '', requirements: {} },
      ],
    },
    {
      domain: '保守管理',
      groups: [
        { id: 'J11', name: '機械、設備の運転監督', level: 'L', requirements: { G: { score: 90, diff: -22, grade: 'C' }, N: { score: 90, diff: -26, grade: 'C' } } },
        { id: 'J12', name: '機械設備の保守管理', level: 'L', requirements: { G: { score: 90, diff: -22, grade: 'C' }, N: { score: 90, diff: -26, grade: 'C' } } },
      ],
    },
    {
      domain: '運転、操縦',
      groups: [
        { id: 'J13', name: '附行機関、建設機械運転', level: 'L', requirements: {} },
        { id: 'J14', name: '車両等の運転', level: 'L', requirements: {} },
        { id: 'J15', name: '航空機、船舶の運転操縦', level: 'L', requirements: {} },
      ],
    },
    {
      domain: '工学、技術',
      groups: [
        { id: 'J16', name: '調査、分析', level: 'L', requirements: { G: { score: 110, diff: -42, grade: 'C' }, N: { score: 110, diff: -44, grade: 'C' } } },
        { id: 'J17', name: '工学、技術の開発応用', level: 'L', requirements: { G: { score: 110, diff: -42, grade: 'C' }, N: { score: 110, diff: -44, grade: 'C' } } },
      ],
    },
    {
      domain: '学術研究、医療、法務',
      groups: [
        { id: 'J18', name: '自然科学系の研究', level: 'L', requirements: {} },
        { id: 'J19', name: '診断、治療', level: 'L', requirements: {} },
        { id: 'J20', name: '人文科学系の研究', level: 'L', requirements: {} },
        { id: 'J21', name: '法律、訴訟等', level: 'L', requirements: {} },
      ],
    },
    {
      domain: '教育関係',
      groups: [
        { id: 'J22', name: '教育、訓練、指導', level: 'L', requirements: {} },
        { id: 'J23', name: '教育、指導', level: 'L', requirements: {} },
      ],
    },
    {
      domain: 'コミュニケーション',
      groups: [
        { id: 'J24', name: 'デザイン、写真', level: 'L', requirements: {} },
        { id: 'J25', name: '通信', level: 'L', requirements: {} },
        { id: 'J26', name: '著述、編集、報道', level: 'L', requirements: {} },
      ],
    },
    {
      domain: '社会福祉',
      groups: [
        { id: 'J27', name: '養護、看護、保健医療', level: 'L', requirements: {} },
        { id: 'J28', name: '福祉', level: 'L', requirements: {} },
        { id: 'J29', name: '相談助言', level: 'L', requirements: {} },
      ],
    },
    {
      domain: '販売、サービス',
      groups: [
        { id: 'J30', name: '販売、営業', level: 'M', requirements: {} },
        { id: 'J31', name: '接客、美容', level: 'L', requirements: {} },
        { id: 'J32', name: '個人サービス', level: 'L', requirements: {} },
        { id: 'J33', name: '専門的広販売', level: 'L', requirements: {} },
      ],
    },
    {
      domain: '警備、保安',
      groups: [
        { id: 'J34', name: '警備、保安', level: 'L', requirements: {} },
      ],
    },
    {
      domain: '事務関係',
      groups: [
        { id: 'J35', name: '多岐作業随行作業', level: 'L', requirements: {} },
        { id: 'J36', name: '一般事務', level: 'L', requirements: { G: { score: 90, diff: -22, grade: 'C' }, N: { score: 90, diff: -46, grade: 'C' } } },
        { id: 'J37', name: '経理、会計', level: 'L', requirements: {} },
        { id: 'J38', name: '専門企画', level: 'L', requirements: { G: { score: 110, diff: -42, grade: 'C' }, N: { score: 100, diff: -56, grade: 'C' } } },
      ],
    },
  ],
}

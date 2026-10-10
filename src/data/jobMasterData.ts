import type { AptitudeKey } from '@/types/gatb'

export interface JobRequirement {
  score: number
}

export interface JobMasterEntry {
  id: string
  domain: string
  name: string
  level: 'M' | 'L' | ''
  // 器具検査（K,F,M）を除いたG,V,N,Q,S,Pのみ
  requirements: Partial<Record<AptitudeKey, JobRequirement>>
}

export const JOB_MASTER: JobMasterEntry[] = [
  // 1. 農林漁業
  { id: 'J01', domain: '農林漁業', name: '動物の採取、飼育、畜産', level: 'M', requirements: {} },
  { id: 'J02', domain: '農林漁業', name: '動物管理、水産養殖、園芸', level: 'L', requirements: { G: { score: 90 }, V: { score: 75 }, K: { score: 75 } } },

  // 2. 運搬、加工、組立の簡易技能
  { id: 'J03', domain: '運搬、加工、組立の簡易技能', name: '身体作業', level: 'M', requirements: {} },
  { id: 'J04', domain: '運搬、加工、組立の簡易技能', name: '手指作業', level: 'M', requirements: { S: { score: 75 }, P: { score: 75 }, K: { score: 75 } } },
  { id: 'J05', domain: '運搬、加工、組立の簡易技能', name: '機械操作', level: 'M', requirements: { G: { score: 75 }, P: { score: 75 }, K: { score: 75 } } },
  { id: 'J06', domain: '運搬、加工、組立の簡易技能', name: '加工、組立', level: 'L', requirements: { P: { score: 75 }, K: { score: 75 } } },

  // 3. 加工、組立、造形の熟練技能
  { id: 'J07', domain: '加工、組立、造形の熟練技能', name: '建設、設備工事', level: 'M', requirements: { Q: { score: 75 }, S: { score: 75 }, K: { score: 75 } } },
  { id: 'J08', domain: '加工、組立、造形の熟練技能', name: '切削加工、造形', level: 'L', requirements: { Q: { score: 90 }, S: { score: 90 }, P: { score: 90 }, K: { score: 90 } } },
  { id: 'J09', domain: '加工、組立、造形の熟練技能', name: '手工技術', level: 'L', requirements: { S: { score: 90 }, P: { score: 90 }, K: { score: 90 } } },
  { id: 'J10', domain: '加工、組立、造形の熟練技能', name: '製図関連', level: 'L', requirements: { S: { score: 90 }, P: { score: 90 }, K: { score: 90 } } },

  // 4. 保守管理
  { id: 'J11', domain: '保守管理', name: '機械、装置の運転監視', level: 'L', requirements: { G: { score: 90 }, N: { score: 90 } } },
  { id: 'J12', domain: '保守管理', name: '機械設備の保守管理', level: 'L', requirements: { G: { score: 90 }, N: { score: 90 } } },

  // 5. 運転、操縦
  { id: 'J13', domain: '運転、操縦', name: '附行機関、建設機械運転', level: 'M', requirements: { S: { score: 75 }, K: { score: 75 } } },
  { id: 'J14', domain: '運転、操縦', name: '車両等の運転', level: 'L', requirements: { Q: { score: 75 }, S: { score: 75 } } },
  { id: 'J15', domain: '運転、操縦', name: '航空機、船舶の操縦', level: 'L', requirements: { G: { score: 110 }, N: { score: 110 } } },

  // 6. 工学、技術
  { id: 'J16', domain: '工学、技術', name: '調査、分析', level: 'L', requirements: { G: { score: 90 }, N: { score: 90 } } },
  { id: 'J17', domain: '工学、技術', name: '工学、技術の開発応用', level: 'L', requirements: { G: { score: 110 }, N: { score: 110 } } },

  // 7. 学術研究、医療、法務
  { id: 'J18', domain: '学術研究、医療、法務', name: '自然科学系の研究', level: 'L', requirements: { G: { score: 125 }, N: { score: 125 } } },
  { id: 'J19', domain: '学術研究、医療、法務', name: '診断、治療', level: 'L', requirements: { G: { score: 125 }, N: { score: 125 } } },
  { id: 'J20', domain: '学術研究、医療、法務', name: '人文科学系の研究', level: 'L', requirements: { G: { score: 125 }, V: { score: 100 }, N: { score: 100 } } },
  { id: 'J21', domain: '学術研究、医療、法務', name: '法律、訴訟等', level: 'L', requirements: { G: { score: 125 }, V: { score: 100 }, N: { score: 100 } } },

  // 8. 教育関係
  { id: 'J22', domain: '教育関係', name: '教育、訓練、指導', level: 'L', requirements: { G: { score: 100 }, V: { score: 100 }, N: { score: 100 } } },
  { id: 'J23', domain: '教育関係', name: '教育、指導', level: 'L', requirements: { G: { score: 110 }, V: { score: 110 } } },

  // 9. コミュニケーション
  { id: 'J24', domain: 'コミュニケーション', name: 'デザイン、写真', level: 'L', requirements: { S: { score: 90 }, P: { score: 90 }, K: { score: 90 } } },
  { id: 'J25', domain: 'コミュニケーション', name: '通信', level: 'L', requirements: { G: { score: 90 }, V: { score: 90 } } },
  { id: 'J26', domain: 'コミュニケーション', name: '著述、編集、報道', level: 'L', requirements: { G: { score: 110 }, V: { score: 110 } } },

  // 10. 社会福祉
  { id: 'J27', domain: '社会福祉', name: '介護サービス', level: 'M', requirements: {} },
  { id: 'J28', domain: '社会福祉', name: '養護、看護、保健医療', level: 'L', requirements: { G: { score: 100 }, N: { score: 90 } } },
  { id: 'J29', domain: '社会福祉', name: '相談助言', level: 'L', requirements: { G: { score: 100 }, V: { score: 100 }, N: { score: 100 } } },

  // 11. 販売、サービス
  { id: 'J30', domain: '販売、サービス', name: '販売', level: 'L', requirements: { G: { score: 75 }, Q: { score: 75 } } },
  { id: 'J31', domain: '販売、サービス', name: '理容、美容', level: 'M', requirements: { S: { score: 75 }, P: { score: 75 }, K: { score: 75 } } },
  { id: 'J32', domain: '販売、サービス', name: '個人サービス', level: 'L', requirements: { G: { score: 75 }, Q: { score: 75 }, K: { score: 75 } } },
  { id: 'J33', domain: '販売、サービス', name: '専門的な販売', level: 'L', requirements: { G: { score: 100 }, N: { score: 90 } } },

  // 12. 警備、保安
  { id: 'J34', domain: '警備、保安', name: '警備、巡視', level: 'L', requirements: { G: { score: 75 }, Q: { score: 75 } } },
  { id: 'J35', domain: '警備、保安', name: '警戒、保安', level: 'L', requirements: { G: { score: 90 }, N: { score: 90 } } },

  // 13. 事務関係
  { id: 'J36', domain: '事務関係', name: '簡易事務', level: 'L', requirements: { G: { score: 75 }, V: { score: 75 }, K: { score: 75 } } },
  { id: 'J37', domain: '事務関係', name: '事務機器操作', level: 'L', requirements: { G: { score: 90 }, V: { score: 90 }, K: { score: 90 } } },
  { id: 'J38', domain: '事務関係', name: '一般事務', level: 'L', requirements: { G: { score: 90 }, V: { score: 90 }, Q: { score: 90 } } },
  { id: 'J39', domain: '事務関係', name: '経理、会計', level: 'L', requirements: { G: { score: 90 }, V: { score: 90 }, N: { score: 90 } } },
  { id: 'J40', domain: '事務関係', name: '専門企画', level: 'L', requirements: { G: { score: 100 }, V: { score: 100 }, N: { score: 100 } } },
]

// ドメインごとにグループ化
export function groupByDomain(entries: JobMasterEntry[]) {
  const map: { domain: string; groups: JobMasterEntry[] }[] = []
  for (const e of entries) {
    const existing = map.find((d) => d.domain === e.domain)
    if (existing) {
      existing.groups.push(e)
    } else {
      map.push({ domain: e.domain, groups: [e] })
    }
  }
  return map
}

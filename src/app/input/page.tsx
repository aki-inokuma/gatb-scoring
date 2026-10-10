'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AptitudeKey } from '@/types/gatb'
import { calculate } from '@/lib/scoring'

const TESTS: { code: string; name: string; aptitudes: AptitudeKey[] }[] = [
  { code: 'T01', name: '円打点',   aptitudes: ['K']      },
  { code: 'T02', name: '記号記入', aptitudes: ['K']      },
  { code: 'T03', name: '形態照合', aptitudes: ['P']      },
  { code: 'T04', name: '名詞比較', aptitudes: ['Q']      },
  { code: 'T05', name: '図柄照合', aptitudes: ['P']      },
  { code: 'T06', name: '平面判断', aptitudes: ['S']      },
  { code: 'T07', name: '計算',     aptitudes: ['N']      },
  { code: 'T08', name: '語意',     aptitudes: ['V']      },
  { code: 'T09', name: '立体判断', aptitudes: ['G', 'S'] },
  { code: 'T10', name: '文章完成', aptitudes: ['G', 'V'] },
  { code: 'T11', name: '算数応用', aptitudes: ['G', 'N'] },
  { code: 'T12', name: 'さし込み', aptitudes: ['M']      },
  { code: 'T13', name: 'さし替え', aptitudes: ['M']      },
  { code: 'T14', name: '組み合せ', aptitudes: ['F']      },
  { code: 'T15', name: '分解',     aptitudes: ['F']      },
]

export default function InputPage() {
  const router = useRouter()
  const [name,    setName]    = useState('')
  const [date,    setDate]    = useState(new Date().toISOString().slice(0, 10))
  const [age,     setAge]     = useState('')
  const [sex,     setSex]     = useState('')
  const [staff,   setStaff]   = useState('')
  const [version, setVersion] = useState('高校・一般用')
  const [raws,    setRaws]    = useState<Record<string, string>>(
    () => Object.fromEntries(TESTS.map((t) => [t.code, '']))
  )
  const [saving,      setSaving]      = useState(false)
  const [error,       setError]       = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  // Enter キーでのフォーム送信を抑止
  const blockEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  const handleClickScore = () => {
    setError('')
    if (!name.trim()) { setError('氏名を入力してください。'); return }
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    setShowConfirm(false)
    const INSTRUMENT = new Set(['T12', 'T13', 'T14', 'T15'])
    const result = calculate(
      { name: name.trim(), date, age, sex, staff, version },
      TESTS
        .filter((t) => !INSTRUMENT.has(t.code) || raws[t.code].trim() !== '')
        .map((t) => ({ ...t, rawScore: Number(raws[t.code]) || 0 }))
    )
    setSaving(true)
    try {
      const res = await fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      })
      if (!res.ok) throw new Error('保存に失敗しました')
      router.push('/result')
    } catch (err) {
      setError(String(err))
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'border border-gray-400 rounded px-2 py-1 text-right w-24 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
  const thCls    = 'border border-gray-400 px-3 py-2 text-sm font-bold text-gray-800 bg-gray-100'
  const tdCls    = 'border border-gray-300 px-3 py-1.5 text-sm text-gray-900'

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">GATB 粗点入力</h1>
          <a
            href="/history"
            className="text-sm border border-purple-400 rounded px-3 py-2 sm:px-4 sm:py-1.5 text-purple-700 font-medium hover:bg-purple-50 transition-colors"
          >
            📋 データ一覧
          </a>
        </div>

        <form onSubmit={(e) => e.preventDefault()} onKeyDown={blockEnter} className="space-y-6">
          {/* 基本情報 */}
          <section className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
            <h2 className="text-base font-bold mb-4 text-gray-800">基本情報</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: '氏名',   value: name,  set: setName,  type: 'text', required: true  },
                { label: '実施日', value: date,  set: setDate,  type: 'date', required: false },
                { label: '年齢',   value: age,   set: setAge,   type: 'text', required: false },
                { label: '担当者', value: staff, set: setStaff, type: 'text', required: false },

              ].map(({ label, value, set, type, required }) => (
                <label key={label} className="flex items-center gap-3">
                  <span className="w-16 text-right text-sm font-medium text-gray-700">{label}</span>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    required={required}
                    className="border border-gray-400 rounded px-3 py-1.5 flex-1 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  />
                </label>
              ))}
              <label className="flex items-center gap-3">
                <span className="w-16 text-right text-sm font-medium text-gray-700">性別</span>
                <input
                  type="text"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  placeholder="例：男性"
                  className="border border-gray-400 rounded px-3 py-1.5 flex-1 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
              </label>
              <label className="flex items-center gap-3">
                <span className="w-16 text-right text-sm font-medium text-gray-700">区分・版</span>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="例：高校・一般用"
                  className="border border-gray-400 rounded px-3 py-1.5 flex-1 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
              </label>
            </div>
          </section>

          {/* 筆記検査（T01〜T11） */}
          <section className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
            <h2 className="text-base font-bold mb-1 text-gray-800">筆記検査　粗点</h2>
            <p className="text-xs text-gray-500 mb-4">粗点を入力すると換算点・適性能得点・評価段階を自動計算します</p>
            <div className="overflow-x-auto">
              <table className="border-collapse w-full">
                <thead>
                  <tr>
                    <th className={`${thCls} w-8 text-center`}>No.</th>
                    <th className={`${thCls} text-left`}>検査名</th>
                    <th className={`${thCls} w-32 text-center`}>粗点</th>
                    <th className={`${thCls} text-left`}>関連適性能</th>
                  </tr>
                </thead>
                <tbody>
                  {TESTS.filter((t) => !['T12','T13','T14','T15'].includes(t.code)).map((t, i) => (
                    <tr key={t.code} className={i % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50'}>
                      <td className={`${tdCls} text-center text-gray-500`}>{i + 1}</td>
                      <td className={`${tdCls} font-medium`}>{t.name}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={raws[t.code]}
                          onChange={(e) => setRaws((prev) => ({ ...prev, [t.code]: e.target.value }))}
                          className={inputCls}
                          placeholder="0"
                        />
                      </td>
                      <td className={`${tdCls} text-blue-700 font-medium`}>
                        {t.aptitudes.join('・')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 器具検査（T12〜T15・任意） */}
          <section className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
            <h2 className="text-base font-bold mb-1 text-gray-800">器具検査　粗点 <span className="text-xs font-normal text-gray-400">（任意・空欄の場合は F・M を未算出）</span></h2>
            <div className="overflow-x-auto">
              <table className="border-collapse w-full">
                <thead>
                  <tr>
                    <th className={`${thCls} w-8 text-center`}>No.</th>
                    <th className={`${thCls} text-left`}>検査名</th>
                    <th className={`${thCls} w-32 text-center`}>粗点</th>
                    <th className={`${thCls} text-left`}>関連適性能</th>
                  </tr>
                </thead>
                <tbody>
                  {TESTS.filter((t) => ['T12','T13','T14','T15'].includes(t.code)).map((t, i) => (
                    <tr key={t.code} className={i % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50'}>
                      <td className={`${tdCls} text-center text-gray-500`}>{i + 12}</td>
                      <td className={`${tdCls} font-medium`}>{t.name}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={raws[t.code]}
                          onChange={(e) => setRaws((prev) => ({ ...prev, [t.code]: e.target.value }))}
                          className={inputCls}
                          placeholder="—"
                        />
                      </td>
                      <td className={`${tdCls} text-blue-700 font-medium`}>
                        {t.aptitudes.join('・')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pb-8">
            <button
              type="button"
              onClick={handleClickScore}
              disabled={saving}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 sm:py-2.5 rounded text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              {saving ? '計算・保存中...' : '計算して結果票を表示'}
            </button>
            <a
              href="/"
              className="w-full sm:w-auto text-center border border-gray-400 px-6 py-3 sm:py-2.5 rounded text-sm text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              キャンセル
            </a>
          </div>
        </form>

        {/* 確認モーダル */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl p-8 w-80 flex flex-col items-center gap-5">
              <p className="text-base font-bold text-gray-800">採点しますか？</p>
              <p className="text-sm text-gray-500 text-center">
                入力した粗点をもとに採点・計算を行い、結果票を表示します。
              </p>
              <div className="flex gap-4 w-full">
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  はい
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 border border-gray-400 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  いいえ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

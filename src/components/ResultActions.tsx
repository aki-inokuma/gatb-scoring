'use client'

import type { GatbResult } from '@/types/gatb'

interface Props {
  result: GatbResult
}

export default function ResultActions({ result }: Props) {
  const handlePdf = async () => {
    const el = document.getElementById('result-page')
    if (!el) return

    const btn = document.querySelector('[data-pdf-btn]') as HTMLButtonElement | null
    if (btn) { btn.textContent = '生成中…'; btn.disabled = true }

    try {
      const [{ toPng }, { default: jsPDF }] = await Promise.all([
        import('html-to-image'),
        import('jspdf'),
      ])

      const dataUrl = await toPng(el, { pixelRatio: 2, backgroundColor: '#ffffff' })

      const img = new Image()
      await new Promise<void>((res) => { img.onload = () => res(); img.src = dataUrl })

      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
      const pw = pdf.internal.pageSize.getWidth()
      const ph = pdf.internal.pageSize.getHeight()
      const imgW = img.naturalWidth / 2 * 0.2645
      const imgH = img.naturalHeight / 2 * 0.2645
      const ratio = Math.min(pw / imgW, ph / imgH)
      const w = imgW * ratio
      const h = imgH * ratio
      pdf.addImage(dataUrl, 'PNG', (pw - w) / 2, (ph - h) / 2, w, h)
      pdf.save(`GATB_${result.name}_${result.date}.pdf`)
    } finally {
      if (btn) { btn.textContent = '🖨 印刷／PDF'; btn.disabled = false }
    }
  }

  const handleSaveDb = async () => {
    const btn = document.querySelector('[data-db-btn]') as HTMLButtonElement | null
    if (btn) { btn.textContent = '保存中…'; btn.disabled = true }
    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      })
      if (res.ok) {
        if (btn) btn.textContent = '✅ 保存完了'
        setTimeout(() => { if (btn) { btn.textContent = '🗄 DB保存'; btn.disabled = false } }, 2000)
      } else {
        throw new Error()
      }
    } catch {
      if (btn) { btn.textContent = '❌ 失敗'; btn.disabled = false }
      setTimeout(() => { if (btn) btn.textContent = '🗄 DB保存' }, 2000)
    }
  }

  const handleDownload = () => {
    const json = JSON.stringify(result, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `GATB_${result.name}_${result.date}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="print:hidden flex gap-2">
      <a
        href="/input"
        className="text-[10px] border border-gray-300 rounded px-2 py-0.5 text-gray-600 hover:bg-gray-50"
      >
        データ入力
      </a>
      <a
        href="/history"
        className="text-[10px] border border-purple-300 rounded px-2 py-0.5 text-purple-600 hover:bg-purple-50"
      >
        📋 履歴
      </a>
      <button
        data-db-btn
        onClick={handleSaveDb}
        className="text-[10px] border border-indigo-300 rounded px-2 py-0.5 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
      >
        🗄 DB保存
      </button>
      <button
        onClick={handleDownload}
        className="text-[10px] border border-green-400 rounded px-2 py-0.5 text-green-700 hover:bg-green-50"
      >
        💾 JSON
      </button>
      <button
        data-pdf-btn
        onClick={handlePdf}
        className="text-[10px] border border-blue-300 rounded px-2 py-0.5 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
      >
        🖨 PDF
      </button>
    </div>
  )
}

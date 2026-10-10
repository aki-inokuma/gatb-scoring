'use client'

import type { GatbResult } from '@/types/gatb'

interface Props {
  result: GatbResult
}

export default function HistoryActions({ result }: Props) {
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
      if (btn) { btn.textContent = '🖨 PDF'; btn.disabled = false }
    }
  }

  return (
    <div className="print:hidden flex gap-2 items-center">
      <a
        href="/history"
        className="text-[10px] border border-gray-300 rounded px-2 py-0.5 text-gray-600 hover:bg-gray-50"
      >
        ← 一覧
      </a>
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

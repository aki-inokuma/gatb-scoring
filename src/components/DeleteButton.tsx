'use client'

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (!confirm('このデータを削除しますか？')) return
    await fetch(`/api/results/${id}`, { method: 'DELETE' })
    window.location.reload()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs border border-red-200 rounded px-2 py-0.5 text-red-500 hover:bg-red-50"
    >
      削除
    </button>
  )
}

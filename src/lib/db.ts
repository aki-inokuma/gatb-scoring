import { Redis } from '@upstash/redis'
import type { GatbResult } from '@/types/gatb'

const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export interface SavedResult {
  id: string
  savedAt: string
  result: GatbResult
}

const INDEX_KEY = 'gatb:index'

export async function getAllResults(): Promise<SavedResult[]> {
  const ids = await kv.lrange<string>(INDEX_KEY, 0, -1)
  if (!ids || ids.length === 0) return []
  const entries = await Promise.all(ids.map((id) => kv.get<SavedResult>(`gatb:result:${id}`)))
  return entries.filter((e): e is SavedResult => e !== null).sort((a, b) => b.savedAt.localeCompare(a.savedAt))
}

export async function saveResult(result: GatbResult): Promise<SavedResult> {
  const entry: SavedResult = {
    id: Date.now().toString(),
    savedAt: new Date().toISOString(),
    result,
  }
  await kv.set(`gatb:result:${entry.id}`, entry)
  await kv.lpush(INDEX_KEY, entry.id)
  return entry
}

export async function getResultById(id: string): Promise<SavedResult | null> {
  return await kv.get<SavedResult>(`gatb:result:${id}`)
}

export async function deleteResult(id: string): Promise<void> {
  await kv.del(`gatb:result:${id}`)
  await kv.lrem(INDEX_KEY, 0, id)
}

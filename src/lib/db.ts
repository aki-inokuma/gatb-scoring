import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import type { GatbResult } from '@/types/gatb'

export interface SavedResult {
  id: string
  savedAt: string
  result: GatbResult
}

const DB_PATH = path.join(process.cwd(), 'data', 'results.json')

async function readDb(): Promise<SavedResult[]> {
  try {
    const raw = await readFile(DB_PATH, 'utf-8')
    return JSON.parse(raw) as SavedResult[]
  } catch {
    return []
  }
}

async function writeDb(data: SavedResult[]): Promise<void> {
  await mkdir(path.dirname(DB_PATH), { recursive: true })
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function getAllResults(): Promise<SavedResult[]> {
  const data = await readDb()
  return data.sort((a, b) => b.savedAt.localeCompare(a.savedAt))
}

export async function saveResult(result: GatbResult): Promise<SavedResult> {
  const data = await readDb()
  const entry: SavedResult = {
    id: Date.now().toString(),
    savedAt: new Date().toISOString(),
    result,
  }
  data.push(entry)
  await writeDb(data)
  return entry
}

export async function getResultById(id: string): Promise<SavedResult | null> {
  const data = await readDb()
  return data.find((e) => e.id === id) ?? null
}

export async function deleteResult(id: string): Promise<void> {
  const data = await readDb()
  await writeDb(data.filter((e) => e.id !== id))
}

import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'public', 'data', 'result.json')

export async function GET() {
  try {
    const raw = await readFile(DATA_PATH, 'utf-8')
    const data = JSON.parse(raw)
    if (!data.name) {
      return NextResponse.json({ error: 'no_data' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'no_data' }, { status: 404 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await writeFile(DATA_PATH, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

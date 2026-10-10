import { NextRequest, NextResponse } from 'next/server'
import { getAllResults, saveResult } from '@/lib/db'
import type { GatbResult } from '@/types/gatb'

export async function GET() {
  const results = await getAllResults()
  return NextResponse.json(results)
}

export async function POST(req: NextRequest) {
  const result = (await req.json()) as GatbResult
  const entry = await saveResult(result)
  return NextResponse.json(entry, { status: 201 })
}

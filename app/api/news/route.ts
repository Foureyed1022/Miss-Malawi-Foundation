import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "news.json")

export async function GET() {
  const raw = await fs.readFile(DATA_PATH, "utf8")
  return NextResponse.json(JSON.parse(raw))
}

export async function PUT(request: Request) {
  const body = await request.json()
  await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf8")
  return NextResponse.json({ ok: true })
}


import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "team.json")

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8")
    return NextResponse.json(JSON.parse(raw))
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf8")
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save team data" }, { status: 500 })
  }
}

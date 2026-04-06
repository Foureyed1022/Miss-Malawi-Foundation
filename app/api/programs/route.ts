import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "data", "programs.json")

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8")
    return NextResponse.json(JSON.parse(raw))
  } catch (error) {
    return NextResponse.json({ error: "Failed to load programs" }, { status: 500 })
  }
}

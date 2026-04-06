"use server"

import { NextResponse } from "next/server"

type TrackEventPayload = {
  name: string
  source?: string
  path?: string
  metadata?: Record<string, unknown>
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TrackEventPayload

    // For now we just log incoming events.
    // In production you would persist this to a database or send it to an analytics service.
    console.log("[analytics] event", {
      ...body,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[analytics] error parsing event", error)
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}


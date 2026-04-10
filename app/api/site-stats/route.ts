import { NextRequest, NextResponse } from 'next/server'
import { initAdmin } from '@/lib/firebase-admin'
import * as admin from 'firebase-admin'

const DEFAULT_STATS = {
  contestants: 0,
  queensCrowned: 0,
  yearsOfLegacy: 0,
  livesImpacted: 0,
}

function getDb() {
  initAdmin()
  return admin.firestore()
}

// GET /api/site-stats — public, no auth required
export async function GET() {
  try {
    const db = getDb()
    const snap = await db.collection('settings').doc('site_stats').get()

    if (!snap.exists) {
      // Seed with defaults on first access
      await db.collection('settings').doc('site_stats').set({
        ...DEFAULT_STATS,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      return NextResponse.json(DEFAULT_STATS)
    }

    const data = snap.data()!
    return NextResponse.json({
      contestants: data.contestants ?? DEFAULT_STATS.contestants,
      queensCrowned: data.queensCrowned ?? DEFAULT_STATS.queensCrowned,
      yearsOfLegacy: data.yearsOfLegacy ?? DEFAULT_STATS.yearsOfLegacy,
      livesImpacted: data.livesImpacted ?? DEFAULT_STATS.livesImpacted,
    })
  } catch (error) {
    console.error('Error fetching site stats:', error)
    return NextResponse.json(DEFAULT_STATS)
  }
}

// POST /api/site-stats — requires Firebase auth token
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify the token
    initAdmin()
    const token = authHeader.split('Bearer ')[1]
    await admin.auth().verifyIdToken(token)

    const body = await req.json()
    const { contestants, queensCrowned, yearsOfLegacy, livesImpacted } = body

    // Validate all values are non-negative numbers
    const toNum = (v: unknown) => {
      const n = Number(v)
      return isNaN(n) || n < 0 ? 0 : n
    }

    const db = getDb()
    await db.collection('settings').doc('site_stats').set(
      {
        contestants: toNum(contestants),
        queensCrowned: toNum(queensCrowned),
        yearsOfLegacy: toNum(yearsOfLegacy),
        livesImpacted: toNum(livesImpacted),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating site stats:', error)
    return NextResponse.json({ error: 'Failed to update statistics' }, { status: 500 })
  }
}

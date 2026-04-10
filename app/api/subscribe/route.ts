import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import * as admin from "firebase-admin"

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!adminDb) {
      console.error("Firebase Admin DB not initialized. Check your environment variables.")
      return NextResponse.json({ error: "Subscription service unavailable. Admin configuration missing." }, { status: 503 })
    }

    const subscribersRef = adminDb.collection('subscribers')
    
    // Check if duplicate
    const snapshot = await subscribersRef.where('email', '==', email).get()
    
    if (!snapshot.empty) {
      return NextResponse.json({ ok: true, message: "Already subscribed" })
    }

    await subscribersRef.add({
      email,
      source: source || "unknown",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error("Subscription API Error:", error)
    return NextResponse.json({ 
      error: error.message || "Internal server error",
      stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
    }, { status: 500 })
  }
}

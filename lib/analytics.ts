export type AnalyticsEventName =
  | "page_view"
  | "donation_completed"
  | "pageant_registration_completed"
  | "newsletter_subscribed"

type TrackOptions = {
  name: AnalyticsEventName
  source?: string
  path?: string
  metadata?: Record<string, unknown>
}

export async function trackEvent({ name, source, path, metadata }: TrackOptions) {
  if (typeof window === "undefined") return

  try {
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        source,
        path: path ?? window.location.pathname,
        metadata,
      }),
      keepalive: true,
    })
  } catch {
    // Ignore tracking failures – they should never break the UX
  }
}


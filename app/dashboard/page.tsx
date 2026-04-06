"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, HeartHandshake, Newspaper, Mail } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts"

const trafficData = [
  { label: "Mon", visits: 320 },
  { label: "Tue", visits: 410 },
  { label: "Wed", visits: 380 },
  { label: "Thu", visits: 520 },
  { label: "Fri", visits: 610 },
  { label: "Sat", visits: 450 },
  { label: "Sun", visits: 390 },
]

const donationsData = [
  { label: "Jan", amount: 1200 },
  { label: "Feb", amount: 1750 },
  { label: "Mar", amount: 1420 },
  { label: "Apr", amount: 2100 },
  { label: "May", amount: 1840 },
  { label: "Jun", amount: 2300 },
]

const recentActivity = [
  { type: "Donation", description: "New donation via website", meta: "MWK 150,000", time: "Just now" },
  { type: "Registration", description: "Pageant registration submitted", meta: "Blantyre region", time: "12 min ago" },
  { type: "Newsletter", description: "New subscriber joined mailing list", meta: "Homepage form", time: "35 min ago" },
  { type: "Event", description: "User viewed Events page", meta: "Miss Malawi Auditions", time: "1 hr ago" },
]

type GalleryItem = { id: number; title: string; src: string }
type GalleryData = {
  events: GalleryItem[]
  queens: GalleryItem[]
  programs: GalleryItem[]
  international: GalleryItem[]
}

type FeaturedArticle = {
  image: string
  title: string
  date: string
  author: string
  paragraphs: string[]
}

type NewsArticle = {
  id: number
  image: string
  title: string
  excerpt: string
  date: string
  author: string
}

type NewsData = {
  featured: FeaturedArticle
  articles: NewsArticle[]
}

export default function DashboardPage() {
  const [gallery, setGallery] = useState<GalleryData | null>(null)
  const [news, setNews] = useState<NewsData | null>(null)
  const [isSavingGallery, setIsSavingGallery] = useState(false)
  const [isSavingNews, setIsSavingNews] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [gRes, nRes] = await Promise.all([fetch("/api/gallery"), fetch("/api/news")])
      setGallery((await gRes.json()) as GalleryData)
      setNews((await nRes.json()) as NewsData)
    }
    load()
  }, [])

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224]">Foundation Dashboard</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            High-level view of how visitors are engaging with the Miss Malawi Foundation website, programs, and campaigns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Site Visits"
          value="3,280"
          change="+14.2% vs last week"
          icon={<Users className="h-5 w-5 text-purple" />}
        />
        <StatCard
          title="Donations Tracked"
          value="87"
          change="+9 this month"
          icon={<HeartHandshake className="h-5 w-5 text-purple" />}
        />
        <StatCard
          title="Pageant Registrations"
          value="132"
          change="+23 this week"
          icon={<Newspaper className="h-5 w-5 text-purple" />}
        />
        <StatCard
          title="Newsletter Subscribers"
          value="1,945"
          change="+102 this month"
          icon={<Mail className="h-5 w-5 text-purple" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Website Traffic (Last 7 days)</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Page views across the entire site</p>
            </div>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#d4af37"
                  strokeWidth={2.4}
                  dot={{ r: 3, strokeWidth: 1.5, stroke: "#111827", fill: "#fef3c7" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <p className="text-sm text-gray-500">Latest interactions from visitors and participants.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.meta}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Donations by Month</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Mock data you can later replace with live figures.</p>
            </div>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="amount" fill="#111827" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">What this dashboard can track</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>
              This dashboard is wired with <span className="font-medium text-gray-900">mock data</span> for now so you can see
              the layout and design. To track real activity, we can connect it to:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Donation events from the <code>/donate</code> flow</li>
              <li>Pageant registrations from <code>/pageant/register</code></li>
              <li>Newsletter signups from the homepage form</li>
              <li>Page views across key pages like Events, Programs, and News</li>
            </ul>
            <p>
              Next steps would be adding a small tracking API (e.g. <code>/api/track</code>) and storing events in a database or
              analytics service, then feeding those live numbers into the charts above.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Content Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <section className="space-y-3">
              <h3 className="font-semibold text-gray-900">Gallery (Events)</h3>
              {!gallery ? (
                <p className="text-sm text-gray-500">Loading gallery…</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Edit titles for event photos. Changes update the public gallery immediately.
                  </p>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {gallery.events.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-10">#{item.id}</span>
                        <input
                          className="flex-1 rounded-md border border-gray-200 px-2 py-1 text-sm"
                          value={item.title}
                          onChange={(e) => {
                            const updated = { ...gallery }
                            updated.events[index] = { ...item, title: e.target.value }
                            setGallery(updated)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!gallery) return
                      setIsSavingGallery(true)
                      await fetch("/api/gallery", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(gallery),
                      })
                      setIsSavingGallery(false)
                    }}
                    className="inline-flex items-center rounded-md bg-[#212224] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#111827]"
                  >
                    {isSavingGallery ? "Saving…" : "Save Gallery Titles"}
                  </button>
                </div>
              )}
            </section>

            <section className="space-y-3">
              <h3 className="font-semibold text-gray-900">News Articles</h3>
              {!news ? (
                <p className="text-sm text-gray-500">Loading news…</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Update headlines and excerpts for the main news list and recent posts.
                  </p>
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {news.articles.map((article, index) => (
                      <div key={article.id} className="space-y-1 border-b border-gray-100 pb-2">
                        <input
                          className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm font-medium"
                          value={article.title}
                          onChange={(e) => {
                            const updated = { ...news }
                            updated.articles[index] = { ...article, title: e.target.value }
                            setNews(updated)
                          }}
                        />
                        <textarea
                          className="w-full rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-700"
                          rows={3}
                          value={article.excerpt}
                          onChange={(e) => {
                            const updated = { ...news }
                            updated.articles[index] = { ...article, excerpt: e.target.value }
                            setNews(updated)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!news) return
                      setIsSavingNews(true)
                      await fetch("/api/news", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(news),
                      })
                      setIsSavingNews(false)
                    }}
                    className="inline-flex items-center rounded-md bg-[#212224] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#111827]"
                  >
                    {isSavingNews ? "Saving…" : "Save News Content"}
                  </button>
                </div>
              )}
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="rounded-full bg-[#212224]/5 p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between mt-1">
          <div className="text-2xl font-semibold text-[#212224]">{value}</div>
          <div className="flex items-center text-xs text-emerald-600">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Image as ImageIcon, 
  Users, 
  Share2, 
  LayoutDashboard, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Calendar,
  FileText,
  BadgeDollarSign,
  Target,
  Crown,
  FolderOpen,
  ClipboardList,
  MessageSquare
} from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/programs", label: "Programs", icon: FolderOpen },
  { href: "/dashboard/pageant", label: "Pageant", icon: Crown },
  { href: "/dashboard/events", label: "Events", icon: Calendar },
  { href: "/dashboard/news", label: "News & Blog", icon: FileText },
  { href: "/dashboard/social", label: "Social Media", icon: Share2 },
  { href: "/dashboard/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/finances", label: "Finances", icon: BadgeDollarSign },
  { href: "/dashboard/strategy", label: "Strategy", icon: Target },
  { href: "/dashboard/applicants", label: "Applicants", icon: ClipboardList },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex flex-col border-r bg-white transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!isSidebarCollapsed && <span className="font-playfair font-bold text-xl text-emerald-800">Admin Panel</span>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="ml-auto"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-emerald-800 text-white" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <Link href="/">
            <div className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors`}>
              <LogOut className="h-5 w-5" />
              {!isSidebarCollapsed && <span>View Website</span>}
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden flex h-16 items-center border-b bg-white px-4 justify-between sticky top-0 z-30">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <div className="flex h-16 items-center px-6 border-b">
                <span className="font-playfair font-bold text-xl text-emerald-800">Admin Panel</span>
              </div>
              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive 
                          ? "bg-emerald-800 text-white" 
                          : "text-gray-600 hover:bg-gray-100"
                      }`}>
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <span className="font-playfair font-bold text-xl text-emerald-800">Miss Malawi</span>
          <div className="w-10"></div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

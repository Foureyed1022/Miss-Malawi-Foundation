"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ChevronDown, ChevronRight, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Replace the entire Header component with this updated version
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hide header entirely on dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Miss Malawi Logo"
              width={56}
              height={18}
              className={`h-auto ${isScrolled ? "text-[#212224]" : "text-white"}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/" label="Home" isScrolled={isScrolled} />
            <NavLink href="/events" label="Events" isScrolled={isScrolled} />

            {/* About Dropdown */}
            <DesktopDropdown
              label="About"
              isScrolled={isScrolled}
              items={[
                { href: "/about", label: "About Us" },
                { href: "/timeline", label: "Timeline" },
                { href: "/strategy", label: "Strategy" },
              ]}
            />

            {/* Programs Dropdown */}
            <DesktopDropdown
              label="Programs"
              isScrolled={isScrolled}
              items={[{ href: "/programs", label: "Our Programs" }]}
            />

            {/* Pageant Dropdown */}
            <DesktopDropdown
              label="Pageant"
              isScrolled={isScrolled}
              items={[
                { href: "/pageant", label: "Pageant Info" },
                { href: "/pageant/register", label: "Registration" },
              ]}
            />

            {/* Media Dropdown */}
            <DesktopDropdown
              label="Media"
              isScrolled={isScrolled}
              items={[
                { href: "/gallery", label: "Gallery" },
                { href: "/news", label: "News & Blog" },
              ]}
            />

            <NavLink href="/contact" label="Contact" isScrolled={isScrolled} />
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? "text-[#212224] hover:bg-gray-100" : "text-white hover:bg-white/10"}
                aria-label="Dashboard"
              >
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/donate">
              <Button className="bg-purple hover:bg-purple/90 text-black">Donate</Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${isScrolled ? "text-[#212224]" : "text-white"}`}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <Image 
                    src="/logo.png" 
                    alt="Miss Malawi Logo"
                    width={64}
                    height={22}
                    className="h-auto"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col py-6">
                  <MobileNavLink href="/" label="Home" setIsOpen={setIsMobileMenuOpen} />
                  <MobileNavLink href="/events" label="Events" setIsOpen={setIsMobileMenuOpen} />
                  <MobileNavLink href="/dashboard" label="Dashboard" setIsOpen={setIsMobileMenuOpen} />

                  {/* Mobile Dropdowns */}
                  <MobileDropdown
                    label="About"
                    isActive={activeDropdown === "about"}
                    setActive={() => setActiveDropdown(activeDropdown === "about" ? null : "about")}
                    items={[
                      { href: "/about", label: "About Us", setIsOpen: setIsMobileMenuOpen },
                      { href: "/timeline", label: "Timeline", setIsOpen: setIsMobileMenuOpen },
                      { href: "/strategy", label: "Strategy", setIsOpen: setIsMobileMenuOpen },
                    ]}
                  />

                  <MobileDropdown
                    label="Programs"
                    isActive={activeDropdown === "programs"}
                    setActive={() => setActiveDropdown(activeDropdown === "programs" ? null : "programs")}
                    items={[{ href: "/programs", label: "Our Programs", setIsOpen: setIsMobileMenuOpen }]}
                  />

                  <MobileDropdown
                    label="Pageant"
                    isActive={activeDropdown === "pageant"}
                    setActive={() => setActiveDropdown(activeDropdown === "pageant" ? null : "pageant")}
                    items={[
                      { href: "/pageant", label: "Pageant Info", setIsOpen: setIsMobileMenuOpen },
                      { href: "/pageant/register", label: "Registration", setIsOpen: setIsMobileMenuOpen },
                    ]}
                  />

                  <MobileDropdown
                    label="Media"
                    isActive={activeDropdown === "media"}
                    setActive={() => setActiveDropdown(activeDropdown === "media" ? null : "media")}
                    items={[
                      { href: "/gallery", label: "Gallery", setIsOpen: setIsMobileMenuOpen },
                      { href: "/news", label: "News & Blog", setIsOpen: setIsMobileMenuOpen },
                    ]}
                  />

                  <MobileNavLink href="/contact" label="Contact" setIsOpen={setIsMobileMenuOpen} />
                </nav>
                <div className="mt-auto py-6 border-t">
                  <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-purple hover:bg-purple/90 text-black">Donate</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  label: string
  isScrolled: boolean
}

function NavLink({ href, label, isScrolled }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`font-medium hover:text-purple transition-colors ${isScrolled ? "text-gray-800" : "text-white"}`}
    >
      {label}
    </Link>
  )
}

interface DesktopDropdownProps {
  label: string
  isScrolled: boolean
  items: { href: string; label: string }[]
}

function DesktopDropdown({ label, isScrolled, items }: DesktopDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center font-medium hover:text-purple transition-colors ${isScrolled ? "text-gray-800" : "text-white"}`}
        >
          {label} <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className="w-full cursor-pointer">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface MobileNavLinkProps {
  href: string
  label: string
  setIsOpen: (isOpen: boolean) => void
}

function MobileNavLink({ href, label, setIsOpen }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-gray-800 hover:text-purple transition-colors py-3 px-4"
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  )
}

interface MobileDropdownProps {
  label: string
  isActive: boolean
  setActive: () => void
  items: { href: string; label: string; setIsOpen: (isOpen: boolean) => void }[]
}

function MobileDropdown({ label, isActive, setActive, items }: MobileDropdownProps) {
  return (
    <div className="border-b border-gray-100">
      <button
        className="flex items-center justify-between w-full text-lg font-medium text-gray-800 hover:text-purple transition-colors py-3 px-4"
        onClick={setActive}
      >
        {label}
        {isActive ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>

      {isActive && (
        <div className="pl-4 pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-gray-700 hover:text-purple py-2 px-4 text-base"
              onClick={() => item.setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  const pathname = usePathname()
  
  // Hide footer on dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  return (
    <footer className="bg-[#212224] text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Image 
              src="/logo.png" 
              alt="Miss Malawi Logo"
              width={100}
              height={32}
              className="h-auto mb-6"
            />
            <p className="text-white/80 mb-6 leading-relaxed max-w-sm">
              Empowering young Malawian women through beauty, intelligence, and advocacy since 1968. Our mission is to promote cultural heritage and social impact throughout the Warm Heart of Africa.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Navigation</h4>
            <ul className="grid grid-cols-1 gap-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-white/80 hover:text-purple transition-colors">
                  Programs & Projects
                </Link>
              </li>
              <li>
                <Link href="/pageant" className="text-white/80 hover:text-purple transition-colors">
                  Pageant Information
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/80 hover:text-purple transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/80 hover:text-purple transition-colors">
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-purple transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Contact Details</h4>
            <address className="not-italic text-white/80 space-y-4 mb-8">
              <p>HewKam House, Area 43, Plot 43/1314</p>
              <p>Miss Malawi, P.O Box 143</p>
              <p>Capital City, Malawi</p>
              <div className="pt-2">
                <p>Phone: +265 996 263 843 / +265 882 922 062</p>
                <p>Email: info@missmw.org</p>
              </div>
            </address>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Youtube className="h-5 w-5" />} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Miss Malawi Foundation. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple hover:text-black transition-colors"
    >
      {icon}
    </Link>
  )
}

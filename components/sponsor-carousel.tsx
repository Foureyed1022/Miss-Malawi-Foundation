"use client"

import Image from "next/image"
import Link from "next/link"

interface Sponsor {
  id: number
  name: string
  logo: string
  website: string
  tier?: string
}

interface SponsorCarouselProps {
  sponsors: Sponsor[]
  height?: string
  logoWidth?: number
  logoHeight?: number
  interval?: number
}

export default function SponsorCarousel({
  sponsors,
  height = "h-24",
  logoWidth = 120,
  logoHeight = 60,
  interval = 40000,
}: SponsorCarouselProps) {
  if (sponsors.length === 0) return null

  return (
    <div className="relative flex overflow-hidden w-full group">
      <div 
        className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
        style={{ animationDuration: `${interval}ms` }}
      >
        {sponsors.map((sponsor, index) => (
          <Link
            key={`${sponsor.id}-${index}`}
            href={sponsor.website || "#"}
            target={sponsor.website ? "_blank" : undefined}
            rel={sponsor.website ? "noopener noreferrer" : undefined}
            className={`flex-shrink-0 bg-white rounded-lg shadow-sm flex items-center justify-center ${height} px-8 hover:shadow-md transition-shadow duration-300`}
            style={{ width: `${logoWidth + 64}px` }}
          >
            <Image
              src={sponsor.logo || "/placeholder-logo.svg"}
              alt={sponsor.name}
              width={logoWidth}
              height={logoHeight}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 object-contain w-auto h-auto max-h-full"
            />
          </Link>
        ))}
      </div>
      
      <div 
        className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
        aria-hidden="true"
        style={{ animationDuration: `${interval}ms` }}
      >
        {sponsors.map((sponsor, index) => (
          <Link
            key={`duplicate-${sponsor.id}-${index}`}
            href={sponsor.website || "#"}
            target={sponsor.website ? "_blank" : undefined}
            rel={sponsor.website ? "noopener noreferrer" : undefined}
            className={`flex-shrink-0 bg-white rounded-lg shadow-sm flex items-center justify-center ${height} px-8 hover:shadow-md transition-shadow duration-300`}
            style={{ width: `${logoWidth + 64}px` }}
          >
            <Image
              src={sponsor.logo || "/placeholder-logo.svg"}
              alt={sponsor.name}
              width={logoWidth}
              height={logoHeight}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 object-contain w-auto h-auto max-h-full"
            />
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}


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

}: SponsorCarouselProps) {
  if (sponsors.length === 0) return null

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-wrap justify-center items-center gap-6 px-4 py-2">
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
    </div>
  )
}


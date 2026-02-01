import PageHeader from "@/components/page-header";

export default function EventsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Miss Malawi 2026 Calendar of Events" description="Draft calendar for Miss Malawi 2026 programme" />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-playfair text-2xl font-bold text-emerald-800 mb-6">DRAFT CALENDAR OF EVENTS</h2>
            <p className="mb-8 text-gray-700">March – December 2026</p>

            <div className="space-y-10">
              {/* March 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">MARCH 2026 – PROGRAMME LAUNCH & RECRUITMENT</h3>
                <p className="font-semibold mt-2">Theme: Launch & Awareness</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Official announcement of Miss Malawi 2026</li>
                  <li>Call for applications (national press + digital launch)</li>
                  <li>Media briefings and social media campaign</li>
                  <li>Opening of online and physical application submissions</li>
                </ul>
              </div>

              {/* April 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">APRIL 2026 – AUDITIONS & REGIONAL SELECTIONS</h3>
                <p className="font-semibold mt-2">Theme: Discovering Malawi's Queens</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Regional auditions:
                    <ul className="ml-5 mt-2 space-y-1 list-circle">
                      <li>Northern Region</li>
                      <li>Central Region</li>
                      <li>Southern Region</li>
                    </ul>
                  </li>
                  <li>Judges' selection process</li>
                  <li>Announcement of Top Contestants</li>
                  <li>Media reveal of selected</li>
                </ul>
              </div>

              {/* June 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">JUNE 2026 – TRAINING & CAPACITY BUILDING</h3>
                <p className="font-semibold mt-2">Theme: Building Confident Leaders</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Online training series to be facilitated by Miss Malawi Secretary</li>
                </ul>
              </div>

              {/* July 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">JULY 2026 – ADVOCACY & COMMUNITY ENGAGEMENT</h3>
                <p className="font-semibold mt-2">Theme: Beauty with Purpose</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Launch of individual advocacy projects</li>
                  <li>Community outreach activities:
                    <ul className="ml-5 mt-2 space-y-1 list-circle">
                      <li>Girls' education</li>
                      <li>Women's empowerment</li>
                      <li>Youth development</li>
                    </ul>
                  </li>
                  <li>Partner and sponsor activations</li>
                  <li>Ongoing media engagements</li>
                  <li>Thandi Departure for Miss Supranational on 13th-31st July 2026</li>
                </ul>
              </div>

              {/* August 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">AUGUST 2026 – BRANDING, TOURISM & VISIBILITY</h3>
                <p className="font-semibold mt-2">Theme: Showcasing Malawi</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Cultural heritage and tourism shoots</li>
                  <li>Fashion and lifestyle photo shoots</li>
                  <li>Sponsor-branded activations</li>
                  <li>Content creation for digital platforms</li>
                </ul>
              </div>

              {/* September 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">SEPTEMBER 2026 – MEDIA & PUBLIC ENGAGEMENT</h3>
                <p className="font-semibold mt-2">Theme: National Spotlight</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Radio and television appearances</li>
                  <li>Public debates and panel discussions</li>
                  <li>Youth forums and campus tours</li>
                  <li>Mid-journey evaluation of contestants</li>
                  <li>Public voting (if applicable)</li>
                </ul>
              </div>

              {/* October 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">OCTOBER 2026 – PRE-FINALE PREPARATIONS</h3>
                <p className="font-semibold mt-2">Theme: Excellence & Refinement</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Intensive rehearsals</li>
                  <li>Runway and stage performance training</li>
                  <li>Final wardrobe fittings</li>
                  <li>Advocacy impact presentations</li>
                  <li>Public voting opens</li>
                  <li>Ticket sales open</li>
                </ul>
              </div>

              {/* November 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">NOVEMBER 2026 – COUNTDOWN TO THE CROWN</h3>
                <p className="font-semibold mt-2">Theme: The Road to the Crown</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Official Top Finalists Announcement</li>
                  <li>National press conference</li>
                  <li>Final sponsor engagements</li>
                  <li>Dress rehearsals and technical run-throughs</li>
                  <li>Community farewell engagements</li>
                </ul>
              </div>

              {/* December 2026 */}
              <div className="border-l-4 border-gold pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">DECEMBER 2026 – GRAND FINALE & CORONATION</h3>
                <p className="font-semibold mt-2">5 DECEMBER 2026 – MISS MALAWI GRAND FINALE</p>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Final judging rounds</li>
                  <li>Cultural showcase</li>
                  <li>Evening gown and final question</li>
                  <li>Crowning of Miss Malawi 2026</li>
                  <li>Awards and sponsor recognitions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
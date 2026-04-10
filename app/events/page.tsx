import PageHeader from "@/components/page-header"

export default function EventsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Miss Malawi 2026 Calendar of Events" description="Official calendar for Miss Malawi 2026 programme" />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-playfair text-2xl font-bold text-emerald-800 mb-6 uppercase">
              Miss Malawi 2026 Official Calendar
            </h2>

            <div className="space-y-10">
              {/* JUNE 2026 */}
              <div className="border-l-4 border-purple pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">JUNE 2026</h3>
                <ul className="mt-3 space-y-3 list-none text-gray-700">
                  <li>
                    <span className="font-bold text-purple">Mid June</span> — Regional Auditions Begin
                    <p className="text-sm mt-1 ml-4 italic">
                      Auditions across Malawi: Lilongwe, Blantyre, Mzuzu, Zomba, and other regional centres.
                    </p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">Late June</span> — Regional Auditions Continue
                    <p className="text-sm mt-1 ml-4 italic">
                      Second round of regional auditions with content and behind-the-scenes coverage.
                    </p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">Late June</span> — National Finalists Announced
                    <p className="text-sm mt-1 ml-4 italic">
                      Top finalists selected and publicly announced via press conference and social media.
                    </p>
                  </li>
                </ul>
              </div>

              {/* JULY 2026 */}
              <div className="border-l-4 border-purple pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">JULY 2026</h3>
                <ul className="mt-3 space-y-3 list-none text-gray-700">
                  <li>
                    <span className="font-bold text-purple">Early July</span> — Pre-Departure Preparation for Thandi
                    <p className="text-sm mt-1 ml-4 italic">
                      Final preparation, protocol briefings, wardrobe, and media coverage before departure.
                    </p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">Mid July</span> — Announcement of Miss Malawi 2026 Top 30
                  </li>
                  <li>
                    <span className="font-bold text-purple">Late July</span> — Thandi Departs for Miss Supranational
                    <p className="text-sm mt-1 ml-4 italic">Miss Malawi 2025 titleholder Thandi departs to represent Malawi.</p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">Late July</span> — Thandi at Miss Supranational
                    <p className="text-sm mt-1 ml-4 italic">Malawi represented on the global stage.</p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">Late July</span> — Finalists Training Programme Begins
                    <p className="text-sm mt-1 ml-4 italic">Structured development programme for all 2026 finalists.</p>
                  </li>
                </ul>
              </div>

              {/* AUGUST 2026 */}
              <div className="border-l-4 border-purple pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">AUGUST 2026</h3>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Finalists Training: Month 1 (Public speaking, leadership, civic engagement, wellness)</li>
                  <li>Opening of Voting Lines (Fan favourite voting opens at MWK 2,000.00)</li>
                  <li>Opening of Ticket Sales for Preliminary Event</li>
                  <li>Behind-the-Scenes Content Rollout (Weekly documentary and social media content)</li>
                  <li>Community Outreach by Finalists (Finalists conduct community service and advocacy visits)</li>
                </ul>
              </div>

              {/* SEPTEMBER 2026 */}
              <div className="border-l-4 border-purple pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">SEPTEMBER 2026</h3>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>
                    Miss Malawi Masterclass Series
                    <p className="text-sm mt-1 ml-4 italic">
                      Multi-day masterclass covering career, business, media presence, mental health, and empowerment.
                    </p>
                  </li>
                  <li>
                    Guest Speaker Series
                    <p className="text-sm mt-1 ml-4 italic">Prominent Malawian women leaders mentor finalists.</p>
                  </li>
                  <li>
                    Preliminary Event
                    <p className="text-sm mt-1 ml-4 italic">
                      In-house event streamed online with a small audience of about 100 people.
                    </p>
                  </li>
                </ul>
              </div>

              {/* OCTOBER 2026 */}
              <div className="border-l-4 border-purple pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">OCTOBER 2026</h3>
                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                  <li>Finalists Final Preparations (Styling, choreography, rehearsals, and programme development)</li>
                  <li>Ticket Sales Open for Grand Finale</li>
                  <li>Voting Opens for Fan Favourite Top 5</li>
                  <li>Masterclass with Alice Rowlands Musukwa</li>
                  <li>Sponsor Activations (Corporate sponsor events, branded content, and photoshoots)</li>
                </ul>
              </div>

              {/* NOVEMBER 2026 */}
              <div className="border-l-4 border-purple pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">NOVEMBER 2026</h3>
                <ul className="mt-3 space-y-3 list-none text-gray-700">
                  <li>
                    <span className="font-bold text-purple">Early November</span> — Final Styling Sessions
                    <p className="text-sm mt-1 ml-4 italic">Wardrobe checks and finalisation of vendor payments.</p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">Mid November</span> — Miss Malawi Intensive Bootcamp
                    <p className="text-sm mt-1 ml-4 italic">
                      Residential bootcamp on performance, talent, catwalk, speech, and confidence.
                    </p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">Last Week November</span> — Grand Finale Rehearsals Begin
                    <p className="text-sm mt-1 ml-4 italic">Full production rehearsals at Griffin Sayenda.</p>
                  </li>
                </ul>
              </div>

              {/* DECEMBER 2026 */}
              <div className="border-l-4 border-purple pl-6 py-2">
                <h3 className="font-playfair text-xl font-bold text-emerald-800">DECEMBER 2026</h3>
                <ul className="mt-3 space-y-3 list-none text-gray-700">
                  <li>
                    <span className="font-bold text-purple">Early December</span> — Final Dress Rehearsals
                    <p className="text-sm mt-1 ml-4 italic">Lighting, sound, staging, and full run-throughs.</p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">December</span> — MISS MALAWI 2026 GRAND FINALE
                    <p className="text-sm mt-1 ml-4 italic">Griffin Sayenda, Blantyre — Black tie, national broadcast.</p>
                  </li>
                  <li>
                    <span className="font-bold text-purple">Post December</span> — Annual Report to Board & Sponsors
                    <p className="text-sm mt-1 ml-4 italic">Financial reconciliation and 2027 planning.</p>
                  </li>
                </ul>
              </div>

              {/* KEY DATES */}
              <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-100">
                <h2 className="font-playfair text-2xl font-bold text-emerald-800 mb-6 uppercase">Key Dates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple">30 May</span>
                    <span className="text-gray-700">Applications & Registrations Close</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple">June</span>
                    <span className="text-gray-700">National Auditions</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple">July</span>
                    <span className="text-gray-700">Thandi at Miss Supranational</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple">September</span>
                    <span className="text-gray-700">Fundraising Brunch Gala (Lilongwe)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple">September</span>
                    <span className="text-gray-700">Preliminary Event</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple">September</span>
                    <span className="text-gray-700">Miss Malawi Masterclass Series</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple">Last Week November</span>
                    <span className="text-gray-700">Intensive Bootcamp</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple">December</span>
                    <span className="text-gray-700">Grand Finale (Griffin Sayenda, Blantyre)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
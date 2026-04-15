"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Book, CheckCircle, GraduationCap, Heart, Stethoscope, StethoscopeIcon, TrendingUp } from "lucide-react"
import PageHeader from "@/components/page-header"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { saveDonation } from "@/lib/firestore"

export default function DonatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmissionError(null)

    const formData = new FormData(event.currentTarget)
    const allocation = formData.get('allocation')?.toString() || 'general'
    const amount = 0

    let firstName = formData.get('firstName')?.toString().trim() || ''
    let lastName = formData.get('lastName')?.toString().trim() || ''

    if (!firstName || !lastName) {
      firstName = 'Anonymous'
      lastName = ''
    }

    const email = formData.get('email')?.toString().trim() || ''
    const phone = formData.get('phone')?.toString().trim() || ''
    const comments = formData.get('comments')?.toString().trim() || ''

    const donation = {
      amount,
      allocation,
      firstName,
      lastName,
      email,
      phone,
      paymentMethod: 'PayChangu',
      comments,
      isMonthly: false,
      status: 'pending' as const,
    }

    setIsSubmitting(true)
    const savedId = await saveDonation(donation)
    setIsSubmitting(false)

    if (!savedId) {
      setSubmissionError('Unable to save donation. Please try again.')
      return
    }

    window.location.href = 'https://pay.paychangu.com/SC-IFVXJP'
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Support Our Mission"
        description="Your donation helps empower young Malawian women and create lasting impact"
      />

      {/* Donation Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Your Impact</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Your generous donation directly supports our programs and initiatives, creating meaningful change in the
              lives of young Malawian women and communities.
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ImpactCard
              icon={<GraduationCap className="h-8 w-8" />}
              title="Education Support"
              description="Your donation helps provide scholarships, educational resources, and mentorship to young women across Malawi."
              impact="Provides school supplies for girls"
            />
            <ImpactCard
              icon={<Stethoscope className="h-8 w-8" />}
              title="Health Initiatives"
              description="Support health awareness campaigns, workshops, and access to essential health services for women."
              impact="Funds a health workshop for women"
            />
            <ImpactCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Leadership Development"
              description="Help nurture the next generation of Malawian female leaders through training and opportunities."
              impact="Sponsors leadership training for young women"
            />
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="font-playfair text-3xl font-bold text-[#212224] mb-6 text-center">Make a Donation</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Donation Allocation */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Allocate Your Donation</h3>
                    <RadioGroup defaultValue="general" name="allocation">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="allocation-general" />
                          <Label htmlFor="allocation-general" className="text-gray-700">
                            General Fund (Support all programs)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="education" id="allocation-education" />
                          <Label htmlFor="allocation-education" className="text-gray-700">
                            Education Initiatives
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="health" id="allocation-health" />
                          <Label htmlFor="allocation-health" className="text-gray-700">
                            Health Programs
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="leadership" id="allocation-leadership" />
                          <Label htmlFor="allocation-leadership" className="text-gray-700">
                            Leadership Development
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pageant" id="allocation-pageant" />
                          <Label htmlFor="allocation-pageant" className="text-gray-700">
                            Miss Malawi Pageant
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
                    <p className="text-sm text-gray-500 mb-4">This section is optional. Leave blank to donate anonymously.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </Label>
                        <Input id="first-name" name="firstName" className="w-full" />
                      </div>
                      <div>
                        <Label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </Label>
                        <Input id="last-name" name="lastName" className="w-full" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </Label>
                        <Input id="email" name="email" type="email" className="w-full" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </Label>
                        <Input id="phone" name="phone" type="tel" className="w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <Label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                      Comments (Optional)
                    </Label>
                    <Textarea
                      id="comments"
                      name="comments"
                      placeholder="Share any message you'd like to include with your donation"
                      className="w-full"
                    />
                  </div>

                  {submissionError ? (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                      {submissionError}
                    </div>
                  ) : null}

                  {/* Submit */}
                  <div className="pt-4 flex flex-col items-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-purple hover:bg-purple/90 text-white text-lg px-8 py-6 w-auto min-w-[200px] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? 'Processing...' : 'Donate Now'}
                    </Button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Other Ways to Give</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Beyond online donations, there are several other ways you can support Miss Malawi Foundation
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Corporate Sponsorship</h3>
              <p className="text-gray-700 mb-4">
                Partner with Miss Malawi as a corporate sponsor. We offer various sponsorship packages with
                recognition and visibility benefits.
              </p>
              <Button asChild variant="outline" className="border-purple text-purple hover:bg-purple/10 hover:text-purple">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">In-Kind Donations</h3>
              <p className="text-gray-700 mb-4">
                Donate goods, services, or expertise to support our programs and events. We welcome various forms of
                in-kind support.
              </p>
              <Button asChild variant="outline" className="border-purple text-purple hover:bg-purple/10 hover:text-purple">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Legacy Giving</h3>
              <p className="text-gray-700 mb-4">
                Make a lasting impact by including Miss Malawi in your estate planning. Your legacy gift will
                support future generations.
              </p>
              <Button asChild variant="outline" className="border-purple text-purple hover:bg-purple/10 hover:text-purple">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Recognition section commented out temporarily
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Donor Recognition</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are grateful to our generous donors who make our work possible
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Platinum Donors</h3>
              <SponsorCarousel
                sponsors={platinumDonors}
                height="h-32"
                logoWidth={120}
                logoHeight={60}
                interval={7000}
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Gold Donors</h3>
              <SponsorCarousel
                sponsors={goldDonors}
                height="h-24"
                logoWidth={100}
                logoHeight={50}
                interval={6000}
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Silver Donors</h3>
              <SponsorCarousel
                sponsors={silverDonors}
                height="h-20"
                logoWidth={80}
                logoHeight={40}
                interval={5000}
              />
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Donor Stories section commented out temporarily
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Donor Stories</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from our donors about why they choose to support Miss Malawi Foundation
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DonorStory
              image="/placeholder.svg?height=400&width=400"
              name="Chimwemwe Mphande"
              title="Individual Donor"
              quote="I support Miss Malawi Foundation because I believe in the power of empowering young women. The impact they're making in communities across Malawi is truly inspiring."
            />
            <DonorStory
              image="/placeholder.svg?height=400&width=400"
              name="Mphatso Banda"
              title="Corporate Sponsor"
              quote="As a business leader, I see the value in investing in women's empowerment. Our partnership with Miss Malawi Foundation has been rewarding both for our company and the communities we serve."
            />
            <DonorStory
              image="/placeholder.svg?height=400&width=400"
              name="Grace Nyirenda"
              title="Monthly Donor"
              quote="I give monthly because I want to be part of the ongoing work of Miss Malawi Foundation. It's a small contribution that, combined with others, makes a big difference."
            />
          </div>
        </div>
      </section>
      */}

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-purple mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <FAQ
                question="Is my donation tax-deductible?"
                answer="Yes, Miss Malawi Organization is a registered non-profit organization, and all donations are tax-deductible to the extent allowed by Malawian law. You will receive a receipt for your donation that can be used for tax purposes."
              />
              <FAQ
                question="How is my donation used?"
                answer="Your donation directly supports our programs in education, health, leadership development, and cultural preservation. We maintain transparency in our financial reporting, and you can specify which program you'd like your donation to support."
              />
              <FAQ
                question="What payment methods do you accept?"
                answer="We accept various payment methods including credit/debit cards, bank transfers, and mobile money services like TNM Mpamba and Airtel Money through Paychangu. For corporate donations or other arrangements, please contact our office directly."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ImpactCardProps {
  icon: React.ReactNode
  title: string
  description: string
  impact: string
}

function ImpactCard({ icon, title, description, impact }: ImpactCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#212224]/5 text-[#212224] mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700 mb-6">{description}</p>
      <div className="bg-[#212224]/5 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <CheckCircle className="h-5 w-5 text-[#212224] mr-2" />
          <p className="text-[#212224]">{impact}</p>
        </div>
      </div>
    </div>
  )
}

interface FAQProps {
  question: string
  answer: string
}

function FAQ({ question, answer }: FAQProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </div>
  )
}

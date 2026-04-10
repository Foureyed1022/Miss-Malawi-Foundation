import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, EyeOff, Database, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  const policies = [
    {
      title: "Data Collection",
      content: "When you apply for the Miss Malawi Pageant, we collect personal information such as your name, contact details, date of birth, education history, and application media (photos/videos). This data is necessary to process your candidacy and verify eligibility.",
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "How We Use Your Data",
      content: "Your information is used to evaluate your application, contact you regarding the selection process, and promote the pageant (only with your media consent). We do not sell your personal data to third parties.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Data Security",
      content: "We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure. All files and documents are stored on secure cloud servers with restricted administrative access.",
      icon: <EyeOff className="w-6 h-6" />
    },
    {
      title: "Third-Party Sharing",
      content: "We may share your information with judges or official pageant partners only as required for the evaluation process. Public media sharing is governed by the 'Use of Content' clause in our Terms & Conditions.",
      icon: <Share2 className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFD]">
      {/* Hero Header */}
      <header className="py-24 bg-[#3D1E52] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/40 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
              <Lock className="w-10 h-10 text-purple-200" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 tracking-tight text-white shadow-sm">
            Privacy <span className="text-purple-300 italic">Policy</span>
          </h1>
          <p className="text-purple-100/80 text-lg max-w-xl mx-auto leading-relaxed font-inter">
            Transparency about how we handle your data is a fundamental part of our commitment to all pageant contestants.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="grid gap-16 md:gap-24">
          <section className="grid gap-12 md:grid-cols-2">
            {policies.map((policy, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#3D1E52]">
                  {policy.icon}
                </div>
                <h2 className="text-2xl font-bold font-playfair text-gray-900">{policy.title}</h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {policy.content}
                </p>
              </div>
            ))}
          </section>

          <section className="bg-purple-50/50 rounded-[2.5rem] p-8 md:p-16 border border-purple-100 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold font-playfair text-[#3D1E52]">Your Rights</h3>
              <p className="text-gray-700 leading-relaxed">
                You have the right to request access to the data we hold about you, ask for corrections, or request deletion of your information if you choose to withdraw your application.
              </p>
              <div className="flex items-center gap-4 text-[#3D1E52] font-bold">
                <Link href="mailto:info@missmw.org" className="hover:underline">
                  Contact Us
                </Link>
                <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                <span>info@missmw.org</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/pageant/register">
                <Button className="bg-[#3D1E52] hover:bg-[#2A153A] text-white px-10 h-14 rounded-full text-lg shadow-xl shadow-purple-900/10 transition-transform active:scale-95">
                  Understand & Continue
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <footer className="py-16 border-t border-purple-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm italic">
            "Your privacy is our priority. We treat every application with the utmost confidentiality and respect."
          </p>
          <div className="mt-8 text-xs text-gray-300 uppercase tracking-widest">
            Miss Malawi • Legal Affairs
          </div>
        </div>
      </footer>
    </div>
  );
}

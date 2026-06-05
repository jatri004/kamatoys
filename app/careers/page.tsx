"use client";

import { useState } from "react";
import { Briefcase, Upload, CheckCircle, Heart, Sparkles, Users } from "lucide-react";

const perks = [
  { icon: Heart, title: "Inclusive & shame-free", body: "A welcoming, judgement-free culture for every identity." },
  { icon: Sparkles, title: "Grow with us", body: "Real ownership, learning budgets, and room to progress." },
  { icon: Users, title: "Great team", body: "Discreet, supportive people who care about wellness." },
];

const roles = [
  "Customer Service Advisor",
  "Warehouse & Fulfilment",
  "Content & Social Media",
  "Product Buyer",
  "Marketing Executive",
  "Software Engineer",
  "Other / Speculative",
];

export default function CareersPage() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");

  return (
    <div>
      {/* Hero */}
      <div className="bg-wine-900 text-white py-14 text-center px-4">
        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase size={24} className="text-gold-400" />
        </div>
        <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Careers</p>
        <h1 className="text-4xl font-display font-bold mb-3">Join the KamaDesires.com Team</h1>
        <p className="text-wine-100/80 max-w-lg mx-auto text-sm">
          We're building the UK's most inclusive intimate-wellness brand — and we'd love your help.
          Send us your CV and tell us how you'd like to contribute.
        </p>
      </div>

      {/* Perks */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {perks.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="w-10 h-10 bg-blush-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-blush-500" />
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
              <p className="text-sm text-gray-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2 text-center">Apply Now</h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Fill in your details, upload your CV, and we'll be in touch.
        </p>

        {sent ? (
          <div className="bg-green-50 rounded-2xl p-10 text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Application Received!</h3>
            <p className="text-gray-600 text-sm">
              Thank you for applying to KamaDesires.com. Our team will review your CV and contact you if there's a match.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-first" className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <input id="c-first" type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div>
                <label htmlFor="c-last" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input id="c-last" type="text" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input id="c-email" type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
              <div>
                <label htmlFor="c-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input id="c-phone" type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400" />
              </div>
            </div>

            <div>
              <label htmlFor="c-role" className="block text-sm font-medium text-gray-700 mb-1.5">Role you're applying for</label>
              <select id="c-role" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 bg-white">
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="c-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                Cover message <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea id="c-message" rows={4} placeholder="Tell us a little about yourself and why you'd like to join…" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blush-400 resize-none" />
            </div>

            {/* CV upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload your CV</label>
              <label
                htmlFor="c-cv"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-8 px-4 cursor-pointer hover:border-blush-400 hover:bg-blush-50/40 transition-colors text-center"
              >
                <Upload size={22} className="text-gray-400" />
                {fileName ? (
                  <span className="text-sm font-medium text-blush-600">{fileName}</span>
                ) : (
                  <>
                    <span className="text-sm font-medium text-gray-700">Click to upload or drag &amp; drop</span>
                    <span className="text-xs text-gray-400">PDF, DOC or DOCX — max 5MB</span>
                  </>
                )}
                <input
                  id="c-cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </div>

            <label className="flex items-start gap-2 text-xs text-gray-500">
              <input type="checkbox" required className="mt-0.5 accent-blush-500" />
              I consent to KamaDesires.com storing my details for recruitment purposes.
            </label>

            <button
              type="submit"
              className="w-full bg-wine-800 text-white font-semibold py-3.5 rounded-xl hover:bg-wine-900"
            >
              Submit Application
            </button>

            <p className="text-xs text-gray-400 text-center">
              Prefer email? Send your CV to{" "}
              <a href="mailto:careers@kamadesires.com" className="text-blush-600 hover:underline">
                careers@kamadesires.com
              </a>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}

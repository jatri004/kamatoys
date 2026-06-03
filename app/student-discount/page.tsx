import { GraduationCap, CheckCircle } from "lucide-react";

export const metadata = { title: "Student Discount" };

const steps = [
  { n: "1", title: "Verify your student status", body: "Head to our UNiDAYS or Student Beans page and verify your enrollment with your university email." },
  { n: "2", title: "Get your unique code", body: "Once verified, you'll receive a unique discount code valid for 12 months and renewable each year." },
  { n: "3", title: "Apply at checkout", body: "Enter your code at checkout to receive your student discount — automatically applied to eligible items." },
];

export default function StudentDiscountPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blush-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap size={28} className="text-blush-500" />
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">Student Discount</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
          We believe wellness shouldn't be a luxury. That's why we offer an exclusive discount to verified students across the UK.
        </p>
      </div>

      {/* Discount highlight */}
      <div className="bg-gradient-to-br from-blush-50 to-lilac-100 rounded-2xl p-8 text-center mb-10">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Your Discount</p>
        <p className="text-6xl font-display font-bold text-blush-500 mb-2">15%</p>
        <p className="text-gray-600 text-sm">off your entire order, every time you shop</p>
      </div>

      {/* Steps */}
      <h2 className="text-xl font-display font-bold text-gray-900 mb-6">How it works</h2>
      <div className="space-y-5 mb-10">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {s.n}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
              <p className="text-sm text-gray-600 mt-0.5">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a
          href="#"
          className="flex items-center justify-center gap-2 border-2 border-black bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-50 text-sm"
        >
          Verify with UNiDAYS
        </a>
        <a
          href="#"
          className="flex items-center justify-center gap-2 bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800 text-sm"
        >
          Verify with Student Beans
        </a>
      </div>

      {/* Fine print */}
      <div className="space-y-2">
        {[
          "Valid for enrolled UK university and college students.",
          "Cannot be combined with other discount codes.",
          "Excludes gift cards and already-reduced sale items.",
          "Code is for personal use only and non-transferable.",
        ].map((t) => (
          <div key={t} className="flex items-start gap-2 text-sm text-gray-500">
            <CheckCircle size={15} className="text-green-400 mt-0.5 flex-shrink-0" />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

// Education articles. Content is written to align with general NHS public
// health guidance on sexual health and wellbeing. It is for information only
// and is not a substitute for professional medical advice.

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  color: string; // tailwind gradient classes for the listing card
  sections: ArticleSection[];
}

const NHS_NOTE: ArticleSection = {
  heading: "Where to get help",
  paragraphs: [
    "This article is for general information and is not a substitute for professional medical advice. Sexual health services in the UK are free and confidential on the NHS — including STI testing, contraception, and advice.",
    "If you have symptoms, pain, bleeding, or any concerns, contact your GP or a local sexual health (GUM) clinic. You can find services and trusted information at nhs.uk.",
  ],
};

export const articles: Article[] = [
  {
    slug: "beginners-guide-vibrators",
    title: "Beginner's Guide to Vibrators",
    category: "Buying Guide",
    readTime: "6 min read",
    color: "from-rose-100 to-pink-200",
    excerpt:
      "Overwhelmed by choice? We break down every type of vibrator and help you find your perfect match — safely and confidently.",
    sections: [
      {
        paragraphs: [
          "Vibrators are one of the most popular and approachable intimate-wellness products, used by people of all genders. There is no 'normal' when it comes to pleasure — using a vibrator is a healthy, private choice, whether you're exploring solo or with a partner.",
        ],
      },
      {
        heading: "Common types",
        list: [
          "Bullet vibrators — small, precise and great for beginners.",
          "Wand vibrators — broad, powerful external stimulation.",
          "G-spot vibrators — curved to reach internal areas.",
          "Air-pulse / suction stimulators — touch-free clitoral stimulation.",
          "Rabbit vibrators — combined internal and external stimulation.",
          "Couples' / wearable vibrators — designed to be used together.",
        ],
      },
      {
        heading: "Choosing a body-safe product",
        paragraphs: [
          "Look for non-porous, body-safe materials such as medical-grade silicone, ABS plastic, glass or stainless steel. Avoid cheap, porous materials that can harbour bacteria and cannot be fully cleaned.",
          "A rechargeable, waterproof (IPX-rated) toy is easier to keep clean and lasts longer.",
        ],
      },
      {
        heading: "Using it safely",
        list: [
          "Use plenty of water-based lubricant — it reduces friction and increases comfort.",
          "Start on the lowest setting and build up at your own pace.",
          "Never share a toy without washing it thoroughly or covering it with a new condom each time, to avoid passing on infections.",
          "Clean before and after every use (see our cleaning guide).",
          "Stop if you feel any pain, irritation or discomfort.",
        ],
      },
      NHS_NOTE,
    ],
  },
  {
    slug: "choosing-lubricant",
    title: "How to Choose the Right Lubricant",
    category: "Wellness",
    readTime: "4 min read",
    color: "from-sky-100 to-blue-200",
    excerpt:
      "Water-based, silicone or oil? Learn which lube is safe with your toys, condoms and body.",
    sections: [
      {
        paragraphs: [
          "Lubricant makes intimacy more comfortable and can reduce the risk of soreness and condom breakage. The NHS recommends using a water-based lubricant with condoms.",
        ],
      },
      {
        heading: "The three main types",
        list: [
          "Water-based — safe with latex condoms and all toy materials; easy to wash off; may need reapplying. The most versatile choice.",
          "Silicone-based — long-lasting and good for use in water, and safe with latex condoms, but should NOT be used with silicone toys as it can damage them.",
          "Oil-based — long-lasting but can damage latex condoms and diaphragms, making them more likely to break. Avoid with latex barrier methods.",
        ],
      },
      {
        heading: "Important safety points",
        list: [
          "Oil-based lubricants (including baby oil, lotions and Vaseline) weaken latex condoms — never use them together.",
          "If you use silicone toys, choose a water-based lubricant.",
          "Avoid products with added perfumes, flavours, glycerin or warming/tingling agents if you are prone to irritation or thrush.",
          "Do a small patch test if you have sensitive skin or allergies.",
        ],
      },
      {
        heading: "Vaginal dryness",
        paragraphs: [
          "Vaginal dryness is common and can be caused by the menopause, some medications, breastfeeding or stress. Lubricants and vaginal moisturisers can help. If dryness is persistent or uncomfortable, speak to your GP or pharmacist about other options.",
        ],
      },
      NHS_NOTE,
    ],
  },
  {
    slug: "couples-exploration",
    title: "Exploring Pleasure Together as a Couple",
    category: "Couples",
    readTime: "8 min read",
    color: "from-amber-100 to-rose-200",
    excerpt:
      "Communication, consent and the best ways to explore together — a shame-free guide for all relationships.",
    sections: [
      {
        paragraphs: [
          "Healthy intimacy is built on communication, trust and consent. Talking openly with your partner about what you enjoy — and what you don't — makes shared exploration safer and more enjoyable for everyone.",
        ],
      },
      {
        heading: "Consent is ongoing",
        list: [
          "Consent must be freely given, enthusiastic and can be withdrawn at any time.",
          "Check in with each other before and during intimacy.",
          "Agree a 'pause' or safe word if you're trying something new.",
          "Never assume — ask.",
        ],
      },
      {
        heading: "Staying safe together",
        paragraphs: [
          "If either of you could become pregnant, consider contraception that suits you — there are many free options available on the NHS. Condoms are the only method that also helps protect against sexually transmitted infections (STIs).",
          "If you're starting a new relationship, getting a free, confidential STI test at a sexual health clinic is a responsible step for both partners.",
        ],
      },
      {
        heading: "Ideas for exploring",
        list: [
          "Sensory play — blindfolds, feathers and massage to heighten the senses.",
          "Couples' or remote-controlled toys for shared control.",
          "Massage candles and body-safe oils for foreplay.",
          "Take it slow and laugh together — intimacy doesn't have to be serious.",
        ],
      },
      NHS_NOTE,
    ],
  },
  {
    slug: "prostate-101",
    title: "Prostate Pleasure 101",
    category: "Men's Wellness",
    readTime: "5 min read",
    color: "from-indigo-100 to-violet-200",
    excerpt:
      "What is the prostate, and why does stimulating it feel good? A friendly, medically-informed introduction.",
    sections: [
      {
        paragraphs: [
          "The prostate is a small gland, about the size of a walnut, that sits below the bladder and surrounds the urethra. It plays a role in producing semen. For many people it can also be a source of pleasure when stimulated.",
        ],
      },
      {
        heading: "Getting started safely",
        list: [
          "Use plenty of water-based lubricant — the anus does not produce its own lubrication.",
          "Trim and file fingernails, and wash hands beforehand.",
          "Only ever use toys with a flared base, designed for anal use, so they cannot get lost inside the body.",
          "Go slowly and relax — discomfort usually means you need more lube or a slower pace.",
          "Use a condom on toys or fingers to make cleaning easier and reduce infection risk.",
        ],
      },
      {
        heading: "When to see a doctor",
        paragraphs: [
          "Stimulation is not harmful for a healthy prostate, but you should see your GP if you notice urinary symptoms such as needing to pee more often (especially at night), difficulty or pain when peeing, or blood in your urine or semen. These are common and often not serious, but they should always be checked.",
          "Men over 50, Black men, and those with a family history of prostate cancer are at higher risk and can talk to their GP about a PSA test.",
        ],
      },
      NHS_NOTE,
    ],
  },
  {
    slug: "anal-play-beginners",
    title: "Anal Play: A Beginner's Safety Guide",
    category: "Guides",
    readTime: "7 min read",
    color: "from-orange-100 to-amber-200",
    excerpt:
      "Go slow, use plenty of lube, and start small. Everything you need for safe, comfortable exploration.",
    sections: [
      {
        paragraphs: [
          "Anal play is common and can be enjoyable for people of any gender. Because the anus is delicate and does not self-lubricate, taking it slowly and following a few safety basics is important.",
        ],
      },
      {
        heading: "The golden rules",
        list: [
          "Use lots of lubricant, and reapply often — water-based is a safe all-rounder.",
          "Start small and build up gradually; never rush.",
          "Only use toys with a flared base or retrieval cord designed for anal use.",
          "Relax — tension makes it uncomfortable. Stop if there is pain.",
          "Use condoms to reduce the risk of STIs, and change them when switching between anal and vaginal contact to avoid spreading bacteria.",
          "Wash toys, hands and the area before and after.",
        ],
      },
      {
        heading: "Hygiene and infection",
        paragraphs: [
          "Bacteria from the bowel can cause infections if transferred to the vagina, urethra or mouth. Always use a fresh condom or wash thoroughly before moving to another area.",
          "STIs can be passed through anal contact, so barrier protection and regular testing are recommended.",
        ],
      },
      {
        heading: "When to seek help",
        paragraphs: [
          "A little initial discomfort can be normal, but you should see your GP or a sexual health clinic if you have ongoing pain, bleeding that doesn't quickly settle, or any object that becomes stuck. Rectal bleeding should always be checked by a doctor.",
        ],
      },
      NHS_NOTE,
    ],
  },
  {
    slug: "kegel-exercises",
    title: "Kegel Exercises: Benefits & How to Start",
    category: "Wellness",
    readTime: "5 min read",
    color: "from-emerald-100 to-teal-200",
    excerpt:
      "Strengthen your pelvic floor for better bladder control, recovery and pleasure. Includes a simple routine.",
    sections: [
      {
        paragraphs: [
          "Pelvic floor (Kegel) exercises strengthen the muscles that support the bladder, bowel and — in women — the womb. The NHS recommends them for both men and women to help with bladder and bowel control, recovery after childbirth or surgery, and sexual function.",
        ],
      },
      {
        heading: "Finding the right muscles",
        paragraphs: [
          "Imagine you are trying to stop yourself passing wind and urine at the same time. The squeezing and lifting sensation you feel is your pelvic floor. Try not to hold your breath or tighten your stomach, buttocks or thighs.",
        ],
      },
      {
        heading: "A simple daily routine (based on NHS guidance)",
        list: [
          "Slow squeezes: tighten the muscles, hold for a few seconds, then relax. Build up to holding for 10 seconds.",
          "Fast squeezes: tighten and release quickly.",
          "Aim for a set of slow squeezes followed by fast squeezes, around three times a day.",
          "Be patient — it can take a few months of regular practice to notice a difference.",
        ],
      },
      {
        heading: "Helpful tools",
        paragraphs: [
          "Weighted Kegel/Ben Wa balls can add resistance once you're comfortable with the technique. The NHS 'Squeezy' app can help you build a routine and set reminders.",
          "If you leak urine, have pelvic pain, or aren't sure you're doing the exercises correctly, ask your GP for a referral to a specialist pelvic-health physiotherapist.",
        ],
      },
      NHS_NOTE,
    ],
  },
  {
    slug: "lgbtq-inclusive-sex-ed",
    title: "Sex Education That Actually Includes You",
    category: "LGBTQ+",
    readTime: "10 min read",
    color: "from-pink-100 via-purple-100 to-blue-100",
    excerpt:
      "A comprehensive, affirming guide to intimacy, pleasure and safety written for LGBTQ+ people.",
    sections: [
      {
        paragraphs: [
          "Everyone deserves clear, affirming sexual health information. Much mainstream advice overlooks LGBTQ+ people — this guide focuses on safety and pleasure for all bodies and identities. NHS sexual health services are open and confidential for everyone.",
        ],
      },
      {
        heading: "Barrier protection for every kind of sex",
        list: [
          "Condoms protect against STIs and pregnancy during penetrative sex — including when sharing toys (use a fresh one each time).",
          "Dental dams (or a condom cut open) can be used for oral-vaginal or oral-anal contact.",
          "Use gloves and plenty of lubricant for manual play to protect delicate skin.",
        ],
      },
      {
        heading: "PrEP, PEP and testing",
        paragraphs: [
          "PrEP (pre-exposure prophylaxis) is medication that significantly reduces the risk of getting HIV and is available free through NHS sexual health clinics. PEP can be taken after possible exposure and should be started as soon as possible.",
          "Regular, free STI and HIV testing is recommended — many clinics offer self-sampling kits by post.",
        ],
      },
      {
        heading: "Affirming care for trans and non-binary people",
        paragraphs: [
          "Bodies change with hormones and surgery, and lubrication needs, sensitivity and aftercare can change too. Gender-affirming products such as packers, dilators and harnesses can support comfort and euphoria.",
          "After lower surgery, follow your surgical team's guidance on dilation and healing. If you have questions about your sexual health, gender clinics and GUM clinics can provide non-judgemental support.",
        ],
      },
      {
        heading: "Consent and wellbeing",
        paragraphs: [
          "Consent, communication and emotional safety matter for everyone. If you ever experience discrimination in a healthcare setting, you have the right to respectful care — organisations like the NHS and LGBT+ charities can help you find affirming services.",
        ],
      },
      NHS_NOTE,
    ],
  },
  {
    slug: "cleaning-sex-toys",
    title: "How to Clean and Store Your Toys",
    category: "Care & Safety",
    readTime: "4 min read",
    color: "from-lime-100 to-green-200",
    excerpt:
      "Proper cleaning extends the life of your toys and keeps you safe. A material-by-material guide.",
    sections: [
      {
        paragraphs: [
          "Cleaning intimate products before and after every use helps prevent bacterial, yeast and sexually transmitted infections. How you clean depends on the material and whether the toy is motorised.",
        ],
      },
      {
        heading: "General rules",
        list: [
          "Clean before and after every use with warm water and a mild, unperfumed soap, or a dedicated toy cleaner.",
          "Never share a toy without washing it thoroughly or covering it with a fresh condom.",
          "Use a new condom and change it when moving between anal and vaginal use, or between partners.",
          "Dry toys fully before storing to prevent mould and bacteria.",
        ],
      },
      {
        heading: "By material",
        list: [
          "Non-motorised silicone, glass and stainless steel — can be sterilised in boiling water or the top rack of a dishwasher (check the manufacturer's advice).",
          "Motorised / rechargeable toys — never submerge unless they are fully waterproof; wipe with a damp cloth and toy cleaner, avoiding the charging port.",
          "Porous materials (TPE/TPR, jelly) — cannot be fully sterilised; clean carefully and always use a condom; replace if they become sticky or damaged.",
        ],
      },
      {
        heading: "Storage",
        paragraphs: [
          "Store toys in a clean, dry place — a breathable pouch is ideal. Keep silicone toys from touching each other, as some materials can react. Remove batteries from battery-operated toys during long storage.",
        ],
      },
      NHS_NOTE,
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface Props {
  heading: string;
  links: FooterLink[];
}

// Collapsible on mobile (tap +/- to expand), always open on desktop.
export default function FooterLinkGroup({ heading, links }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-3 md:border-0 md:py-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between md:cursor-default"
      >
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 md:mb-4">
          {heading}
        </h3>
        <span className="text-gray-400 md:hidden">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      <ul className={`${open ? "block" : "hidden"} md:block space-y-2 mt-3 md:mt-0`}>
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

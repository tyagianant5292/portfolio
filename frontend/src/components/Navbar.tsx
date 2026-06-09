"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, TerminalSquare } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/60 bg-ink-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="font-mono text-sm font-bold text-white">
          <span className="text-brand-400">~/</span>anant-kumar
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-md border border-brand-500/40 bg-brand-500/10 px-3 py-1.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20 hover:text-white"
            >
              <TerminalSquare size={15} /> Terminal
            </Link>
          </li>
        </ul>

        <Link
          href="/"
          aria-label="Open terminal view"
          className="flex items-center gap-1.5 rounded-md border border-brand-500/40 bg-brand-500/10 px-2.5 py-1.5 text-xs font-medium text-brand-400 md:hidden"
        >
          <TerminalSquare size={14} /> Terminal
        </Link>

        <button
          aria-label="Toggle menu"
          className="ml-2 text-slate-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-ink-700/60 px-6 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-slate-300 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

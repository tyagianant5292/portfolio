import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/resume";

export default function Hero() {
  return (
    <section className="bg-grid relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/40 to-ink-900" />
      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 md:pt-32">
        <p className="mb-4 animate-fade-up font-mono text-sm text-brand-400">
          $ whoami
        </p>
        <h1 className="animate-fade-up text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-4 animate-fade-up text-lg font-medium text-brand-400 md:text-xl">
          {profile.title}
        </p>
        <p className="mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-slate-400 md:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-6 flex animate-fade-up items-center gap-2 text-sm text-slate-400">
          <MapPin size={16} className="text-brand-400" />
          {profile.location}
        </div>

        <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Get in touch
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-ink-700 bg-ink-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-brand-500 hover:text-white"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-ink-700 bg-ink-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-brand-500 hover:text-white"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded-md border border-ink-700 bg-ink-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-brand-500 hover:text-white"
          >
            <Mail size={16} /> Email
          </a>
        </div>
      </div>
    </section>
  );
}

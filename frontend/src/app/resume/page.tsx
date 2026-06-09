"use client";

import Link from "next/link";
import {
  profile,
  skills,
  experience,
  education,
  awards,
  languages,
} from "@/data/resume";

// Print-optimized resume. Click "Save as PDF" (or Cmd/Ctrl+P) to export.
export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-200 py-8 print:bg-white print:py-0">
      <style>{`@media print { @page { margin: 14mm; } .no-print { display: none !important; } }`}</style>

      <div className="no-print mx-auto mb-4 flex max-w-[800px] items-center justify-between px-4">
        <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
          ← back to terminal
        </Link>
        <button
          onClick={() => window.print()}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Save as PDF
        </button>
      </div>

      <article className="mx-auto max-w-[800px] bg-white px-10 py-10 text-[13px] leading-relaxed text-slate-800 shadow-lg print:max-w-none print:px-0 print:py-0 print:shadow-none">
        {/* header */}
        <header className="border-b-2 border-slate-800 pb-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {profile.name}
          </h1>
          <p className="mt-0.5 font-medium text-slate-600">{profile.title}</p>
          <p className="mt-1 text-xs text-slate-600">
            {profile.location} · {profile.phone} (UAE) · {profile.phoneIN} (India) ·{" "}
            {profile.email}
          </p>
          <p className="text-xs text-slate-600">
            linkedin.com/in/tyagianant98 · github.com/tyagianant5292
          </p>
        </header>

        <Section title="Summary">
          <p>{profile.summary}</p>
        </Section>

        <Section title="Core Skills">
          <ul className="space-y-0.5">
            {skills.map((g) => (
              <li key={g.category}>
                <span className="font-semibold text-slate-900">
                  {g.category}:
                </span>{" "}
                {g.items.join(", ")}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Professional Experience">
          <div className="space-y-3">
            {experience.map((job) => (
              <div key={job.company + job.period}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-slate-900">
                    {job.company}
                    {job.client ? ` — Client: ${job.client}` : ""}
                  </h3>
                  <span className="text-xs text-slate-500">{job.period}</span>
                </div>
                <p className="text-xs italic text-slate-600">
                  {job.role} · {job.location}
                </p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  {job.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid grid-cols-2 gap-6">
          <Section title="Education">
            {education.map((e) => (
              <div key={e.degree} className="mb-1">
                <p className="font-semibold text-slate-900">{e.degree}</p>
                <p className="text-xs text-slate-600">
                  {e.institution} ({e.period})
                </p>
              </div>
            ))}
          </Section>

          <Section title="Awards & Languages">
            <ul className="list-disc space-y-0.5 pl-5">
              {awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="mt-1 text-xs">
              {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </Section>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1.5 text-xs font-bold uppercase tracking-widest text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

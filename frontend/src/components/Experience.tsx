import { experience, education } from "@/data/resume";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-ink-700/40">
      <div className="section-pad">
        <p className="section-kicker">{"// experience"}</p>
        <h2 className="section-title">Where I&apos;ve worked</h2>

        <div className="mt-10 space-y-10">
          {experience.map((job) => (
            <div
              key={job.company + job.period}
              className="relative border-l border-ink-700 pl-6 md:pl-8"
            >
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-500 ring-4 ring-ink-900" />
              <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
                <h3 className="text-lg font-semibold text-white">
                  {job.company}
                  {job.client && (
                    <span className="text-slate-400">
                      {" "}
                      — Client: {job.client}
                    </span>
                  )}
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  {job.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm font-medium text-brand-400">
                {job.role}
                <span className="text-slate-500"> · {job.location}</span>
              </p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm leading-relaxed text-slate-400"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500/70" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mb-6 mt-16 font-mono text-sm font-semibold text-brand-400">
          Education
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((e) => (
            <div
              key={e.degree}
              className="rounded-lg border border-ink-700 bg-ink-800/50 p-5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="font-semibold text-white">{e.degree}</h4>
                <span className="font-mono text-xs text-slate-500">
                  {e.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{e.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

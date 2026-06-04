import { Trophy } from "lucide-react";
import { awards, languages } from "@/data/resume";

export default function Awards() {
  return (
    <section id="awards" className="border-t border-ink-700/40 bg-ink-800/20">
      <div className="section-pad">
        <p className="section-kicker">{"// recognition"}</p>
        <h2 className="section-title">Awards &amp; languages</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-ink-700 bg-ink-800/50 p-6 md:col-span-2">
            <h3 className="mb-4 font-mono text-sm font-semibold text-brand-400">
              Awards &amp; Recognition
            </h3>
            <ul className="space-y-3">
              {awards.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-slate-300">
                  <Trophy size={16} className="mt-0.5 flex-shrink-0 text-brand-400" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-ink-700 bg-ink-800/50 p-6">
            <h3 className="mb-4 font-mono text-sm font-semibold text-brand-400">
              Languages
            </h3>
            <ul className="space-y-3">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between text-sm">
                  <span className="text-slate-200">{l.name}</span>
                  <span className="text-slate-500">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

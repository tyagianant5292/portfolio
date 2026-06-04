import { profile } from "@/data/resume";

const stats = [
  { value: "5+", label: "Years in DevOps" },
  { value: "vLLM", label: "AI model deploys" },
  { value: "GPU", label: "Compute provisioning" },
  { value: "K8s", label: "Multi-cloud clusters" },
];

export default function About() {
  return (
    <section id="about" className="border-t border-ink-700/40">
      <div className="section-pad">
        <p className="section-kicker">{"// about"}</p>
        <h2 className="section-title">Infrastructure that runs AI at scale</h2>
        <p className="max-w-3xl text-base leading-relaxed text-slate-400">
          {profile.summary}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-ink-700 bg-ink-800/60 p-5"
            >
              <div className="font-mono text-2xl font-bold text-brand-400">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { skills } from "@/data/resume";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-ink-700/40 bg-ink-800/20">
      <div className="section-pad">
        <p className="section-kicker">{"// skills"}</p>
        <h2 className="section-title">Tools &amp; technologies</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-ink-700 bg-ink-800/50 p-5"
            >
              <h3 className="mb-4 font-mono text-sm font-semibold text-brand-400">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

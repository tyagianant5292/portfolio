import { profile } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/40 bg-ink-900">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row">
        <p className="font-mono">
          <span className="text-brand-400">$</span> built &amp; shipped by{" "}
          {profile.name}
        </p>
        <p>
          Next.js · Docker · Helm · deployed on Vercel &amp; Kubernetes
        </p>
      </div>
    </footer>
  );
}

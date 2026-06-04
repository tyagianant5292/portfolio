import type { ReactNode } from "react";
import {
  profile,
  skills,
  experience,
  education,
  awards,
  languages,
} from "@/data/resume";

export type CommandResult =
  | { kind: "lines"; node: ReactNode }
  | { kind: "clear" }
  | { kind: "ask"; question: string };

// Small styling helpers so command output stays consistent.
const C = {
  accent: "text-cyan-400",
  green: "text-emerald-400",
  yellow: "text-amber-400",
  muted: "text-slate-500",
  white: "text-slate-100",
  pink: "text-pink-400",
};

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 underline decoration-cyan-700 underline-offset-2 hover:text-cyan-300"
    >
      {children}
    </a>
  );
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Visible command list (also used for autocomplete + help).
export const COMMANDS: { name: string; desc: string }[] = [
  { name: "help", desc: "list all available commands" },
  { name: "whoami", desc: "who is Anant Kumar" },
  { name: "about", desc: "professional summary" },
  { name: "skills", desc: "tech stack (try: kubectl get pods)" },
  { name: "experience", desc: "work history — then: exp <n>" },
  { name: "education", desc: "academic background" },
  { name: "awards", desc: "recognition & awards" },
  { name: "ask", desc: "ask the AI anything about Anant — ask <question>" },
  { name: "contact", desc: "email, phone & social links" },
  { name: "resume", desc: "where to find the full resume" },
  { name: "neofetch", desc: "system info, terminal-style" },
  { name: "classic", desc: "open the classic visual portfolio" },
  { name: "banner", desc: "show the welcome banner" },
  { name: "clear", desc: "clear the terminal" },
];

const NAMES = COMMANDS.map((c) => c.name).concat(["github", "linkedin", "email", "ls", "cat", "sudo"]);

export function completions(prefix: string): string[] {
  if (!prefix) return [];
  return NAMES.filter((n) => n.startsWith(prefix.toLowerCase()));
}

export function bannerNode(): ReactNode {
  return (
    <div>
      <pre className={`${C.green} text-[10px] leading-tight sm:text-xs`}>{String.raw`
   ___                  _     __ __
  / _ | ___  ___ ____  | |_  / //_/_ ____ _  ___ _____
 / __ |/ _ \/ _ \/ _ \ |  _/ / ,< / // /  ' \/ _ \/ __/
/_/ |_/_//_/\_,_/_//_/  \__/ /_/|_|\___/_/_/_/\_,_/_/
`}</pre>
      <p className={C.white}>
        {profile.name} — <span className={C.accent}>{profile.title}</span>
      </p>
      <p className={C.muted}>
        Interactive terminal portfolio. Type{" "}
        <span className={C.yellow}>help</span> to begin, or{" "}
        <span className={C.yellow}>ask</span> the AI a question about me.
      </p>
    </div>
  );
}

function helpNode(): ReactNode {
  return (
    <div>
      <p className={C.muted}>Available commands:</p>
      <div className="mt-1 grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
        {COMMANDS.map((c) => (
          <div key={c.name} className="flex gap-2">
            <span className={`${C.green} w-24 flex-shrink-0`}>{c.name}</span>
            <span className={C.muted}>{c.desc}</span>
          </div>
        ))}
      </div>
      <p className={`${C.muted} mt-2`}>
        Tip: use <span className={C.yellow}>Tab</span> to autocomplete and{" "}
        <span className={C.yellow}>↑ / ↓</span> for history.
      </p>
    </div>
  );
}

function whoamiNode(): ReactNode {
  return (
    <div>
      <p className={C.white}>{profile.name}</p>
      <p className={C.accent}>{profile.title}</p>
      <p className={C.muted}>📍 {profile.location}</p>
      <p className={`${C.white} mt-2 max-w-2xl`}>{profile.tagline}</p>
    </div>
  );
}

function skillsAsPods(): ReactNode {
  const rows = skills.flatMap((g) =>
    g.items.map((item) => ({ ns: slug(g.category), name: item }))
  );
  return (
    <div className="font-mono">
      <div className={`${C.muted} grid grid-cols-[1fr_auto_auto] gap-x-4`}>
        <span>NAME</span>
        <span>STATUS</span>
        <span>NAMESPACE</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.ns + r.name}
          className="grid grid-cols-[1fr_auto_auto] gap-x-4"
        >
          <span className={C.white}>{r.name}</span>
          <span className={C.green}>Running</span>
          <span className={C.muted}>{r.ns}</span>
        </div>
      ))}
      <p className={`${C.muted} mt-2`}>
        {rows.length} pods · all <span className={C.green}>Running</span> ✅
      </p>
    </div>
  );
}

function skillsNode(): ReactNode {
  return (
    <div className="space-y-1.5">
      {skills.map((g) => (
        <div key={g.category}>
          <span className={`${C.accent} font-semibold`}>{g.category}:</span>{" "}
          <span className={C.white}>{g.items.join(", ")}</span>
        </div>
      ))}
      <p className={C.muted}>
        (easter egg: try <span className={C.yellow}>kubectl get pods</span>)
      </p>
    </div>
  );
}

function experienceListNode(): ReactNode {
  return (
    <div>
      <p className={C.muted}>drwxr-xr-x — work history:</p>
      {experience.map((job, i) => (
        <div key={job.company} className="flex gap-3">
          <span className={C.yellow}>exp {i + 1}</span>
          <span className={C.white}>
            {job.company}
            {job.client ? ` (${job.client})` : ""}
          </span>
          <span className={C.muted}>{job.period}</span>
        </div>
      ))}
      <p className={`${C.muted} mt-2`}>
        Type <span className={C.yellow}>exp 1</span> … to open an entry.
      </p>
    </div>
  );
}

function experienceDetailNode(idx: number): ReactNode {
  const job = experience[idx];
  if (!job)
    return (
      <p className={C.pink}>
        No such entry. Try <span className={C.yellow}>experience</span> to list.
      </p>
    );
  return (
    <div>
      <p className={C.white}>
        {job.company}
        {job.client ? (
          <span className={C.muted}> — Client: {job.client}</span>
        ) : null}
      </p>
      <p className={C.accent}>
        {job.role} · {job.location} · {job.period}
      </p>
      <ul className="mt-1.5 space-y-0.5">
        {job.highlights.map((h, i) => (
          <li key={i} className={C.white}>
            <span className={C.green}>▸</span> {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

function educationNode(): ReactNode {
  return (
    <div>
      {education.map((e) => (
        <div key={e.degree}>
          <span className={C.white}>{e.degree}</span>{" "}
          <span className={C.muted}>
            — {e.institution} ({e.period})
          </span>
        </div>
      ))}
    </div>
  );
}

function awardsNode(): ReactNode {
  return (
    <div>
      {awards.map((a) => (
        <div key={a} className={C.white}>
          <span className={C.yellow}>🏆</span> {a}
        </div>
      ))}
      <p className={`${C.muted} mt-1`}>
        Languages: {languages.map((l) => `${l.name} (${l.level})`).join(", ")}
      </p>
    </div>
  );
}

function contactNode(): ReactNode {
  return (
    <div className="space-y-0.5">
      <p>
        <span className={C.muted}>email   </span>{" "}
        <Link href={`mailto:${profile.email}`}>{profile.email}</Link>
      </p>
      <p>
        <span className={C.muted}>phone   </span>{" "}
        <span className={C.white}>{profile.phone}</span>
      </p>
      <p>
        <span className={C.muted}>github  </span>{" "}
        <Link href={profile.github}>github.com/tyagianant5292</Link>
      </p>
      <p>
        <span className={C.muted}>linkedin</span>{" "}
        <Link href={profile.linkedin}>linkedin.com/in/tyagianant98</Link>
      </p>
    </div>
  );
}

function neofetchNode(): ReactNode {
  const info: [string, ReactNode][] = [
    ["host", "anant@portfolio"],
    ["title", profile.title],
    ["location", profile.location],
    ["uptime", "5+ years in DevOps"],
    ["kernel", "Linux (tuned & secured)"],
    ["orchestrator", "Kubernetes · Slurm"],
    ["specialty", "AI/ML infra · GPU · vLLM"],
    ["shell", "bash + a lot of YAML"],
    ["status", <span key="status" className={C.green}>available for opportunities</span>],
  ];
  return (
    <div className="flex flex-wrap gap-x-8">
      <pre className={`${C.accent} text-[10px] leading-tight`}>{String.raw`
      .--.
     |o_o |
     |:_/ |
    //   \ \
   (|     | )
  /'\_   _/'\
  \___)=(___/
`}</pre>
      <div className="self-center">
        {info.map(([k, v]) => (
          <div key={k}>
            <span className={`${C.green} inline-block w-28`}>{k}</span>
            <span className={C.white}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const notFound = (cmd: string): ReactNode => {
  const guess = completions(cmd[0] || "")[0];
  return (
    <p className={C.pink}>
      command not found: {cmd}.{" "}
      <span className={C.muted}>
        Type <span className={C.yellow}>help</span>
        {guess ? (
          <>
            {" "}
            — did you mean <span className={C.yellow}>{guess}</span>?
          </>
        ) : null}
      </span>
    </p>
  );
};

export function execute(raw: string): CommandResult {
  const trimmed = raw.trim();
  if (!trimmed) return { kind: "lines", node: null };

  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");
  const c = cmd.toLowerCase();

  // kubectl get pods → skills as pods
  if (c === "kubectl") {
    if (arg.replace(/\s+/g, " ").trim() === "get pods")
      return { kind: "lines", node: skillsAsPods() };
    return {
      kind: "lines",
      node: <p className={C.muted}>try: kubectl get pods</p>,
    };
  }

  switch (c) {
    case "help":
      return { kind: "lines", node: helpNode() };
    case "whoami":
      return { kind: "lines", node: whoamiNode() };
    case "about":
      return {
        kind: "lines",
        node: <p className="max-w-3xl text-slate-100">{profile.summary}</p>,
      };
    case "skills":
      return { kind: "lines", node: skillsNode() };
    case "ls":
      if (arg.startsWith("experience"))
        return { kind: "lines", node: experienceListNode() };
      return {
        kind: "lines",
        node: (
          <p className="text-slate-100">
            about  skills  experience/  education  awards  contact
          </p>
        ),
      };
    case "experience":
    case "exp": {
      if (arg && /^\d+$/.test(arg))
        return { kind: "lines", node: experienceDetailNode(Number(arg) - 1) };
      return { kind: "lines", node: experienceListNode() };
    }
    case "cat":
      if (arg.includes("experience")) {
        const found = experience.findIndex((j) => arg.includes(slug(j.company)));
        if (found >= 0)
          return { kind: "lines", node: experienceDetailNode(found) };
      }
      return { kind: "lines", node: experienceListNode() };
    case "education":
      return { kind: "lines", node: educationNode() };
    case "awards":
      return { kind: "lines", node: awardsNode() };
    case "contact":
      return { kind: "lines", node: contactNode() };
    case "github":
      return {
        kind: "lines",
        node: <Link href={profile.github}>{profile.github}</Link>,
      };
    case "linkedin":
      return {
        kind: "lines",
        node: <Link href={profile.linkedin}>{profile.linkedin}</Link>,
      };
    case "email":
      return {
        kind: "lines",
        node: <Link href={`mailto:${profile.email}`}>{profile.email}</Link>,
      };
    case "resume":
    case "cv":
      return {
        kind: "lines",
        node: (
          <p className="text-slate-100">
            Full resume & source on GitHub:{" "}
            <Link href="https://github.com/tyagianant5292/portfolio">
              github.com/tyagianant5292/portfolio
            </Link>
          </p>
        ),
      };
    case "neofetch":
      return { kind: "lines", node: neofetchNode() };
    case "classic":
      return {
        kind: "lines",
        node: (
          <p className="text-slate-100">
            Opening the classic visual portfolio →{" "}
            <a
              href="/classic"
              className="text-cyan-400 underline decoration-cyan-700 underline-offset-2 hover:text-cyan-300"
            >
              /classic
            </a>
          </p>
        ),
      };
    case "banner":
      return { kind: "lines", node: bannerNode() };
    case "clear":
      return { kind: "clear" };
    case "ask":
      if (!arg)
        return {
          kind: "lines",
          node: (
            <p className={C.muted}>
              Usage: <span className={C.yellow}>ask &lt;question&gt;</span> — e.g.{" "}
              <span className={C.yellow}>ask what is his GPU experience?</span>
            </p>
          ),
        };
      return { kind: "ask", question: arg };
    case "sudo":
      return {
        kind: "lines",
        node: <p className={C.pink}>Nice try. You don&apos;t have root here 😎</p>,
      };
    case "echo":
      return { kind: "lines", node: <p className="text-slate-100">{arg}</p> };
    default:
      return { kind: "lines", node: notFound(c) };
  }
}

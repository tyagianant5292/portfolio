"use client";

import { useState } from "react";
import { Send, Mail, Phone, Github, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "@/data/resume";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="border-t border-ink-700/40">
      <div className="section-pad">
        <p className="section-kicker">{"// contact"}</p>
        <h2 className="section-title">Let&apos;s talk infrastructure</h2>
        <p className="max-w-2xl text-base leading-relaxed text-slate-400">
          Open to DevOps / Platform / AI-Infra roles and collaborations. Drop a
          message below or reach out directly.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-800/50 p-4 text-sm text-slate-300 transition-colors hover:border-brand-500"
            >
              <Mail size={18} className="text-brand-400" /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-800/50 p-4 text-sm text-slate-300 transition-colors hover:border-brand-500"
            >
              <Phone size={18} className="text-brand-400" /> {profile.phone}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-800/50 p-4 text-sm text-slate-300 transition-colors hover:border-brand-500"
            >
              <Github size={18} className="text-brand-400" /> github.com/tyagianant5292
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-800/50 p-4 text-sm text-slate-300 transition-colors hover:border-brand-500"
            >
              <Linkedin size={18} className="text-brand-400" /> linkedin.com/in/tyagianant98
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-ink-700 bg-ink-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="w-full rounded-lg border border-ink-700 bg-ink-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500"
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message"
              className="w-full resize-none rounded-lg border border-ink-700 bg-ink-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
            >
              <Send size={16} />
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle2 size={16} /> Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} /> {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

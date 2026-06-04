"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  execute,
  completions,
  bannerNode,
  COMMANDS,
  statusNode,
  statusErrorNode,
} from "./terminal/commands";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const PROMPT = "anant@portfolio:~$";

type Line = { id: number; node: ReactNode };
type ChatMsg = { role: "user" | "assistant"; content: string };

// Quick-access chips for visitors who don't want to type.
const CHIPS = ["help", "projects", "skills", "experience", "status", "ask"];

// Curated follow-ups offered after an AI answer.
const SUGGESTIONS = [
  "What is the Core42 AI Cloud platform?",
  "Tell me about his vLLM deployments",
  "What GPU hardware does he work with?",
  "How does he handle CI/CD and GitOps?",
  "What's his Kubernetes experience?",
  "Why should we hire him?",
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [busy, setBusy] = useState(false);

  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootedRef = useRef(false);
  const convoRef = useRef<ChatMsg[]>([]);
  const askedRef = useRef<Set<string>>(new Set());
  const submitRef = useRef<(raw: string) => void>(() => {});

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const pushLine = useCallback(
    (node: ReactNode): number => {
      const id = ++idRef.current;
      setLines((prev) => [...prev, { id, node }]);
      return id;
    },
    []
  );

  const updateLine = useCallback((id: number, node: ReactNode) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, node } : l)));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // Boot sequence (runs once).
  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const steps: { delay: number; node: ReactNode }[] = [
      { delay: 150, node: <span className="text-slate-500">booting anant-portfolio…</span> },
      {
        delay: 500,
        node: (
          <span className="text-slate-500">
            loading modules:{" "}
            <span className="text-emerald-400">
              kubernetes ✓ docker ✓ helm ✓ groq-ai ✓
            </span>
          </span>
        ),
      },
      { delay: 850, node: bannerNode() },
    ];
    steps.forEach((s) => setTimeout(() => pushLine(s.node), s.delay));
  }, [pushLine]);

  const promptEcho = (value: string): ReactNode => (
    <div>
      <span className="text-emerald-400">{PROMPT}</span>{" "}
      <span className="text-slate-100">{value}</span>
    </div>
  );

  const aiNode = useCallback(
    (
      text: string,
      opts: { streaming?: boolean; suggestions?: string[] } = {}
    ): ReactNode => (
      <div className="max-w-3xl">
        <span className="text-cyan-400">anant-ai&gt; </span>
        <span className="text-slate-100">
          {text}
          {opts.streaming && <span className="animate-pulse">▋</span>}
        </span>
        {opts.suggestions && opts.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="self-center text-xs text-slate-600">try:</span>
            {opts.suggestions.map((s) => (
              <button
                key={s}
                onClick={(e) => {
                  e.stopPropagation();
                  submitRef.current(`ask ${s}`);
                }}
                className="rounded-md border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-xs text-cyan-300/90 transition-colors hover:border-cyan-500/60 hover:text-cyan-200"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    ),
    []
  );

  const runAsk = useCallback(
    async (question: string) => {
      setBusy(true);
      askedRef.current.add(question.toLowerCase());
      const id = pushLine(<span className="text-slate-500">🤖 thinking…</span>);
      try {
        const res = await fetch(`${API_URL}/api/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            history: convoRef.current.slice(-6),
          }),
        });
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `request failed (${res.status})`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let text = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          updateLine(id, aiNode(text, { streaming: true }));
          scrollToBottom();
        }

        convoRef.current.push(
          { role: "user", content: question },
          { role: "assistant", content: text }
        );
        const suggestions = SUGGESTIONS.filter(
          (s) => !askedRef.current.has(s.toLowerCase())
        ).slice(0, 3);
        updateLine(id, aiNode(text || "(no answer)", { suggestions }));
      } catch (err) {
        updateLine(
          id,
          <span className="text-pink-400">
            {err instanceof Error ? err.message : "AI request failed"}
          </span>
        );
      } finally {
        setBusy(false);
      }
    },
    [pushLine, updateLine, scrollToBottom, aiNode]
  );

  const runStatus = useCallback(async () => {
    const id = pushLine(<span className="text-slate-500">fetching status…</span>);
    try {
      const res = await fetch(`${API_URL}/api/status`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      updateLine(id, statusNode(data));
    } catch (err) {
      updateLine(
        id,
        statusErrorNode(err instanceof Error ? err.message : "unreachable")
      );
    }
  }, [pushLine, updateLine]);

  const submit = useCallback(
    (raw: string) => {
      pushLine(promptEcho(raw));
      if (raw.trim()) setHistory((prev) => [...prev, raw]);
      setHistIdx(-1);
      setInput("");

      const res = execute(raw);
      if (res.kind === "clear") {
        setLines([]);
        return;
      }
      if (res.kind === "ask") {
        runAsk(res.question);
        return;
      }
      if (res.kind === "status") {
        runStatus();
        return;
      }
      if (res.node) pushLine(res.node);
    },
    [pushLine, runAsk, runStatus]
  );

  useEffect(() => {
    submitRef.current = submit;
  }, [submit]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (busy) return;
      submit(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length <= 1) {
        const m = completions(parts[0]);
        if (m.length === 1) setInput(m[0] + " ");
        else if (m.length > 1) pushLine(<span className="text-slate-500">{m.join("   ")}</span>);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0e16] bg-grid p-3 sm:p-6"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mx-auto flex h-[calc(100vh-1.5rem)] max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-[#0b0f1a]/95 shadow-2xl sm:h-[calc(100vh-3rem)]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-slate-700/60 bg-[#11151f] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
          <span className="ml-3 font-mono text-xs text-slate-400">
            {PROMPT} — anant-kumar.portfolio
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            live
          </span>
        </div>

        {/* output */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed sm:text-sm"
        >
          {lines.map((l) => (
            <div key={l.id}>{l.node}</div>
          ))}

          {/* input line */}
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0 text-emerald-400">{PROMPT}</span>
            <input
              ref={inputRef}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent text-slate-100 caret-emerald-400 outline-none"
              aria-label="terminal input"
            />
          </div>
        </div>

        {/* command chips */}
        <div className="flex flex-wrap gap-2 border-t border-slate-700/60 bg-[#11151f] px-4 py-2.5">
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.stopPropagation();
                if (c === "ask") {
                  setInput("ask ");
                  inputRef.current?.focus();
                } else {
                  submit(c);
                }
              }}
              className="rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-emerald-500/60 hover:text-emerald-300"
            >
              {c}
            </button>
          ))}
          <span className="ml-auto hidden self-center font-mono text-[11px] text-slate-600 sm:block">
            {COMMANDS.length} commands · Tab to autocomplete
          </span>
        </div>
      </div>
    </div>
  );
}

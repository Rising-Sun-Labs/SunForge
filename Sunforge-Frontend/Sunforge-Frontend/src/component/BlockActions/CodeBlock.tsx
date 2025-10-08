// src/component/blocks/CodeBlock.tsx
import React from "react";
import { cx } from "@emotion/css";
import {
  FaChevronDown,
  FaCopy,
  FaEllipsisH,
  FaParagraph,
  FaTextWidth,
} from "react-icons/fa";
import { TbNumbers } from "react-icons/tb";

export type CodeMeta = {
  language: string;
  caption?: string;
  wrap?: boolean;
  showLineNumbers?: boolean;
};

export type CodeBlockProps = {
  value: string;
  meta: CodeMeta;
  onChange: (nextCode: string) => void;
  onMetaChange: (next: Partial<CodeMeta>) => void;
};

/** Reasonable language list — extend anytime */
const LANGUAGES = [
  "Plain text",
  "JavaScript",
  "TypeScript",
  "JSX",
  "TSX",
  "JSON",
  "HTML",
  "CSS",
  "SCSS",
  "Less",
  "SQL",
  "GraphQL",
  "Bash",
  "Shell",
  "Dockerfile",
  "YAML",
  "XML",
  "Markdown",
  "Python",
  "Java",
  "Kotlin",
  "Swift",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Perl",
  "Lua",
  "R",
];

function useAutoResize(
  ref: React.RefObject<HTMLTextAreaElement | null>,
  deps: any[]
) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resize = () => {
      el.style.height = "0px";
      el.style.height = Math.max(120, el.scrollHeight) + "px";
    };
    resize();
  }, deps);
}

export default function CodeBlock({
  value,
  meta,
  onChange,
  onMetaChange,
}: CodeBlockProps) {
  const [langOpen, setLangOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const taRef = React.useRef<HTMLTextAreaElement>(null);
  useAutoResize(taRef, [value, meta.wrap]);

  const selected = meta.language || "Plain text";
  const filtered = LANGUAGES.filter((l) =>
    l.toLowerCase().includes(q.trim().toLowerCase())
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(ta);
    }
  };

  const lines = React.useMemo(
    () => (value ? value.split("\n").length : 1),
    [value]
  );

  return (
    <div className="group relative rounded-xl border border-[var(--sf-border)] bg-[var(--sf-panel)]/70">
      {/* Toolbar */}
      <div className="pointer-events-auto absolute -top-3 right-3 z-10">
        <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-[#0D1014]/90 px-3 py-1 text-sm text-zinc-200 shadow">
          {/* Language */}
          <div className="relative">
            <button
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-zinc-900"
              onClick={() => setLangOpen((o) => !o)}
              title="Language"
            >
              <span className="opacity-90">{selected}</span>
              <FaChevronDown className="text-[10px] opacity-70" />
            </button>
            {langOpen && (
              <div
                className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-zinc-800 bg-[#0D1014] p-2 shadow-2xl"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="mb-2 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-2 py-1">
                  <input
                    autoFocus
                    placeholder="Search language…"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder-zinc-500"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filtered.map((l) => (
                    <button
                      key={l}
                      className={cx(
                        "w-full truncate rounded-lg px-2 py-1.5 text-left text-sm hover:bg-zinc-900",
                        l === selected && "bg-zinc-900 text-zinc-100"
                      )}
                      onClick={() => {
                        onMetaChange({ language: l });
                        setLangOpen(false);
                        setQ("");
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Line numbers */}
          <button
            className={cx(
              "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-zinc-900",
              meta.showLineNumbers && "bg-zinc-900"
            )}
            onClick={() =>
              onMetaChange({ showLineNumbers: !meta.showLineNumbers })
            }
            title="Toggle line numbers"
          >
            <TbNumbers />
            <span className="hidden md:inline">
              {meta.showLineNumbers ? "On" : "Off"}
            </span>
          </button>

          {/* Wrap */}
          <button
            className={cx(
              "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-zinc-900",
              meta.wrap && "bg-zinc-900"
            )}
            onClick={() => onMetaChange({ wrap: !meta.wrap })}
            title="Toggle line wrap"
          >
            <FaTextWidth />
            <span className="hidden md:inline">
              {meta.wrap ? "Wrap" : "No wrap"}
            </span>
          </button>

          {/* Copy */}
          <button
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-zinc-900"
            onClick={copy}
            title="Copy code"
          >
            <FaCopy />
            <span className="hidden md:inline">Copy</span>
          </button>

          {/* More (placeholder) */}
          <button
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-zinc-900"
            title="More"
          >
            <FaEllipsisH />
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div
        className={cx(
          "relative grid",
          meta.showLineNumbers ? "grid-cols-[3rem_1fr]" : "grid-cols-1"
        )}
      >
        {/* Line numbers gutter */}
        {meta.showLineNumbers && (
          <div className="select-none rounded-l-xl border-r border-[var(--sf-border)] bg-[#0C1013] p-3 pr-2 text-right text-[12px] leading-6 text-zinc-600">
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="tabular-nums">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <div className="min-w-0">
          <textarea
            ref={taRef}
            spellCheck={false}
            placeholder="Write code…"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cx(
              "w-full rounded-xl p-3 font-mono text-sm text-zinc-100 outline-none",
              "bg-transparent",
              meta.wrap ? "whitespace-pre-wrap" : "whitespace-pre",
              meta.showLineNumbers ? "rounded-l-none" : ""
            )}
            style={{ lineHeight: "1.5rem", overflow: "hidden" }}
          />
        </div>
      </div>

      {/* Caption */}
      <div className="flex items-center gap-2 border-t border-[var(--sf-border)] px-3 py-2">
        <FaParagraph className="text-zinc-600" />
        <input
          value={meta.caption ?? ""}
          onChange={(e) => onMetaChange({ caption: e.target.value })}
          placeholder="Add a caption…"
          className="w-full bg-transparent text-sm text-zinc-300 outline-none placeholder-zinc-600"
        />
      </div>
    </div>
  );
}

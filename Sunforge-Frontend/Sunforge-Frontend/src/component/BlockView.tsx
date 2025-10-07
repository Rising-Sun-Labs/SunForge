import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { type Block } from "./SunForgePageEditor";
import { cx } from "@emotion/css";

export default function BlockView({
  block,
  onToggle,
  onChangeText,
  onFocus,
}: {
  block: Block;
  onToggle: (id: string) => void;
  onChangeText: (id: string, t: string) => void;
  onFocus: () => void;
}) {
  const inputBase =
    "w-full bg-transparent outline-none prose-input placeholder-dim";

  const common = {
    onBlur: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChangeText(block.id, e.currentTarget.value ?? ""),
    onFocus,
  };

  switch (block.type) {
    case "heading1":
      return (
        <input
          {...common}
          className={cx(inputBase, "text-4xl font-bold")}
          placeholder="Heading 1"
          defaultValue={block.text}
        />
      );
    case "heading2":
      return (
        <input
          {...common}
          className={cx(inputBase, "text-2xl font-semibold")}
          placeholder="Heading 2"
          defaultValue={block.text}
        />
      );
    case "heading3":
      return (
        <input
          {...common}
          className={cx(inputBase, "text-xl font-semibold")}
          placeholder="Heading 3"
          defaultValue={block.text}
        />
      );
    case "bulleted":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-300"></div>
          <input
            {...common}
            className={cx(inputBase)}
            placeholder="List item"
            defaultValue={block.text}
          />
        </div>
      );

    case "numbered":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-1 text-zinc-400">1.</div>
          <input
            {...common}
            className={inputBase}
            placeholder="Numbered item"
            defaultValue={block.text}
          />
        </div>
      );
    case "todo":
      return (
        <div className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" />
          <input
            {...common}
            className={inputBase}
            placeholder="To-do"
            defaultValue={block.text}
          />
        </div>
      );
    case "toggle":
      return (
        <div>
          <button
            className="inline-flex items-center gap-2 text-zinc-200 hover:text-white"
            onClick={() => onToggle(block.id)}
            onFocus={onFocus}
          >
            {block.collapsed ? <FaChevronRight /> : <FaChevronDown />}
            <span className="font-medium">{block.text || "Toggle"}</span>
          </button>
          {!block.collapsed && (
            <div className="ml-6 mt-2 space-y-2">
              {(block.children ?? []).map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg border border-[var(--sf-border)] p-2 text-sm text-zinc-300"
                >
                  {c.text || "Nested content..."}
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case "divider":
      return <div className="my-2 h-px bg-[var(--sf-border)]" />;

    case "quote":
      return (
        <div className="flex gap-3">
          <div className="mt-1 w-1 rounded bg-zinc-600/70" />
          <input
            {...common}
            className={cx(inputBase, "italic text-zinc-300")}
            placeholder="Quote"
            defaultValue={block.text}
          />
        </div>
      );

    case "callout":
      return (
        <div className="flex items-start gap-3 rounded-xl border border-[var(--sf-border)] bg-var(--sf-panel)] px-3 py-2">
          <span className="mt-1">💡</span>
          <input
            {...common}
            className={inputBase}
            placeholder="Callout"
            defaultValue={block.text}
          />
        </div>
      );
    case "image":
      return (
        <div className="rounded-xl border border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
          🖼️ Image placeholder
        </div>
      );
    case "video":
      return (
        <div className="rounded-xl border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
          🎬 Video placeholder
        </div>
      );
    case "audio":
      return (
        <div className="rounded-xl border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
          🎵 Audio placeholder
        </div>
      );
    case "code":
      return (
        <textarea
          onFocus={onFocus}
          onBlur={(e) => onChangeText(block.id, e.currentTarget.value)}
          className="w-full rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)]
            p-3 font-mono text-sm"
          placeholder="Code..."
          defaultValue={block.text}
        />
      );

    case "table":
      return (
        <div className="rounded-xl border border-[var(--sf-border)] p-3 text-sm text-zinc-300">
          📊 Table (placeholder)
        </div>
      );

    case "page":
      return (
        <div className="rounded-lg border border-[var(--sf-border)] p-3">
          📄 Sub-page:&nbsp;
          <input
            {...common}
            className="bg-transparent outline-none"
            placeholder="Untitled"
            defaultValue={block.text}
          />
        </div>
      );

    default:
      return (
        <input
          {...common}
          className={inputBase}
          placeholder="Type '/' for commands"
          defaultValue={block.text}
        />
      );
  }
}

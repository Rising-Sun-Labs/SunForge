// ──────────────────────────────────────────────────────────────────────────────
// FILE: src/component/SunForgePageEditor.tsx
// ──────────────────────────────────────────────────────────────────────────────

import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaBook,
  FaCheckSquare,
  FaCode,
  FaDatabase,
  FaExternalLinkAlt,
  FaFile,
  FaHeading,
  FaHighlighter,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaLock,
  FaMarkdown,
  FaMinus,
  FaMusic,
  FaPlus,
  FaQuoteLeft,
  FaRobot,
  FaShareAlt,
  FaSyncAlt,
  FaTable,
  FaToggleOff,
  FaUnderline,
  FaVideo,
} from "react-icons/fa";
import { GiArtificialIntelligence, GiPlayButton } from "react-icons/gi";
import { LuColumns4, LuTableOfContents } from "react-icons/lu";
import { MdEmojiSymbols, MdOutlineCallToAction } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import {
  RiArrowDropRightFill,
  RiDeleteBin6Line,
  RiFormula,
} from "react-icons/ri";
import { TbColumns2, TbColumns3 } from "react-icons/tb";

import { CgCalendarDates } from "react-icons/cg";
import { CiText } from "react-icons/ci";
import { GoMention } from "react-icons/go";
import { ImEmbed } from "react-icons/im";
import { SiMermaid } from "react-icons/si";
import { cx } from "@emotion/css";

export type BlockType =
  | "text"
  | "page"
  | "markdown"
  | "heading1"
  | "heading2"
  | "heading3"
  | "bulleted"
  | "numbered"
  | "todo"
  | "toggle"
  | "divider"
  | "quote"
  | "callout"
  | "image"
  | "video"
  | "audio"
  | "code"
  | "file"
  | "link"
  | "table"
  | "database"
  | "tableofcontents"
  | "equation"
  | "breadcrumbs"
  | "button"
  | "synced"
  | "column2"
  | "column3"
  | "column4"
  | "column5"
  | "mermaid"
  | "ai"
  | "embed"
  | "mention"
  | "date"
  | "emoji"
  | "inline-equation";

export type Block = {
  id: string;
  type: BlockType;
  text?: string;
  children?: Block[];
  collapsed?: boolean;
};

type Visibility = "private" | "workspace" | "public";

type PageMeta = {
  id: string;
  icon?: string; // emoji string
  cover?: string; // URL
  title: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  createdBy: string;
  updatedBy: string;
  properties?: Record<string, string | number | string[] | boolean>;
  permissions?: { visibility: Visibility; editors?: string[] };
  parent?: { type: "page" | "database" | "root"; id?: string };
};

const uuid = () =>
  globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);

// ───────── focus helpers ─────────
function focusAtEnd(el: HTMLElement | null) {
  if (!el) return;
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    const len = el.value.length;
    el.focus();
    el.setSelectionRange(len, len);
    return;
  }
  el.focus();
}

// ───────── util: formatting ─────────
function fmtDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
function timeAgo(iso: string) {
  try {
    const d = new Date(iso).getTime();
    const diff = Date.now() - d;
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24);
    if (days < 7) return `${days}d ago`;
    return fmtDate(iso);
  } catch {
    return iso;
  }
}

// ───────── Inline toolbar ─────────
function InlineToolbar() {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-2 py-1 text-sm text-zinc-200 shadow">
      <button className="p-1 rounded hover:bg-[var(--sf-hover)]" title="Bold">
        <FaBold />
      </button>
      <button className="p-1 rounded hover:bg-[var(--sf-hover)]" title="Italic">
        <FaItalic />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Underline"
      >
        <FaUnderline />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Highlight"
      >
        <FaHighlighter />
      </button>
      <div className="mx-1 h-4 w-px bg-[var(--sf-border)]" />
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Align left"
      >
        <FaAlignLeft />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Align center"
      >
        <FaAlignCenter />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Align right"
      >
        <FaAlignRight />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Justify"
      >
        <FaAlignJustify />
      </button>
    </div>
  );
}

// ───────── Slash menu ─────────
function SlashMenu({
  x,
  y,
  onClose,
  onInsert,
}: {
  x: number;
  y: number;
  onClose: () => void;
  onInsert: (t: BlockType) => void;
}) {
  const Item = ({
    icon,
    label,
    type,
  }: {
    icon: React.ReactNode;
    label: string;
    type: BlockType;
  }) => (
    <button
      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
      onClick={() => {
        onInsert(type);
        onClose();
      }}
    >
      <span className="opacity-90">{icon}</span>
      <span>{label}</span>
    </button>
  );
  return (
    <div
      className="fixed z-50 w-[420px] max-height-[420px] max-h-[420px] overflow-y-auto scroll-hidden rounded-2xl border border-[var(--sf-border)] bg-[var(--sf-panel)] p-2 shadow-2xl"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
        Suggested
      </div>
      <Item icon={<FaRobot />} label="AI Block" type="text" />

      <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
        Basic
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Item icon={<CiText />} label="Text" type="text" />
        <Item icon={<FaBook />} label="Page" type="page" />
        <Item icon={<FaMarkdown />} label="Markdown" type="markdown" />
        <Item icon={<FaHeading />} label="Heading 1" type="heading1" />
        <Item icon={<FaHeading />} label="Heading 2" type="heading2" />
        <Item icon={<FaHeading />} label="Heading 3" type="heading3" />
        <Item icon={<FaListUl />} label="Bulleted list" type="bulleted" />
        <Item icon={<FaListOl />} label="Numbered list" type="numbered" />
        <Item icon={<FaCheckSquare />} label="To-do list" type="todo" />
        <Item icon={<FaToggleOff />} label="Toggle" type="toggle" />
        <Item icon={<FaMinus />} label="Divider" type="divider" />
        <Item icon={<FaQuoteLeft />} label="Quote" type="quote" />
        <Item icon={<MdOutlineCallToAction />} label="Callout" type="quote" />
        <Item icon={<FaImage />} label="Image" type="image" />
        <Item icon={<FaVideo />} label="Video" type="video" />
        <Item icon={<FaMusic />} label="Audio" type="audio" />
        <Item icon={<FaCode />} label="Code" type="code" />
        <Item icon={<FaFile />} label="File" type="file" />
        <Item icon={<FaLink />} label="Link" type="link" />
        <Item icon={<FaTable />} label="Table" type="table" />
        <Item
          icon={<LuTableOfContents />}
          label="Table of contents"
          type="tableofcontents"
        />
        <Item icon={<RiFormula />} label="Equation" type="equation" />
        <Item
          icon={<RiArrowDropRightFill />}
          label="Breadcrumbs"
          type="breadcrumbs"
        />
        <Item icon={<GiPlayButton />} label="Button" type="button" />
        <Item icon={<TbColumns2 />} label="Column 2" type="column2" />
        <Item icon={<TbColumns3 />} label="Column 3" type="column3" />
        <Item icon={<LuColumns4 />} label="Column 4" type="column4" />
        <Item icon={<CgCalendarDates />} label="Date" type="date" />
      </div>

      <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
        Advanced
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Item icon={<FaDatabase />} label="Database" type="database" />
        <Item icon={<FaSyncAlt />} label="Synced" type="synced" />
        <Item icon={<SiMermaid />} label="Mermaid" type="mermaid" />
        <Item icon={<ImEmbed />} label="Embed" type="embed" />
        <Item icon={<GiArtificialIntelligence />} label="AI" type="ai" />
        <Item icon={<GoMention />} label="Mention" type="mention" />
        <Item icon={<MdEmojiSymbols />} label="Emoji" type="emoji" />
        <Item icon={<FaLink />} label="Link to page" type="link" />
      </div>

      <div className="px-2 py-1 text-right text-[11px] text-zinc-500">
        Type on the page — press Esc to close
      </div>
    </div>
  );
}

// ───────── BlockInput (registers focusable control per block) ─────────
function BlockInput({
  block,
  onChange,
  registerRef,
  onFocus,
}: {
  block: Block;
  onChange: (t: string) => void;
  registerRef: (el: HTMLElement | null) => void;
  onFocus: () => void;
}) {
  const base = "w-full bg-transparent outline-none prose-input placeholder-dim";
  const onBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange(e.currentTarget.value);
  const attach = (el: HTMLElement | null) => registerRef(el);

  switch (block.type) {
    case "heading1":
      return (
        <input
          ref={attach as React.Ref<HTMLInputElement>}
          onFocus={onFocus}
          className={cx(base, "text-4xl font-bold")}
          placeholder="Heading 1"
          defaultValue={block.text}
          onBlur={onBlur}
        />
      );
    case "heading2":
      return (
        <input
          ref={attach as React.Ref<HTMLInputElement>}
          onFocus={onFocus}
          className={cx(base, "text-2xl font-semibold")}
          placeholder="Heading 2"
          defaultValue={block.text}
          onBlur={onBlur}
        />
      );
    case "heading3":
      return (
        <input
          ref={attach as React.Ref<HTMLInputElement>}
          onFocus={onFocus}
          className={cx(base, "text-xl font-semibold")}
          placeholder="Heading 3"
          defaultValue={block.text}
          onBlur={onBlur}
        />
      );
    case "bulleted":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-300" />
          <input
            ref={attach as React.Ref<HTMLInputElement>}
            onFocus={onFocus}
            className={base}
            placeholder="List item"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    case "numbered":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-1 text-zinc-400">1.</div>
          <input
            ref={attach as React.Ref<HTMLInputElement>}
            onFocus={onFocus}
            className={base}
            placeholder="Numbered item"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    case "todo":
      return (
        <div className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" />
          <input
            ref={attach as React.Ref<HTMLInputElement>}
            onFocus={onFocus}
            className={base}
            placeholder="To-do"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    case "quote":
      return (
        <div className="flex gap-3">
          <div className="mt-1 w-1 rounded bg-zinc-600/70" />
          <input
            ref={attach as React.Ref<HTMLInputElement>}
            onFocus={onFocus}
            className={cx(base, "italic text-zinc-300")}
            placeholder="Quote"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    case "divider":
      return <div className="my-2 h-px bg-[var(--sf-border)]" />;
    case "code":
      return (
        <textarea
          ref={attach as React.Ref<HTMLTextAreaElement>}
          onFocus={onFocus}
          className="w-full rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] p-3 font-mono text-sm"
          placeholder="Code…"
          defaultValue={block.text}
          onBlur={(e) => onChange(e.currentTarget.value)}
        />
      );
    case "page":
      return (
        <div className="rounded-lg border border-[var(--sf-border)] p-3">
          📄 Sub-page:&nbsp;
          <input
            ref={attach as React.Ref<HTMLInputElement>}
            onFocus={onFocus}
            className="bg-transparent outline-none"
            placeholder="Welcome to Sunforge ☀️🔥"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    default:
      return (
        <input
          ref={attach as React.Ref<HTMLInputElement>}
          onFocus={onFocus}
          className={base}
          placeholder="Type '/' for commands"
          defaultValue={block.text}
          onBlur={onBlur}
        />
      );
  }
}

// ───────── Visibility pill ─────────
function VisibilityPill({ v }: { v: Visibility }) {
  const label =
    v === "public" ? "Public" : v === "workspace" ? "Workspace" : "Private";
  const Icon =
    v === "public"
      ? FaExternalLinkAlt
      : v === "workspace"
      ? FaShareAlt
      : FaLock;
  const color =
    v === "public"
      ? "text-emerald-300 bg-emerald-400/10 border-emerald-500/30"
      : v === "workspace"
      ? "text-sky-300 bg-sky-400/10 border-sky-500/30"
      : "text-zinc-300 bg-zinc-500/10 border-zinc-500/30";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border px-2 py-[2px] text-[11px]",
        color
      )}
      title={`Visibility: ${label}`}
    >
      <Icon className="text-[10px]" /> {label}
    </span>
  );
}

// ───────── Properties editor ─────────
function PropertiesEditor({
  propsMap,
  onChange,
}: {
  propsMap: NonNullable<PageMeta["properties"]>;
  onChange: (next: Record<string, any>) => void;
}) {
  const entries = Object.entries(propsMap);
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
      {entries.map(([k, v]) => (
        <div
          key={k}
          className="flex items-center gap-2 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-2 py-1.5"
        >
          <input
            defaultValue={k}
            className="w-40 bg-transparent text-sm outline-none placeholder-dim"
            onBlur={(e) => {
              const newKey = e.currentTarget.value.trim() || k;
              if (newKey === k) return;
              const next = { ...propsMap };
              (next as any)[newKey] = (next as any)[k];
              delete (next as any)[k];
              onChange(next);
            }}
          />
          <span className="opacity-30">•</span>
          <input
            defaultValue={String(v)}
            className="flex-1 bg-transparent text-sm outline-none placeholder-dim"
            onBlur={(e) => {
              const next = { ...propsMap, [k]: e.currentTarget.value };
              onChange(next);
            }}
          />
          <button
            title="Remove"
            className="rounded p-1 text-zinc-400 hover:bg-[var(--sf-hover)]"
            onClick={() => {
              const next = { ...propsMap };
              delete (next as any)[k];
              onChange(next);
            }}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ))}
      <button
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--sf-border)] bg-[var(--sf-panel)] px-3 py-2 text-sm text-zinc-300 hover:bg-[var(--sf-hover)]"
        onClick={() => {
          const key = prompt("Property name")?.trim();
          if (!key) return;
          const val = prompt("Property value") ?? "";
          onChange({ ...propsMap, [key]: val });
        }}
      >
        <FaPlus /> Add property
      </button>
    </div>
  );
}

// ───────── Cover / Meta header with metadata overlay ─────────
function CoverHeader({
  meta,
  onChangeCover,
  onChangeIcon,
  onChangeVisibility,
}: {
  meta: PageMeta;
  onChangeCover: (url: string) => void;
  onChangeIcon: (emoji: string) => void;
  onChangeVisibility: (v: Visibility) => void;
}) {
  const coverStyle = meta.cover
    ? {
        backgroundImage: `url(${meta.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundImage: "linear-gradient(135deg, #151a21, #0c1013)" };

  const currentVis = (meta.permissions?.visibility ?? "private") as Visibility;

  return (
    <div className="relative items-center justify-between w-full overflow-hidden rounded-2xl border border-[var(--sf-border)]">
      {/* Cover itself */}
      <div className="h-30 w-full" style={coverStyle} />

      {/* top-right controls */}
      <div className="absolute right-2 top-2 flex gap-2">
        <button
          className="rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)]/80 px-2 py-1 text-xs text-zinc-300 hover:bg-[var(--sf-hover)] backdrop-blur"
          onClick={() => {
            const url = prompt(
              "Enter cover URL (leave blank to clear):",
              meta.cover || ""
            );
            if (url === null) return;
            onChangeCover(url.trim());
          }}
        >
          Change cover
        </button>
        <button
          className="rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)]/80 px-2 py-1 text-xs text-zinc-300 hover:bg-[var(--sf-hover)] backdrop-blur"
          onClick={() => {
            const emoji =
              prompt("Pick an emoji for page icon:", meta.icon || "🧭") ||
              meta.icon ||
              "🧭";
            onChangeIcon(emoji);
          }}
        >
          Change icon
        </button>
      </div>

      {/* bottom overlay: metadata strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        {/* fade for contrast */}
        <div className="h-16 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="pointer-events-auto px-4 pb-3">
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-zinc-200 drop-shadow">
            <span className="truncate opacity-90">
              / {meta.parent?.type ?? "root"}
            </span>
            <span className="opacity-40">•</span>
            <VisibilityPill v={currentVis} />
            <span className="opacity-40">•</span>
            <span className="opacity-90">
              Created {fmtDate(meta.createdAt)} by {meta.createdBy}
            </span>
            <span className="opacity-40">•</span>
            <span className="opacity-90">
              Last edited {timeAgo(meta.updatedAt)} by {meta.updatedBy}
            </span>
            <span className="flex-1" />
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/30 px-2 py-[4px] text-[11px] text-white hover:bg-white/10"
              onClick={() => {
                const next: Visibility =
                  currentVis === "private"
                    ? "workspace"
                    : currentVis === "workspace"
                    ? "public"
                    : "private";
                onChangeVisibility(next);
              }}
              title="Change visibility"
            >
              <FaShareAlt /> Share
            </button>
          </div>
        </div>
      </div>

      {/* overlapping big icon */}
      {/* <div className="absolute -bottom-7 left-6">
        <button
          title="Change icon"
          className="grid h-14 w-14 place-items-center rounded-xl border border-[var(--sf-border)] bg-[#0d1014] text-3xl shadow"
          onClick={() => {
            const emoji =
              prompt("Pick an emoji for page icon:", meta.icon || "🧭") ||
              meta.icon ||
              "🧭";
            onChangeIcon(emoji);
          }}
        >
          {meta.icon || "🧭"}
        </button>
      </div> */}
    </div>
  );
}

// ───────── Main Editor ─────────
export default function SunForgePageEditor({
  initialTitle = "Welcome to Sunforge ☀️🔥",
  onTitleChange,
}: {
  initialTitle?: string;
  onTitleChange?: (t: string) => void;
}) {
  const [meta, setMeta] = useState<PageMeta>({
    id: uuid(),
    title: "Welcome to Sunforge ☀️🔥",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "You",
    updatedBy: "You",
    icon: "🧭",
    cover: "",
    properties: {},
    permissions: { visibility: "private" },
    parent: { type: "root" },
  });
  const [title, setTitle] = React.useState(initialTitle);
  const [blocks, setBlocks] = React.useState<Block[]>([
    { id: uuid(), type: "text", text: "Type '/' for commands. Add blocks" },
  ]);
  const [slashPos, setSlashPos] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [focusId, setFocusId] = React.useState<string | null>(null);

  // refs for focusable controls in blocks
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});

  // focus on focusId change
  useEffect(() => {
    if (!focusId) return;
    const el = blockRefs.current[focusId];
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      setTimeout(() => focusAtEnd(el), 0);
    }
  }, [focusId]);

  // global key handling for slash menu
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setSlashPos({ x: r.left + 16, y: r.bottom + 6 });
      } else if (e.key === "Escape") {
        setSlashPos(null);
      } else if (e.key === "Enter" && slashPos) {
        e.preventDefault(); // keep focus in same block; just close menu
        setSlashPos(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slashPos]);

  const insertAfterFocused = (t: BlockType) => {
    const newId = uuid();
    setBlocks((prev) => {
      const id = focusId;
      if (!id) return [...prev, { id: newId, type: t, text: "" }];
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return [...prev, { id: newId, type: t, text: "" }];
      const next = [...prev];
      next.splice(idx + 1, 0, { id: newId, type: t, text: "" });
      return next;
    });
    setFocusId(newId);
    setSlashPos(null);
  };

  const changeBlock = (id: string, text: string) => {
    setBlocks((p) => p.map((b) => (b.id === id ? { ...b, text } : b)));
    const firstNonEmpty =
      (text.trim() ? id : null) ??
      blocks.find((b) => (b.text ?? "").trim())?.id ??
      null;
    if (firstNonEmpty === id && text.trim()) {
      setTitle(text.trim());
      onTitleChange?.(text.trim());
      setMeta((m) => ({
        ...m,
        title: text.trim(),
        updatedAt: new Date().toISOString(),
        updatedBy: "You",
      }));
    }
  };

  const handleCoverChange = (url: string) =>
    setMeta((m) => ({
      ...m,
      cover: url || "",
      updatedAt: new Date().toISOString(),
      updatedBy: "You",
    }));
  const handleIconChange = (emoji: string) =>
    setMeta((m) => ({
      ...m,
      icon: emoji || "🧭",
      updatedAt: new Date().toISOString(),
      updatedBy: "You",
    }));
  const handleVisibility = (v: Visibility) =>
    setMeta((m) => ({
      ...m,
      permissions: {
        ...(m.permissions ?? { visibility: "private" as Visibility }),
        visibility: v,
      },
      updatedAt: new Date().toISOString(),
      updatedBy: "You",
    }));

  return (
    <div className="relative h-full overflow-y-auto px-10 md:px-20 lg:px-30 py-20">
      {/* Cover + Icon + Metadata (overlay on cover) */}
      <CoverHeader
        meta={meta}
        onChangeCover={handleCoverChange}
        onChangeIcon={handleIconChange}
        onChangeVisibility={handleVisibility}
      />

      {/* Title row (icon overlaps, so add top spacing) */}
      <div className="mt-10 flex items-center gap-3">
        <button
          className="text-3xl"
          title="Change icon"
          onClick={() => {
            const emoji =
              prompt("Pick an emoji for page icon:", meta.icon || "🧭") ||
              meta.icon ||
              "🧭";
            handleIconChange(emoji);
          }}
        >
          {meta.icon || "🧭"}
        </button>
        <input
          className="flex-1 bg-transparent text-4xl font-bold outline-none placeholder-dim"
          placeholder="Welcome to Sunforge ☀️🔥"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            onTitleChange?.(e.target.value);
            setMeta((m) => ({ ...m, title: e.target.value }));
          }}
        />
      </div>

      {/* Properties */}
      <div className="mt-4 rounded-2xl border border-[var(--sf-border)] bg-[var(--sf-panel)]/50 p-4">
        <div className="mb-2 text-xs uppercase tracking-wide text-zinc-500">
          Properties
        </div>
        <PropertiesEditor
          propsMap={meta.properties ?? {}}
          onChange={(next) =>
            setMeta((m) => ({
              ...m,
              properties: next,
              updatedAt: new Date().toISOString(),
              updatedBy: "You",
            }))
          }
        />
      </div>

      {/* Blocks */}
      <div className="mt-6 space-y-3">
        {blocks.map((b) => (
          <div
            key={b.id}
            className="group relative rounded-lg px-2 py-1 hover:bg-[var(--sf-hover)]/40"
            onFocus={() => setFocusId(b.id)}
          >
            <div className="absolute -left-8 top-2 opacity-0 transition group-hover:opacity-100">
              <button
                className="rounded-md p-1 hover:bg-[var(--sf-hover)]"
                onClick={(e) => {
                  e.stopPropagation();
                  setFocusId(b.id);
                  const r = (e.target as HTMLElement).getBoundingClientRect();
                  setSlashPos({ x: r.left, y: r.bottom + 6 });
                }}
                title="Add block"
              >
                <FaPlus />
              </button>
            </div>
            <BlockInput
              block={b}
              onChange={(t) => changeBlock(b.id, t)}
              onFocus={() => setFocusId(b.id)}
              registerRef={(el) => {
                blockRefs.current[b.id] = el;
              }}
            />
          </div>
        ))}
        <div className="pt-4">
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-3 py-2 text-sm text-zinc-300 hover:bg-[var(--sf-hover)] overflow-hidden"
            onClick={(e) => {
              const r = (e.target as HTMLElement).getBoundingClientRect();
              setSlashPos({ x: r.left, y: r.bottom + 6 });
            }}
          >
            <FaPlus /> Add block
          </button>
        </div>
      </div>

      {/* Floating toolbar */}
      <div className="fixed bottom-6 right-6">
        <InlineToolbar />
      </div>

      {/* Slash menu overlay */}
      {slashPos && (
        <div className="fixed inset-0 z-40" onClick={() => setSlashPos(null)}>
          <SlashMenu
            x={slashPos.x}
            y={slashPos.y}
            onClose={() => setSlashPos(null)}
            onInsert={insertAfterFocused}
          />
        </div>
      )}
    </div>
  );
}

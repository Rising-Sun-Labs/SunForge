// ──────────────────────────────────────────────────────────────
// FILE: src/component/SidebarTree.tsx
// ──────────────────────────────────────────────────────────────

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaColumns,
  FaCopy,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaHome,
  FaPen,
  FaRegStar,
  FaSearch,
  FaStar,
  FaTrashAlt,
  FaWikipediaW,
} from "react-icons/fa";
import { PiDotsThreeOutlineFill, PiNoteBlankThin } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoIosMailUnread } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { cx } from "@emotion/css";

import type { PageNode } from "../types";
import SearchPopover from "./SearchPopover";
import SettingsDialog from "./settings/SettingsDialog";
import NewPageDialog from "./NewPage/NewPageDialog";

/* --------------------------------- Types --------------------------------- */

export type SidebarTreeProps = {
  roots: PageNode[];
  privateRoots?: PageNode[];
  favoriteRoots?: PageNode[];
  workspace: {
    name: string;
    email: string;
    memberCount: number;
    avatarUrl?: string;
  };
  userId: string;
  onNavigate: (node: PageNode) => void;
  onCreateInside: (parent: PageNode) => void;
  onRename: (node: PageNode, next: string) => void;
  onTrash: (node: PageNode) => void;
  onToggleFavorite: (node: PageNode, next: boolean) => void;
};

type MenuCoords = { x: number; y: number } | null;

/* ----------------------------- Local utilities ---------------------------- */

const stop = (e: React.SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

function useLocalStorage<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  }, [key, v]);
  return [v, setV] as const;
}

function nodeMatches(query: string, n: PageNode) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    n.label.toLowerCase().includes(q) ||
    (n.preview ?? "").toLowerCase().includes(q) ||
    (n.path ?? "").toLowerCase().includes(q)
  );
}

/* -------------------------------- Sections -------------------------------- */

function Section({
  title,
  children,
  right,
  className,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`mb-2 ${className || ""}`}>
      <div className="flex min-w-0 items-center justify-between py-1">
        <button
          className="inline-flex items-center gap-2 rounded-lg text-sm tracking-wide text-zinc-500 hover:bg-zinc-900/40"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="text-[12px]">{title}</span>
        </button>
        {right}
      </div>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
}

/* ---------------------------------- Node ---------------------------------- */

function Node({
  node,
  depth,
  onNavigate,
  onCreateInside,
  onRename,
  onTrash,
  onToggleFavorite,
  onOpenMenu,
  expandedMap,
  setExpanded,
  onOpenNewPageDialog,
}: {
  node: PageNode;
  depth: number;
  onNavigate: (n: PageNode) => void;
  onCreateInside: (n: PageNode) => void;
  onRename: (n: PageNode, s: string) => void;
  onTrash: (n: PageNode) => void;
  onToggleFavorite: (n: PageNode, next: boolean) => void;
  onOpenMenu: (n: PageNode, e: React.MouseEvent) => void;
  expandedMap: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onOpenNewPageDialog: (parent: PageNode) => void;
}) {
  const open = !!expandedMap[node.id];
  const hasChildren = (node.children?.length ?? 0) > 0;

  return (
    <div className="select-none" onContextMenu={(e) => onOpenMenu(node, e)}>
      <div
        className={cx(
          "group flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 text-[14px] font-semibold text-zinc-500 outline-none hover:bg-zinc-900/40"
        )}
        style={{ paddingLeft: depth * 10 + 1 }}
        onDoubleClick={() => onNavigate(node)}
        onClick={(e) => {
          stop(e);
          setExpanded((m) => ({ ...m, [node.id]: !m[node.id] }));
        }}
      >
        {hasChildren ? (
          <button
            className="group flex shrink-0 items-center gap-1 rounded-md text-zinc-500 hover:bg-zinc-900/40"
            onClick={(e) => {
              stop(e);
              setExpanded((m) => ({ ...m, [node.id]: !m[node.id] }));
            }}
          >
            <span className="opacity-100 transition-opacity duration-200">
              {open ? (
                <FaChevronDown className="text-zinc-600" />
              ) : (
                <FaChevronRight className="text-zinc-900" />
              )}
            </span>
          </button>
        ) : (
          <span className="w-6 shrink-0" />
        )}

        {node.icon ? (
          <span className="shrink-0 opacity-80">{node.icon}</span>
        ) : (
          <PiNoteBlankThin className="shrink-0 text-sm" />
        )}

        <div className="flex min-w-0 flex-1 items-center justify-between">
          <span className="truncate" onClick={() => onNavigate(node)}>
            {node.label}
          </span>

          <div className="flex shrink-0 items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40"
              onClick={(e) => onOpenMenu(node, e)}
            >
              <PiDotsThreeOutlineFill className="text-lg" />
            </button>
            <button
              className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40"
              onClick={(e) => {
                stop(e);
                onOpenNewPageDialog(node);
              }}
            >
              <FiPlus className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {open && hasChildren && (
        <div className="mt-0.5 space-y-0.5">
          {node.children!.map((c) => (
            <Node
              key={c.id}
              node={c}
              depth={depth + 1}
              onNavigate={onNavigate}
              onCreateInside={onCreateInside}
              onRename={onRename}
              onTrash={onTrash}
              onToggleFavorite={onToggleFavorite}
              onOpenMenu={onOpenMenu}
              expandedMap={expandedMap}
              setExpanded={setExpanded}
              onOpenNewPageDialog={onOpenNewPageDialog}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Context menu ------------------------------ */

function formatLastEdited(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (diffDays === 0) return `Today at ${time.toUpperCase()}`;
  if (diffDays === 1) return `Yesterday at ${time.toUpperCase()}`;
  if (diffDays < 7)
    return `${daysOfWeek[date.getDay()]} at ${time.toUpperCase()}`;
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy} at ${time.toUpperCase()}`;
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left outline-none",
        "hover:bg-zinc-900/80 focus:bg-zinc-900/80",
        danger ? "text-red-400" : "text-zinc-200"
      )}
    >
      <span className="opacity-90">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
function Divider() {
  return <div className="my-1 h-px bg-zinc-800" />;
}

function NodeMenu({
  node,
  coords,
  onClose,
  onActions,
}: {
  node: PageNode;
  coords: MenuCoords;
  onClose: () => void;
  onActions: {
    onFavorite: (n: PageNode, next: boolean) => void;
    onCopyLink: (n: PageNode) => void;
    onDuplicate: (n: PageNode) => void;
    onRename: (n: PageNode) => void;
    onMoveTo: (n: PageNode) => void;
    onTrash: (n: PageNode) => void;
    onOpenNew: (n: PageNode) => void;
    onOpenPeek: (n: PageNode) => void;
    onSetAsTemplate?: (n: PageNode) => void;
  };
}) {
  useEffect(() => {
    const onDoc = () => onClose();
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    setTimeout(() => document.addEventListener("mousedown", onDoc), 0);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  if (!coords) return null;

  return (
    <div
      className="fixed z-50 min-w-[240px] select-none rounded-xl border border-zinc-800 bg-[#0D1014] p-1 text-sm shadow-2xl"
      style={{ left: coords.x, top: coords.y }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="px-2 py-1 text-[10px] tracking-wide text-zinc-500">
        Page
      </div>
      <MenuItem
        icon={node.isFavorite ? <FaStar /> : <FaRegStar />}
        label={node.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onClick={() => onActions.onFavorite(node, !node.isFavorite)}
      />
      <Divider />
      <MenuItem
        icon={<FaRegStar />}
        label="Copy Link"
        onClick={() => onActions.onCopyLink(node)}
      />
      <MenuItem
        icon={<FaCopy />}
        label="Duplicate"
        onClick={() => onActions.onDuplicate(node)}
      />
      <MenuItem
        icon={<FaPen />}
        label="Rename"
        onClick={() => onActions.onRename(node)}
      />
      <MenuItem
        icon={<FaColumns />}
        label="Move to"
        onClick={() => onActions.onMoveTo(node)}
      />
      <MenuItem
        icon={<FaTrashAlt />}
        label="Move to Trash"
        danger
        onClick={() => onActions.onTrash(node)}
      />
      <Divider />
      <MenuItem
        icon={<FaWikipediaW />}
        label="Turn into wiki"
        onClick={() => {}}
      />
      <Divider />
      <MenuItem
        icon={<FaRegStar />}
        label="Set as Template"
        onClick={() => onActions.onSetAsTemplate?.(node)}
      />
      <MenuItem
        icon={<FaExternalLinkAlt />}
        label="Open in new window"
        onClick={() => onActions.onOpenNew(node)}
      />
      <MenuItem
        icon={<FaColumns />}
        label="Open in side peek"
        onClick={() => onActions.onOpenPeek(node)}
      />
      <div className="my-1 h-px bg-zinc-800" />
      <div className="px-2 py-1 text-[11px] text-zinc-500">
        <span>Last edited by Ankush Raj</span>
        <div className="p-1" />
        <span>{formatLastEdited(new Date().toISOString())}</span>
      </div>
    </div>
  );
}

/* --------------------------------- Main ---------------------------------- */

export default function SidebarTree(props: SidebarTreeProps) {
  const hasFav = (props.favoriteRoots?.length ?? 0) > 0;

  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(
    "sf.expanded",
    {}
  );
  const [menuFor, setMenuFor] = useState<PageNode | null>(null);
  const [menuCoords, setMenuCoords] = useState<MenuCoords>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // New Page dialog state
  const [newPageOpen, setNewPageOpen] = useState(false);
  const [newPageParent, setNewPageParent] = useState<PageNode | null>(null);

  // Scroll divider (appears only when scrolled past "Inbox")
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 0);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (n: PageNode, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuFor(n);
    setMenuCoords({ x: e.clientX, y: e.clientY });
  };
  const closeMenu = () => {
    setMenuFor(null);
    setMenuCoords(null);
  };

  // Filter support (no inline search box in the sidebar—kept for future add-on)
  const [query] = useState(""); // keep only the value to avoid unused setter
  const filterTree = (nodes: PageNode[]): PageNode[] => {
    return nodes
      .map((n) => ({ ...n }))
      .filter((n) => {
        const childHas =
          (n.children ?? []).length > 0
            ? filterTree(n.children!).length > 0
            : false;
        return nodeMatches(query, n) || childHas;
      })
      .map((n) => ({
        ...n,
        children: n.children ? filterTree(n.children) : [],
      }));
  };
  const favTree = useMemo(
    () => filterTree(props.favoriteRoots ?? []),
    [props.favoriteRoots, query]
  );
  const privTree = useMemo(
    () => filterTree(props.privateRoots ?? []),
    [props.privateRoots, query]
  );
  const teamTree = useMemo(() => filterTree(props.roots), [props.roots, query]);

  const openNewPageFor = (parent: PageNode | null, defaultLabel: string) => {
    setNewPageParent(
      parent ?? { id: "root-private", label: defaultLabel, path: "/me" }
    );
    setNewPageOpen(true);
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#0D1014]">
      {/* Top: fixed (non-scroll) */}
      <div className="shrink-0 p-3">
        {/* Workspace card */}
        <div className="mb-3 rounded-xl border border-zinc-800 bg-[#0C1013]/70 p-3">
          <div className="flex min-w-0 items-center gap-3">
            {props.workspace.avatarUrl ? (
              <img
                src={props.workspace.avatarUrl}
                alt={props.workspace.name}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zinc-700">
                🧭
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">
                  {props.workspace.name}
                </span>
                <button className="flex shrink-0 items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
                  <PiDotsThreeOutlineFill className="text-lg" />
                </button>
              </div>
              <div className="truncate text-xs text-zinc-500">
                {props.workspace.email} • {props.workspace.memberCount} members
              </div>
            </div>
          </div>
        </div>

        {/* Search (button) */}
        <div className="mb-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg bg-zinc-900/40 px-2 py-1.5 text-left text-sm text-zinc-400 hover:bg-zinc-900"
          >
            <FaSearch className="shrink-0" />
            <span className="truncate">Search</span>
          </button>
        </div>
        <SearchPopover
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          workspaceName={props.workspace.name}
        />

        {/* Quick items */}
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
          <FaHome className="text-lg" />
          Home
        </button>
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
          <GiArtificialIntelligence className="text-lg" />
          Sunforge AI
        </button>
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
          <IoIosMailUnread className="text-lg" />
          Inbox
        </button>
      </div>

      {/* Divider that appears only when scrolled */}
      <div
        className={cx(
          "shrink-0 border-t border-zinc-800 transition-opacity duration-200",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cx(
          "pointer-events-none -mt-2 h-2 shrink-0 transition-opacity duration-200",
          scrolled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))",
        }}
      />

      {/* Bottom: scrollable after Inbox */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto p-3 pr-2">
        {/* Favorites */}
        {hasFav && favTree.length > 0 && (
          <Section className="px-1" title="Favorites">
            {favTree.map((n) => (
              <Node
                key={n.id}
                node={n}
                depth={0}
                onNavigate={props.onNavigate}
                onCreateInside={props.onCreateInside}
                onRename={props.onRename}
                onTrash={props.onTrash}
                onToggleFavorite={props.onToggleFavorite}
                onOpenMenu={openMenu}
                expandedMap={expanded}
                setExpanded={setExpanded}
                onOpenNewPageDialog={(parent) =>
                  openNewPageFor(parent, "Favorites")
                }
              />
            ))}
            <div className="group flex items-center gap-2">
              <button
                className="flex items-center justify-center rounded-lg pl-5 text-[12px] font-medium text-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-zinc-500"
                onClick={() => openNewPageFor(null, "Favorites")}
              >
                Add new page
              </button>
            </div>
          </Section>
        )}

        {/* Private */}
        <Section
          className="px-1"
          title="Private"
          right={
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
                <PiDotsThreeOutlineFill className="text-lg" />
              </button>
            </div>
          }
        >
          {privTree.map((n) => (
            <Node
              key={n.id}
              node={n}
              depth={0}
              onNavigate={props.onNavigate}
              onCreateInside={props.onCreateInside}
              onRename={props.onRename}
              onTrash={props.onTrash}
              onToggleFavorite={props.onToggleFavorite}
              onOpenMenu={openMenu}
              expandedMap={expanded}
              setExpanded={setExpanded}
              onOpenNewPageDialog={(parent) =>
                openNewPageFor(parent, "Private")
              }
            />
          ))}
          <div className="group flex items-center gap-2">
            <button
              className="flex items-center justify-center rounded-lg pl-5 text-[12px] font-medium text-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-zinc-500"
              onClick={() => openNewPageFor(null, "Private")}
            >
              Add new page
            </button>
          </div>
        </Section>

        {/* Teamspaces */}
        <Section
          className="px-1"
          title="TeamSpaces"
          right={
            <div className="flex items-center">
              <button className="items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
                <PiDotsThreeOutlineFill className="text-lg" />
              </button>
            </div>
          }
        >
          {teamTree.map((n) => (
            <Node
              key={n.id}
              node={n}
              depth={0}
              onNavigate={props.onNavigate}
              onCreateInside={props.onCreateInside}
              onRename={props.onRename}
              onTrash={props.onTrash}
              onToggleFavorite={props.onToggleFavorite}
              onOpenMenu={openMenu}
              expandedMap={expanded}
              setExpanded={setExpanded}
              onOpenNewPageDialog={(parent) =>
                openNewPageFor(parent, "Teamspaces")
              }
            />
          ))}
          <div className="group flex items-center gap-2">
            <button
              className="flex items-center justify-center rounded-lg pl-5 text-[12px] font-medium text-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-zinc-500"
              onClick={() => openNewPageFor(null, "Teamspaces")}
            >
              Add new page
            </button>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-2 space-y-1 border-t border-zinc-800 pt-2">
          <button
            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40"
            onClick={() => setSettingsOpen(true)}
          >
            <FaGear className="text-sm" />
            Settings
          </button>
          <SettingsDialog
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            workspaceName={props.workspace.name}
            userName={props.workspace.name}
          />

          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
            <FaColumns className="text-sm" />
            Templates
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-500 hover:bg-zinc-900/40">
            <FaFolderOpen className="text-sm" />
            Import
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-500 hover:bg-zinc-900/40">
            <FaExternalLinkAlt className="text-sm" />
            All Updates
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-500 hover:bg-zinc-900/40">
            <FaTrashAlt className="text-sm" />
            Trash
          </button>
        </div>
      </div>

      {/* Context menu */}
      {menuFor && menuCoords && (
        <NodeMenu
          node={menuFor}
          coords={menuCoords}
          onClose={closeMenu}
          onActions={{
            onFavorite: props.onToggleFavorite,
            onCopyLink: (n) =>
              navigator.clipboard
                ?.writeText(location.origin + (n.path ?? ""))
                .catch(() => {}),
            onDuplicate: (n) => props.onCreateInside(n),
            onRename: (n) => {
              const next = window.prompt("Rename page", n.label) ?? n.label;
              if (next && next !== n.label) props.onRename(n, next);
            },
            onMoveTo: () => alert("Move To: TODO (hook modal)"),
            onTrash: props.onTrash,
            onOpenNew: (n) => window.open(n.path || "#", "_blank"),
            onOpenPeek: (n) => alert("Side peek: " + n.label),
            onSetAsTemplate: (n) => alert("Set as Template: " + n.label),
          }}
        />
      )}

      {/* New Page Dialog */}
      <NewPageDialog
        open={newPageOpen}
        onClose={() => setNewPageOpen(false)}
        addToLabel={newPageParent?.label ?? "Private"}
        onEmptyPage={() => {
          const p =
            newPageParent ??
            ({ id: "root-private", label: "Private", path: "/me" } as any);
          props.onCreateInside(p);
        }}
        onEmptyDatabase={() => {
          const p =
            newPageParent ??
            ({ id: "root-private", label: "Private", path: "/me" } as any);
          props.onCreateInside({ ...p, label: "Untitled database" });
        }}
        onBuildWithAI={() => {
          const p =
            newPageParent ??
            ({ id: "root-private", label: "Private", path: "/me" } as any);
          props.onCreateInside({ ...p, label: "AI Page" });
        }}
        templates={[
          {
            title: "Tasks Tracker",
            subtitle: "Stay organized with tasks, your way.",
            accent: "#183826",
            headerShade: "#14221b",
            columns: ["Task name", "Status", "Assignee"],
            rows: 3,
            pills: ["Not started", "In progress", "Done"],
            onUse: () => {
              const p =
                newPageParent ??
                ({ id: "root-private", label: "Private", path: "/me" } as any);
              props.onCreateInside({ ...p, label: "Tasks Tracker" });
            },
          },
          {
            title: "Projects",
            subtitle: "Manage projects start to finish.",
            accent: "#132d47",
            headerShade: "#0f2134",
            columns: ["Project", "Status", "Assignee"],
            rows: 3,
            pills: ["Planned", "Active", "Done"],
            onUse: () => {
              const p =
                newPageParent ??
                ({ id: "root-private", label: "Private", path: "/me" } as any);
              props.onCreateInside({ ...p, label: "Projects" });
            },
          },
          {
            title: "Document Hub",
            subtitle: "Collaborate on docs in one hub.",
            accent: "#3a1e1e",
            headerShade: "#2a1515",
            columns: ["Doc", "Status", "Owner"],
            rows: 3,
            pills: ["Draft", "Review", "Approved"],
            onUse: () => {
              const p =
                newPageParent ??
                ({ id: "root-private", label: "Private", path: "/me" } as any);
              props.onCreateInside({ ...p, label: "Document Hub" });
            },
          },
          {
            title: "Brainstorm Session",
            subtitle: "Spark new ideas together.",
            accent: "#3a2a12",
            headerShade: "#2b1e0c",
            columns: ["Idea", "Impact", "Owner"],
            rows: 3,
            pills: ["Low", "Medium", "High"],
            onUse: () => {
              const p =
                newPageParent ??
                ({ id: "root-private", label: "Private", path: "/me" } as any);
              props.onCreateInside({ ...p, label: "Brainstorm Session" });
            },
          },
        ]}
      />
    </div>
  );
}

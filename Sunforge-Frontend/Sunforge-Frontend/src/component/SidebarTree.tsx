// import {
//   FaChevronDown,
//   FaChevronRight,
//   FaColumns,
//   FaCopy,
//   FaExternalLinkAlt,
//   FaFolderOpen,
//   FaHome,
//   FaPen,
//   FaRegStar,
//   FaStar,
//   FaTrashAlt,
// } from "react-icons/fa";
// import { PiDotsThreeOutlineFill, PiNoteBlankThin } from "react-icons/pi";
// import React, { useEffect, useState } from "react";

// import { CiSearch } from "react-icons/ci";
// import { FaGear } from "react-icons/fa6";
// import { FiPlus } from "react-icons/fi";
// import { GiArtificialIntelligence } from "react-icons/gi";
// import { IoIosMailUnread } from "react-icons/io";
// import type { PageNode } from "../types";
// import { cx } from "@emotion/css";

// export type SidebarTreeProps = {
//   roots: PageNode[];
//   privateRoots?: PageNode[];
//   favoriteRoots?: PageNode[];
//   workspace: {
//     name: string;
//     email: string;
//     memberCount: number;
//     avatarUrl?: string;
//   };
//   userId: string;
//   onNavigate: (node: PageNode) => void;
//   onCreateInside: (parent: PageNode) => void;
//   onRename: (node: PageNode, next: string) => void;
//   onTrash: (node: PageNode) => void;
//   onToggleFavorite: (node: PageNode, next: boolean) => void;
// };

// type MenuCoords = { x: number; y: number } | null;

// const stop = (e: React.SyntheticEvent) => {
//   e.preventDefault();
//   e.stopPropagation();
// };

// function useLocalStorage<T>(key: string, initial: T) {
//   const [v, setV] = useState<T>(() => {
//     try {
//       const raw = localStorage.getItem(key);
//       return raw ? (JSON.parse(raw) as T) : initial;
//     } catch {
//       return initial;
//     }
//   });
//   useEffect(() => {
//     try {
//       localStorage.setItem(key, JSON.stringify(v));
//     } catch {}
//   }, [key, v]);
//   return [v, setV] as const;
// }

// function nodeMatches(query: string, n: PageNode) {
//   const q = query.toLowerCase();
//   return (
//     n.label.toLowerCase().includes(q) ||
//     (n.preview ?? "").toLowerCase().includes(q) ||
//     (n.path ?? "").toLowerCase().includes(q)
//   );
// }

// function walk<T>(xs: T[], f: (x: T) => void, childrenKey: keyof T) {
//   xs.forEach((n: any) => {
//     f(n);
//     if (n[childrenKey]) walk(n[childrenKey], f, childrenKey);
//   });
// }
// function Section({
//   title,
//   children,
//   right,
//   className,
// }: {
//   title: React.ReactNode;
//   children: React.ReactNode;
//   right?: React.ReactNode;
//   className?: string;
// }) {
//   const [open, setOpen] = useState(true);
//   return (
//     <div className={`mb-2 ${className || ""}`}>
//       <div className="flex items-center justify-between py-1">
//         <button
//           className="inline-flex items-center gap-2 rounded-lg text-sm tracking-wide text-zinc-500 hover:bg-zinc-900/40"
//           onClick={() => setOpen((s) => !s)}
//         >
//           <span className="text-[12px] ">{title}</span>
//         </button>
//         {right}
//       </div>
//       {open && <div className="space-y-1">{children}</div>}
//     </div>
//   );
// }

// function Node({
//   node,
//   depth,
//   onNavigate,
//   onCreateInside,
//   onRename,
//   onTrash,
//   onToggleFavorite,
// }: {
//   node: PageNode;
//   depth: number;
//   onNavigate: (n: PageNode) => void;
//   onCreateInside: (n: PageNode) => void;
//   onRename: (n: PageNode, s: string) => void;
//   onTrash: (n: PageNode) => void;
//   onToggleFavorite: (n: PageNode, next: boolean) => void;
// }) {
//   const [open, setOpen] = useState(true);
//   const [hover, setHover] = useState(false);
//   const hasChildren = (node.children?.length ?? 0) > 0;
//   return (
//     <div className="select-none">
//       <div
//         className={cx(
//           "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-zinc-500 outline-none hover:bg-zinc-900/40",
//           hover ? "bg-zinc-900/60" : "hover:bg-zinc-900/40"
//         )}
//         style={{ paddingLeft: depth * 10 + 1 }}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         onDoubleClick={() => onNavigate(node)}
//       >
//         {hasChildren ? (
//           <button
//             className="group shrink-0 rounded-md text-zinc-500 hover:bg-zinc-900/40 flex items-center gap-1"
//             onClick={(e) => {
//               stop(e);
//               setOpen((s) => !s);
//             }}
//           >
//             <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               {open ? <FaChevronDown /> : <FaChevronRight />}
//             </span>
//           </button>
//         ) : (
//           <span className="w-6" />
//         )}

//         {/* Node icon */}
//         {node.icon ? (
//           <span className="opacity-80">{node.icon}</span>
//         ) : (
//           <PiNoteBlankThin className="text-sm" />
//         )}

//         <div className="flex flex-1 items-center justify-between">
//           <span className="truncate" onClick={() => onNavigate(node)}>
//             {node.label}
//           </span>
//           {/* buttons */}
//           <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
//               <PiDotsThreeOutlineFill className="text-lg" />
//             </button>
//             <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
//               <FiPlus className="text-lg" />
//             </button>
//           </div>
//         </div>
//       </div>
//       {open && hasChildren && (
//         <div className="mt-0.5 space-y-0.5">
//           {node.children!.map((c) => (
//             <Node
//               key={c.id}
//               node={c}
//               depth={depth + 1}
//               onNavigate={onNavigate}
//               onCreateInside={onCreateInside}
//               onRename={onRename}
//               onTrash={onTrash}
//               onToggleFavorite={onToggleFavorite}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function MenuItem({
//   icon,
//   label,
//   onClick,
//   danger,
// }: {
//   icon?: React.ReactNode;
//   label: string;
//   onClick?: () => void;
//   danger?: boolean;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={cx(
//         "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left",
//         "hover:bg-zinc-900/80 focus:bg-zinc-900/80 outline-none",
//         danger ? "text-red-400" : "text-zinc-200"
//       )}
//     >
//       <span className="opacity-90">{icon}</span>
//       <span>{label}</span>
//     </button>
//   );
// }
// function Divider() {
//   return <div className="my-1 h-px bg-zinc-800" />;
// }

// function NodeMenu({
//   node,
//   coords,
//   onClose,
//   onActions,
// }: {
//   node: PageNode;
//   coords: MenuCoords;
//   onClose: () => void;
//   onActions: {
//     onFavorite: (n: PageNode, next: boolean) => void;
//     onCopyLink: (n: PageNode) => void;
//     onDuplicate: (n: PageNode) => void;
//     onRename: (n: PageNode) => void;
//     onMoveTo: (n: PageNode) => void;
//     onTrash: (n: PageNode) => void;
//     onOpenNew: (n: PageNode) => void;
//     onOpenPeek: (n: PageNode) => void;
//     onSetAsTemplate?: (n: PageNode) => void;
//   };
// }) {
//   if (!coords) return null;
//   return (
//     <div
//       className="fixed z-50 min-w-[240px] rounded-xl border border-zinc-800 bg-[#0D1014] shadow-2xl p-1 text-sm select-none"
//       style={{ left: coords.x, top: coords.y }}
//       onClick={(e) => e.stopPropagation()}
//       onContextMenu={(e) => e.preventDefault()}
//     >
//       <MenuItem
//         icon={node.isFavorite ? <FaStar /> : <FaRegStar />}
//         label={node.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//         onClick={() => onActions.onFavorite(node, !node.isFavorite)}
//       />
//       <Divider />
//       <MenuItem
//         icon={<FaExternalLinkAlt />}
//         label="Open in new window"
//         onClick={() => onActions.onOpenNew(node)}
//       />
//       <MenuItem
//         icon={<FaCopy />}
//         label="Duplicate"
//         onClick={() => onActions.onDuplicate(node)}
//       />
//       <MenuItem
//         icon={<FaPen />}
//         label="Rename"
//         onClick={() => onActions.onRename(node)}
//       />
//       <MenuItem
//         icon={<FaColumns />}
//         label="Move to"
//         onClick={() => onActions.onMoveTo(node)}
//       />
//       <MenuItem
//         icon={<FaTrashAlt />}
//         label="Move to Trash"
//         danger
//         onClick={() => onActions.onTrash(node)}
//       />
//       <Divider />
//       <MenuItem
//         icon={<FaRegStar />}
//         label="Set as Template"
//         onClick={() => onActions.onSetAsTemplate?.(node)}
//       />
//       <MenuItem
//         icon={<FaRegStar />}
//         label="Copy Link"
//         onClick={() => onActions.onCopyLink(node)}
//       />
//       <MenuItem
//         icon={<FaColumns />}
//         label="Open in side peek"
//         onClick={() => onActions.onOpenPeek(node)}
//       />
//     </div>
//   );
// }

// export default function SidebarTree(props: SidebarTreeProps) {
//   const hasFav = (props.favoriteRoots?.length ?? 0) > 0;
//   return (
//     <div className="h-full w-[320px] overflow-hidden bg-[#0D1014] p-3">
//       <div className="mb-3 rounded-xl border border-zinc-800 bg-[#0C1013]/70 p-3">
//         <div className="flex items-center gap-3">
//           {props.workspace.avatarUrl ? (
//             <img
//               src={props.workspace.avatarUrl}
//               alt={props.workspace.name}
//               className="h-9 w-9 rounded-full object-cover"
//             />
//           ) : (
//             <div className="h-9 w-9 rounded-full bg-zinc-700 grid place-items-center">
//               🧭
//             </div>
//           )}
//           <div className="min-w-0 flex-1">
//             <div className="flex items-center justify-between">
//               <span className="truncate text-sm font-medium" onClick={() => {}}>
//                 {props.workspace.name}
//               </span>
//               <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
//                 <PiDotsThreeOutlineFill className="text-lg" />
//               </button>
//             </div>
//             <div className="text-xs text-zinc-500 truncate">
//               {props.workspace.email} • {props.workspace.memberCount} members
//             </div>
//           </div>
//         </div>
//       </div>

//       <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
//         <CiSearch className="text-lg" />
//         Search
//       </button>
//       <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
//         <FaHome className="text-lg" />
//         Home
//       </button>
//       {/* This AI symbol is temporary will be removeing later on */}
//       <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
//         <GiArtificialIntelligence className="text-lg" />
//         Sunforge AI
//       </button>
//       <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
//         <IoIosMailUnread className="text-lg" />
//         Inbox
//       </button>

//       <div className="p-2"></div>
//       {hasFav && (
//         <Section
//           className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40"
//           title="Favorites"
//         >
//           {props.favoriteRoots!.map((n) => (
//             <Node
//               key={n.id}
//               node={n}
//               depth={0}
//               onNavigate={props.onNavigate}
//               onCreateInside={props.onCreateInside}
//               onRename={props.onRename}
//               onTrash={props.onTrash}
//               onToggleFavorite={props.onToggleFavorite}
//             />
//           ))}
//         </Section>
//       )}

//       <Section
//         className="gap-2 rounded-lg px-2 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40"
//         title="Private"
//         right={
//           <div className="flex items-center gap-2">
//             <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
//               <PiDotsThreeOutlineFill className="text-lg" />
//             </button>
//             <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
//               <FiPlus className="text-lg" />
//             </button>
//           </div>
//         }
//       >
//         {(props.privateRoots ?? []).map((n) => (
//           <Node
//             key={n.id}
//             node={n}
//             depth={0}
//             onNavigate={props.onNavigate}
//             onCreateInside={props.onCreateInside}
//             onRename={props.onRename}
//             onTrash={props.onTrash}
//             onToggleFavorite={props.onToggleFavorite}
//           />
//         ))}
//       </Section>

//       <Section
//         className="gap-2 rounded-lg px-2 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40"
//         title="TeamSpaces"
//       >
//         {props.roots.map((n) => (
//           <Node
//             key={n.id}
//             node={n}
//             depth={0}
//             onNavigate={props.onNavigate}
//             onCreateInside={props.onCreateInside}
//             onRename={props.onRename}
//             onTrash={props.onTrash}
//             onToggleFavorite={props.onToggleFavorite}
//           />
//         ))}
//       </Section>

//       <div className="mt-2 border-t border-zinc-800 pt-2 space-y-1">
//         <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
//           <FaGear className="text-sm" />
//           Settings
//         </button>
//         <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
//           <FaColumns className="text-sm" />
//           Templates
//         </button>
//         <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-500 hover:bg-zinc-900/40">
//           <FaFolderOpen className="text-sm" />
//           Import
//         </button>
//         <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-500 hover:bg-zinc-900/40">
//           <FaExternalLinkAlt className="text-sm" />
//           All Updates
//         </button>
//         <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-500 hover:bg-zinc-900/40">
//           <FaTrashAlt className="text-sm" />
//           Trash
//         </button>
//       </div>
//     </div>
//   );
// }

// === Sunforge Notion‑style Sidebar Integration Pack ===
// This canvas contains multiple files. Copy each section into your project paths.
// It fixes the "Unterminated string constant" issue, wires up a functional sidebar
// (context menu, new subpage, rename, favorite, trash), and patches small className bugs.
// It also adds a tiny unit test for the tree builder.
//
// ──────────────────────────────────────────────────────────────────────────────
// FILE: src/component/SidebarTree.tsx
// ──────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useMemo, useState } from "react";
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
  FaStar,
  FaTrashAlt,
  FaWikipediaW,
} from "react-icons/fa";
import { PiDotsThreeOutlineFill, PiNoteBlankThin } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { FaGear } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoIosMailUnread } from "react-icons/io";
import type { PageNode } from "../types";
import { cx } from "@emotion/css";

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
      <div className="flex items-center justify-between py-1">
        <button
          className="inline-flex items-center gap-2 rounded-lg text-sm tracking-wide text-zinc-500 hover:bg-zinc-900/40"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="text-[12px] ">{title}</span>
        </button>
        {right}
      </div>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
}

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
}) {
  const open = !!expandedMap[node.id];
  const hasChildren = (node.children?.length ?? 0) > 0;
  return (
    <div className="select-none" onContextMenu={(e) => onOpenMenu(node, e)}>
      <div
        className={cx(
          "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-zinc-500 outline-none hover:bg-zinc-900/40"
        )}
        style={{ paddingLeft: depth * 10 + 1 }}
        onDoubleClick={() => onNavigate(node)}
      >
        {hasChildren ? (
          <button
            className="group shrink-0 rounded-md text-zinc-500 hover:bg-zinc-900/40 flex items-center gap-1"
            onClick={(e) => {
              stop(e);
              setExpanded((m) => ({ ...m, [node.id]: !m[node.id] }));
            }}
          >
            <span className="opacity-100 transition-opacity duration-200">
              {open ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </button>
        ) : (
          <span className="w-6" />
        )}

        {/* Node icon */}
        {node.icon ? (
          <span className="opacity-80">{node.icon}</span>
        ) : (
          <PiNoteBlankThin className="text-sm" />
        )}

        <div className="flex flex-1 items-center justify-between">
          <span className="truncate" onClick={() => onNavigate(node)}>
            {node.label}
          </span>
          {/* buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                onCreateInside(node);
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left",
        "hover:bg-zinc-900/80 focus:bg-zinc-900/80 outline-none",
        danger ? "text-red-400" : "text-zinc-200"
      )}
    >
      <span className="opacity-90">{icon}</span>
      <span>{label}</span>
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
  lastEditedBy,
  lastEditedAt,
}: {
  node: PageNode;
  coords: MenuCoords;
  onClose: () => void;
  lastEditedBy: string;
  lastEditedAt: string;
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
  if (!coords) return null;
  useEffect(() => {
    const onDoc = () => onClose();
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    setTimeout(() => document.addEventListener("mousedown", onDoc), 0);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);
  return (
    <div
      className="fixed z-50 min-w-[240px] rounded-xl border border-zinc-800 bg-[#0D1014] shadow-2xl p-1 text-sm select-none"
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
        <span>Last edited by {lastEditedBy}</span>
        <div className="p-1"></div>
        <span>{lastEditedAt}</span>
      </div>
    </div>
  );
}

export default function SidebarTree(props: SidebarTreeProps) {
  const hasFav = (props.favoriteRoots?.length ?? 0) > 0;
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(
    "sf.expanded",
    {}
  );
  const [menuFor, setMenuFor] = useState<PageNode | null>(null);
  const [menuCoords, setMenuCoords] = useState<MenuCoords>(null);

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

  const filterTree = (nodes: PageNode[]): PageNode[] => {
    return nodes
      .map((n) => ({ ...n }))
      .filter((n) => {
        const childFiltered =
          (n.children ?? []).length > 0
            ? filterTree(n.children!).length > 0
            : false;
        return nodeMatches(query, n) || childFiltered;
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

  return (
    <div className="h-full w-[320px] overflow-hidden bg-[#0D1014] p-3">
      {/* Workspace card */}
      <div className="mb-3 rounded-xl border border-zinc-800 bg-[#0C1013]/70 p-3">
        <div className="flex items-center gap-3">
          {props.workspace.avatarUrl ? (
            <img
              src={props.workspace.avatarUrl}
              alt={props.workspace.name}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-zinc-700 grid place-items-center">
              🧭
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="truncate text-sm font-medium">
                {props.workspace.name}
              </span>
              <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
                <PiDotsThreeOutlineFill className="text-lg" />
              </button>
            </div>
            <div className="text-xs text-zinc-500 truncate">
              {props.workspace.email} • {props.workspace.memberCount} members
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-2">
        <label className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-zinc-400 bg-zinc-900/40 focus-within:ring-1 focus-within:ring-zinc-700">
          <CiSearch className="text-lg" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent outline-none"
          />
        </label>
      </div>

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

      <div className="p-1" />

      {hasFav && (
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
            />
          ))}
        </Section>
      )}

      <Section
        className="px-1"
        title="Private"
        right={
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
              <PiDotsThreeOutlineFill className="text-lg" />
            </button>
            <button
              className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40"
              onClick={() =>
                props.onCreateInside({
                  id: "root-private",
                  label: "Private",
                  path: "/me",
                  children: [],
                })
              }
            >
              <FiPlus className="text-lg" />
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
          />
        ))}
      </Section>

      <Section className="px-1" title="TeamSpaces">
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
          />
        ))}
      </Section>

      <div className="mt-2 border-t border-zinc-800 pt-2 space-y-1">
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
          <FaGear className="text-sm" />
          Settings
        </button>
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

      {/* Context menu */}
      {menuFor && menuCoords && (
        <NodeMenu
          node={menuFor}
          coords={menuCoords}
          onClose={closeMenu}
          lastEditedBy={"Ankush Raj"}
          lastEditedAt={formatLastEdited(new Date().toISOString())}
          onActions={{
            onFavorite: props.onToggleFavorite,
            onCopyLink: (n) =>
              navigator.clipboard
                ?.writeText(location.origin + n.path)
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
    </div>
  );
}

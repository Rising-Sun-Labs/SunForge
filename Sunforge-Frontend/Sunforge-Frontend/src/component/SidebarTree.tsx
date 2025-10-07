import {
  FaChevronDown,
  FaChevronRight,
  FaColumns,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaHome,
  FaTrashAlt,
} from "react-icons/fa";
import { PiDotsThreeOutlineFill, PiNoteBlankThin } from "react-icons/pi";
import React, { useState } from "react";

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

const stop = (e: React.SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

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

// function Tooltip({
//   content,
//   children,
// }: {
//   content: React.ReactNode;
//   children: React.ReactNode;
// }) {
//   const [o, setO] = useState(false);
//   return (
//     <span
//       className="relative"
//       onMouseEnter={() => setO(true)}
//       onMouseLeave={() => setO(false)}
//     >
//       {children}
//       {o && (
//         <div className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-zinc-500 shadow-lg mt-1 border border-zinc-800">
//           {content}
//         </div>
//       )}
//     </span>
//   );
// }

function Node({
  node,
  depth,
  onNavigate,
  onCreateInside,
  onRename,
  onTrash,
  onToggleFavorite,
}: {
  node: PageNode;
  depth: number;
  onNavigate: (n: PageNode) => void;
  onCreateInside: (n: PageNode) => void;
  onRename: (n: PageNode, s: string) => void;
  onTrash: (n: PageNode) => void;
  onToggleFavorite: (n: PageNode, next: boolean) => void;
}) {
  const [open, setOpen] = useState(true);
  const [hover, setHover] = useState(false);
  const hasChildren = (node.children?.length ?? 0) > 0;
  return (
    <div className="select-none">
      <div
        className={cx(
          "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-zinc-500 outline-none hover:bg-zinc-900/40",
          hover ? "bg-zinc-900/60" : "hover:bg-zinc-900/40"
        )}
        style={{ paddingLeft: depth * 10 + 1 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onDoubleClick={() => onNavigate(node)}
      >
        {hasChildren ? (
          <button
            className="group shrink-0 rounded-md text-zinc-500 hover:bg-zinc-900/40 flex items-center gap-1"
            onClick={(e) => {
              stop(e);
              setOpen((s) => !s);
            }}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
            <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
              <PiDotsThreeOutlineFill className="text-lg" />
            </button>
            <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SidebarTree(props: SidebarTreeProps) {
  const hasFav = (props.favoriteRoots?.length ?? 0) > 0;
  return (
    <div className="h-full w-[320px] overflow-hidden bg-[#0D1014] p-3">
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
              <span className="truncate text-sm font-medium" onClick={() => {}}>
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

      <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
        <CiSearch className="text-lg" />
        Search
      </button>
      <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
        <FaHome className="text-lg" />
        Home
      </button>
      {/* This AI symbol is temporary will be removeing later on */}
      <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
        <GiArtificialIntelligence className="text-lg" />
        Sunforge AI
      </button>
      <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40">
        <IoIosMailUnread className="text-lg" />
        Inbox
      </button>

      <div className="p-2"></div>
      {hasFav && (
        <Section
          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40"
          title="Favorites"
        >
          {props.favoriteRoots!.map((n) => (
            <Node
              key={n.id}
              node={n}
              depth={0}
              onNavigate={props.onNavigate}
              onCreateInside={props.onCreateInside}
              onRename={props.onRename}
              onTrash={props.onTrash}
              onToggleFavorite={props.onToggleFavorite}
            />
          ))}
        </Section>
      )}

      <Section
        className="gap-2 rounded-lg px-2 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40"
        title="Private"
        right={
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
              <PiDotsThreeOutlineFill className="text-lg" />
            </button>
            <button className="flex items-center justify-center rounded-lg p-1 text-zinc-500 hover:bg-zinc-900/40">
              <FiPlus className="text-lg" />
            </button>
          </div>
        }
      >
        {(props.privateRoots ?? []).map((n) => (
          <Node
            key={n.id}
            node={n}
            depth={0}
            onNavigate={props.onNavigate}
            onCreateInside={props.onCreateInside}
            onRename={props.onRename}
            onTrash={props.onTrash}
            onToggleFavorite={props.onToggleFavorite}
          />
        ))}
      </Section>

      <Section
        className="gap-2 rounded-lg px-2 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900/40"
        title="TeamSpaces"
      >
        {props.roots.map((n) => (
          <Node
            key={n.id}
            node={n}
            depth={0}
            onNavigate={props.onNavigate}
            onCreateInside={props.onCreateInside}
            onRename={props.onRename}
            onTrash={props.onTrash}
            onToggleFavorite={props.onToggleFavorite}
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
    </div>
  );
}

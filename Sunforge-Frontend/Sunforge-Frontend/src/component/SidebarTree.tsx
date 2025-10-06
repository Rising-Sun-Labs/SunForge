import React, { useState } from "react";
import { cx } from "@emotion/css";
import {
  FaChevronDown,
  FaChevronRight,
  FaEllipsisH,
  FaPlus,
  FaRegStar,
  FaStar,
  FaTrashAlt,
  FaPen,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaColumns,
} from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoIosMailUnread } from "react-icons/io";
import type { PageNode } from "../types";

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
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between px-2 py-1">
        <button
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-500 hover:text-zinc-300"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? (
            <FaChevronDown className="opacity-70" />
          ) : (
            <FaChevronRight className="opacity-70" />
          )}
          <span>{title}</span>
        </button>
        {right}
      </div>
      {open && <div className="space-y-1 px-1">{children}</div>}
    </div>
  );
}

function Tooltip({
  content,
  children,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
}) {
  const [o, setO] = useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setO(true)}
      onMouseLeave={() => setO(false)}
    >
      {children}
      {o && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-zinc-200 shadow-lg mt-1 border border-zinc-800">
          {content}
        </div>
      )}
    </span>
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
          "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-zinc-200 outline-none",
          hover ? "bg-zinc-900/60" : "hover:bg-zinc-900/40"
        )}
        style={{ paddingLeft: depth * 12 + 8 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onDoubleClick={() => onNavigate(node)}
      >
        {hasChildren ? (
          <button
            className="shrink-0 rounded-md p-1 hover:bg-zinc-800"
            onClick={(e) => {
              stop(e);
              setOpen((s) => !s);
            }}
          >
            {open ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        ) : (
          <span className="w-6" />
        )}
        {node.icon && <span className="opacity-80">{node.icon}</span>}
        <span className="truncate" onClick={() => onNavigate(node)}>
          {node.label}
        </span>
        <div className="ml-auto hidden items-center gap-1 group-hover:flex">
          <Tooltip content="Favorite">
            <button
              className="rounded-md p-1 hover:bg-zinc-800"
              onClick={(e) => {
                stop(e);
                onToggleFavorite(node, !node.isFavorite);
              }}
            >
              {node.isFavorite ? <FaStar /> : <FaRegStar />}
            </button>
          </Tooltip>
          <Tooltip content="New inside">
            <button
              className="rounded-md p-1 hover:bg-zinc-800"
              onClick={(e) => {
                stop(e);
                onCreateInside(node);
              }}
            >
              <FaPlus />
            </button>
          </Tooltip>
          <Tooltip content="Rename">
            <button
              className="rounded-md p-1 hover:bg-zinc-800"
              onClick={(e) => {
                stop(e);
                const next = prompt("Rename", node.label);
                if (next && next.trim()) onRename(node, next.trim());
              }}
            >
              <FaPen />
            </button>
          </Tooltip>
          <Tooltip content="Delete">
            <button
              className="rounded-md p-1 hover:bg-zinc-800 text-red-400"
              onClick={(e) => {
                stop(e);
                onTrash(node);
              }}
            >
              <FaTrashAlt />
            </button>
          </Tooltip>
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
            <div className="text-sm font-medium truncate">
              {props.workspace.name}
            </div>
            <div className="text-xs text-zinc-500 truncate">
              {props.workspace.email} • {props.workspace.memberCount} members
            </div>
          </div>
        </div>
      </div>

      <Section title="Quick Find">
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-zinc-900/40">
          <CiSearch />
          Search
        </button>
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-zinc-900/40">
          <IoIosMailUnread />
          Updates
        </button>
      </Section>

      {hasFav && (
        <Section title="Favorites">
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

      <Section title="Private">
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
        title="TeamSpaces"
        right={
          <button className="rounded-md p-1 hover:bg-zinc-800">
            <FaEllipsisH />
          </button>
        }
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
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-zinc-900/40">
          <FaColumns />
          Templates
        </button>
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-zinc-900/40">
          <FaFolderOpen />
          Import
        </button>
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-zinc-900/40">
          <FaExternalLinkAlt />
          All Updates
        </button>
        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-zinc-900/40">
          <FaTrashAlt />
          Trash
        </button>
      </div>
    </div>
  );
}

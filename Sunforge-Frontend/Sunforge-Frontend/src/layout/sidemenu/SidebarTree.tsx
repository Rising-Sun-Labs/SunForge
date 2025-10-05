import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { cx } from "@emotion/css";
import { BsActivity } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoIosMailUnread } from "react-icons/io";
import {
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaStar,
  FaRegStar,
  FaLink,
  FaCopy,
  FaPen,
  FaFolderOpen,
  FaTrashAlt,
  FaGlobe,
  FaExternalLinkAlt,
  FaColumns,
  FaEllipsisH,
  FaUserCircle,
  FaUsers,
  FaCog,
  FaUserPlus,
  FaSignOutAlt,
  FaPlusCircle,
  FaInbox,
  FaCubes,
} from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";

/* ---------------- Types ---------------- */
export type PageNode = {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactElement;
  children?: PageNode[];
  lastEditedBy?: string;
  lastEditedAt?: string;
  isFavorite?: boolean;
  isWiki?: boolean;
};

export type SidebarTreeProps = {
  roots: PageNode[];
  privateRoots?: PageNode[];
  favoriteRoots?: PageNode[];

  currentWorkspaceName?: string;
  memberCount?: number;
  email?: string;
  avatarUrl?: string;

  onNavigate?: (node: PageNode) => void;
  onCreateInside?: (parent: PageNode) => PageNode | void;
  onDuplicate?: (node: PageNode) => PageNode | void;
  onRename?: (node: PageNode, nextLabel: string) => void;
  onMoveTo?: (node: PageNode) => void;
  onTrash?: (node: PageNode) => void;
  onCopyLink?: (node: PageNode) => void;
  onToggleWiki?: (node: PageNode, next: boolean) => void;
  onOpenInNewTab?: (node: PageNode) => void;
  onOpenInSidePeek?: (node: PageNode) => void;
  onToggleFavorite?: (node: PageNode, next: boolean) => void;
  onCreateWorkspace?: () => void;
  onJoinWorkspace?: () => void;
  onCreateWorkspaceFromAccount?: () => void;
  onSwitchWorkspace?: (name: string) => void;
  onAnotherAccount?: () => void;
  onLogout?: () => void;
};

/* ---------------- Utils ---------------- */
const formatEditedFooter = (by?: string, at?: string) =>
  `Last edited by ${by ?? "Username"} ${at ?? "Today at 12:20 PM"}`;
const stop = (e: React.SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
type MenuCoords = { x: number; y: number } | null;

/* ---------------- Tooltip (simple) ---------------- */
function Tooltip({
  content,
  children,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0f1318] px-2 py-1 text-xs text-zinc-200 shadow-lg mt-1 border border-[var(--sf-border)]">
          {content}
        </div>
      )}
    </span>
  );
}

/* ---------------- Menus ---------------- */
function Divider() {
  return <div className="my-1 h-px bg-[var(--sf-border)]" />;
}
function Footer({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1 text-[11px] text-zinc-500">{children}</div>;
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
        "hover:bg-[var(--sf-hover)] focus:bg-[var(--sf-hover)]",
        danger ? "text-red-400" : "text-zinc-200"
      )}
    >
      <span className="opacity-90">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

type NodeMenuProps = {
  node: PageNode;
  coords: MenuCoords;
  onClose: () => void;
  actions: Required<
    Pick<
      SidebarTreeProps,
      | "onCopyLink"
      | "onDuplicate"
      | "onRename"
      | "onMoveTo"
      | "onTrash"
      | "onToggleWiki"
      | "onOpenInNewTab"
      | "onOpenInSidePeek"
      | "onToggleFavorite"
    >
  > & { onCreateInside: NonNullable<SidebarTreeProps["onCreateInside"]> };
};
function NodeMenu({ node, coords, onClose, actions }: NodeMenuProps) {
  if (!coords) return null;
  return (
    <div
      className="fixed z-50 min-w-[240px] rounded-xl border border-[var(--sf-border)] bg-[var(--sf-panel)] shadow-2xl p-1 text-sm select-none"
      style={{ left: coords.x, top: coords.y }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <MenuItem
        icon={node.isFavorite ? <FaStar /> : <FaRegStar />}
        label={node.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onClick={() => actions.onToggleFavorite(node, !node.isFavorite)}
      />
      <Divider />
      <MenuItem
        icon={<FaLink />}
        label="Copy link"
        onClick={() => actions.onCopyLink(node)}
      />
      <MenuItem
        icon={<FaCopy />}
        label="Duplicate"
        onClick={() => actions.onDuplicate(node)}
      />
      <MenuItem
        icon={<FaPen />}
        label="Rename"
        onClick={() => {
          const next = prompt("Rename page", node.label);
          if (next && next.trim()) actions.onRename(node, next.trim());
        }}
      />
      <MenuItem
        icon={<FaFolderOpen />}
        label="Move to"
        onClick={() => actions.onMoveTo(node)}
      />
      <MenuItem
        icon={<FaTrashAlt />}
        label="Move to Trash"
        danger
        onClick={() => actions.onTrash(node)}
      />
      <Divider />
      <MenuItem
        icon={<FaGlobe />}
        label={node.isWiki ? "Turn off wiki" : "Turn into wiki"}
        onClick={() => actions.onToggleWiki(node, !node.isWiki)}
      />
      <Divider />
      <MenuItem
        icon={<FaExternalLinkAlt />}
        label="Open in new tab"
        onClick={() => actions.onOpenInNewTab(node)}
      />
      <MenuItem
        icon={<FaColumns />}
        label="Open in side peek"
        onClick={() => actions.onOpenInSidePeek(node)}
      />
      <Divider />
      <Footer>
        {formatEditedFooter(node.lastEditedBy, node.lastEditedAt)}
      </Footer>
      <div className="pt-1" />
      <button
        className="w-full mt-1 rounded-lg bg-[var(--sf-hover)] hover:bg-[var(--sf-hover-strong)] text-zinc-300 py-2 text-xs"
        onClick={() => actions.onCreateInside(node)}
      >
        ... Create page inside
      </button>
      <button
        className="w-full mt-1 rounded-lg bg-[var(--sf-hover)] hover:bg-[var(--sf-hover-strong)] text-zinc-300 py-2 text-xs"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

/* ---------------- Tree Node ---------------- */
type TreeNodeProps = {
  node: PageNode;
  depth: number;
  onNavigate?: SidebarTreeProps["onNavigate"];
  requestContextMenu: (
    node: PageNode,
    coords: { x: number; y: number }
  ) => void;
  onCreateInside?: SidebarTreeProps["onCreateInside"];
  onRename?: SidebarTreeProps["onRename"];
  selectedId?: string;
  setSelectedId?: (id: string) => void;
};

function TreeNode({
  node,
  depth,
  onNavigate,
  requestContextMenu,
  onCreateInside,
  onRename,
  selectedId,
  setSelectedId,
}: TreeNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const hasChildren = (node.children?.length ?? 0) > 0;
  const selected = selectedId === node.id;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setExpanded(true);
    if (e.key === "ArrowLeft") setExpanded(false);
    if (e.key === "Enter" && !editing) {
      setSelectedId?.(node.id);
      onNavigate?.(node);
    }
  };

  return (
    <div className="select-none">
      <div
        className={cx(
          "group flex items-center gap-2 rounded-md px-2 text-zinc-200 outline-none",
          "h-[28px]",
          selected
            ? "bg-[var(--sf-hover)]"
            : hover
            ? "bg-[var(--sf-hover)]"
            : "hover:bg-[var(--sf-hover)]"
        )}
        style={{ paddingLeft: depth * 12 + 8 }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onDoubleClick={() => setEditing(true)}
        onClick={(e) => {
          if (!editing) {
            setSelectedId?.(node.id);
            onNavigate?.(node);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          requestContextMenu(node, { x: e.clientX, y: e.clientY });
        }}
      >
        {hasChildren ? (
          <button
            className="shrink-0 rounded-md p-1 hover:bg-[var(--sf-hover-strong)]"
            onClick={(e) => {
              stop(e);
              setExpanded((s) => !s);
            }}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        ) : (
          <span className="w-6" />
        )}

        {node.icon && <span className="opacity-80">{node.icon}</span>}

        {editing ? (
          <input
            ref={inputRef}
            defaultValue={node.label}
            className="min-w-0 flex-1 bg-transparent outline-none border-b border-transparent focus:border-[var(--sf-border)]"
            onBlur={(e) => {
              setEditing(false);
              const v = e.currentTarget.value.trim();
              if (v && v !== node.label) onRename?.(node, v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                (e.currentTarget as HTMLInputElement).blur();
              if (e.key === "Escape") {
                (e.target as HTMLInputElement).value = node.label;
                (e.currentTarget as HTMLInputElement).blur();
              }
            }}
          />
        ) : (
          <span className="truncate">{node.label}</span>
        )}

        <div className="ml-auto hidden items-center gap-1 group-hover:flex">
          <Tooltip content="Create page inside">
            <button
              className="rounded-md p-1 hover:bg-[var(--sf-hover-strong)]"
              onClick={(e) => {
                stop(e);
                onCreateInside?.(node);
              }}
            >
              <FaEllipsisH />
            </button>
          </Tooltip>
          <Tooltip content="More options">
            <button
              className="rounded-md p-1 hover:bg-[var(--sf-hover-strong)]"
              onClick={(e) => {
                stop(e);
                requestContextMenu(node, {
                  x: (e as any).clientX ?? 0,
                  y:
                    (e as any).clientY ??
                    e.currentTarget.getBoundingClientRect().bottom + 6,
                });
              }}
            >
              <FaFolderOpen />
            </button>
          </Tooltip>
        </div>
      </div>

      {expanded && hasChildren && (
        <div className="space-y-0.5">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onNavigate={onNavigate}
              requestContextMenu={requestContextMenu}
              onCreateInside={onCreateInside}
              onRename={onRename}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Account Menu ---------------- */
function AccountMenu({
  coords,
  onClose,
  workspaces,
  onSelectWorkspace,
  onJoin,
  onCreate,
  onAnotherAccount,
  onLogout,
}: {
  coords: MenuCoords;
  onClose: () => void;
  workspaces: string[];
  onSelectWorkspace: (name: string) => void;
  onJoin: () => void;
  onCreate: () => void;
  onAnotherAccount: () => void;
  onLogout: () => void;
}) {
  if (!coords) return null;
  return (
    <div
      className="fixed z-50 min-w-[260px] rounded-xl border border-[var(--sf-border)] bg-[var(--sf-panel)] shadow-2xl p-1 text-sm select-none"
      style={{ left: coords.x, top: coords.y }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
        Your TeamSpaces
      </div>
      {workspaces.map((w) => (
        <button
          key={w}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
          onClick={() => {
            onSelectWorkspace(w);
            onClose();
          }}
        >
          <MdHomeWork className="opacity-80" />
          <span className="truncate">{w}</span>
        </button>
      ))}
      <button
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
        onClick={() => {
          onCreate();
          onClose();
        }}
      >
        <FaPlusCircle className="opacity-80" />
        <span>Add new TeamSpace</span>
      </button>
      <Divider />
      <button
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
        onClick={() => {
          onJoin();
          onClose();
        }}
      >
        <span className="opacity-90">+</span>
        <span>Join TeamSpace</span>
      </button>
      <button
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
        onClick={() => {
          onAnotherAccount();
          onClose();
        }}
      >
        <FaUserCircle className="opacity-80" />
        <span>Another account</span>
      </button>
      <button
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-red-400 hover:bg-[var(--sf-hover)]"
        onClick={() => {
          onLogout();
          onClose();
        }}
      >
        <FaSignOutAlt />
        <span>Log out</span>
      </button>
    </div>
  );
}

/* ---------------- Profile Header (popover; no layout shift) ---------------- */
function ProfileHeader({
  name,
  memberCount,
  email,
  avatarUrl,
  onOpenAccountMenu,
}: {
  name: string;
  memberCount: number;
  email: string;
  avatarUrl?: string;
  onOpenAccountMenu: (coords: MenuCoords) => void;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<MenuCoords>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  const openPopover = () => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (rect) setCoords({ x: rect.left, y: rect.bottom + 6 });
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
    setCoords(null);
  };

  return (
    <div className="mb-3 rounded-xl border border-[var(--sf-border)] bg-[var(--sf-panel)]/90 p-3">
      <div ref={anchorRef} className="flex items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="h-9 w-9 opacity-90" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <button
              className="truncate text-left text-sm text-zinc-100 font-medium hover:text-zinc-50"
              onClick={open ? closePopover : openPopover}
            >
              {name}
            </button>
            <Tooltip
              content={open ? "Hide workspace info" : "Show workspace info"}
            >
              <button
                className="rounded-md p-1 hover:bg-[var(--sf-hover)]"
                onClick={open ? closePopover : openPopover}
                aria-label="Toggle workspace info"
              >
                {open ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {open && coords && (
        <div
          className="fixed inset-0 z-40"
          onClick={closePopover}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div
            className="fixed z-50 w-[280px] rounded-xl border border-[var(--sf-border)] bg-[var(--sf-panel)] shadow-2xl p-3 text-sm select-none"
            style={{ left: coords.x, top: coords.y }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-[12px] text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <FaUsers className="opacity-70" /> {memberCount} members
              </span>
              <span>•</span>
              <button className="inline-flex items-center gap-1 hover:text-zinc-200">
                <FaCog className="opacity-70" /> Settings
              </button>
              <span>•</span>
              <button className="inline-flex items-center gap-1 hover:text-zinc-200">
                <FaUserPlus className="opacity-70" /> Invite
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between rounded-lg bg-[var(--sf-hover)] px-2 py-1.5 text-xs text-zinc-300">
              <span className="truncate">{email}</span>
              <button
                ref={moreBtnRef}
                className="rounded-md p-1 hover:bg-[var(--sf-hover-strong)]"
                onClick={() => {
                  const rect = moreBtnRef.current?.getBoundingClientRect();
                  if (rect)
                    onOpenAccountMenu({ x: rect.left, y: rect.bottom + 6 });
                }}
                aria-label="Account menu"
              >
                <FaEllipsisH />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Section ---------------- */
function Section({
  title,
  children,
  rightAddon,
  defaultOpen = true,
}: {
  title: string;
  children?: React.ReactNode;
  rightAddon?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
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
        {rightAddon}
      </div>
      {open && <div className="space-y-1 px-1">{children}</div>}
    </div>
  );
}
function QuickItem({
  icon,
  label,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-md px-2 h-[28px] text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
    >
      <span className="opacity-80">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
function EmptyHint({ text }: { text: string }) {
  return <div className="px-2 py-3 text-xs text-zinc-500">{text}</div>;
}

/* ---------------- Sidebar ---------------- */
export function SidebarTree(props: SidebarTreeProps) {
  const [workspace, setWorkspace] = useState<PageNode[]>(props.roots);
  const [privates, setPrivates] = useState<PageNode[]>(
    props.privateRoots ?? []
  );
  const [favorites, setFavorites] = useState<PageNode[]>(
    props.favoriteRoots ?? []
  );
  const [menuFor, setMenuFor] = useState<PageNode | null>(null);
  const [menuCoords, setMenuCoords] = useState<MenuCoords>(null);
  const [wsMoreCoords, setWsMoreCoords] = useState<MenuCoords>(null);
  const [accountCoords, setAccountCoords] = useState<MenuCoords>(null);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const genId = useCallback(() => Math.random().toString(36).slice(2, 10), []);

  const contains = (nodes: PageNode[], id: string): boolean => {
    const walk = (xs: PageNode[]): boolean =>
      xs.some((n) => n.id === id || (n.children && walk(n.children)));
    return walk(nodes);
  };
  const updateIn = (
    set: React.Dispatch<React.SetStateAction<PageNode[]>>,
    id: string,
    updater: (n: PageNode) => PageNode
  ) => {
    const walk = (nodes: PageNode[]): PageNode[] =>
      nodes.map((n) =>
        n.id === id
          ? updater(n)
          : { ...n, children: n.children ? walk(n.children) : [] }
      );
    set((r) => walk(r));
  };
  const insertChildIn = (
    set: React.Dispatch<React.SetStateAction<PageNode[]>>,
    parentId: string,
    child: PageNode
  ) => {
    const walk = (nodes: PageNode[]): PageNode[] =>
      nodes.map((n) =>
        n.id === parentId
          ? { ...n, children: [child, ...(n.children ?? [])] }
          : { ...n, children: n.children ? walk(n.children) : [] }
      );
    set((r) => walk(r));
  };
  const removeIn = (
    set: React.Dispatch<React.SetStateAction<PageNode[]>>,
    id: string
  ) => {
    const walk = (nodes: PageNode[]): PageNode[] =>
      nodes
        .filter((n) => n.id !== id)
        .map((n) => ({ ...n, children: n.children ? walk(n.children) : [] }));
    set((r) => walk(r));
  };

  const requestContextMenu = (
    node: PageNode,
    coords: { x: number; y: number }
  ) => {
    setMenuFor(node);
    setMenuCoords(coords);
  };
  const closeMenu = () => {
    setMenuFor(null);
    setMenuCoords(null);
  };

  const sectionOf = (id: string): "teamspaces" | "private" | "favorites" =>
    contains(workspace, id)
      ? "teamspaces"
      : contains(privates, id)
      ? "private"
      : "favorites";
  const updateNode = (id: string, updater: (n: PageNode) => PageNode) => {
    const s = sectionOf(id);
    if (s === "teamspaces") return updateIn(setWorkspace, id, updater);
    if (s === "private") return updateIn(setPrivates, id, updater);
    return updateIn(setFavorites, id, updater);
  };
  const insertChild = (parentId: string, child: PageNode) => {
    const s = sectionOf(parentId);
    if (s === "teamspaces") return insertChildIn(setWorkspace, parentId, child);
    if (s === "private") return insertChildIn(setPrivates, parentId, child);
    return insertChildIn(setFavorites, parentId, child);
  };
  const removeNode = (id: string) => {
    const s = sectionOf(id);
    if (s === "teamspaces") return removeIn(setWorkspace, id);
    if (s === "private") return removeIn(setPrivates, id);
    return removeIn(setFavorites, id);
  };

  const actions = useMemo(
    () => ({
      onCopyLink: (n: PageNode) =>
        props.onCopyLink
          ? props.onCopyLink(n)
          : navigator.clipboard?.writeText(location.origin + n.path),
      onDuplicate: (n: PageNode) => {
        if (props.onDuplicate) return props.onDuplicate(n);
        const dupe: PageNode = {
          ...n,
          id: genId(),
          label: n.label + " (Copy)",
        };
        insertChild(n.id, dupe);
        return dupe;
      },
      onRename: (n: PageNode, next: string) =>
        props.onRename
          ? props.onRename(n, next)
          : updateNode(n.id, (x) => ({ ...x, label: next })),
      onMoveTo: (n: PageNode) => props.onMoveTo?.(n),
      onTrash: (n: PageNode) => {
        if (props.onTrash) return props.onTrash(n);
        removeNode(n.id);
      },
      onToggleWiki: (n: PageNode, next: boolean) =>
        props.onToggleWiki
          ? props.onToggleWiki(n, next)
          : updateNode(n.id, (x) => ({ ...x, isWiki: next })),
      onOpenInNewTab: (n: PageNode) =>
        props.onOpenInNewTab
          ? props.onOpenInNewTab(n)
          : window.open(n.path, "_blank"),
      onOpenInSidePeek: (n: PageNode) => props.onOpenInSidePeek?.(n),
      onToggleFavorite: (n: PageNode, next: boolean) =>
        props.onToggleFavorite
          ? props.onToggleFavorite(n, next)
          : updateNode(n.id, (x) => ({ ...x, isFavorite: next })),
      onCreateInside: (parent: PageNode) => {
        const created = props.onCreateInside?.(parent);
        if (created) {
          insertChild(parent.id, created);
          return created;
        }
        const temp: PageNode = {
          id: genId(),
          label: "Untitled",
          path: parent.path.replace(/\/$/, "") + "/" + genId(),
          icon: <FaEllipsisH />,
          children: [],
          lastEditedBy: "You",
          lastEditedAt: "Just now",
        };
        insertChild(parent.id, temp);
        return temp;
      },
    }),
    [genId, props]
  );

  const accountWorkspaces = ["Ankush Raj’s Workspace", "Design Lab"];

  return (
    <div className="relative w-full text-[13px] text-zinc-200">
      <div className="h-[calc(100vh-56px)] overflow-y-auto pr-1">
        <ProfileHeader
          name={props.currentWorkspaceName ?? "Ankush Raj’s Workspace"}
          memberCount={props.memberCount ?? 12}
          email={props.email ?? "ankush.raj@example.com"}
          avatarUrl={props.avatarUrl}
          onOpenAccountMenu={(c) => setAccountCoords(c)}
        />

        {accountCoords && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setAccountCoords(null)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <AccountMenu
              coords={accountCoords}
              onClose={() => setAccountCoords(null)}
              workspaces={accountWorkspaces}
              onSelectWorkspace={(name) =>
                props.onSwitchWorkspace
                  ? props.onSwitchWorkspace(name)
                  : console.log("switch to", name)
              }
              onJoin={() =>
                props.onJoinWorkspace
                  ? props.onJoinWorkspace()
                  : console.log("join workspace")
              }
              onCreate={() =>
                props.onCreateWorkspaceFromAccount
                  ? props.onCreateWorkspaceFromAccount()
                  : console.log("create workspace")
              }
              onAnotherAccount={() =>
                props.onAnotherAccount
                  ? props.onAnotherAccount()
                  : console.log("another account")
              }
              onLogout={() =>
                props.onLogout ? props.onLogout() : console.log("logout")
              }
            />
          </div>
        )}

        <Section title="Quick Find" defaultOpen>
          <QuickItem
            icon={<CiSearch />}
            label="Search"
            onClick={() =>
              props.onNavigate?.({
                id: "search",
                label: "Quick search",
                path: "/search",
              })
            }
          />
          <QuickItem
            icon={<IoIosMailUnread />}
            label="Updates"
            onClick={() =>
              props.onNavigate?.({
                id: "updates",
                label: "Updates",
                path: "/updates",
              })
            }
          />
        </Section>

        <Section title="Favorites" defaultOpen>
          {(favorites.length ? favorites : props.favoriteRoots ?? []).map(
            (n) => (
              <TreeNode
                key={n.id}
                node={n}
                depth={0}
                onNavigate={props.onNavigate}
                requestContextMenu={requestContextMenu}
                onCreateInside={actions.onCreateInside}
                onRename={actions.onRename}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            )
          )}
          {!favorites.length && !props.favoriteRoots?.length && (
            <EmptyHint text="No favorites yet. Right-click any page → Add to Favorites." />
          )}
        </Section>

        <Section title="Private" defaultOpen>
          {(privates.length ? privates : props.privateRoots ?? []).map((n) => (
            <TreeNode
              key={n.id}
              node={n}
              depth={0}
              onNavigate={props.onNavigate}
              requestContextMenu={requestContextMenu}
              onCreateInside={actions.onCreateInside}
              onRename={actions.onRename}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
          {!privates.length && !props.privateRoots?.length && (
            <EmptyHint text="Create your first private page with the ... button or context menu." />
          )}
        </Section>

        <Section
          title="TeamSpaces"
          rightAddon={
            <Tooltip content="More">
              <button
                className="rounded-md p-1 hover:bg-[var(--sf-hover)]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const rect = (
                    e.currentTarget as HTMLButtonElement
                  ).getBoundingClientRect();
                  setWsMoreCoords({ x: rect.left, y: rect.bottom + 6 });
                }}
              >
                <FaEllipsisH />
              </button>
            </Tooltip>
          }
          defaultOpen
        >
          {(workspace.length ? workspace : props.roots).map((n) => (
            <TreeNode
              key={n.id}
              node={n}
              depth={0}
              onNavigate={props.onNavigate}
              requestContextMenu={requestContextMenu}
              onCreateInside={actions.onCreateInside}
              onRename={actions.onRename}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </Section>

        {wsMoreCoords && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setWsMoreCoords(null)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              className="fixed z-50 min-w-[220px] rounded-xl border border-[var(--sf-border)] bg-[var(--sf-panel)] shadow-2xl p-1 text-sm select-none"
              style={{ left: wsMoreCoords.x!, top: wsMoreCoords.y! }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
                onClick={() => {
                  props.onCreateWorkspace
                    ? props.onCreateWorkspace()
                    : console.log("Create new TeamSpace");
                  setWsMoreCoords(null);
                }}
              >
                <span className="opacity-90">...</span>
                <span>Create new TeamSpace</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-2 border-t border-[var(--sf-border)] pt-2 space-y-1">
          <QuickItem icon={<FaCubes />} label="Templates" />
          <QuickItem icon={<FaInbox />} label="Import" />
          <QuickItem icon={<FaCog />} label="Settings & members" />
          <QuickItem icon={<BsActivity />} label="All Updates" />
          <QuickItem icon={<FaTrashAlt />} label="Trash" />
        </div>
      </div>

      <div className="absolute bottom-2 left-0 right-0 px-2">
        <button className="flex w-full items-center gap-2 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)]/90 px-3 h-[36px] text-zinc-200 hover:bg-[var(--sf-hover)]">
          <FaPlus />
          <span>New page</span>
        </button>
      </div>

      {menuFor && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeMenu}
          onContextMenu={(e) => e.preventDefault()}
        >
          <NodeMenu
            node={menuFor}
            coords={menuCoords}
            onClose={closeMenu}
            actions={actions}
          />
        </div>
      )}
    </div>
  );
}

/* ---------------- Example (dev only) ---------------- */
export default function ExampleSidebar() {
  const data: PageNode[] = [
    {
      id: "ws-1",
      label: "Engineering",
      path: "/teamspaces/engineering",
      icon: <MdHomeWork />,
      lastEditedBy: "Ankush",
      lastEditedAt: "Today 12:20 PM",
      children: [
        {
          id: "pg-1",
          label: "Design Docs",
          path: "/teamspaces/engineering/design-docs",
          icon: <FaFolderOpen />,
          children: [
            {
              id: "pg-1-1",
              label: "Auth Service (SAS)",
              path: "/teamspaces/engineering/design-docs/auth-service",
              children: [],
              lastEditedBy: "Priya",
              lastEditedAt: "Yesterday 5:42 PM",
            },
          ],
        },
        {
          id: "pg-2",
          label: "Roadmaps",
          path: "/teamspaces/engineering/roadmaps",
          icon: <FaFolderOpen />,
          children: [],
        },
      ],
    },
  ];
  const privateData: PageNode[] = [
    {
      id: "pv-1",
      label: "🙏 Welcome to Sunforge ☀️🔥",
      path: "/me/welcome",
      children: [
        {
          id: "pv-1-1",
          label: "Personal Notes",
          path: "/me/welcome/personal-notes",
          children: [],
        },
      ],
    },
    {
      id: "pv-2",
      label: "Drafts",
      path: "/me/drafts",
      icon: <FaFolderOpen />,
      children: [],
    },
  ];
  const favoriteData: PageNode[] = [
    {
      id: "fav-1",
      label: "Dummy TeamSpace",
      path: "/teamspaces/dummy",
      icon: <MdHomeWork />,
      isFavorite: true,
      children: [
        {
          id: "fav-1-1",
          label: "Quick Links",
          path: "/teamspaces/dummy/quick-links",
          children: [],
        },
      ],
    },
  ];
  return (
    <div className="h-full w-[320px] overflow-hidden bg-[var(--sf-bg)] p-3">
      <SidebarTree
        roots={data}
        privateRoots={privateData}
        favoriteRoots={favoriteData}
        currentWorkspaceName="Ankush Raj’s Workspace"
        memberCount={18}
        email="ankush.raj@example.com"
        onNavigate={(n) => console.log("navigate", n)}
        onCreateInside={(p) => ({
          id: Math.random().toString(36).slice(2, 10),
          label: "Untitled",
          path: p.path + "/" + Math.random().toString(36).slice(2, 6),
          children: [],
          lastEditedBy: "You",
          lastEditedAt: "Just now",
        })}
        onCopyLink={(n) =>
          navigator.clipboard.writeText(location.origin + n.path)
        }
        onDuplicate={(n) => ({
          ...n,
          id: Math.random().toString(36).slice(2, 10),
          label: n.label + " (Copy)",
        })}
        onRename={(n, next) => console.log("rename", n, next)}
        onMoveTo={(n) => console.log("move to", n)}
        onTrash={(n) => console.log("trash", n)}
        onToggleWiki={(n, next) => console.log("wiki:", next, n)}
        onOpenInNewTab={(n) => window.open(n.path, "_blank")}
        onOpenInSidePeek={(n) => console.log("side peek", n)}
        onToggleFavorite={(n, next) => console.log("favorite:", next, n)}
        onCreateWorkspace={() => console.log("create new TeamSpace")}
        onJoinWorkspace={() => console.log("join teamspace")}
        onCreateWorkspaceFromAccount={() =>
          console.log("create teamspace from account menu")
        }
        onSwitchWorkspace={(name) => console.log("switch workspace to", name)}
        onAnotherAccount={() => console.log("another account")}
        onLogout={() => console.log("logout")}
      />
    </div>
  );
}

// src/component/SearchPopover.tsx

import {
  FaCalendarAlt,
  FaChevronRight as FaCaret,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaFolderOpen,
  FaRegFile,
  FaRegStar,
  FaSearch,
  FaSortAmountDown,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import { IoIosArrowDown } from "react-icons/io";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import React from "react";
import { cx } from "@emotion/css";

/* — Theme accents (Sunforge dark). Switch to amber if you want warmer chips. */
const ACCENT = {
  ring: "ring-1 ring-sky-400/40",
  bg: "bg-sky-400/15",
  text: "text-sky-200",
  border: "border-sky-400/30",
};

type Person = { id: string; name: string; you?: boolean };
type Space = { id: string; name: string; icon?: React.ReactNode };
type PageItem = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  path?: string;
  dateISO?: string;
};

const people: Person[] = [
  { id: "u1", name: "Ankush Raj", you: true },
  { id: "u2", name: "Alex Chen" },
  { id: "u3", name: "Priya Verma" },
  { id: "u4", name: "Diego Alvarez" },
];

const spaces: Space[] = [
  { id: "s1", name: "Private", icon: <FaFileAlt /> },
  { id: "s2", name: "Favorites", icon: <FaRegStar /> },
  { id: "s3", name: "Engineering Wiki", icon: <FaFolderOpen /> },
  { id: "s4", name: "Backend", icon: <FaFolderOpen /> },
  { id: "s5", name: "React", icon: <FaFolderOpen /> },
];

/* Dummy results (replace with your API later) */
const today: PageItem[] = [
  { id: "t1", title: "New database", icon: <FaRegFile /> },
  {
    id: "t2",
    title: "Backend",
    icon: <FaFolderOpen />,
    path: "Ankush Raj’s Workspace HQ / Engineering Wiki",
  },
  {
    id: "t3",
    title: "React",
    icon: <FaFolderOpen />,
    path: "Ankush Raj’s Workspace HQ / Engineering Wiki",
  },
  {
    id: "t4",
    title: "Code Reviews",
    icon: <FaFileAlt />,
    path: "Ankush Raj’s Workspace HQ / Engineering Wiki",
  },
  { id: "t5", title: "Hell", icon: <FaRegFile /> },
  { id: "t6", title: "Teamspace Home", icon: <FaFileAlt />, path: "Text" },
];
const pastWeek: PageItem[] = [
  {
    id: "w1",
    title: "Engineering Docs",
    icon: <FaFileAlt />,
    path: "Ankush Raj’s Workspace HQ",
    dateISO: daysAgo(2),
  },
  {
    id: "w2",
    title: "Engineering Wiki",
    icon: <FaFolderOpen />,
    path: "Ankush Raj’s Workspace HQ",
    dateISO: daysAgo(6),
  },
];
const older: PageItem[] = [
  {
    id: "o1",
    title: "New database",
    icon: <FaRegFile />,
    dateISO: daysAgo(22),
  },
  { id: "o2", title: "Backend", icon: <FaFolderOpen />, dateISO: daysAgo(45) },
  { id: "o3", title: "React", icon: <FaFolderOpen />, dateISO: daysAgo(120) },
];

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
function fmtRel(iso?: string) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d <= 0) return "today";
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

type SortKey =
  | "best"
  | "edited_new"
  | "edited_old"
  | "created_new"
  | "created_old";
/* Simple single-select list (used by Sort menu, etc.) */
function MenuList({
  items,
}: {
  items: Array<
    | {
        label: string;
        onClick?: () => void;
        left?: React.ReactNode;
        divider?: false;
      }
    | { divider: true }
  >;
}) {
  return (
    <div className="min-w-[240px] p-1">
      {items.map((it, i) =>
        "divider" in it ? (
          <div key={i} className="my-1 h-px bg-zinc-800" />
        ) : (
          <button
            key={i}
            onClick={it.onClick}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] text-zinc-200 hover:bg-zinc-900"
          >
            <span className="opacity-80">{it.left}</span>
            <span className="truncate">{it.label}</span>
          </button>
        )
      )}
    </div>
  );
}

export default function SearchPopover({
  open,
  onClose,
  workspaceName,
}: {
  open: boolean;
  onClose: () => void;
  workspaceName: string;
}) {
  const [query, setQuery] = React.useState("");
  const [showAdvanced, setShowAdvanced] = React.useState(true);
  const [sort, setSort] = React.useState<SortKey>("best");
  const [titleOnly, setTitleOnly] = React.useState(true);

  /* — Multi-select states — */
  const [createdBy, setCreatedBy] = React.useState<Person[]>([]);
  const [teamspacesSel, setTeamspacesSel] = React.useState<Space[]>([]);
  const [locationsSel, setLocationsSel] = React.useState<Space[]>([]);

  /* — Date panel state — */
  const [dateMode, setDateMode] = React.useState<"Last edited" | "Created">(
    "Last edited"
  );
  const [preset, setPreset] = React.useState<
    "Today" | "Last 7 Days" | "Last 30 Days" | null
  >(null);
  const [picked, setPicked] = React.useState<Date | null>(null);
  const [month, setMonth] = React.useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });

  React.useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onMouseDown={() => onClose()}>
      <div
        className="absolute left-1/2 top-16 w-[min(960px,92vw)] -translate-x-1/2 rounded-2xl border border-zinc-800 bg-[#0D1014] shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Top query row */}
        <div className="flex items-center gap-2 px-3 py-2">
          <FaSearch className="text-zinc-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search or ask a question in ${workspaceName}…`}
            className={cx(
              "flex-1 min-w-0 bg-transparent outline-none text-zinc-200 placeholder-zinc-500",
              query && ACCENT.ring,
              "rounded-md px-1 py-1"
            )}
          />
          <button
            className={cx(
              "grid h-7 w-7 place-items-center rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900",
              titleOnly && ACCENT.bg,
              titleOnly && ACCENT.text,
              titleOnly && ACCENT.border
            )}
            title="Advanced filters"
            onClick={() => setShowAdvanced((s) => !s)}
          >
            <PiDotsThreeOutlineFill />
          </button>
        </div>

        <div className="border-t border-zinc-800" />

        {/* Advanced filters */}
        {showAdvanced && (
          <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-zinc-800 text-[13px]">
            {/* Sort */}
            <MenuButton
              icon={<FaSortAmountDown />}
              label="Sort"
              value={labelForSort(sort)}
            >
              <MenuList
                items={[
                  { label: "Best matches", onClick: () => setSort("best") },
                  { divider: true },
                  {
                    label: "Last edited: Newest first",
                    onClick: () => setSort("edited_new"),
                  },
                  {
                    label: "Last edited: Oldest first",
                    onClick: () => setSort("edited_old"),
                  },
                  {
                    label: "Created: Newest first",
                    onClick: () => setSort("created_new"),
                  },
                  {
                    label: "Created: Oldest first",
                    onClick: () => setSort("created_old"),
                  },
                ]}
              />
            </MenuButton>

            {/* Title only */}
            <TogglePill
              iconText="Aa"
              label="Title only"
              active={titleOnly}
              onToggle={() => setTitleOnly((v) => !v)}
            />

            {/* Created by — MULTI */}
            <MenuButton
              icon={<FaUser />}
              label="Created by"
              value={
                createdBy.length
                  ? chipsSummary(createdBy.map((p) => p.name))
                  : undefined
              }
              keepOpen
            >
              <div className="w-72">
                <SearchField placeholder="Search people" />
                <MultiList<Person>
                  items={people}
                  selected={createdBy}
                  keyOf={(p) => p.id}
                  labelOf={(p) => p.name + (p.you ? " (You)" : "")}
                  leftOf={(p) => <UserBadge you={p.you} />}
                  onToggle={(p, on) =>
                    setCreatedBy((sel) => toggleMulti(sel, p, on, (x) => x.id))
                  }
                  onClear={() => setCreatedBy([])}
                />
              </div>
            </MenuButton>

            {/* Teamspace — MULTI */}
            <MenuButton
              icon={<FaFolderOpen />}
              label="Teamspace"
              value={
                teamspacesSel.length
                  ? chipsSummary(teamspacesSel.map((s) => s.name))
                  : undefined
              }
              keepOpen
            >
              <div className="w-72">
                <SearchField placeholder="Search teamspaces" />
                <MultiList<Space>
                  items={spaces}
                  selected={teamspacesSel}
                  keyOf={(s) => s.id}
                  labelOf={(s) => s.name}
                  leftOf={(s) => s.icon ?? <FaFolderOpen />}
                  onToggle={(s, on) =>
                    setTeamspacesSel((sel) =>
                      toggleMulti(sel, s, on, (x) => x.id)
                    )
                  }
                  onClear={() => setTeamspacesSel([])}
                />
              </div>
            </MenuButton>

            {/* In — MULTI (pages & spaces) */}
            <MenuButton
              icon={<FaRegFile />}
              label="In"
              value={
                locationsSel.length
                  ? chipsSummary(locationsSel.map((s) => s.name))
                  : undefined
              }
              keepOpen
            >
              <div className="w-72">
                <SearchField placeholder="Search pages & spaces" />
                <MultiList<Space>
                  items={[
                    { id: "pvt", name: "Private", icon: <FaFileAlt /> },
                    { id: "fav", name: "Favorites", icon: <FaRegStar /> },
                    ...spaces.slice(2),
                  ]}
                  selected={locationsSel}
                  keyOf={(s) => s.id}
                  labelOf={(s) => s.name}
                  leftOf={(s) => s.icon ?? <FaFolderOpen />}
                  onToggle={(s, on) =>
                    setLocationsSel((sel) =>
                      toggleMulti(sel, s, on, (x) => x.id)
                    )
                  }
                  onClear={() => setLocationsSel([])}
                />
              </div>
            </MenuButton>

            {/* Date popover (Created / Last edited + presets + calendar) */}
            <MenuButton icon={<FaCalendarAlt />} label="Date" keepOpen>
              <div className="w-[360px] p-1">
                {/* Mode + Clear */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[12px] text-zinc-400">
                    <ModeChip
                      active={dateMode === "Created"}
                      onClick={() => (setDateMode("Created"), setPreset(null))}
                    >
                      Created
                    </ModeChip>
                    <FaCaret className="text-[10px] opacity-50" />
                    <ModeChip
                      active={dateMode === "Last edited"}
                      onClick={() => (
                        setDateMode("Last edited"), setPreset(null)
                      )}
                    >
                      Last Edited
                    </ModeChip>
                  </div>
                  <button
                    className="text-[12px] text-zinc-400 hover:text-zinc-200"
                    onClick={() => {
                      setPreset(null);
                      setPicked(null);
                    }}
                  >
                    Clear
                  </button>
                </div>

                {/* Presets */}
                <div className="mb-2 grid grid-cols-3 gap-1">
                  {(["Today", "Last 7 Days", "Last 30 Days"] as const).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPreset(p)}
                        className={cx(
                          "rounded-lg border border-zinc-800 bg-zinc-900/40 px-2 py-1 text-[12px] text-zinc-300 hover:bg-zinc-900",
                          preset === p &&
                            `${ACCENT.bg} ${ACCENT.text} ${ACCENT.border}`
                        )}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                {/* Calendar with month navigation */}
                <Calendar
                  month={month}
                  onPrev={() =>
                    setMonth(
                      (prev) =>
                        new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                    )
                  }
                  onNext={() =>
                    setMonth(
                      (prev) =>
                        new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                    )
                  }
                  picked={picked}
                  onPick={setPicked}
                />
              </div>
            </MenuButton>
          </div>
        )}

        {/* CONTENT — borders removed for a cleaner look on your theme */}
        <div className="max-h-[65vh] overflow-y-auto px-3 pb-3 pt-3">
          <ResultGroup title="Today" items={today} />
          <ResultGroup title="Past week" items={pastWeek} />
          <ResultGroup title="Older" items={older} />

          {/* Templates */}
          <div className="mt-6">
            <div className="mb-2 text-xs uppercase tracking-wide text-zinc-500">
              Start with a template
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Engineering wiki",
                "Engineering Tech Spec",
                "Experiment Results",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center justify-between rounded-xl bg-zinc-900/30 px-3 py-2 text-sm hover:bg-zinc-900"
                >
                  <div className="flex items-center gap-2">
                    <FaFolderOpen className="text-zinc-500" />
                    <span>{t}</span>
                  </div>
                  <button className="text-xs text-zinc-500 hover:text-zinc-200">
                    Use template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-end gap-4 border-t border-zinc-800 px-3 py-2 text-[12px] text-zinc-400">
          <KeyHint keys={["Space"]} label="Select" />
          <KeyHint keys={["Enter"]} label="Open" />
          <KeyHint keys={["⌘", "Enter"]} label="Open in new tab" />
        </div>
      </div>
    </div>
  );
}

/* ——— Helpers ——— */

function KeyHint({ keys, label }: { keys: string[]; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((k, i) => (
        <kbd
          key={i}
          className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300"
        >
          {k}
        </kbd>
      ))}
      {label}
    </span>
  );
}

function ModeChip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded px-1 py-0.5",
        active
          ? "bg-zinc-800 text-zinc-200"
          : "text-zinc-400 hover:text-zinc-200"
      )}
    >
      {children}
    </button>
  );
}

function chipsSummary(labels: string[]) {
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return labels.join(", ");
  return `${labels[0]}, +${labels.length - 1}`;
}

function MenuButton({
  icon,
  label,
  value,
  children,
  keepOpen,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  children: React.ReactNode;
  keepOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900/40 px-2.5 py-1.5 text-zinc-200 hover:bg-zinc-900"
      >
        {icon}
        <span className="text-[13px]">{label}</span>
        {value && (
          <span
            className={cx(
              "ml-1 rounded-md px-1 py-0.5 text-[12px]",
              ACCENT.bg,
              ACCENT.text,
              ACCENT.border
            )}
          >
            {value}
          </span>
        )}
        <IoIosArrowDown className="opacity-70" />
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 rounded-xl border border-zinc-800 bg-[#0D1014] shadow-2xl p-1"
          onMouseDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <div
            onClick={() => {
              if (!keepOpen) setOpen(false);
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function TogglePill({
  iconText,
  label,
  active,
  onToggle,
}: {
  iconText: string;
  label: string;
  active?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px]",
        active
          ? `${ACCENT.bg} ${ACCENT.text} ${ACCENT.border}`
          : "bg-zinc-900/40 text-zinc-300 hover:bg-zinc-900"
      )}
      title={label}
    >
      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[11px] text-zinc-300">
        {iconText}
      </span>
      {label}
    </button>
  );
}

/* MULTI selection list with checkmarks + clear */
function MultiList<T>({
  items,
  selected,
  keyOf,
  labelOf,
  leftOf,
  onToggle,
  onClear,
}: {
  items: T[];
  selected: T[];
  keyOf: (i: T) => string;
  labelOf: (i: T) => string;
  leftOf?: (i: T) => React.ReactNode;
  onToggle: (item: T, next: boolean) => void;
  onClear: () => void;
}) {
  const selKeys = new Set(selected.map(keyOf));
  return (
    <div className="p-1">
      <div className="mb-1 flex items-center justify-between px-1 text-[12px] text-zinc-500">
        <span>{selected.length} selected</span>
        {selected.length > 0 && (
          <button className="hover:text-zinc-200" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <div className="max-h-64 overflow-y-auto">
        {items.map((it) => {
          const k = keyOf(it);
          const active = selKeys.has(k);
          return (
            <button
              key={k}
              onClick={() => onToggle(it, !active)}
              className={cx(
                "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] hover:bg-zinc-900",
                active && `${ACCENT.bg} ${ACCENT.text} ${ACCENT.border}`
              )}
            >
              <span className="opacity-80">{leftOf?.(it)}</span>
              <span className="truncate">{labelOf(it)}</span>
              {active && <FaTimes className="ml-auto opacity-70" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <div className="m-1 mb-2 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-2 py-1">
      <FaSearch className="text-zinc-500" />
      <input
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none text-zinc-200 placeholder-zinc-500 text-[12px]"
      />
    </div>
  );
}

function UserBadge({ you }: { you?: boolean }) {
  return (
    <span
      className={cx(
        "grid h-5 w-5 place-items-center rounded-full text-[10px]",
        you
          ? `${ACCENT.bg} ${ACCENT.text} ${ACCENT.border}`
          : "bg-zinc-800 text-zinc-300"
      )}
    >
      <FaUser />
    </span>
  );
}

/* Results — borders removed */
function ResultGroup({ title, items }: { title: string; items: PageItem[] }) {
  return (
    <div className="mb-5">
      <div className="mb-2 text-xs font-semibold tracking-wide text-zinc-500">
        {title}
      </div>
      <div className="rounded-2xl">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-zinc-900"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">
                  {it.icon ?? <FaRegFile />}
                </span>
                <span className="truncate font-medium text-zinc-100">
                  {it.title}
                </span>
                {it.path && (
                  <div className="pl-7 text-[12px] text-zinc-500">
                    <span className="opacity-60">—</span> {it.path}
                  </div>
                )}
              </div>
            </div>

            {!!it.dateISO && (
              <span className="shrink-0 pl-2 text-[12px] text-zinc-500">
                {fmtRel(it.dateISO)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Calendar with month navigation */
function Calendar({
  month,
  onPrev,
  onNext,
  picked,
  onPick,
}: {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
  picked: Date | null;
  onPick: (d: Date | null) => void;
}) {
  const y = month.getFullYear(),
    m = month.getMonth();
  const start = new Date(y, m, 1);
  const startDay = start.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));

  return (
    <div className="rounded-xl border border-zinc-800 p-2">
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="grid h-7 w-7 place-items-center rounded-lg bg-zinc-900/40 hover:bg-zinc-900"
        >
          <FaChevronLeft className="text-zinc-300" />
        </button>
        <div className="text-[13px] text-zinc-300">
          {month.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </div>
        <button
          onClick={onNext}
          className="grid h-7 w-7 place-items-center rounded-lg bg-zinc-900/40 hover:bg-zinc-900"
        >
          <FaChevronRight className="text-zinc-300" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="text-center text-[10px] text-zinc-500">
            {d}
          </div>
        ))}
        {cells.map((d, i) =>
          d ? (
            <button
              key={i}
              onClick={() => onPick(d)}
              className={cx(
                "h-8 rounded-lg text-[12px] text-zinc-200 hover:bg-zinc-900",
                picked &&
                  sameDay(picked, d) &&
                  `${ACCENT.bg} ${ACCENT.text} ${ACCENT.border}`
              )}
            >
              {d.getDate()}
            </button>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
}
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function labelForSort(s: SortKey) {
  switch (s) {
    case "best":
      return "Best matches";
    case "edited_new":
      return "Last edited: Newest first";
    case "edited_old":
      return "Last edited: Oldest first";
    case "created_new":
      return "Created: Newest first";
    case "created_old":
      return "Created: Oldest first";
  }
}

/* Utility: toggle item in multi array */
function toggleMulti<T>(
  arr: T[],
  item: T,
  on: boolean,
  keyOf: (x: T) => string
) {
  const k = keyOf(item);
  if (on) {
    if (arr.find((a) => keyOf(a) === k)) return arr;
    return [...arr, item];
  }
  return arr.filter((a) => keyOf(a) !== k);
}

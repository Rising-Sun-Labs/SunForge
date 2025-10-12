import React from "react";
import { cx } from "@emotion/css";
import {
  FaChevronDown,
  FaDatabase,
  FaMagic,
  FaRegFile,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import TemplateCard, { TemplatePreview } from "./TemplateCard";
// import { MORE_TEMPLATES } from "./moreTemplates";

export type NewPageDialogProps = {
  open: boolean;
  onClose: () => void;
  addToLabel?: string;

  onEmptyPage: () => void;
  onEmptyDatabase: () => void;
  onBuildWithAI?: () => void;

  templates?: Array<{
    title: string;
    subtitle?: string;
    accent?: string;
    headerShade?: string;
    columns?: string[];
    rows?: number;
    pills?: string[];
    onUse: () => void;
  }>;
};

const BASE_BG = "#0D1014";
const PANEL_BG = "#0C1013";
const BORDER = "rgba(255,255,255,0.08)";

export default function NewPageDialog({
  open,
  onClose,
  addToLabel = "Private",
  onEmptyPage,
  onEmptyDatabase,
  onBuildWithAI,
  templates = [],
}: NewPageDialogProps) {
  const [q, setQ] = React.useState("");
  const [more, setMore] = React.useState(0);

  React.useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = templates.filter((t) =>
    `${t.title} ${t.subtitle ?? ""}`.toLowerCase().includes(q.toLowerCase())
  );

  const moreTemplates = MORE_TEMPLATES.slice(
    0,
    Math.min(MORE_TEMPLATES.length, more * 6)
  );
  const list = (filtered.length ? filtered : templates).concat(
    q ? [] : moreTemplates
  );

  return (
    <div className="fixed inset-0 z-50" onMouseDown={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute left-1/2 top-[6vh] h-[88vh] w-[min(1100px,94vw)] -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{ backgroundColor: BASE_BG, border: `1px solid ${BORDER}` }}
      >
        {/* Top bar */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: `1px solid ${BORDER}`, background: BASE_BG }}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-lg text-zinc-400 hover:bg-black/30 hover:text-zinc-200"
          >
            <FaTimes />
          </button>

          <button
            className={cx(
              "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-zinc-200 hover:bg-black/30"
            )}
            style={{
              border: `1px solid ${BORDER}`,
              background: "rgba(0,0,0,0.35)",
            }}
            title="Choose destination"
          >
            <span className="text-zinc-400">Add to</span>
            <span className="font-medium">{addToLabel}</span>
            <FaChevronDown className="text-[10px] opacity-70" />
          </button>

          <div className="flex-1" />

          <div className="mx-auto w-[520px] max-w-[62vw]">
            <label
              className="flex items-center gap-2 rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-zinc-700"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <FaSearch className="text-zinc-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-zinc-200 outline-none placeholder-zinc-500"
              />
            </label>
          </div>

          <div className="w-7" />
        </div>

        {/* Content */}
        <div className="flex items-center justify-center">
          <div
            className="h-[calc(94vh-57px)] overflow-y-auto px-6 py-8"
            style={{ backgroundColor: PANEL_BG }}
          >
            {/* Quick tiles */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <QuickTile
                icon={<FaRegFile />}
                title="Empty page"
                subtitle="Start writing from scratch"
                onClick={() => {
                  onEmptyPage();
                  onClose();
                }}
              />
              <QuickTile
                icon={<FaDatabase />}
                title="Empty database"
                subtitle="Create a new database"
                onClick={() => {
                  onEmptyDatabase();
                  onClose();
                }}
              />
              <QuickTile
                icon={<FaMagic />}
                title="Build with AI"
                subtitle="Let AI create a page"
                onClick={() => {
                  onBuildWithAI?.();
                  onClose();
                }}
              />
            </div>

            {/* Suggested */}
            <div className="mt-8 text-sm font-medium text-zinc-400">
              Suggested
            </div>

            {/* EXACTLY TWO COLUMNS; gap-4; centered; cards fill columns */}
            <div className="mt-3 w-full">
              <div className="mx-auto max-w-[780px] px-1">
                <div
                  className="mx-auto grid grid-cols-2 gap-4"
                  style={{
                    width: "min(40vw, 100%)", // center block width
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))", // exactly 2 columns
                  }}
                >
                  {list.length === 0 && (
                    <div
                      className="col-span-2 rounded-xl text-center text-sm text-zinc-500"
                      style={{
                        border: `1px solid ${BORDER}`,
                        background: "rgba(0,0,0,0.25)",
                      }}
                    >
                      No templates match “{q}”.
                    </div>
                  )}

                  {(list.length ? list : templates).map((t) => (
                    <TemplateCard
                      key={t.title}
                      title={t.title}
                      subtitle={t.subtitle}
                      accent={t.accent}
                      headerShade={t.headerShade}
                      onClick={() => {
                        t.onUse();
                        onClose();
                      }}
                      preview={
                        <TemplatePreview
                          columns={t.columns}
                          rows={t.rows}
                          pills={t.pills}
                          peopleColumnTitles={[
                            "Assignee",
                            "Created by",
                            "Owner",
                            "Author",
                          ]}
                        />
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom-left: Load more */}
            {!q && (
              <div className="mt-4 flex items-center">
                <button
                  className="rounded-lg px-3 py-1.5 text-sm text-zinc-300 hover:text-white"
                  style={{
                    border: `1px dashed ${BORDER}`,
                    background: "rgba(0,0,0,0.25)",
                  }}
                  onClick={() =>
                    setMore((m) =>
                      Math.min(m + 1, Math.ceil(MORE_TEMPLATES.length / 6))
                    )
                  }
                >
                  Load more templates
                </button>
              </div>
            )}

            <div className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickTile({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl px-4 py-5 text-left transition-colors hover:bg-black/25"
      style={{
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-black/40 text-zinc-200">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="truncate text-[15px] font-semibold text-zinc-100">
          {title}
        </div>
        {subtitle && (
          <div className="truncate text-sm text-zinc-500">{subtitle}</div>
        )}
      </div>
    </button>
  );
}

/* --------------------- More templates --------------------- */
export const MORE_TEMPLATES: Array<{
  title: string;
  subtitle: string;
  accent: string;
  headerShade: string;
  columns?: string[];
  rows?: number;
  pills?: string[];
  onUse: () => void;
}> = [
  {
    title: "Meeting Notes",
    subtitle: "Capture decisions & action items.",
    accent: "#3b3216",
    headerShade: "#2a230f",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Goals Tracker",
    subtitle: "Track OKRs and outcomes.",
    accent: "#2d3b1a",
    headerShade: "#202b12",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Content Calendar",
    subtitle: "Plan & schedule posts.",
    accent: "#123047",
    headerShade: "#0d2232",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Client Meetings",
    subtitle: "Prepare & follow-up with clients.",
    accent: "#40262b",
    headerShade: "#2c1a1e",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Event Management",
    subtitle: "Organize upcoming events.",
    accent: "#253b34",
    headerShade: "#1a2a25",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Issue Tracking",
    subtitle: "Log & triage issues.",
    accent: "#2d2b3f",
    headerShade: "#201e2d",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Feature Requests",
    subtitle: "Collect & rank ideas.",
    accent: "#31371a",
    headerShade: "#232810",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Engineering Docs",
    subtitle: "Specs, RFCs, reviews.",
    accent: "#1f2a3c",
    headerShade: "#141c29",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Pipeline Tracking",
    subtitle: "Sales & hiring pipelines.",
    accent: "#34301e",
    headerShade: "#241f14",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Creative Projects",
    subtitle: "From brief to delivery.",
    accent: "#34242c",
    headerShade: "#241820",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
  {
    title: "Document Store",
    subtitle: "Centralized documents.",
    accent: "#2b2b2b",
    headerShade: "#1f1f1f",
    columns: ["Task name", "Status", "Assignee"],
    rows: 3,
    pills: ["Not started", "In progress", "Done"],
    onUse: () => {},
  },
];

// src/component/NewPage/NewPageDialog.tsx
// import React from "react";
// import { cx } from "@emotion/css";
// import {
//   FaChevronDown,
//   FaDatabase,
//   FaMagic,
//   FaRegFile,
//   FaSearch,
//   FaTimes,
//   FaBolt,
// } from "react-icons/fa";
// import { FaWandMagicSparkles } from "react-icons/fa6";
// import TemplateCard, { TemplatePreview } from "./TemplateCard";

// export type NewPageDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   addToLabel?: string;

//   onEmptyPage: () => void;
//   onEmptyDatabase: () => void;
//   onBuildWithAI?: () => void;

//   templates?: Array<{
//     title: string;
//     subtitle?: string;
//     accent?: string;
//     headerShade?: string;
//     tags?: string[];
//     onUse: () => void;
//   }>;
// };

// /** Tuned to your existing theme */
// const BASE_BG = "#0D1014";
// const PANEL_BG = "#0C1013";
// const BORDER = "rgba(255,255,255,0.08)";

// /** Nice defaults if no templates are passed */
// const FALLBACK_TEMPLATES: NewPageDialogProps["templates"] = [
//   {
//     title: "Tasks Tracker",
//     subtitle: "Stay organized with tasks, your way.",
//     accent: "#183826",
//     headerShade: "#14221b",
//     tags: ["Work", "Personal", "Team"],
//     onUse: () => {},
//   },
//   {
//     title: "Projects",
//     subtitle: "Manage projects start to finish.",
//     accent: "#132d47",
//     headerShade: "#0f2134",
//     tags: ["Work", "PM", "Team"],
//     onUse: () => {},
//   },
//   {
//     title: "Document Hub",
//     subtitle: "Collaborate on docs in one hub.",
//     accent: "#3a1e1e",
//     headerShade: "#2a1515",
//     tags: ["Docs"],
//     onUse: () => {},
//   },
//   {
//     title: "Brainstorm Session",
//     subtitle: "Spark new ideas together.",
//     accent: "#3a2a12",
//     headerShade: "#2b1e0c",
//     tags: ["Ideation", "Team"],
//     onUse: () => {},
//   },
// ];

// /** Optional curated categories to filter templates */
// const CATEGORY_CHIPS = [
//   "All",
//   "Work",
//   "Team",
//   "Docs",
//   "Personal",
//   "PM",
//   "Ideation",
// ];

// export default function NewPageDialog({
//   open,
//   onClose,
//   addToLabel = "Private",
//   onEmptyPage,
//   onEmptyDatabase,
//   onBuildWithAI,
//   templates = [],
// }: NewPageDialogProps) {
//   const [q, setQ] = React.useState("");
//   const [category, setCategory] = React.useState("All");
//   const [more, setMore] = React.useState(0);

//   React.useEffect(() => {
//     if (!open) return;
//     const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", onEsc);
//     return () => document.removeEventListener("keydown", onEsc);
//   }, [open, onClose]);

//   if (!open) return null;

//   const list = (templates?.length ? templates : FALLBACK_TEMPLATES)!;

//   const filtered = list.filter((t) => {
//     const matchText = `${t.title} ${t.subtitle ?? ""} ${(t.tags ?? []).join(
//       " "
//     )}`
//       .toLowerCase()
//       .includes(q.toLowerCase());

//     const matchCat =
//       category === "All" ? true : (t.tags ?? []).includes(category);

//     return matchText && matchCat;
//   });

//   /** progressively reveal more from a suggestion pool (client-side) */
//   const extra = SUGGESTED_MORE.slice(0, Math.min(SUGGESTED_MORE.length, more));
//   const finalTemplates =
//     filtered.length > 0
//       ? filtered
//       : q || category !== "All"
//       ? [] // no results in filter mode
//       : list.concat(extra); // default mode shows more

//   return (
//     <div className="fixed inset-0 z-50" onMouseDown={onClose}>
//       {/* Backdrop with soft vignette */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(1200px 720px at 20% -10%, rgba(146,103,232,0.08), rgba(0,0,0,0)), radial-gradient(1200px 720px at 100% 0%, rgba(49,181,247,0.06), rgba(0,0,0,0))",
//         }}
//       />
//       <div className="absolute inset-0 bg-black/60" />

//       {/* Dialog */}
//       <div
//         className="absolute left-1/2 top-[3vh] h-[94vh] w-[min(1000px,95vw)] -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl"
//         onMouseDown={(e) => e.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//         style={{ backgroundColor: BASE_BG, border: `1px solid ${BORDER}` }}
//       >
//         {/* Glow edge */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
//             maskImage:
//               "linear-gradient(to bottom, rgba(0,0,0,0.4), black 20%, black 80%, rgba(0,0,0,0.4))",
//           }}
//         />

//         {/* Top bar */}
//         <div
//           className="relative z-10 flex items-center gap-3 px-4 py-3"
//           style={{
//             borderBottom: `1px solid ${BORDER}`,
//             background:
//               "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0))",
//           }}
//         >
//           <button
//             aria-label="Close"
//             onClick={onClose}
//             className="grid h-7 w-7 place-items-center rounded-lg text-zinc-400 hover:bg-black/30 hover:text-zinc-200"
//             title="Esc"
//           >
//             <FaTimes />
//           </button>

//           {/* Destination pill */}
//           <button
//             className={cx(
//               "group inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-zinc-200 hover:bg-black/30"
//             )}
//             style={{
//               border: `1px solid ${BORDER}`,
//               background: "rgba(0,0,0,0.35)",
//             }}
//             title="Choose destination"
//           >
//             <span className="text-zinc-400">Add to</span>
//             <span className="font-medium">{addToLabel}</span>
//             <FaChevronDown className="text-[10px] opacity-70 transition-transform group-hover:rotate-180" />
//           </button>

//           <div className="flex-1" />

//           {/* Search */}
//           <div className="mx-auto w-[560px] max-w-[62vw]">
//             <label
//               className="flex items-center gap-2 rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-zinc-700"
//               style={{
//                 background: "rgba(0,0,0,0.35)",
//                 border: `1px solid ${BORDER}`,
//               }}
//             >
//               <FaSearch className="text-zinc-500" />
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 placeholder="Search templates or type to filter…"
//                 className="w-full bg-transparent text-zinc-200 outline-none placeholder-zinc-500"
//               />
//             </label>
//           </div>

//           {/* Keyboard hint */}
//           <div className="hidden lg:flex items-center gap-1 text-[11px] text-zinc-500">
//             <kbd className="rounded border border-zinc-700/60 bg-zinc-900 px-1.5 py-0.5 text-zinc-300">
//               Esc
//             </kbd>
//             <span>close</span>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div
//           className="relative h-[calc(94vh-57px)] overflow-y-auto"
//           style={{ backgroundColor: PANEL_BG }}
//         >
//           {/* HERO — glass card with gradient accent */}
//           <div className="px-6 pt-6">
//             <div
//               className="relative overflow-hidden rounded-2xl border p-5"
//               style={{
//                 borderColor: BORDER,
//                 background:
//                   "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
//               }}
//             >
//               <div className="relative z-10 flex flex-wrap items-center gap-4">
//                 <div className="text-left">
//                   <div className="text-[13px] uppercase tracking-wider text-zinc-400">
//                     Create something new
//                   </div>
//                   <div className="mt-1 text-xl font-semibold text-zinc-100">
//                     Pick a starting point
//                   </div>
//                 </div>

//                 <div className="flex-1" />

//                 <div className="flex gap-2">
//                   <QuickAction
//                     icon={<FaRegFile />}
//                     title="Empty page"
//                     subtitle="Start writing from scratch"
//                     onClick={() => {
//                       onEmptyPage();
//                       onClose();
//                     }}
//                   />
//                   <QuickAction
//                     icon={<FaDatabase />}
//                     title="Empty database"
//                     subtitle="Create a new database"
//                     onClick={() => {
//                       onEmptyDatabase();
//                       onClose();
//                     }}
//                   />
//                   <QuickAction
//                     icon={<FaWandMagicSparkles />}
//                     title="Build with AI"
//                     subtitle="Let AI create a page"
//                     accent="linear-gradient(135deg, #7C5CFF, #25C9FF)"
//                     onClick={() => {
//                       onBuildWithAI?.();
//                       onClose();
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* floating glow */}
//               <div
//                 aria-hidden
//                 className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl"
//                 style={{
//                   background:
//                     "radial-gradient(closest-side, rgba(86,196,255,0.25), rgba(0,0,0,0))",
//                 }}
//               />
//             </div>
//           </div>

//           {/* CATEGORY CHIPS */}
//           <div className="px-6 pt-5">
//             <div className="flex flex-wrap items-center gap-2">
//               {CATEGORY_CHIPS.map((c) => (
//                 <button
//                   key={c}
//                   onClick={() => setCategory(c)}
//                   className={cx(
//                     "rounded-full px-3 py-1 text-[12px] transition-colors",
//                     c === category
//                       ? "bg-white/10 text-zinc-100 border border-white/15"
//                       : "bg-black/20 text-zinc-300 hover:bg-black/30 border border-white/10"
//                   )}
//                 >
//                   {c}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* SECTION HEADER */}
//           <div className="px-6 pt-6 text-sm font-medium text-zinc-400">
//             Suggested
//           </div>

//           {/* TEMPLATES GRID — elegant, centered, consistent spacing */}
//           <div className="px-6">
//             <div
//               className="grid gap-4 justify-items-center pt-3"
//               style={{
//                 gridTemplateColumns: "repeat(2, minmax(0, 1fr))", // exactly two columns
//               }}
//             >
//               {finalTemplates.length === 0 && (
//                 <div
//                   className="col-span-2 rounded-xl p-6 text-center text-sm text-zinc-500"
//                   style={{
//                     border: `1px solid ${BORDER}`,
//                     background: "rgba(0,0,0,0.25)",
//                   }}
//                 >
//                   No matches for “{q}”.
//                 </div>
//               )}

//               {finalTemplates.map((t) => (
//                 <div key={t.title} className="w-[86%] md:w-[88%]">
//                   <TemplateCard
//                     title={t.title}
//                     subtitle={t.subtitle}
//                     accent={t.accent}
//                     headerShade={t.headerShade}
//                     onClick={() => {
//                       t.onUse();
//                       onClose();
//                     }}
//                     preview={
//                       <TemplatePreview
//                         peopleColumnTitle={[
//                           "Assignee",
//                           "Created by",
//                           "Owner",
//                           "Author",
//                         ]}
//                       />
//                     }
//                   />
//                   {/* Tiny tags row */}
//                   {!!t.tags?.length && (
//                     <div className="mt-2 flex flex-wrap gap-1.5">
//                       {t.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="rounded-full border border-white/10 bg-white/5 px-2 py-[2px] text-[11px] text-zinc-300"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Bottom-left actions */}
//             <div className="mt-5 mb-8 flex items-center">
//               <button
//                 className="rounded-lg px-3 py-1.5 text-sm text-zinc-300 hover:text-white"
//                 style={{
//                   border: `1px dashed ${BORDER}`,
//                   background: "rgba(0,0,0,0.25)",
//                 }}
//                 onClick={() =>
//                   setMore(
//                     (m) => Math.min(m + 6, SUGGESTED_MORE.length) // add 6 at a time
//                   )
//                 }
//               >
//                 Load more templates
//               </button>
//               <div className="ml-3 text-[12px] text-zinc-500">
//                 <FaBolt className="mr-1 inline align-[-2px]" />
//                 Try: Meeting Notes, Goals Tracker, Content Calendar, Client
//                 Meetings, Event Management, Issue Tracking, Feature Requests,
//                 Engineering Docs, Pipeline Tracking, Creative Projects, Document
//                 Store
//               </div>
//             </div>
//           </div>

//           <div className="h-6" />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------- Pieces -------------------------- */

// function QuickAction({
//   icon,
//   title,
//   subtitle,
//   accent,
//   onClick,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   subtitle?: string;
//   accent?: string; // optional gradient
//   onClick?: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="group relative flex items-center gap-3 rounded-xl px-4 py-4 text-left transition-all hover:translate-y-[-1px]"
//       style={{
//         background:
//           "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.25))",
//         border: "1px solid rgba(255,255,255,0.08)",
//       }}
//     >
//       {/* subtle animated border accent on hover */}
//       <div
//         aria-hidden
//         className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
//         style={{
//           background:
//             accent ??
//             "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
//           maskImage:
//             "linear-gradient(180deg, rgba(0,0,0,0.4), black 20%, black 80%, rgba(0,0,0,0.4))",
//         }}
//       />
//       <div className="relative z-10">
//         <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-black/40 text-zinc-200">
//           {icon}
//         </div>
//       </div>
//       <div className="relative z-10 min-w-0">
//         <div className="truncate text-[15px] font-semibold text-zinc-100">
//           {title}
//         </div>
//         {subtitle && (
//           <div className="truncate text-sm text-zinc-500">{subtitle}</div>
//         )}
//       </div>
//     </button>
//   );
// }

// /** A curated pool you can extend freely (client-side only) */
// const SUGGESTED_MORE: Array<{
//   title: string;
//   subtitle: string;
//   accent: string;
//   headerShade: string;
//   tags?: string[];
//   onUse: () => void;
// }> = [
//   {
//     title: "Meeting Notes",
//     subtitle: "Capture decisions & action items.",
//     accent: "#3b3216",
//     headerShade: "#2a230f",
//     tags: ["Work", "Team"],
//     onUse: () => {},
//   },
//   {
//     title: "Goals Tracker",
//     subtitle: "Track OKRs and outcomes.",
//     accent: "#2d3b1a",
//     headerShade: "#202b12",
//     tags: ["Work", "Personal"],
//     onUse: () => {},
//   },
//   {
//     title: "Content Calendar",
//     subtitle: "Plan & schedule posts.",
//     accent: "#123047",
//     headerShade: "#0d2232",
//     tags: ["Work"],
//     onUse: () => {},
//   },
//   {
//     title: "Client Meetings",
//     subtitle: "Prepare & follow-up with clients.",
//     accent: "#40262b",
//     headerShade: "#2c1a1e",
//     tags: ["Team", "Work"],
//     onUse: () => {},
//   },
//   {
//     title: "Event Management",
//     subtitle: "Organize upcoming events.",
//     accent: "#253b34",
//     headerShade: "#1a2a25",
//     tags: ["Work"],
//     onUse: () => {},
//   },
//   {
//     title: "Issue Tracking",
//     subtitle: "Log & triage issues.",
//     accent: "#2d2b3f",
//     headerShade: "#201e2d",
//     tags: ["PM", "Work", "Team"],
//     onUse: () => {},
//   },
//   {
//     title: "Feature Requests",
//     subtitle: "Collect & rank ideas.",
//     accent: "#31371a",
//     headerShade: "#232810",
//     tags: ["PM", "Work"],
//     onUse: () => {},
//   },
//   {
//     title: "Engineering Docs",
//     subtitle: "Specs, RFCs, reviews.",
//     accent: "#1f2a3c",
//     headerShade: "#141c29",
//     tags: ["Docs", "Team"],
//     onUse: () => {},
//   },
//   {
//     title: "Pipeline Tracking",
//     subtitle: "Sales & hiring pipelines.",
//     accent: "#34301e",
//     headerShade: "#241f14",
//     tags: ["Work"],
//     onUse: () => {},
//   },
//   {
//     title: "Creative Projects",
//     subtitle: "From brief to delivery.",
//     accent: "#34242c",
//     headerShade: "#241820",
//     tags: ["Personal", "Work"],
//     onUse: () => {},
//   },
//   {
//     title: "Document Store",
//     subtitle: "Centralized documents.",
//     accent: "#2b2b2b",
//     headerShade: "#1f1f1f",
//     tags: ["Docs"],
//     onUse: () => {},
//   },
// ];

// import React from "react";
// import { cx } from "@emotion/css";
// import {
//   FaChevronDown,
//   FaDatabase,
//   FaRegFile,
//   FaSearch,
//   FaTimes,
// } from "react-icons/fa";
// import { FaWandMagicSparkles } from "react-icons/fa6";
// import TemplateCard, { TemplatePreview } from "./TemplateCard";

// /* Theme to match your app */
// const BASE_BG = "#0D1014";
// const PANEL_BG = "#0C1013";
// const BORDER = "rgba(255,255,255,0.08)";

// export type TemplateMeta = {
//   title: string;
//   subtitle?: string;
//   accent?: string;
//   headerShade?: string;

//   description?: string;
//   tags?: string[];
//   pills?: string[];
//   stats?: { lastEdited?: string; popularity?: number; rating?: number };
//   peopleSeeds?: number[];

//   onUse: () => void;
// };

// export type NewPageDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   addToLabel?: string;

//   onEmptyPage: () => void;
//   onEmptyDatabase: () => void;
//   onBuildWithAI?: () => void;

//   templates?: TemplateMeta[];
//   columns?: 2 | 3; // grid columns
// };

// /* A generous, modern default library if none passed in */
// const DEFAULT_TEMPLATES: TemplateMeta[] = [
//   {
//     title: "Projects",
//     subtitle: "Manage projects end-to-end",
//     accent: "#132d47",
//     headerShade: "#0f2134",
//     description:
//       "Organize initiatives, timelines, owners and status. Views for roadmap, Kanban, calendar & docs.",
//     tags: ["Work", "PM", "Roadmap"],
//     pills: ["Kanban", "Docs-linked"],
//     stats: { lastEdited: "2d ago", popularity: 86, rating: 4.7 },
//     peopleSeeds: [1, 2, 3, 4],
//     onUse: () => {},
//   },
//   {
//     title: "Tasks Tracker",
//     subtitle: "Personal & team to-dos",
//     accent: "#183826",
//     headerShade: "#14221b",
//     description:
//       "Simple but powerful list with status, assignee, due dates, and quick filters.",
//     tags: ["Tasks", "Personal"],
//     pills: ["Due dates", "Filters"],
//     stats: { lastEdited: "5h ago", popularity: 78, rating: 4.5 },
//     peopleSeeds: [2, 5, 7, 9],
//     onUse: () => {},
//   },
//   {
//     title: "Engineering Docs",
//     subtitle: "Specs, RFCs, Reviews",
//     accent: "#1f2a3c",
//     headerShade: "#141c29",
//     description:
//       "Write technical specs with structured sections, code blocks and decision logs.",
//     tags: ["Engineering", "Docs"],
//     pills: ["Code blocks", "Decision log"],
//     stats: { lastEdited: "1h ago", popularity: 72, rating: 4.6 },
//     peopleSeeds: [3, 6, 8, 11],
//     onUse: () => {},
//   },
//   {
//     title: "Content Calendar",
//     subtitle: "Plan & schedule posts",
//     accent: "#123047",
//     headerShade: "#0d2232",
//     description:
//       "Monthly/weekly calendar, idea pipeline, approval stages and social channels.",
//     tags: ["Marketing", "Calendar"],
//     pills: ["Calendar", "Pipeline"],
//     stats: { lastEdited: "3d ago", popularity: 65, rating: 4.3 },
//     peopleSeeds: [12, 13, 14],
//     onUse: () => {},
//   },
// ];

// export default function NewPageDialog({
//   open,
//   onClose,
//   addToLabel = "Private",
//   onEmptyPage,
//   onEmptyDatabase,
//   onBuildWithAI,
//   templates = DEFAULT_TEMPLATES,
//   columns = 2,
// }: NewPageDialogProps) {
//   const [q, setQ] = React.useState("");

//   React.useEffect(() => {
//     if (!open) return;
//     const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", onEsc);
//     return () => document.removeEventListener("keydown", onEsc);
//   }, [open, onClose]);

//   if (!open) return null;

//   const filtered = templates.filter((t) =>
//     `${t.title} ${t.subtitle ?? ""} ${t.description ?? ""} ${(
//       t.tags ?? []
//     ).join(" ")}`
//       .toLowerCase()
//       .includes(q.toLowerCase())
//   );

//   const items = filtered.length ? filtered : templates;
//   const gridCols = Math.max(2, Math.min(3, columns));

//   return (
//     <div className="fixed inset-0 z-50" onMouseDown={onClose}>
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/60" />

//       {/* Dialog */}
//       <div
//         className="absolute left-1/2 top-[3vh] h-[94vh] w-[min(1000px,95vw)] -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl"
//         onMouseDown={(e) => e.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//         style={{ backgroundColor: BASE_BG, border: `1px solid ${BORDER}` }}
//       >
//         {/* Top bar */}
//         <div
//           className="flex items-center gap-3 px-4 py-3"
//           style={{
//             borderBottom: `1px solid ${BORDER}`,
//             background:
//               "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255,255,255,0))",
//           }}
//         >
//           <button
//             aria-label="Close"
//             onClick={onClose}
//             className="grid h-7 w-7 place-items-center rounded-lg text-zinc-400 hover:bg-black/30 hover:text-zinc-200"
//             title="Esc"
//           >
//             <FaTimes />
//           </button>

//           {/* Destination */}
//           <button
//             className={cx(
//               "group inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-zinc-200 hover:bg-black/30"
//             )}
//             style={{
//               border: `1px solid ${BORDER}`,
//               background: "rgba(0,0,0,0.35)",
//             }}
//             title="Choose destination"
//           >
//             <span className="text-zinc-400">Add to</span>
//             <span className="font-medium">{addToLabel}</span>
//             <FaChevronDown className="text-[10px] opacity-70 transition-transform group-hover:rotate-180" />
//           </button>

//           <div className="flex-1" />

//           {/* Search */}
//           <div className="mx-auto w-[560px] max-w-[62vw]">
//             <label
//               className="flex items-center gap-2 rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-zinc-700"
//               style={{
//                 background: "rgba(0,0,0,0.35)",
//                 border: `1px solid ${BORDER}`,
//               }}
//             >
//               <FaSearch className="text-zinc-500" />
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 placeholder="Search templates…"
//                 className="w-full bg-transparent text-zinc-200 outline-none placeholder-zinc-500"
//               />
//             </label>
//           </div>

//           <button
//             className="hidden md:grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-black/20 text-zinc-300 hover:bg-black/30"
//             onClick={onBuildWithAI}
//             title="Build with AI"
//           >
//             <FaWandMagicSparkles />
//           </button>
//         </div>

//         {/* Content */}
//         <div
//           className="h-[calc(94vh-57px)] overflow-y-auto px-6 py-8"
//           style={{ backgroundColor: PANEL_BG }}
//         >
//           {/* Quick actions */}
//           <div className="mb-6 grid gap-3 sm:grid-cols-3">
//             <QuickTile
//               icon={<FaRegFile />}
//               title="Empty page"
//               subtitle="Start writing from scratch"
//               onClick={() => {
//                 onEmptyPage();
//                 onClose();
//               }}
//             />
//             <QuickTile
//               icon={<FaDatabase />}
//               title="Empty database"
//               subtitle="Create a new database"
//               onClick={() => {
//                 onEmptyDatabase();
//                 onClose();
//               }}
//             />
//             <QuickTile
//               icon={<FaWandMagicSparkles />}
//               title="Build with AI"
//               subtitle="Let AI create a page"
//               accent="linear-gradient(135deg, #7C5CFF, #25C9FF)"
//               onClick={() => {
//                 onBuildWithAI?.();
//                 onClose();
//               }}
//             />
//           </div>

//           {/* Section title */}
//           <div className="mb-3 text-sm font-medium text-zinc-400">
//             Templates
//           </div>

//           {/* Grid of detailed modern cards */}
//           <div
//             className="grid gap-4"
//             style={{
//               gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
//             }}
//           >
//             {items.map((t) => (
//               <TemplateCard
//                 key={t.title}
//                 title={t.title}
//                 subtitle={t.subtitle}
//                 accent={t.accent}
//                 headerShade={t.headerShade}
//                 description={t.description}
//                 tags={t.tags}
//                 pills={t.pills}
//                 stats={t.stats}
//                 peopleSeeds={t.peopleSeeds}
//                 onClick={() => {
//                   t.onUse();
//                   onClose();
//                 }}
//                 preview={
//                   <TemplatePreview
//                     rows={3}
//                     columns={["Task", "Status", "Assignee"]}
//                     pills={["Not started", "In progress", "Done"]}
//                   />
//                 }
//               />
//             ))}
//           </div>

//           <div className="h-10" />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ------------------------------ Quick tile ------------------------------ */
// function QuickTile({
//   icon,
//   title,
//   subtitle,
//   onClick,
//   accent,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   subtitle?: string;
//   onClick?: () => void;
//   accent?: string;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className="group relative flex items-center gap-3 rounded-2xl px-4 py-5 text-left transition-all hover:-translate-y-[1px]"
//       style={{
//         background: "rgba(0,0,0,0.25)",
//         border: "1px solid rgba(255,255,255,0.08)",
//       }}
//     >
//       <div
//         aria-hidden
//         className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
//         style={{
//           background:
//             accent ??
//             "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
//           maskImage:
//             "linear-gradient(180deg, rgba(0,0,0,0.5), black 20%, black 80%, rgba(0,0,0,0.5))",
//         }}
//       />
//       <div className="relative z-10">
//         <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-black/40 text-zinc-200">
//           {icon}
//         </div>
//       </div>
//       <div className="relative z-10 min-w-0">
//         <div className="truncate text-[15px] font-semibold text-zinc-100">
//           {title}
//         </div>
//         {subtitle && (
//           <div className="truncate text-sm text-zinc-500">{subtitle}</div>
//         )}
//       </div>
//     </button>
//   );
// }

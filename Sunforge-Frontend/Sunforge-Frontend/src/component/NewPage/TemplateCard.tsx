import React from "react";

export default function TemplateCard({
  title,
  subtitle,
  accent = "#172126",
  headerShade = "#121a1f",
  onClick,
  preview,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
  headerShade?: string;
  onClick?: () => void;
  preview?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#101418] transition-colors hover:bg-[#131920] focus:outline-none focus:ring-1 focus:ring-zinc-700 overflow-hidden"
      style={{
        // subtle inner keyline like Notion
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
        // single source of truth for preview width (card will clamp if tighter)
        // @ts-ignore
        ["--preview-w" as any]: "520px",
      }}
    >
      {/* HEADER — compact, no min-height so no artificial gap */}
      <div
        className="overflow-hidden rounded-t-2xl px-4 py-2.5"
        style={{
          background: `linear-gradient(180deg, ${accent}, ${headerShade})`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="truncate whitespace-nowrap text-[14px] font-semibold leading-tight text-zinc-100">
          {title}
        </div>
        {subtitle && (
          <div className="mt-0.5 truncate text-[12px] leading-tight text-zinc-300/85">
            {subtitle}
          </div>
        )}
      </div>

      {/* BODY — fixed height + relative container; preview is absolutely pinned */}
      <div className="relative px-4 py-3 h-[120px] md:h-[140px]">
        {/* absolutely pinned preview (bottom-right) */}
        <div
          className="absolute bottom-3 right-4"
          style={{
            // keep all previews same width, but never overflow the card
            width: "min(var(--preview-w), calc(100% - 2rem))",
          }}
        >
          {preview ?? (
            <div className="h-16 w-full rounded-lg border border-white/6 bg-black/20" />
          )}
        </div>
      </div>
    </button>
  );
}

/* ---------------- TemplatePreview (unchanged API) ---------------- */

export function TemplatePreview({
  columns = ["Task name", "Status", "Assignee"],
  rows = 3,
  pills = ["Not started", "In progress", "Done"],
  peopleColumnTitles = ["Assignee", "Created by", "Owner", "Author"],
}: {
  columns?: string[];
  rows?: number;
  pills?: string[];
  peopleColumnTitles?: string[];
}) {
  const cols = [...columns];
  if (cols.length >= 3) cols[2] = peopleColumnTitles[0];

  const EMOJI_POOL = [
    "🧑🏻‍💻",
    "👩🏽‍💻",
    "🧑🏾‍🔧",
    "🧑🏼‍🔬",
    "👩🏿‍🎨",
    "🧑🏻‍🚀",
    "🧑🏽‍🍳",
    "🧑🏾‍🏫",
    "🧑🏼‍⚕️",
    "🧑🏿‍🎤",
    "🧑🏻‍🔬",
    "🧑🏽‍🎮",
    "🧑🏾‍💼",
    "🧑🏼‍🌾",
    "🧑🏿‍🏭",
  ];
  const pick = (i: number) => EMOJI_POOL[i % EMOJI_POOL.length];

  return (
    <div className="rounded-lg border border-white/6 bg-[rgba(0,0,0,0.18)] p-2.5 w-full">
      {/* header row */}
      <div className="mb-1.5 grid grid-cols-3 gap-2 text-[11px] text-zinc-400">
        {cols.map((c) => (
          <div key={c} className="truncate">
            {c}
          </div>
        ))}
      </div>
      {/* body rows */}
      <div className="space-y-1.5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 items-center gap-2">
            <div className="h-2.5 rounded bg-white/12" />
            <div className="flex items-center gap-1.5">
              <span className="rounded-full border border-white/12 bg-white/10 px-1.5 py-[1px] text-[10px] text-zinc-200">
                {pills[i % pills.length]}
              </span>
            </div>
            <div className="flex items-center -space-x-1.5">
              <div className="grid h-4 w-4 place-items-center rounded-full border border-white/10 bg-black/25 text-[10px]">
                {pick(i * 7 + 1)}
              </div>
              <div className="grid h-4 w-4 place-items-center rounded-full border border-white/10 bg-black/25 text-[10px]">
                {pick(i * 7 + 2)}
              </div>
              <div className="grid h-4 w-4 place-items-center rounded-full border border-white/10 bg-black/25 text-[10px]">
                {pick(i * 7 + 3)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import React from "react";
// import { cx } from "@emotion/css";
// import { FaCircle, FaRegClock, FaStar } from "react-icons/fa";

// /* --------------------------------- Types --------------------------------- */
// export type TemplateCardProps = {
//   title: string;
//   subtitle?: string;
//   accent?: string;
//   headerShade?: string;

//   description?: string;
//   tags?: string[];
//   pills?: string[]; // e.g. ["Kanban", "Docs-linked"]
//   stats?: {
//     lastEdited?: string; // "2d ago"
//     popularity?: number; // 0..100
//     rating?: number; // 0..5
//   };
//   peopleSeeds?: number[]; // avatar emoji seeds

//   onClick?: () => void;
//   preview?: React.ReactNode;
// };

// /* ---------------------------- Emoji Avatars ---------------------------- */
// const EMOJI_POOL = [
//   "🧑🏻‍💻",
//   "👩🏽‍💻",
//   "🧑🏾‍🔧",
//   "🧑🏼‍🔬",
//   "👩🏿‍🎨",
//   "🧑🏻‍🚀",
//   "🧑🏽‍🍳",
//   "🧑🏾‍🏫",
//   "🧑🏼‍⚕️",
//   "🧑🏿‍🎤",
//   "🧑🏻‍🔬",
//   "🧑🏽‍🎮",
//   "🧑🏾‍💼",
//   "🧑🏼‍🌾",
//   "🧑🏿‍🏭",
// ];
// const pickEmoji = (seed: number) => EMOJI_POOL[seed % EMOJI_POOL.length];

// function Avatar({ seed, size = 18 }: { seed: number; size?: number }) {
//   return (
//     <div
//       className="grid place-items-center rounded-full border border-white/10 bg-black/25"
//       style={{ width: size, height: size, fontSize: size * 0.78 }}
//       aria-hidden
//       title="Collaborator"
//     >
//       {pickEmoji(seed)}
//     </div>
//   );
// }

// /* --------------------------------- UI ---------------------------------- */
// export default function TemplateCard({
//   title,
//   subtitle,
//   accent = "#172126",
//   headerShade = "#121a1f",
//   description,
//   tags = [],
//   pills = [],
//   stats,
//   peopleSeeds = [1, 2, 3, 4],
//   onClick,
//   preview,
// }: TemplateCardProps) {
//   const rating = Math.max(0, Math.min(5, stats?.rating ?? 4.5));
//   const fullStars = Math.floor(rating);
//   const halfStar = rating - fullStars >= 0.5;

//   return (
//     <div
//       className={cx(
//         "group relative w-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0F1419]",
//         "transition-all hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
//       )}
//       style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)" }}
//     >
//       {/* Banner */}
//       <div
//         className="rounded-t-2xl px-4 py-3"
//         style={{
//           background: `linear-gradient(180deg, ${accent}, ${headerShade})`,
//           borderBottom: "1px solid rgba(255,255,255,0.06)",
//         }}
//       >
//         <div className="flex items-center gap-3">
//           <div className="h-8 w-8 shrink-0 rounded-md border border-white/10 bg-black/20" />
//           <div className="min-w-0">
//             <div className="truncate text-[15px] font-semibold text-zinc-100">
//               {title}
//             </div>
//             {subtitle && (
//               <div className="truncate text-[12px] text-zinc-300/85 leading-tight">
//                 {subtitle}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Body: 2 columns on md+, stacks on small */}
//       <div className="grid gap-3 px-4 py-4 md:grid-cols-12">
//         {/* Left: overview text */}
//         <div className="min-w-0 md:col-span-7">
//           {description && (
//             <p className="mb-3 line-clamp-3 text-[13px] leading-relaxed text-zinc-300">
//               {description}
//             </p>
//           )}

//           {/* Pills row */}
//           {!!pills.length && (
//             <div className="mb-2 flex flex-wrap items-center gap-1.5">
//               {pills.map((p) => (
//                 <span
//                   key={p}
//                   className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/8 px-2 py-[3px] text-[11px] text-zinc-200"
//                 >
//                   <FaCircle className="text-[7px] opacity-60" />
//                   {p}
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Tags */}
//           {!!tags.length && (
//             <div className="mb-3 flex flex-wrap gap-1.5">
//               {tags.map((t) => (
//                 <span
//                   key={t}
//                   className="rounded-md border border-white/10 bg-black/20 px-2 py-[3px] text-[11px] text-zinc-300"
//                 >
//                   #{t}
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Meta: avatars + stats */}
//           <div className="flex flex-wrap items-center gap-3">
//             <div className="flex items-center -space-x-2">
//               {peopleSeeds.slice(0, 5).map((s) => (
//                 <Avatar key={s} seed={s} />
//               ))}
//             </div>

//             <div className="flex items-center gap-2 text-[12px] text-zinc-400">
//               {typeof stats?.lastEdited === "string" && (
//                 <span className="inline-flex items-center gap-1">
//                   <FaRegClock /> Last edited {stats.lastEdited}
//                 </span>
//               )}
//               {typeof stats?.popularity === "number" && (
//                 <span className="inline-flex items-center gap-1">
//                   <PopularityBar value={stats.popularity} />
//                   <span className="text-zinc-500">
//                     Popularity {stats.popularity}%
//                   </span>
//                 </span>
//               )}
//               <span className="inline-flex items-center gap-1">
//                 {Array.from({ length: fullStars }).map((_, i) => (
//                   <FaStar key={i} className="text-amber-400" />
//                 ))}
//                 {halfStar && <FaStar className="text-amber-400 opacity-60" />}
//                 <span className="ml-1 text-zinc-500">{rating.toFixed(1)}</span>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Right: preview pinned bottom-right */}
//         <div className="md:col-span-5">
//           <div className="relative h-full min-h-[120px]">
//             <div className="absolute bottom-0 right-0 left-0">
//               <div className="rounded-lg border border-white/10 bg-black/20 p-2">
//                 {preview ?? (
//                   <div className="h-[120px] rounded-md border border-white/8 bg-black/30" />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer action */}
//       <div className="flex items-center justify-between border-t border-white/8 px-4 py-3">
//         <div className="text-[12px] text-zinc-500">
//           Tip: you can tweak the structure after creating it.
//         </div>
//         <button
//           onClick={onClick}
//           className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/14"
//         >
//           Use template
//         </button>
//       </div>

//       {/* Glow on hover */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//         style={{
//           background:
//             "radial-gradient(1200px 200px at 80% 0%, rgba(255,255,255,0.06), rgba(0,0,0,0))",
//         }}
//       />
//     </div>
//   );
// }

// /* ---------------------------- Popularity bar ---------------------------- */
// function PopularityBar({ value = 0 }: { value?: number }) {
//   const pct = Math.max(0, Math.min(100, value));
//   return (
//     <span
//       className="inline-block h-2 w-14 overflow-hidden rounded-full border border-white/12 bg-white/8"
//       title={`Popularity ${pct}%`}
//     >
//       <span
//         className="block h-full bg-emerald-400/80"
//         style={{ width: `${pct}%` }}
//       />
//     </span>
//   );
// }

// /* -------------------------- Optional Preview --------------------------- */
// export function TemplatePreview({
//   columns = ["Task name", "Status", "Assignee"],
//   rows = 3,
//   pills = ["Not started", "In progress", "Done"],
// }: {
//   columns?: string[];
//   rows?: number;
//   pills?: string[];
// }) {
//   return (
//     <div className="rounded-md border border-white/6 bg-[rgba(0,0,0,0.18)] p-2">
//       <div className="mb-1 grid grid-cols-3 gap-2 text-[11px] text-zinc-400">
//         {columns.map((c) => (
//           <div key={c} className="truncate">
//             {c}
//           </div>
//         ))}
//       </div>
//       <div className="space-y-1.5">
//         {Array.from({ length: rows }).map((_, i) => (
//           <div key={i} className="grid grid-cols-3 items-center gap-2">
//             <div className="h-2.5 rounded bg-white/12" />
//             <div className="flex items-center gap-1.5">
//               <span className="rounded-full border border-white/12 bg-white/10 px-1.5 py-[1px] text-[10px] text-zinc-200">
//                 {pills[i % pills.length]}
//               </span>
//             </div>
//             <div className="flex items-center -space-x-1.5">
//               <Avatar seed={i * 11 + 1} size={14} />
//               <Avatar seed={i * 11 + 2} size={14} />
//               <Avatar seed={i * 11 + 3} size={14} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

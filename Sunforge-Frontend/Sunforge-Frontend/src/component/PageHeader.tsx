// src/component/PageHeader.tsx
import React from "react";
import { cx } from "@emotion/css";
import { FaChevronRight, FaRegStar, FaStar, FaShareAlt } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

export type Crumb = {
  label: string;
  href?: string;
  onClick?: () => void;
};

function timeAgo(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso).getTime();
    const diff = Date.now() - d;
    const s = Math.max(0, Math.floor(diff / 1000));
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24);
    if (days < 7) return `${days}d ago`;
    const dt = new Date(iso);
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function PageHeaderOptions() {}
export default function PageHeader({
  breadcrumbs,
  lastEditedAtISO,
  isFavorite,
  onToggleFavorite,
  onShare,
  onMore,
  className,
}: {
  breadcrumbs: Crumb[]; // e.g. [{label:"Private"}, {label:"hi"}]
  lastEditedAtISO?: string; // updatedAt ISO string
  isFavorite?: boolean;
  onToggleFavorite?: (next: boolean) => void;
  onShare?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "sticky top-0 z-30 flex h-15 items-center border-zinc-800",
        "bg-[#0B0F12]/80 backdrop-blur px-4 md:px-6",
        className
      )}
      role="banner"
      aria-label="Page header"
    >
      {/* Left: breadcrumbs */}
      <nav
        className="flex min-w-0 items-center text-sm text-zinc-400"
        aria-label="Breadcrumb"
      >
        {breadcrumbs.map((c, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return (
            <div key={i} className="flex min-w-0 items-center">
              {i > 0 && (
                <FaChevronRight className="mx-2 shrink-0 text-[11px] text-zinc-600" />
              )}
              {c.href || c.onClick ? (
                <button
                  onClick={c.onClick}
                  className={cx(
                    "truncate hover:underline",
                    isLast ? "text-zinc-200 font-medium" : "text-zinc-400"
                  )}
                  title={c.label}
                >
                  {c.label}
                </button>
              ) : (
                <span
                  className={cx(
                    "truncate",
                    isLast ? "text-zinc-200 font-medium" : "text-zinc-400"
                  )}
                  title={c.label}
                >
                  {c.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: meta + actions */}
      <div className="flex items-center gap-2">
        {/* Edited time */}
        {lastEditedAtISO && (
          <span className="hidden md:inline text-[12px] text-zinc-500">
            Edited {timeAgo(lastEditedAtISO)}
          </span>
        )}

        {/* Share */}
        <button
          onClick={onShare}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/70 bg-zinc-900/40 px-2.5 py-1.5 text-[12px] text-zinc-200 hover:bg-zinc-900"
          title="Share"
        >
          <FaShareAlt className="text-[12px]" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* Star / Favorite */}
        <button
          onClick={() => onToggleFavorite?.(!isFavorite)}
          className={cx(
            "grid h-8 w-8 place-items-center rounded-lg border border-zinc-700/70",
            "bg-zinc-900/40 hover:bg-zinc-900 text-amber-300"
          )}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          aria-pressed={!!isFavorite}
        >
          {isFavorite ? (
            <FaStar className="text-[14px]" />
          ) : (
            <FaRegStar className="text-[14px]" />
          )}
        </button>

        {/* More */}
        <button
          onClick={onMore}
          className="grid h-8 w-8 place-items-center rounded-lg border border-zinc-700/70 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300"
          title="More options"
          aria-label="More options"
        >
          <PiDotsThreeOutlineFill className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}

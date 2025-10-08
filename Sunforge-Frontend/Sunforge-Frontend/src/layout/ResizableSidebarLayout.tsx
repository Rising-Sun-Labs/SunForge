import React from "react";
import { cx } from "@emotion/css";

type Props = {
  /** Left sidebar content */
  sidebar: React.ReactNode;
  /** Main content */
  children: React.ReactNode;
  /** Min/max/initial widths (px) */
  min?: number;
  max?: number;
  initial?: number;
  /** LocalStorage key to persist width */
  storageKey?: string;
  /** Optional topbar height offset if you have a fixed header */
  topOffset?: number;
  /** Optional classNames for slots */
  className?: {
    root?: string;
    sidebar?: string;
    content?: string;
    handle?: string;
  };
};

function readLS(key: string, fallback: number) {
  try {
    const raw = localStorage.getItem(key);
    const n = raw ? parseInt(raw, 10) : NaN;
    return Number.isFinite(n) ? n : fallback;
  } catch {
    return fallback;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ResizableSidebarLayout({
  sidebar,
  children,
  min = 220,
  max = 520,
  initial = 320,
  storageKey = "sf.sidebar.width",
  topOffset = 0,
  className,
}: Props) {
  const [width, setWidth] = React.useState<number>(() =>
    typeof window !== "undefined" ? readLS(storageKey, initial) : initial
  );
  const [dragging, setDragging] = React.useState(false);

  const startX = React.useRef(0);
  const startW = React.useRef(width);

  React.useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent) => {
      const delta = e.clientX - startX.current;
      const next = clamp(startW.current + delta, min, max);
      setWidth(next);
    };
    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [dragging, min, max]);

  React.useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(width));
    } catch {}
  }, [width, storageKey]);

  const onHandleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startX.current = e.clientX;
    startW.current = width;
    setDragging(true);
  };

  const onHandleDoubleClick = () => {
    const snap = 320;
    setWidth(clamp(snap, min, max));
  };

  return (
    <div
      className={cx(
        "relative flex h-screen w-full bg-[#0B0F12] text-zinc-200",
        className?.root
      )}
      style={{ paddingTop: topOffset }}
    >
      {/* Sidebar */}
      <aside
        className={cx(
          "h-[calc(100vh-var(--top-offset,0px))] shrink-0 overflow-hidden border-r border-zinc-800 bg-[#0D1014]",
          className?.sidebar
        )}
        style={{ width }}
      >
        {sidebar}
      </aside>

      {/* Drag handle */}
      <div
        className={cx(
          "relative z-20 h-full w-[6px] cursor-col-resize select-none",
          className?.handle
        )}
        onMouseDown={onHandleMouseDown}
        onDoubleClick={onHandleDoubleClick}
        title="Drag to resize • Double-click to reset"
      >
        {/* inner hairline */}
        <div className="pointer-events-none absolute inset-y-0 bg-zinc-800" />
        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 opacity-0 transition-opacity hover:opacity-100">
          <div className="absolute inset-y-0 left-0 right-0 bg-zinc-400/5" />
        </div>
      </div>

      {/* Main content */}
      <main
        className={cx(
          "relative z-10 flex-1 overflow-hidden bg-[#0B0F12]",
          className?.content
        )}
      >
        {children}
      </main>

      {/* Drag overlay */}
      {dragging && (
        <div className="fixed inset-0 z-10" style={{ cursor: "col-resize" }} />
      )}
    </div>
  );
}

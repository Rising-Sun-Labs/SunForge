// src/component/settings/pages/_ui.tsx
import React from "react";
import { cx } from "@emotion/css";

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-lg font-semibold text-zinc-100">{children}</h2>
  );
}
export function Divider() {
  return <div className="my-4 h-px bg-zinc-800" />;
}
export function Subtle({ children }: { children: React.ReactNode }) {
  return <div className="text-[12px] text-zinc-500">{children}</div>;
}
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <div className="mb-2 text-sm font-semibold text-zinc-300">{title}</div>
      <div className="rounded-xl border border-zinc-800 bg-[#0C1013]/60 p-4">
        {children}
      </div>
    </section>
  );
}
export function Row({
  title,
  desc,
  right,
}: {
  title: string;
  desc?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg bg-zinc-900/40 px-3 py-3">
      <div>
        <div className="text-[13px] text-zinc-200">{title}</div>
        {desc && <div className="text-[12px] text-zinc-500">{desc}</div>}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}
export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cx(
        "relative h-6 w-11 rounded-full border",
        checked
          ? "border-sky-400/40 bg-sky-400/20"
          : "border-zinc-700 bg-zinc-800"
      )}
      aria-pressed={checked}
    >
      <span
        className={cx(
          "absolute top-0.5 h-5 w-5 rounded-full transition-all",
          checked ? "right-0.5 bg-sky-300" : "left-0.5 bg-zinc-400"
        )}
      />
    </button>
  );
}
export function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-2 py-1 text-sm text-zinc-200 focus:ring-1 focus:ring-sky-400/40"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#0D1014]">
          {o}
        </option>
      ))}
    </select>
  );
}
export function Button({
  children,
  onClick,
  variant = "ghost",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "ghost" | "primary";
}) {
  return (
    <button
      onClick={onClick}
      className={
        variant === "primary"
          ? "rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-sm text-sky-200 hover:bg-sky-400/15"
          : "rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900"
      }
    >
      {children}
    </button>
  );
}

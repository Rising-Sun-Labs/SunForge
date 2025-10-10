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
      <div className="mb-2 text-md font-semibold text-zinc-300">{title}</div>
      <Divider />
      <div className="rounded-xl bg-[#0C1013]/60">{children}</div>
    </section>
  );
}

export function Row({
  title,
  desc,
  right,
  value,
  buttonTitle,
}: {
  title: string;
  desc?: React.ReactNode;
  right?: React.ReactNode;
  value?: string;
  buttonTitle?: string;
}) {
  return (
    <div className="flex justify-between items-start gap-4 px-3 py-3">
      {/* Left side (Title and Value) */}
      <div className="flex flex-col">
        <div className="text-[15px] text-zinc-200 font-semibold">{title}</div>
        {value && <div className="text-[14px] text-zinc-500 mt-1">{value}</div>}
        {desc && <div className="text-[12px] text-zinc-500">{desc}</div>}
      </div>

      {/* Right side content (Button) */}
      <div className="shrink-0 flex items-center">
        {right}
        {buttonTitle && (
          <button className="bg-transparent text-white border py-1 px-3 text-sm ml-2">
            {buttonTitle}
          </button>
        )}
      </div>
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
      className="rounded-lg bg-zinc-900 px-2 py-1 text-[15px] text-semibold text-zinc-200 focus:ring-1 focus:ring-sky-400/40 text-left
"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-zinc-900">
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

type ProfileFaceProps = {
  profileName: string;
  profilePic?: string; // Optional custom image path
};

export function ProfileFace({ profileName, profilePic }: ProfileFaceProps) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    return (first + last).toUpperCase();
  };

  const initials = getInitials(profileName);

  // Fallback to default image if profilePic is not provided
  const avatarSrc = profilePic || "/defaultface.svg";

  return (
    <div className="flex items-center space-x-3 rounded-lg">
      <div className="h-20 w-20 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden relative">
        <img
          src={avatarSrc}
          alt={profileName}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Optional: fallback to initials if image fails to load
            e.currentTarget.style.display = "none";
          }}
        />
        {!profilePic && (
          <span className="absolute text-md font-bold text-gray-700">
            {initials}
          </span>
        )}
      </div>
      <div className="items-center">
        <label className="text-gray-500 text-sm font-semibold">
          Prefered name
        </label>
        <div></div>
        <input
          className="font-bold text-white-800"
          type="text"
          id="username"
          name="username"
          value={profileName}
        >
          {/* <span className="font-medium text-gray-800">{profileName}</span> */}
        </input>
      </div>
    </div>
  );
}

// list to show all th device logged in.
// export function({}:{}){}

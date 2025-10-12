// src/component/settings/pages/_ui.tsx

import React from "react";
import { cx } from "@emotion/css";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
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
type DeviceInformation = {
  isCurrentDevice?: boolean;
  deviceName: string;
  lastActive: string;
  location: string;
};

// dummy device information
const devices: DeviceInformation[] = [
  {
    deviceName: "Windows Device",
    isCurrentDevice: true,
    lastActive: "Now",
    location: "Chennai, IN-603 IN-IN, India",
  },
  {
    deviceName: "Windows Device",
    lastActive: "Yesterday at 1:24 PM",
    location: "Chennai, IN-603 IN-IN, India",
  },
  {
    deviceName: "Windows Device",
    lastActive: "Jul 25, 2025, 1:44 PM",
    location: "Bengaluru, IN-572, IN-KA, India",
  },
  {
    deviceName: "macOS",
    lastActive: "Jul 20, 2025, 11:40 PM",
    location: "Bengaluru, Karnataka, India",
  },
];

export function LoggedInDevicesTable() {
  const [showAll, setShowAll] = React.useState(false);
  const visibleDevices = showAll ? devices : devices.slice(0, 2);

  return (
    <TableContainer
      component={Box}
      className="rounded-xl border border-zinc-900 bg-transparent text-zinc-200"
    >
      <Table className="bg-transparent border-separate border-spacing-y-2">
        <TableHead className="!bg-transparent">
          <TableRow className="!bg-transparent">
            <TableCell className="!bg-transparent !border-none !text-zinc-400 text-sm font-semibold px-3 py-2">
              Device Name
            </TableCell>
            <TableCell className="!bg-transparent !border-none !text-zinc-400 text-sm font-semibold px-3 py-2">
              Last Active
            </TableCell>
            <TableCell className="!bg-transparent !border-none !text-zinc-400 text-sm font-semibold px-3 py-2">
              Location
            </TableCell>
            <TableCell className="!bg-transparent !border-none w-32 px-3 py-2" />
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {visibleDevices.map((d, idx) => (
            <TableRow
              key={idx}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-200 hover:bg-zinc-900 transition-all"
            >
              <TableCell className="!bg-transparent !border-none px-3 py-2 align-middle">
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-200">
                    {d.deviceName}
                  </span>
                  {d.isCurrentDevice && (
                    <span className="mt-0.5 text-sm text-blue-400">
                      This Device
                    </span>
                  )}
                </div>
              </TableCell>

              <TableCell className="!bg-transparent !border-none px-3 py-2 align-middle">
                <span className="text-zinc-300 font-semibold">
                  {d.lastActive}
                </span>
              </TableCell>

              <TableCell className="!bg-transparent !border-none px-3 py-2 align-middle">
                <span className="text-zinc-300 font-semibold">
                  {d.location}
                </span>
              </TableCell>

              <TableCell
                align="right"
                className="!bg-transparent !border-none px-3 py-2 align-middle"
              >
                {!d.isCurrentDevice && (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-zinc-800 px-3 py-1.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-900/60 hover:border-zinc-700 transition"
                  >
                    Log out
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Footer Toggle */}
      <div className="px-4 py-2 text-left">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition"
        >
          {showAll ? (
            <>
              <FiChevronUp className="text-lg" /> Show fewer devices
            </>
          ) : (
            <>
              <FiChevronDown className="text-lg" /> Load more devices
            </>
          )}
        </button>
      </div>
    </TableContainer>
  );
}

export type TabItem = {
  key: string;
  label: string;
  count?: number;
};

// Tab bar
export function TabBar({
  items,
  active,
  onChange,
}: {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex items-center gap-6 border-b border-zinc-900 px-2">
      {items.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={
              "relative -mb-px pb-3 text-sm font-semibold transition " +
              (isActive
                ? "text-zinc-200"
                : "text-zinc-400 hover: text-zinc-200")
            }
          >
            <span className="flex items-center gap-2">
              {t.label}
              {typeof t.count === "number" && (
                <span
                  className={
                    "rounded-md px-1.5 py-0.5 text-xs " +
                    (isActive
                      ? "bg-zinc-800 text-zinc-200"
                      : "bg-zinc-900 text-zinc-400")
                  }
                >
                  {t.count}
                </span>
              )}
            </span>
            {isActive && (
              <span className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded bg-zinc-200" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// Search field
export function SearchField({
  value,
  placeholder = "Search",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={"relative inline-flex items-center " + (className ?? "")}>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-2 h-4 w-4 text-zinc-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 211-3.5-3.5" />
      </svg>
      <input
        value={value}
        onChange={(e) => e.target.value}
        placeholder={placeholder}
        className="w-56 rounded-lg border border-zinc-900 bg-zinc-900/40 pl-8 pr-3 py-1.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-400/40"
      />
    </div>
  );
}

// GuestsEmptyState
export function GuestsEmptyState() {
  return (
    <div className="relative rounded-xl border border-dashed border-zinc-900 bg-zinc-950/20">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        {/* Svg */}
        <svg
          viewBox="0 0 24 24"
          className="mb-3 h-8 w-8 text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="7" r="3" />
          <path d="M6 21c0-3.3 2.7-6 6-6" />
          <path d="M19 10v6" />
          <path d="M22 13h-6" />{" "}
        </svg>
        <div className="mb-2 text-[15px] font-semibold text-zinc-200">
          No guests yet
        </div>
        <button className="rounded-lg border border-zinc-900 bg-zinc-900/40 px-3 py-1.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-900">
          Import contacts
        </button>
      </div>
    </div>
  );
}

export function MemberList() {
  return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-4 text-sm text-zinc-400">
      Members list goes here...
    </div>
  );
}

export function GroupsEmpty() {
  return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-8 text-center text-sm text-zinc-400">
      No groups yet.
    </div>
  );
}

export function ContactsEmpty() {
  return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-8 text-center text-sm text-zinc-400">
      No contacts yet.
    </div>
  );
}

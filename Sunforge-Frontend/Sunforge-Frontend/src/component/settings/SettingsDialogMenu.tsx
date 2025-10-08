// src/component/settings/SettingsDialogMenu.tsx
import { cx } from "@emotion/css";
import type { MenuGroup, SettingsKey } from "./types";

export default function SettingsDialogMenu({
  groups,
  active,
  onSelect,
  onUpgrade,
}: {
  groups: MenuGroup[];
  active: SettingsKey;
  onSelect: (k: SettingsKey) => void;
  onUpgrade?: () => void;
}) {
  return (
    <aside className="w-[280px] shrink-0 border-zinc-800 bg-[#0C1013] p-3">
      {groups.map((g) => (
        <div key={g.title} className="mb-3">
          <div className="px-2 pb-1 text-[11px] uppercase tracking-wide text-zinc-500">
            {g.title}
          </div>
          <div className="space-y-1">
            {g.items.map((it) => (
              <button
                key={it.key}
                onClick={() => onSelect(it.key)}
                className={cx(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px]",
                  active === it.key
                    ? "bg-zinc-900 text-zinc-100"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                )}
              >
                <span className="opacity-80">{it.icon}</span>
                <span className="truncate">{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Upgrade button like Notion’s left footer */}
      <div className="mt-auto pt-2">
        <button
          onClick={onUpgrade}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-sm text-sky-200 hover:bg-sky-400/15"
        >
          Upgrade plan
        </button>
      </div>
    </aside>
  );
}

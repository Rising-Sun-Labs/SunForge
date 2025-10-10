// src/component/settings/SettingsDialog.tsx

import {
  FaBell,
  FaCog,
  FaDownload,
  FaGlobeAsia,
  FaHashtag,
  FaKey,
  FaLaugh,
  FaLink,
  FaLock,
  FaPeopleArrows,
  FaPuzzlePiece,
  FaRobot,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import type { MenuGroup, SettingsDialogProps, SettingsKey } from "./types";

import ConnectionsPage from "./pages/ConnectionsPage";
import EmojiPage from "./pages/EmojiPage";
import GeneralPage from "./pages/GeneralPage";
import IdentityPage from "./pages/IdentityPage";
import ImportPage from "./pages/ImportPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotionAIPage from "./pages/SunforgeAIPage";
import PeoplePage from "./pages/PeoplePage";
import PreferencesPage from "./pages/PreferencesPage";
import PublicPagesPage from "./pages/PublicPagesPage";
import React from "react";
import SecurityPage from "./pages/SecurityPage";
import SettingsDialogMenu from "./SettingsDialogMenu";
import TeamspacesPage from "./pages/TeamspacesPage";

const GROUPS: MenuGroup[] = [
  {
    title: "Account",
    items: [
      { key: "account.profile", label: "Ankush Raj", icon: <FaUser /> },
      { key: "account.preferences", label: "Preferences", icon: <FaCog /> },
      {
        key: "account.notifications",
        label: "Notifications",
        icon: <FaBell />,
      },
      { key: "account.connections", label: "Connections", icon: <FaLink /> },
    ],
  },
  {
    title: "Workspace",
    items: [
      { key: "ws.general", label: "General", icon: <FaGlobeAsia /> },
      { key: "ws.people", label: "People", icon: <FaPeopleArrows /> },
      { key: "ws.teamspaces", label: "Teamspaces", icon: <FaHashtag /> },
      { key: "ws.security", label: "Security", icon: <FaLock /> },
      { key: "ws.identity", label: "Identity", icon: <FaKey /> },
    ],
  },
  {
    title: "",
    items: [
      { key: "ai", label: "Sunforge AI", icon: <FaRobot /> },
      { key: "public", label: "Public pages", icon: <FaLink /> },
      { key: "emoji", label: "Emoji", icon: <FaLaugh /> },
      { key: "integrations", label: "Connections", icon: <FaPuzzlePiece /> },
      { key: "import", label: "Import", icon: <FaDownload /> },
    ],
  },
];

export default function SettingsDialog({
  open,
  onClose,
  workspaceName, // unused now that header is gone, keep for API parity
  userName,
}: SettingsDialogProps) {
  const [active, setActive] = React.useState<SettingsKey>(
    "account.preferences"
  );

  React.useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onMouseDown={() => onClose()}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Dialog (no sticky header) */}
      <div
        className="absolute left-1/2 top-[6vh] flex h-[88vh] w-[min(1100px,95vw)] -translate-x-1/2 overflow-hidden rounded-2xl border-zinc-800 bg-[#0D1014] shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ width: "min(1400px,95vw)" }}
      >
        {/* Floating close button only */}
        <button
          className="absolute right-10 top-3 z-10 grid h-8 w-8 place-items-center rounded-lg border-zinc-800 bg-[#0D1014]/90 text-zinc-400 backdrop-blur hover:bg-zinc-900 hover:text-zinc-200"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimesCircle className="bg-transparent text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900 transition-colors duration-300 rounded-full" />
        </button>

        {/* Body: left menu + right content (full height, no top offset) */}
        <SettingsDialogMenu
          groups={GROUPS}
          active={active}
          onSelect={setActive}
          onUpgrade={() => alert("Upgrade plan")}
        />

        <main className="min-w-0 flex-1 overflow-y-auto px-8 py-6">
          {active === "account.preferences" && <PreferencesPage />}
          {active === "account.notifications" && <NotificationsPage />}
          {active === "account.connections" && <ConnectionsPage />}
          {active === "account.profile" && (
            <GeneralPage title="My account" subtitle={userName} />
          )}

          {active === "ws.general" && <GeneralPage title="General" />}
          {active === "ws.people" && <PeoplePage />}
          {active === "ws.teamspaces" && <TeamspacesPage />}
          {active === "ws.security" && <SecurityPage />}
          {active === "ws.identity" && <IdentityPage />}

          {active === "ai" && <NotionAIPage />}
          {active === "public" && <PublicPagesPage />}
          {active === "emoji" && <EmojiPage />}
          {active === "integrations" && <IntegrationsPage />}
          {active === "import" && <ImportPage />}
        </main>
      </div>
    </div>
  );
}

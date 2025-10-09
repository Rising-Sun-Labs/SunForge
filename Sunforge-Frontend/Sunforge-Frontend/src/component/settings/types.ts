// src/component/settings/types.ts
export type SettingsKey =
  // Account
  | "account.profile"
  | "account.preferences"
  | "account.notifications"
  | "account.connections"
  // Workspace
  | "ws.general"
  | "ws.people"
  | "ws.teamspaces"
  | "ws.security"
  | "ws.identity"
  // Other
  | "ai"
  | "public"
  | "emoji"
  | "integrations"
  | "import";

export type MenuItem = {
  key: SettingsKey;
  label: string;
  icon: React.ReactNode;
};

export type MenuGroup = {
  title: string;
  items: MenuItem[];
};

export type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  workspaceName: string;
  userName: string;
};

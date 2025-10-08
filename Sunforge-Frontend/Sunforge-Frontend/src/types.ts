import type { ReactElement } from "react";
export type PageNode = {
  id: string;
  label: string;
  path: string;
  icon?: ReactElement;
  children?: PageNode[];
  lastEditedBy?: string;
  lastEditedAt?: string;
  isFavorite?: boolean;
  isWiki?: boolean;
  preview?: string;
};
export type PageDTO = {
  id: string;
  title: string;
  path: string;
  parentId: string | null;
  isWiki: boolean;
  updatedByName?: string;
  updatedAtISO?: string;
};
// export type SidebarPayload = {
//   favorites: PageDTO[];
//   private: PageDTO[];
//   teamspaces: PageDTO[];
//   workspace: {
//     name: string;
//     memberCount: number;
//     email: string;
//     avatarUrl?: string;
//   };
// };

export type SidebarPayload = {
  favorites: PageDTO[];
  private: PageDTO[];
  shared?: PageDTO[];
  teamspaces: PageDTO[];
  templates?: PageDTO[];
  trash?: PageNode[];
  workspace: {
    name: string;
    memberCount: number;
    email: string;
    avatarUrl: string;
    workspaces?: string[];
  };
};

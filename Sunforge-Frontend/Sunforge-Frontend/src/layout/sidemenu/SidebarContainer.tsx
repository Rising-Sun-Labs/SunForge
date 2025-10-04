import React, { useEffect, useState } from "react";
import { SidebarTree, type PageNode } from "./SidebarTree";

declare const __API_BASE__: string;
const API_BASE =
  typeof __API_BASE__ !== "undefined" ? __API_BASE__ : "http://localhost:5005";

type PageDTO = {
  id: string;
  title: string;
  path: string;
  parentId: string | null;
  isWiki: boolean;
  updatedByName?: string;
  updatedAtISO?: string;
};

type SidebarPayload = {
  favorites: PageDTO[];
  private: PageDTO[];
  teamspaces: PageDTO[];
  workspace: {
    name: string;
    memberCount: number;
    email: string;
    avatarUrl?: string;
  };
};

function toTree(pages: PageDTO[]): PageNode[] {
  const nodes: Record<string, PageNode> = {};
  const roots: PageNode[] = [];
  for (const p of pages) {
    nodes[p.id] = {
      id: p.id,
      label: p.title,
      path: p.path,
      isWiki: p.isWiki,
      lastEditedBy: p.updatedByName,
      lastEditedAt: p.updatedAtISO,
      children: [],
    };
  }
  for (const p of pages) {
    if (p.parentId && nodes[p.parentId])
      nodes[p.parentId].children!.push(nodes[p.id]);
    else roots.push(nodes[p.id]);
  }
  return roots;
}

export default function SidebarContainer({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) {
  const [fav, setFav] = useState<PageNode[]>([]);
  const [priv, setPriv] = useState<PageNode[]>([]);
  const [team, setTeam] = useState<PageNode[]>([]);
  const [wsInfo, setWsInfo] = useState<{
    name: string;
    memberCount: number;
    email: string;
    avatarUrl?: string;
  }>({
    name: "",
    memberCount: 0,
    email: "",
  });

  const reload = () => {
    fetch(`${API_BASE}/api/sidebar?userId=${userId}&workspaceId=${workspaceId}`)
      .then((r) => r.json())
      .then((d: SidebarPayload) => {
        setFav(toTree(d.favorites));
        setPriv(toTree(d.private));
        setTeam(toTree(d.teamspaces));
        setWsInfo(d.workspace);
      })
      .catch((err) => console.log("sidebar load error", err));
  };

  useEffect(reload, [userId, workspaceId]);

  return (
    <SidebarTree
      roots={team}
      privateRoots={priv}
      favoriteRoots={fav}
      currentWorkspaceName={wsInfo.name || "Ankush Raj’s Workspace"}
      memberCount={wsInfo.memberCount || 10}
      email={wsInfo.email || "ankushraj886@gmail.com"}
      avatarUrl={wsInfo.avatarUrl}
      onNavigate={(n) => console.log("navigate", n)}
      onCreateInside={(parent) => {
        const body = { title: "Untitled", parentId: parent.id, workspaceId };
        fetch(`${API_BASE}/api/pages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then(() => reload());
        return {
          id: crypto.randomUUID(),
          label: "Untitled",
          path: parent.path + "/" + Math.random().toString(36).slice(2, 6),
          children: [],
          lastEditedBy: "You",
          lastEditedAt: "Just now",
        };
      }}
      onRename={(n, next) => {
        fetch(`${API_BASE}/api/pages/${n.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: next }),
        }).then(() => reload());
      }}
      onTrash={(n) => {
        fetch(`${API_BASE}/api/pages/${n.id}`, { method: "DELETE" }).then(() =>
          reload()
        );
      }}
      onCopyLink={(n) =>
        navigator.clipboard.writeText(location.origin + n.path)
      }
      onOpenInNewTab={(n) => window.open(n.path, "_blank")}
      onToggleFavorite={(n, next) => {
        fetch(`${API_BASE}/api/favorites/${n.id}?userId=${userId}`, {
          method: next ? "PUT" : "DELETE",
        }).then(() => reload());
      }}
    ></SidebarTree>
  );
}

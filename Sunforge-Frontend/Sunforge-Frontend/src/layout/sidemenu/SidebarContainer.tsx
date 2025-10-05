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
  workspaceId: string;
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
    if (p.parentId && nodes[p.parentId]) {
      nodes[p.parentId].children!.push(nodes[p.id]);
    } else {
      roots.push(nodes[p.id]);
    }
  }
  return roots;
}

export default function SidebarContainer({
  userId,
  workspaceId,
  onNavigate,
}: {
  userId: string;
  workspaceId: string;
  onNavigate: (path: string) => void;
}) {
  const [fav, setFav] = useState<PageNode[]>([]);
  const [priv, setPriv] = useState<PageNode[]>([]);
  const [team, setTeam] = useState<PageNode[]>([]);
  const [wsInfo, setWsInfo] = useState<{
    name: string;
    memberCount: number;
    email: string;
    avatarUrl?: string;
  }>({ name: "", memberCount: 0, email: "" });

  const reload = async () => {
    try {
      const url = `${API_BASE}/api/sidebar?userId=${userId}&workspaceId=${workspaceId}`;
      console.log("Fetching sidebar from:", url);

      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Sidebar fetch failed: ${res.status} ${res.statusText}`);
        return;
      }

      const text = await res.text();
      let data: SidebarPayload | null = null;
      try {
        data = JSON.parse(text) as SidebarPayload;
      } catch {
        console.warn("Sidebar: invalid JSON response", text);
        return;
      }

      setFav(toTree(data.favorites ?? []));
      setPriv(toTree(data.private ?? []));
      setTeam(toTree(data.teamspaces ?? []));
      setWsInfo({
        name: data.workspace?.name ?? "Unknown workspace",
        memberCount: data.workspace?.memberCount ?? 0,
        email: data.workspace?.email ?? "unknown@gmail.com",
        avatarUrl: data.workspace?.avatarUrl ?? "",
      });
    } catch (err) {
      console.error("Sidebar load error:", err);
      setFav([]);
      setPriv([]);
      setTeam([]);
      setWsInfo({
        name: "Offline Mode",
        memberCount: 0,
        email: "offline@local",
      });
    }
  };

  useEffect(() => {
    reload();
  }, [userId, workspaceId]);

  //   const handleCreateInside = async (parent: PageNode) => {
  //     const newNode: PageNode = {
  //       id: crypto.randomUUID(),
  //       label: "Untitled",
  //       path: parent.path + "/" + Math.random().toString(36).slice(2, 6),
  //       children: [],
  //       lastEditedBy: "You",
  //       lastEditedAt: "Just now",
  //     };

  //     try {
  //       await fetch(`${API_BASE}/api/pages`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           title: "Untitled",
  //           parentId: parent.id,
  //           workspaceId,
  //         }),
  //       })
  //         .then(() => reload())
  //         .catch((err) => console.error(err));
  //       //   reload();
  //     } catch (err) {
  //       console.error("Failed to create page:", err);
  //     }

  //     return newNode;
  //   };

  const handleCreateInside = (parent: PageNode): PageNode => {
    const newNode: PageNode = {
      id: crypto.randomUUID(),
      label: "Untitled",
      path: parent.path + "/" + Math.random().toString(36).slice(2, 6),
      children: [],
      lastEditedBy: "You",
      lastEditedAt: "Just now",
    };

    // async call but we don't wait
    fetch(`${API_BASE}/api/pages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Untitled",
        parentId: parent.id,
        workspaceId,
      }),
    })
      .then(() => reload())
      .catch((err) => console.error(err));

    return newNode; // immediately return for SidebarTree
  };

  const handleRename = async (node: PageNode, nextTitle: string) => {
    try {
      await fetch(`${API_BASE}/api/pages/${node.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: nextTitle }),
      });
      reload();
    } catch (err) {
      console.error("Failed to rename page:", err);
    }
  };

  const handleTrash = async (node: PageNode) => {
    try {
      await fetch(`${API_BASE}/api/pages/${node.id}`, { method: "DELETE" });
      reload();
    } catch (err) {
      console.error("Failed to delete page:", err);
    }
  };

  const handleToggleFavorite = async (node: PageNode, next: boolean) => {
    try {
      await fetch(`${API_BASE}/api/favorites/${node.id}?userId=${userId}`, {
        method: next ? "PUT" : "DELETE",
      });
      reload();
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  return (
    <SidebarTree
      roots={team}
      privateRoots={priv}
      favoriteRoots={fav}
      currentWorkspaceName={wsInfo.name || "Workspace"}
      memberCount={wsInfo.memberCount || 0}
      email={wsInfo.email || "unknown@example.com"}
      avatarUrl={wsInfo.avatarUrl}
      onNavigate={(n: any) => onNavigate(n?.path ?? "/")}
      onCreateInside={handleCreateInside}
      onRename={handleRename}
      onTrash={handleTrash}
      onCopyLink={(n: any) =>
        navigator.clipboard.writeText(location.origin + n.path)
      }
      onOpenInNewTab={(n: any) => window.open(n.path, "_blank")}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}

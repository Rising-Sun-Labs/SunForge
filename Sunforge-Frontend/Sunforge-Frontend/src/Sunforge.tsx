import type { PageDTO, PageNode, SidebarPayload } from "./types";
import { useEffect, useState } from "react";
import {
  createPage,
  deletePage,
  getSidebar,
  renamePage,
  toggleFavorite,
} from "./api";

import { FaFolderOpen } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import SidebarTree from "./component/SidebarTree";
import SunForgePageEditor from "./component/SunForgePageEditor";
import ResizableSidebarLayout from "./layout/ResizableSidebarLayout";
import PageHeader from "./component/PageHeader";

const USER_ID = "11111111-1111-1111-1111-111111111111";
const WORKSPACE_ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

type WorkspaceInfo = {
  name: string;
  memberCount: number;
  email: string;
  avatarUrl?: string;
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
      icon: <FaFolderOpen />,
    };
  }
  for (const p of pages) {
    if (p.parentId && nodes[p.parentId])
      nodes[p.parentId].children!.push(nodes[p.id]);
    else roots.push(nodes[p.id]);
  }
  return roots;
}

export default function Sunforge() {
  const [fav, setFav] = useState<PageNode[]>([]);
  const [priv, setPriv] = useState<PageNode[]>([]);
  const [team, setTeam] = useState<PageNode[]>([]);
  const [wsInfo, setWsInfo] = useState<WorkspaceInfo>({
    name: "Ankush Raj’s Workspace",
    memberCount: 1,
    email: "ankush.raj@example.com",
    avatarUrl: "",
  });

  const [currentTitle, setCurrentTitle] = useState(
    "🙏 Welcome to Sunforge ☀️🔥"
  );

  const [lastEditedAt, setLastEditedAt] = useState<string>(
    new Date().toISOString()
  );
  const [isFavPage, setIsFavPage] = useState<boolean>(false);

  const breadcrumbs = [
    // choose based on where selected page lives;
    { label: "Private" },
    { label: currentTitle },
  ];
  const reload = () => {
    getSidebar(USER_ID, WORKSPACE_ID)
      .then((d: SidebarPayload) => {
        setFav(toTree(d.favorites));
        const privTree = toTree(d.private);
        if (privTree.length === 0)
          privTree.push({
            id: "pv-welcome",
            label: "🙏 Welcome to Sunforge ☀️🔥",
            path: "/me/welcome",
            children: [],
          });
        setPriv(privTree);
        setTeam(toTree(d.teamspaces));
        setWsInfo(d.workspace);
      })
      .catch(() => {
        setTeam([
          {
            id: "ws-1",
            label: "Engineering",
            path: "/teamspaces/engineering",
            icon: <MdHomeWork />,
            children: [
              {
                id: "pg-1",
                label: "Design Docs",
                path: "/teamspaces/engineering/design-docs",
                children: [],
              },
            ],
          },
        ]);
        setPriv([
          {
            id: "pv-welcome",
            label: "🙏 Welcome to Sunforge ☀️🔥",
            path: "/me/welcome",
            children: [],
          },
        ]);
        setFav([]);
      });
  };

  useEffect(reload, []);

  const onNavigate = (n: PageNode) => {
    console.log("navigate", n);
  };
  const onCreateInside = (parent: PageNode) => {
    createPage("Untitled", parent.id, WORKSPACE_ID).then(reload);
  };
  const onRename = (node: PageNode, next: string) => {
    renamePage(node.id, next).then(reload);
  };
  const onTrash = (node: PageNode) => {
    deletePage(node.id).then(reload);
  };
  const onToggleFavorite = (node: PageNode, next: boolean) => {
    toggleFavorite(USER_ID, node.id, next).then(reload);
  };

  return (
    <ResizableSidebarLayout
      min={220}
      max={520}
      initial={320}
      storageKey="sf.sidebar.width"
      sidebar={
        <SidebarTree
          roots={team}
          privateRoots={priv}
          favoriteRoots={fav}
          workspace={wsInfo}
          userId={USER_ID}
          onNavigate={onNavigate}
          onCreateInside={onCreateInside}
          onRename={onRename}
          onTrash={onTrash}
          onToggleFavorite={onToggleFavorite}
        />
      }
    >
      {/* Header bar: */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        lastEditedAtISO={lastEditedAt}
        isFavorite={isFavPage}
        onToggleFavorite={setIsFavPage}
        onShare={() => {}}
        onMore={() => {}}
      />
      {/* The editor */}
      <div className="h-[calc(100vh-3rem)] overflow-auto">
        {/* 3rem = 12 tailwindcss height  */}
        <SunForgePageEditor
          initialTitle={currentTitle}
          onTitleChange={setCurrentTitle}
        />
      </div>
    </ResizableSidebarLayout>
  );
}

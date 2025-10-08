// import { useEffect } from "react";
// import SidebarContainer from "./layout/sidemenu/SidebarContainer";
// import SunforgePage from "./component/SunForgePageEditor";

// export default function App() {
//   const userId = "11111111-1111-1111-1111-111111111111";
//   const workspaceId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

//   useEffect(() => {
//     // seed backend on first run (Safe to fail if alreadu seed:)
//     fetch(
//       (window as any).__API_BASE__ ?? "http://localhost:5005" + "/api/seed",
//       { method: "POST" }
//     ).catch(() => {});
//   }, []);

//   return (
//     <div className="h-screen w-full flex">
//       <aside className="w-[320px] h-full border-r border-zinc-800">
//         <SidebarContainer
//           userId={userId}
//           workspaceId={workspaceId}
//           onNavigate={(path) => console.log("navigate", path)}
//         />
//       </aside>
//       <main className="flex-1 overflow-y-auto">
//         <div className="max-w-3xl mx-auto px-8 py-6">
//           <SunforgePage />
//         </div>
//       </main>
//     </div>
//   );
// }

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

export default function App() {
  const [fav, setFav] = useState<PageNode[]>([]);
  const [priv, setPriv] = useState<PageNode[]>([]);
  const [team, setTeam] = useState<PageNode[]>([]);
  // const [wsInfo, setWsInfo] = useState<{
  //   name: string;
  //   memberCount: number;
  //   email: string;
  //   avatarUrl: string;
  // }>({
  //   name: "Ankush Raj’s Workspace",
  //   memberCount: 1,
  //   email: "ankush.raj@example.com",
  //   avatarUrl: "",
  // });
  const [wsInfo, setWsInfo] = useState<WorkspaceInfo>({
    name: "Ankush Raj’s Workspace",
    memberCount: 1,
    email: "ankush.raj@example.com",
    avatarUrl: "",
  });

  const [currentTitle, setCurrentTitle] = useState("Untitled");

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
    /* hook into router as needed */ console.log("navigate", n);
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
    <div className="h-screen w-full flex">
      <aside className="w-[320px] h-full border-r border-zinc-800">
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
      </aside>
      <main className="flex-1">
        <SunForgePageEditor
          initialTitle={currentTitle}
          onTitleChange={setCurrentTitle}
        />
      </main>
    </div>
  );
}

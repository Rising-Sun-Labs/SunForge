import React from "react";
import SidebarContainer from "./layout/sidemenu/SidebarContainer";

export default function App() {
  const userId = "11111111-1111-1111-1111-111111111111";
  const workspaceId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

  return (
    <div className="h-screen w-full flex">
      <aside className="w-[320px] h-full border-r border-zinc-800">
        <SidebarContainer userId={userId} workspaceId={workspaceId} />
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold">Content Area</h1>
        <p className="text-zinc-400 mt-2">
          Select items from the sidebar. Create/Rename/Delete/
        </p>
      </main>
    </div>
  );
}

import { useEffect } from "react";
import SidebarContainer from "./layout/sidemenu/SidebarContainer";
import SunforgePage from "./component/SunforgePage";

export default function App() {
  const userId = "11111111-1111-1111-1111-111111111111";
  const workspaceId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

  useEffect(() => {
    // seed backend on first run (Safe to fail if alreadu seed:)
    fetch(
      (window as any).__API_BASE__ ?? "http://localhost:5005" + "/api/seed",
      { method: "POST" }
    ).catch(() => {});
  }, []);

  return (
    <div className="h-screen w-full flex">
      <aside className="w-[320px] h-full border-r border-zinc-800">
        <SidebarContainer
          userId={userId}
          workspaceId={workspaceId}
          onNavigate={(path) => console.log("navigate", path)}
        />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-6">
          <SunforgePage />
        </div>
      </main>
    </div>
  );
}

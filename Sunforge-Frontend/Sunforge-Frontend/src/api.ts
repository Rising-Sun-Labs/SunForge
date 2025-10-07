export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5005";
export async function getSidebar(userId: string, workspaceId: string) {
  const r = await fetch(
    `${API_BASE}/api/sidebar?userId=${userId}&workspaceId=${workspaceId}`
  );
  if (!r.ok) throw new Error("sidebar");
  return r.json();
}
export async function createPage(
  title: string,
  parentId: string | null,
  workspaceId: string
) {
  const r = await fetch(`${API_BASE}/api/pages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, parentId, workspaceId }),
  });
  if (!r.ok) throw new Error("create");
  return r.json();
}
export async function renamePage(id: string, title: string) {
  const r = await fetch(`${API_BASE}/api/pages/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!r.ok) throw new Error("rename");
}
export async function deletePage(id: string) {
  const r = await fetch(`${API_BASE}/api/pages/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("delete");
}
export async function toggleFavorite(
  userId: string,
  pageId: string,
  next: boolean
) {
  const r = await fetch(
    `${API_BASE}/api/favorites/${pageId}?userId=${userId}`,
    { method: next ? "PUT" : "DELETE" }
  );
  if (!r.ok) throw new Error("favorite");
}

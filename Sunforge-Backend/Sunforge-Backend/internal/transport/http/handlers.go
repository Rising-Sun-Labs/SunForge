package http

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/Rising-Sun-Labs/SunForge/internal/service"
	"github.com/Rising-Sun-Labs/SunForge/internal/transport/dto"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

type Handlers struct {
	log     *zap.Logger
	sidebar *service.SidebarService
	pages   *service.PageService
}

func NewHandlers(log *zap.Logger, sb *service.SidebarService, ps *service.PageService) *Handlers {
	return &Handlers{log: log, sidebar: sb, pages: ps}
}

func (h *Handlers) Health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func (h *Handlers) Sidebar(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	userIDStr := r.URL.Query().Get("userId")
	workspaceIDStr := r.URL.Query().Get("workspaceId")
	if userIDStr == "" || workspaceIDStr == "" {
		http.Error(w, "userId and workspaceId required", http.StatusBadRequest)
		return
	}
	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		http.Error(w, "invalid userId", 400)
		return
	}
	wsID, err := uuid.Parse(workspaceIDStr)
	if err != nil {
		http.Error(w, "invalid workspaceId", 400)
		return
	}

	// In a real app, fetch workspace name/email from DB (omitted)
	resp, err := h.sidebar.Sidebar(ctx, userID, wsID, "Ankush Raj’s Workspace", "ankush.raj@example.com", nil)
	if err != nil {
		h.log.Error("sidebar error", zap.Error(err))
		http.Error(w, "failed", http.StatusInternalServerError)
		return
	}
	writeJSON(w, resp)
}

func (h *Handlers) CreatePage(w http.ResponseWriter, r *http.Request) {
	var body dto.CreatePageReq
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "bad json", 400)
		return
	}
	p, err := h.pages.Create(r.Context(), body.WorkspaceID, body.ParentID, body.Title, nil)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	writeJSON(w, p)
}

func (h *Handlers) UpdatePage(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		http.Error(w, "bad id", 400)
		return
	}
	var body dto.UpdatePageReq
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "bad json", 400)
		return
	}
	if err := h.pages.UpdateTitle(r.Context(), id, body.Title); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	writeJSON(w, map[string]string{"status": "ok"})
}

func (h *Handlers) DeletePage(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		http.Error(w, "bad id", 400)
		return
	}
	if err := h.pages.Delete(r.Context(), id); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	writeJSON(w, map[string]string{"status": "ok"})
}

func (h *Handlers) MovePage(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		http.Error(w, "bad id", 400)
		return
	}
	var body dto.MovePageReq
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "bad json", 400)
		return
	}
	if err := h.pages.Move(r.Context(), id, body.ToParentID, body.BeforeID); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	writeJSON(w, map[string]string{"status": "ok"})
}

func (h *Handlers) PageByPath(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Query().Get("path")
	if path == "" {
		http.Error(w, "path required", 400)
		return
	}
	p, err := h.pages.ResolveByPath(r.Context(), path)
	if err != nil {
		http.Error(w, "not found", 404)
		return
	}
	writeJSON(w, p)
}

func (h *Handlers) PageChildren(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		http.Error(w, "bad id", 400)
		return
	}
	ch, err := h.pages.Children(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	writeJSON(w, ch)
}

func (h *Handlers) PutFavorite(w http.ResponseWriter, r *http.Request) {
	userIDStr := r.URL.Query().Get("userId")
	idStr := chi.URLParam(r, "id")
	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		http.Error(w, "bad userId", 400)
		return
	}
	pageID, err := uuid.Parse(idStr)
	if err != nil {
		http.Error(w, "bad id", 400)
		return
	}
	if err := h.pages.ToggleFavorite(r.Context(), userID, pageID, true); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	writeJSON(w, map[string]string{"status": "ok"})
}

func (h *Handlers) DeleteFavorite(w http.ResponseWriter, r *http.Request) {
	userIDStr := r.URL.Query().Get("userId")
	idStr := chi.URLParam(r, "id")
	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		http.Error(w, "bad userId", 400)
		return
	}
	pageID, err := uuid.Parse(idStr)
	if err != nil {
		http.Error(w, "bad id", 400)
		return
	}
	if err := h.pages.ToggleFavorite(r.Context(), userID, pageID, false); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	writeJSON(w, map[string]string{"status": "ok"})
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(v)
}

func ctx(r *http.Request) context.Context { return r.Context() }

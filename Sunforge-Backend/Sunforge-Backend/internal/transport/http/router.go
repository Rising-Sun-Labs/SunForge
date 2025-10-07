package http

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func NewRouter(h *Handlers) http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(Timeout(20 * time.Second))
	r.Use(Cors)
	r.Use(NoCache)

	r.Get("/healthz", h.Health)

	r.Route("/api", func(r chi.Router) {
		r.Get("/sidebar", h.Sidebar)
		r.Get("/pageByPath", h.PageByPath)

		r.Post("/pages", h.CreatePage)
		r.Patch("/pages{id}", h.UpdatePage)
		r.Delete("/pages{id}", h.DeletePage)
		r.Post("/pages{id}/move", h.MovePage)
		r.Get("/pages/{id}/children", h.PageChildren)

		r.Put("/favorites/{id}", h.PutFavorite)
		r.Delete("/favorites/{id}", h.DeleteFavorite)
	})

	return r
}

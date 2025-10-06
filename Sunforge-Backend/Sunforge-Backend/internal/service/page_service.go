package service

import (
	"context"
	"fmt"
	"strings"

	"github.com/Rising-Sun-Labs/SunForge/internal/models"
	"github.com/Rising-Sun-Labs/SunForge/internal/repository"
	"github.com/google/uuid"
)

type PageService struct {
	repo *repository.PageRepository
}

func NewPageService(repo *repository.PageRepository) *PageService {
	return &PageService{repo: repo}
}

func (s *PageService) Create(ctx context.Context, workspaceID uuid.UUID, parentID *uuid.UUID, title string, createdBy *uuid.UUID) (*models.Page, error) {
	if strings.TrimSpace(title) == "" {
		title = "Untitled"
	}
	path := s.derivePath(title, parentID)
	p := &models.Page{
		WorkspaceID: workspaceID,
		ParentID:    parentID,
		Title:       title,
		Path:        path,
		PageType:    "page",
		Icon:        nil,
		IsWiki:      false,
		CreatedBy:   createdBy,
		UpdatedBy:   createdBy,
	}
	if err := s.repo.Create(ctx, p); err != nil {
		return nil, err
	}
	return p, nil
}

func (s *PageService) UpdateTitle(ctx context.Context, id uuid.UUID, title string) error {
	if strings.TrimSpace(title) == "" {
		title = "Untitled"
	}
	return s.repo.UpdateTitle(ctx, id, title)
}

func (s *PageService) Delete(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}

func (s *PageService) Move(ctx context.Context, id uuid.UUID, toParent *uuid.UUID, before *uuid.UUID) error {
	return s.repo.Move(ctx, id, toParent, before)
}

func (s *PageService) ResolveByPath(ctx context.Context, path string) (*models.Page, error) {
	return s.repo.ResolveByPath(ctx, path)
}

func (s *PageService) Children(ctx context.Context, id uuid.UUID) ([]models.Page, error) {
	return s.repo.ChildPages(ctx, id)
}

func (s *PageService) ToggleFavorite(ctx context.Context, userID, pageID uuid.UUID, add bool) error {
	return s.repo.ToggleFavorite(ctx, userID, pageID, add)
}

func (s *PageService) derivePath(title string, parentID *uuid.UUID) string {
	slug := slugify(title)
	if parentID == nil {
		// Put new top-level under /pages/<slug>-<short>
		return fmt.Sprintf("/pages/%s-%s", slug, uuid.New().String()[:6])
	}

	// Parent path should be fetched (omitted here for brevity), but for a first pass this
	// use a standard nested scheme
	return fmt.Sprintf("/p/%s/%s-%s", parentID.String()[:8], slug, uuid.New().String()[:6])
}

func slugify(s string) string {
	s = strings.TrimSpace(strings.ToLower(s))
	s = strings.ReplaceAll(s, "/", "-")
	s = strings.ReplaceAll(s, " ", "-")
	return s
}

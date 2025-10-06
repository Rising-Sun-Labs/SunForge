package service

import (
	"context"

	"github.com/Rising-Sun-Labs/SunForge/internal/models"
	"github.com/Rising-Sun-Labs/SunForge/internal/repository"
	"github.com/google/uuid"
)

type SidebarService struct {
	repo     *repository.PageRepository
	userRepo *repository.UserRepository
}

func NewSidebarService(r *repository.PageRepository, ur *repository.UserRepository) *SidebarService {
	return &SidebarService{repo: r, userRepo: ur}
}

type SidebarResp struct {
	Favorites  []models.PageTreeNode `json:"favorites"`
	Private    []models.PageTreeNode `json:"private"`
	Teamspaces []models.PageTreeNode `json:"teamspaces"`
	Workspace  struct {
		Name        string  `json:"name"`
		MemberCount int     `json:"memberCount"`
		Email       string  `json:"email"`
		AvatarURL   *string `json:"avatarUrl,omitempty"`
	} `json:"workspace"`
}

func (s *SidebarService) Sidebar(ctx context.Context, userID, workspaceID uuid.UUID, workspaceName, email string, avatar *string) (*SidebarResp, error) {
	favs, priv, team, err := s.repo.GetSidebarData(ctx, userID, workspaceID)
	if err != nil {
		return nil, err
	}
	favMap, err := s.repo.GetFavoritesMap(ctx, userID)
	if err != nil {
		return nil, err
	}

	resp := &SidebarResp{}
	resp.Favorites = s.repo.BuildTree(ctx, favs, userID, favMap)
	resp.Private = s.repo.BuildTree(ctx, priv, userID, favMap)
	resp.Teamspaces = s.repo.BuildTree(ctx, team, userID, favMap)

	cnt, _ := s.userRepo.MemberCount(ctx, workspaceID)
	resp.Workspace.Name = workspaceName
	resp.Workspace.MemberCount = cnt
	resp.Workspace.Email = email
	resp.Workspace.AvatarURL = avatar

	return resp, nil
}

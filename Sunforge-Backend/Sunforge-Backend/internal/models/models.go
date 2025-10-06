package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID          uuid.UUID `db:"id"`
	Email       string    `db:"email"`
	DisplayName string    `db:"display_name"`
	CreatedAt   time.Time `db:"created_at"`
}

type Workspace struct {
	ID        uuid.UUID `db:"id"`
	Name      string    `db:"name"`
	Icon      *string   `db:"icon"`
	AvatarURL *string   `db:"avatar_url"`
	CreatedAt time.Time `db:"created_at"`
}

type Page struct {
	ID          uuid.UUID  `db:"id" json:"id"`
	WorkspaceID uuid.UUID  `db:"workspace_id" json:"workspaceId"`
	ParentID    *uuid.UUID `db:"parent_id" json:"parentId,omitempty"`
	Title       string     `db:"title" json:"title"`
	Path        string     `db:"path" json:"path"`
	PageType    string     `db:"page_type" json:"pageType"`
	Icon        *string    `db:"icon" json:"icon,omitempty"`
	IsWiki      bool       `db:"is_wiki" json:"isWiki"`
	Archived    bool       `db:"archived" json:"archived"`
	CreatedBy   *uuid.UUID `db:"created_by" json:"createdBy,omitempty"`
	UpdatedBy   *uuid.UUID `db:"updated_by" json:"updatedBy,omitempty"`
	CreatedAt   time.Time  `db:"created_at" json:"createdAt"`
	UpdatedAt   time.Time  `db:"updated_at" json:"updatedAt"`
}

type Favorite struct {
	UserID    uuid.UUID `db:"user_id"`
	PageID    uuid.UUID `db:"page_id"`
	CreatedAt time.Time `db:"created_at"`
}

type PageTreeNode struct {
	ID         uuid.UUID       `json:"id"`
	Title      string          `json:"title"`
	Path       string          `json:"path"`
	Icon       *string         `json:"icon,omitempty"`
	Type       string          `json:"type"`
	ParentID   *uuid.UUID      `json:"parentId,omitempty"`
	IsFavorite bool            `json:"isFavorite"`
	Children   []PageTreeNode  `json:"children,omitempty"`
}

package dto

import "github.com/google/uuid"

type CreatePageReq struct {
	Title       string     `json:"title"`
	WorkspaceID uuid.UUID  `json:"workspaceId"`
	ParentID    *uuid.UUID `json:"parentId"`
}

type UpdatePageReq struct {
	Title string `json:"title"`
}

type MovePageReq struct {
	ToParentID *uuid.UUID `json:"toParentId"`
	BeforeID   *uuid.UUID `json:"beforeId"`
}

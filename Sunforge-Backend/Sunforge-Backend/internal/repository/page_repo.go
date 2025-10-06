package repository

import (
	"context"
	"errors"
	"sort"
	"strings"

	"github.com/Rising-Sun-Labs/SunForge/internal/models"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type PageRepository struct {
	conn *pgx.Conn
}

func NewPageRepository(conn *pgx.Conn) *PageRepository {
	return &PageRepository{conn: conn}
}

func (r *PageRepository) GetSidebarData(ctx context.Context, userID, workspaceID uuid.UUID) (favorites []models.Page, priv []models.Page, team []models.Page, err error) {
	// Favorites (flat list)
	rows, err := r.conn.Query(ctx, `
		SELECT p.* FROM favorites f
		JOIN pages p ON p.id = f.page_id
		WHERE f.user_id = $1 AND p.archived = false
		ORDER BY f.created_at DESC
	`, userID)
	if err != nil {
		return
	}
	defer rows.Close()
	for rows.Next() {
		var p models.Page
		if err = rows.Scan(
			&p.ID, &p.WorkspaceID, &p.ParentID, &p.Title, &p.Path, &p.PageType, &p.Icon, &p.IsWiki, &p.Archived,
			&p.CreatedBy, &p.UpdatedBy, &p.CreatedAt, &p.UpdatedAt,
		); err != nil {
			return
		}
		favorites = append(favorites, p)
	}

	// Private subtree: parent '/me' within workspace
	privRows, err := r.conn.Query(ctx, `
		SELECT p.* FROM pages p
		WHERE p.workspace_id = $1 AND p.path LIKE '/me%' AND p.archived = false
	`, workspaceID)
	if err != nil {
		return
	}
	defer privRows.Close()
	for privRows.Next() {
		var p models.Page
		if err = privRows.Scan(
			&p.ID, &p.WorkspaceID, &p.ParentID, &p.Title, &p.Path, &p.PageType, &p.Icon, &p.IsWiki, &p.Archived,
			&p.CreatedBy, &p.UpdatedBy, &p.CreatedAt, &p.UpdatedAt,
		); err != nil {
			return
		}
		priv = append(priv, p)
	}

	// Teamspaces (everything else in workspace, excluding /me)
	teamRows, err := r.conn.Query(ctx, `
		SELECT p.* FROM pages p
		WHERE p.workspace_id = $1 AND p.path NOT LIKE '/me%' AND p.archived = false
	`, workspaceID)
	if err != nil {
		return
	}
	defer teamRows.Close()
	for teamRows.Next() {
		var p models.Page
		if err = teamRows.Scan(
			&p.ID, &p.WorkspaceID, &p.ParentID, &p.Title, &p.Path, &p.PageType, &p.Icon, &p.IsWiki, &p.Archived,
			&p.CreatedBy, &p.UpdatedBy, &p.CreatedAt, &p.UpdatedAt,
		); err != nil {
			return
		}
		team = append(team, p)
	}

	return
}

func (r *PageRepository) BuildTree(ctx context.Context, pages []models.Page, userID uuid.UUID, favMap map[uuid.UUID]bool) []models.PageTreeNode {
	byID := map[uuid.UUID]models.PageTreeNode{}
	children := map[uuid.UUID][]models.PageTreeNode{}

	for _, p := range pages {
		n := models.PageTreeNode{
			ID:         p.ID,
			Title:      p.Title,
			Path:       p.Path,
			Icon:       p.Icon,
			Type:       p.PageType,
			ParentID:   p.ParentID,
			IsFavorite: favMap[p.ID],
		}
		byID[p.ID] = n
		if p.ParentID != nil {
			children[*p.ParentID] = append(children[*p.ParentID], n)
		}
	}

	// Sort children by page_order.sort_index when available, fallback by title
	orderIndex := map[uuid.UUID]int64{}
	rows, _ := r.conn.Query(ctx, `SELECT page_id, sort_index FROM page_order`)
	for rows.Next() {
		var id uuid.UUID
		var idx int64
		_ = rows.Scan(&id, &idx)
		orderIndex[id] = idx
	}
	sortChildren := func(xs []models.PageTreeNode) {
		sort.Slice(xs, func(i, j int) bool {
			ai := orderIndex[xs[i].ID]
			aj := orderIndex[xs[j].ID]
			if ai == aj {
				return strings.ToLower(xs[i].Title) < strings.ToLower(xs[j].Title)
			}
			return ai < aj
		})
	}

	var roots []models.PageTreeNode
	for _, p := range pages {
		if p.ParentID == nil {
			n := byID[p.ID]
			n.Children = assemble(n.ID, children, sortChildren)
			n.IsFavorite = favMap[p.ID]
			roots = append(roots, n)
		}
	}
	sortChildren(roots)
	return roots
}

func assemble(id uuid.UUID, bag map[uuid.UUID][]models.PageTreeNode, sorter func([]models.PageTreeNode)) []models.PageTreeNode {
	ch := bag[id]
	for i := range ch {
		ch[i].Children = assemble(ch[i].ID, bag, sorter)
	}
	sorter(ch)
	return ch
}

func (r *PageRepository) GetFavoritesMap(ctx context.Context, userID uuid.UUID) (map[uuid.UUID]bool, error) {
	rows, err := r.conn.Query(ctx, `SELECT page_id FROM favorites WHERE user_id=$1`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := map[uuid.UUID]bool{}
	for rows.Next() {
		var id uuid.UUID
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		out[id] = true
	}
	return out, nil
}

func (r *PageRepository) Create(ctx context.Context, p *models.Page) error {
	return r.conn.QueryRow(ctx, `
		INSERT INTO pages (workspace_id, parent_id, title, path, page_type, icon, is_wiki, archived, created_by, updated_by)
		VALUES ($1,$2,$3,$4,$5,$6,$7,false,$8,$9)
		RETURNING id, created_at, updated_at
	`, p.WorkspaceID, p.ParentID, p.Title, p.Path, p.PageType, p.Icon, p.IsWiki, p.CreatedBy, p.UpdatedBy).
		Scan(&p.ID, &p.CreatedAt, &p.UpdatedAt)
}

func (r *PageRepository) UpdateTitle(ctx context.Context, id uuid.UUID, title string) error {
	tag, err := r.conn.Exec(ctx, `UPDATE pages SET title=$2, updated_at=now() WHERE id=$1`, id, title)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return errors.New("not found")
	}
	return nil
}

func (r *PageRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.conn.Exec(ctx, `UPDATE pages SET archived=true, updated_at=now() WHERE id=$1`, id)
	return err
}

func (r *PageRepository) Move(ctx context.Context, id uuid.UUID, toParentID *uuid.UUID, beforeID *uuid.UUID) error {
	// Update parent
	if _, err := r.conn.Exec(ctx, `UPDATE pages SET parent_id=$2, updated_at=now() WHERE id=$1`, id, toParentID); err != nil {
		return err
	}
	// Reorder: naive strategy → shift indices, set a mid value; production: use fractional indexing or “gap” strategy.
	// For demo, set sort_index just before 'beforeID' or end.
	var newIdx int64 = 1000000
	if beforeID != nil {
		var idx int64
		_ = r.conn.QueryRow(ctx, `SELECT sort_index FROM page_order WHERE page_id=$1`, *beforeID).Scan(&idx)
		if idx > 0 {
			newIdx = idx - 1
		}
	}
	_, _ = r.conn.Exec(ctx, `
		INSERT INTO page_order (page_id, sort_index) VALUES ($1,$2)
		ON CONFLICT (page_id) DO UPDATE SET sort_index=EXCLUDED.sort_index`,
		id, newIdx,
	)
	return nil
}

func (r *PageRepository) ResolveByPath(ctx context.Context, path string) (*models.Page, error) {
	row := r.conn.QueryRow(ctx, `SELECT * FROM pages WHERE path=$1 AND archived=false`, path)
	var p models.Page
	err := row.Scan(
		&p.ID, &p.WorkspaceID, &p.ParentID, &p.Title, &p.Path, &p.PageType, &p.Icon, &p.IsWiki, &p.Archived,
		&p.CreatedBy, &p.UpdatedBy, &p.CreatedAt, &p.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *PageRepository) ChildPages(ctx context.Context, id uuid.UUID) ([]models.Page, error) {
	rows, err := r.conn.Query(ctx, `SELECT * FROM pages WHERE parent_id=$1 AND archived=false`, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []models.Page
	for rows.Next() {
		var p models.Page
		if err := rows.Scan(
			&p.ID, &p.WorkspaceID, &p.ParentID, &p.Title, &p.Path, &p.PageType, &p.Icon, &p.IsWiki, &p.Archived,
			&p.CreatedBy, &p.UpdatedBy, &p.CreatedAt, &p.UpdatedAt,
		); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, nil
}

func (r *PageRepository) ToggleFavorite(ctx context.Context, userID, pageID uuid.UUID, add bool) error {
	if add {
		_, err := r.conn.Exec(ctx, `INSERT INTO favorites (user_id,page_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`, userID, pageID)
		return err
	}
	_, err := r.conn.Exec(ctx, `DELETE FROM favorites WHERE user_id=$1 AND page_id=$2`, userID, pageID)
	return err
}

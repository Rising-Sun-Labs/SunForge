package database

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func Seed(ctx context.Context, conn *pgx.Conn) error {
	var count int
	_ = conn.QueryRow(ctx, `SELECT count(*) FROM users`).Scan(&count)
	if count > 0 {
		return nil
	}

	// Create demo user + workspace
	var userID, wsID uuid.UUID
	err := conn.QueryRow(ctx,
		`INSERT INTO users (email, display_name) VALUES ($1,$2) RETURNING id`, 
		"ankush.raj@example.com", "Ankush Raj",
	).Scan(&userID)
	if err != nil { return err }

	err = conn.QueryRow(ctx,
		`INSERT INTO workspaces (name, icon, avatar_url) VALUES ($1,$2,$3) RETURNING id`,
		"Ankush Raj’s Workspace", "🧭", "",
	).Scan(&wsID)
	if err != nil { return err }

	_, err = conn.Exec(ctx,
		`INSERT INTO workspace_members (user_id, workspace_id, role) VALUES ($1,$2,'owner')`,
		userID, wsID,
	)
	if err != nil { return err }

	// Private root
	var privRootID uuid.UUID
	err = conn.QueryRow(ctx, `
		INSERT INTO pages (workspace_id, parent_id, title, path, page_type, icon, created_by, updated_by)
		VALUES ($1, NULL, 'Private', '/me', 'page', '🙈', $2, $2) RETURNING id
	`, wsID, userID).Scan(&privRootID)
	if err != nil { return err }

	// Private welcome page
	var welcomeID uuid.UUID
	err = conn.QueryRow(ctx, `
		INSERT INTO pages (workspace_id, parent_id, title, path, page_type, icon, created_by, updated_by)
		VALUES ($1, $2, '🙏 Welcome to Sunforge ☀️🔥', '/me/welcome', 'page', '✨', $3, $3)
		RETURNING id
	`, wsID, privRootID, userID).Scan(&welcomeID)
	if err != nil { return err }
	_, _ = conn.Exec(ctx, `INSERT INTO page_order (page_id, sort_index) VALUES ($1, 1)`, privRootID)
	_, _ = conn.Exec(ctx, `INSERT INTO page_order (page_id, sort_index) VALUES ($1, 2)`, welcomeID)

	// Teamspaces
	var engID, designID uuid.UUID
	err = conn.QueryRow(ctx, `
		INSERT INTO pages (workspace_id, parent_id, title, path, page_type, icon, created_by, updated_by)
		VALUES ($1, NULL, 'Engineering', '/teamspaces/engineering', 'page', '🛠️', $2, $2)
		RETURNING id
	`, wsID, userID).Scan(&engID)
	if err != nil { return err }
	err = conn.QueryRow(ctx, `
		INSERT INTO pages (workspace_id, parent_id, title, path, page_type, icon, created_by, updated_by)
		VALUES ($1, NULL, 'Design', '/teamspaces/design', 'page', '🎨', $2, $2)
		RETURNING id
	`, wsID, userID).Scan(&designID)
	if err != nil { return err }
	_, _ = conn.Exec(ctx, `INSERT INTO page_order (page_id, sort_index) VALUES ($1, 10), ($2, 20)`, engID, designID)

	// Child examples
	var designDocsID uuid.UUID
	err = conn.QueryRow(ctx, `
		INSERT INTO pages (workspace_id, parent_id, title, path, page_type, icon, created_by, updated_by)
		VALUES ($1, $2, 'Design Docs', '/teamspaces/engineering/design-docs', 'page', '📁', $3, $3)
		RETURNING id
	`, wsID, engID, userID).Scan(&designDocsID)
	if err != nil { return err }
	_, _ = conn.Exec(ctx, `INSERT INTO page_order (page_id, sort_index) VALUES ($1, 1)`, designDocsID)

	// Favorite one page for demo
	_, _ = conn.Exec(ctx, `INSERT INTO favorites (user_id, page_id, created_at) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
		userID, designDocsID, time.Now(),
	)

	return nil
}

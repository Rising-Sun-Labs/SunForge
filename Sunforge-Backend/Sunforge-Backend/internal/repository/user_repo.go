package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type UserRepository struct{ conn *pgx.Conn }

func NewUserRepository(conn *pgx.Conn) *UserRepository { return &UserRepository{conn: conn} }

func (r *UserRepository) MemberCount(ctx context.Context, workspaceID uuid.UUID) (int, error) {
	var n int
	if err := r.conn.QueryRow(ctx, `SELECT count(*) FROM workspace_members WHERE workspace_id=$1`, workspaceID).Scan(&n); err != nil {
		return 0, err
	}
	return n, nil
}

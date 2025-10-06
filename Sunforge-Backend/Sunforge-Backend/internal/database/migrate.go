// package database

// import (
// 	"context"
// 	"embed"
// 	"fmt"
// 	"log"
// 	"time"

// 	"github.com/jackc/pgx/v5"
// )

// //go:embed migrations/*.sql
// var migrationsFS embed.FS

// func Migrate(ctx context.Context, conn *pgx.Conn) error {
// 	entries, err := migrationsFS.ReadDir("migrations")
// 	if err != nil {
// 		return fmt.Errorf("read migrations dir: %w", err)
// 	}

// 	tx, err := conn.Begin(ctx)
// 	if err != nil {
// 		return err
// 	}
// 	defer tx.Rollback(ctx)

// 	for _, e := range entries {
// 		if e.IsDir() {
// 			continue
// 		}
// 		b, err := migrationsFS.ReadFile("migrations/" + e.Name())
// 		if err != nil {
// 			return fmt.Errorf("read %s: %w", e.Name(), err)
// 		}
// 		if _, err := tx.Exec(ctx, string(b)); err != nil {
// 			return fmt.Errorf("apply %s: %w", e.Name(), err)
// 		}
// 	}

// 	if err := tx.Commit(ctx); err != nil {
// 		return err
// 	}
// 	log.Println("migrations applied")
// 	return nil
// }

// func WaitForDB(ctx context.Context, dsn string, maxWait time.Duration) (*pgx.Conn, error) {
// 	deadline := time.Now().Add(maxWait)
// 	var lastErr error
// 	for time.Now().Before(deadline) {
// 		conn, err := pgx.Connect(ctx, dsn)
// 		if err == nil {
// 			return conn, nil
// 		}
// 		lastErr = err
// 		time.Sleep(800 * time.Millisecond)
// 	}
// 	return nil, fmt.Errorf("db not ready: %w", lastErr)
// }

package database

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"log"
	"sort"
	"time"

	"github.com/jackc/pgx/v5"
)

// 1) Embed all .sql files under internal/database/migrations
//
//go:embed migrations/*.sql
var migrationsFS embed.FS

// 2) Run them in name order
func Migrate(ctx context.Context, conn *pgx.Conn) error {
	paths, err := fs.Glob(migrationsFS, "migrations/*.sql")
	if err != nil {
		return fmt.Errorf("glob migrations: %w", err)
	}
	if len(paths) == 0 {
		return fmt.Errorf("no migration files found in embedded FS (looked for migrations/*.sql)")
	}
	sort.Strings(paths)

	tx, err := conn.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	for _, p := range paths {
		b, err := migrationsFS.ReadFile(p)
		if err != nil {
			return fmt.Errorf("read %s: %w", p, err)
		}
		if _, err := tx.Exec(ctx, string(b)); err != nil {
			return fmt.Errorf("apply %s: %w", p, err)
		}
	}
	if err := tx.Commit(ctx); err != nil {
		return err
	}
	log.Printf("migrations applied: %d files", len(paths))
	return nil
}

func WaitForDB(ctx context.Context, dsn string, maxWait time.Duration) (*pgx.Conn, error) {
	deadline := time.Now().Add(maxWait)
	var lastErr error
	for time.Now().Before(deadline) {
		conn, err := pgx.Connect(ctx, dsn)
		if err == nil {
			return conn, nil
		}
		lastErr = err
		time.Sleep(800 * time.Millisecond)
	}
	return nil, fmt.Errorf("db not ready: %w", lastErr)
}

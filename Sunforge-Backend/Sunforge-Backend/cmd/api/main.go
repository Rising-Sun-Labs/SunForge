package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/Rising-Sun-Labs/SunForge/internal/config"
	"github.com/Rising-Sun-Labs/SunForge/internal/database"
	"github.com/Rising-Sun-Labs/SunForge/internal/logger"
	"github.com/Rising-Sun-Labs/SunForge/internal/repository"
	"github.com/Rising-Sun-Labs/SunForge/internal/service"

	transport "github.com/Rising-Sun-Labs/SunForge/internal/transport/http"
)

func main() {
	cfg, err := config.FromEnv()
	if err != nil {
		log.Fatal(err)
	}

	logr, err := logger.New()
	if err != nil {
		log.Fatal(err)
	}
	defer logr.Sync()

	ctx := context.Background()
	conn, err := database.WaitForDB(ctx, cfg.DSN, 30*time.Second)
	if err != nil {
		log.Fatal("db connect:", err)
	}
	defer conn.Close(context.Background())

	if err := database.Migrate(ctx, conn); err != nil {
		log.Fatal(err)
	}

	// comment the seed when moving to production env
	if err := database.Seed(ctx, conn); err != nil {
		log.Fatal(err)
	}

	// Writing
	pageRepo := repository.NewPageRepository(conn)
	userRepo := repository.NewUserRepository(conn)
	pageSvc := service.NewPageService(pageRepo)
	sidebarSvc := service.NewSidebarService(pageRepo, userRepo)

	handlers := transport.NewHandlers(logr, sidebarSvc, pageSvc)
	router := transport.NewRouter(handlers)

	srv := &http.Server{
		Addr:              cfg.HTTPAddr,
		Handler:           router,
		ReadHeaderTimeout: 10 * time.Second,
	}

	go func() {
		log.Printf("HTTP listening on %s\n", cfg.HTTPAddr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("listen:", err)
		}
	}()

	// Graceful shutdown
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop
	ctxShudown, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = srv.Shutdown(ctxShudown)
}

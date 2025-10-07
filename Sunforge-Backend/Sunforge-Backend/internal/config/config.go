package config

import (
	"fmt"
	"os"
)

type Config struct {
	AppEnv   string
	HTTPAddr string
	DSN      string
}

func FromEnv() (*Config, error) {
	cfg := &Config{
		AppEnv:   get("APP_ENV", "development"),
		HTTPAddr: get("HTTP_ADDR", ":5005"),
	}
	host := get("DB_HOST", "localhost")
	port := get("DB_PORT", "5432")
	user := get("DB_USER", "sunforge")
	pass := get("DB_PASSWORD", "sunforge")
	name := get("DB_NAME", "sunforge")
	ssl := get("DB_SSLMODE", "disable")
	cfg.DSN = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s", user, pass, host, port, name, ssl)
	return cfg, nil
}

func get(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}

**Run locally**

```
# set env
cp .env.example .env

# with Docker
docker compose up --build -d

# API on :5005, Postgres on :5432

# or native
export $(grep -v '^#' .env.example | xargs)
go mod download
go run ./cmd/api

```

<!-- ## Backend Information of this project.

## Current available backend services.

- ToDo Task Management
- Medium like social media
- DSA visualizations
- LLM models -->

## Next Steps

- [ ] 🔐 AuthN/Z (JWT or session) → read userId from token, not query param.
- [ ] 🔢 Fractional ordering (e.g., sort_key as string) for stable, lock-free DnD reorder.
- [ ] 📦 Block persistence APIs (/api/blocks) if you want to save page block content.
- [ ] 🔍 Fulltext search (PG Trigram or OpenSearch) for Quick Search.
- [ ] ⚙️ Background jobs (webhooks, indexing) via a worker.
- [ ] 🧱 Multi-tenant limits & rate limiting (chi middleware or envoy/traefik).

-- Enable UUIDs (safe to run multiple times)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Workspaces
CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    icon TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Workspace membership
CREATE TABLE IF NOT EXISTS workspace_members (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member',
    PRIMARY KEY (user_id, workspace_id)
);

-- Pages: a Page is a Block-like entity
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    parent_id UUID NULL REFERENCES pages(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    path TEXT UNIQUE NOT NULL,
    page_type TEXT NOT NULL DEFAULT 'page',  -- page|database|template
    icon TEXT,
    is_wiki BOOLEAN NOT NULL DEFAULT FALSE,
    archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID NULL REFERENCES users(id),
    updated_by UUID NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ordering within a parent
CREATE TABLE IF NOT EXISTS page_order (
    page_id UUID PRIMARY KEY REFERENCES pages(id) ON DELETE CASCADE,
    sort_index BIGINT NOT NULL
);

-- Favorite per user (can favorite any page)
CREATE TABLE IF NOT EXISTS favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, page_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pages_workspace_parent ON pages(workspace_id, parent_id);
CREATE INDEX IF NOT EXISTS idx_pages_path ON pages(path);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- Migration: Create file_entries table
-- Run this once after connecting to Vercel Postgres

CREATE TABLE IF NOT EXISTS "file_entries" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "type" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'outros',
  "blobUrl" TEXT NOT NULL,
  "downloads" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "idx_file_entries_category" ON "file_entries" ("category");
CREATE INDEX IF NOT EXISTS "idx_file_entries_createdAt" ON "file_entries" ("createdAt" DESC);

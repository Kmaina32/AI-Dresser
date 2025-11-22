-- SQL Schema for AI-Dresser Application
-- Designed for PostgreSQL

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
-- Table `users`
-- Stores user information, synced from your auth provider (Stack).
-- The `id` should be the user ID provided by Stack.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- User ID from Stack Auth
  email TEXT UNIQUE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------
-- Table `clothing_items`
-- Represents individual clothing items in a user's virtual closet.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS clothing_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g., 'top', 'bottom', 'shoes', 'accessory'
  color TEXT,
  brand TEXT,
  image_url TEXT, -- URL to the image of the clothing item
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index for faster lookups of clothing items by user
CREATE INDEX IF NOT EXISTS idx_clothing_items_user_id ON clothing_items(user_id);

-- -----------------------------------------------------
-- Table `outfits`
-- Represents a named collection of clothing items.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS outfits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index for faster lookups of outfits by user
CREATE INDEX IF NOT EXISTS idx_outfits_user_id ON outfits(user_id);

-- -----------------------------------------------------
-- Table `outfit_items` (Join Table)
-- Links clothing_items to outfits (many-to-many relationship).
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS outfit_items (
  outfit_id UUID NOT NULL REFERENCES outfits(id) ON DELETE CASCADE,
  clothing_item_id UUID NOT NULL REFERENCES clothing_items(id) ON DELETE CASCADE,
  PRIMARY KEY (outfit_id, clothing_item_id) -- Ensures a clothing item can't be in the same outfit twice
);
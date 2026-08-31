# 05: Supabase Database Schema, Storage Policies & Production Deployment Setup

**What to build:** Complete, turnkey database configuration scripts and deployment documentation for connecting the FemHealth Clinic blog to a live Supabase production project. Includes the SQL migration file (`supabase/schema.sql`) defining the `posts` table, indexes, Row Level Security (RLS) policies, automatic `updated_at` trigger, public/private storage rules for the `blog-images` bucket, initial clinical seed articles, and `.env.example` environment variable templates.

**Blocked by:** 04: Full Post Authoring Experience: WYSIWYG Editor, Image Upload & Live Preview

**Status:** completed

- [x] `supabase/schema.sql` contains full PostgreSQL table definition for `posts` with appropriate types, defaults, and indexes
- [x] Row Level Security (RLS) is configured: public can read published posts (`published = true`), authenticated admins have full CRUD permissions
- [x] `blog-images` storage bucket is initialized with public read access and authenticated upload/delete policies
- [x] Auto-updating trigger `handle_updated_at()` ensures `updated_at` timestamps update on record modification
- [x] Seed data inserts 4 high-quality medical articles covering core clinic specialties (Maternity, Laparoscopy, PCOS, Fertility)
- [x] `.env.example` specifies `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [x] Comprehensive verification of `npm run build` with zero TypeScript or Next.js build errors

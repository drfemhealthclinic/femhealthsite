# 04: Full Post Authoring Experience: WYSIWYG Editor, Image Upload & Live Preview

**What to build:** A comprehensive post editor interface for creating (`/admin/posts/new`) and editing (`/admin/posts/edit/[id]`) articles. Includes an intuitive toolbar for formatting text (Headings H2/H3, bold, italics, bullet/numbered lists, quotes, medical insight callouts, links), automatic URL slug generation from title (with manual edit override), featured cover image upload directly to Supabase Storage (or via external image URL), custom SEO metadata fields (Meta Title, Meta Description with snippet preview), and a full-screen Live Preview modal simulating patient view before publishing.

**Blocked by:** 03: Admin Post Manager Table with Quick Status Toggle & Deletion

**Status:** completed

- [x] `/admin/posts/new` and `/admin/posts/edit/[id]` render a clean, distraction-free post authoring form
- [x] Typing an article title automatically generates a URL-friendly slug with a toggle to manually customize it
- [x] Category dropdown selector and custom tag input chips allow categorization
- [x] Featured cover image component supports both direct file upload to Supabase Storage bucket (`blog-images`) and pasting an image URL, with immediate preview
- [x] Rich text editor toolbar provides formatting for bold, italic, headings (H2, H3), lists, blockquotes, clinical callout boxes, and links
- [x] Excerpt input field provides short preview text for cards and SEO
- [x] SEO settings card provides custom Meta Title, Meta Description, and live search engine snippet preview
- [x] "Live Preview" modal renders the post exactly as it will appear on `/blog/[slug]`
- [x] Saving post as "Draft" saves changes and keeps it unlisted publicly
- [x] Saving post as "Published" updates publication timestamp and immediately makes it visible on the public blog

<!-- ready-for-agent -->
# Spec: FemHealth Blog Section & Admin Management Portal

## Problem Statement

Dr. Pooja Wadgaonkar Patil needs an authoritative, patient-centric educational platform to publish articles on women's health topics (such as High-Risk Maternity, Laparoscopic Surgery, Infertility & IVF, and PCOS/PCOD). 

Currently, the FemHealth Clinic website only has static pages. Patients cannot search for medical topics or read in-depth guides, and Dr. Pooja has no private dashboard to write, edit, upload media, preview, and publish blog posts with proper SEO optimization, category filtering, and clinical callouts.

## Solution

Build an integrated Blog System and dedicated Admin Portal:
1. **Public Blog Section**: Allows patients to search, filter by medical specialties, read evidence-based articles with estimated reading times, share on WhatsApp and social platforms, and directly book consultations with Dr. Pooja.
2. **Admin Management Portal**: A password-protected management dashboard with Supabase Auth that enables Dr. Pooja to create, edit, draft, publish, and delete blog articles using a modern rich-text WYSIWYG editor with live preview, custom SEO controls, and direct image uploads to Supabase Storage.
3. **Seamless Site Integration**: Integrated into Navbar, Footer, and homepage Patient Education feed, with a resilient fallback data layer for local development and offline stability.

## User Stories

1. As a prospective patient, I want to browse educational articles on the blog index page, so that I can learn about gynaecological and obstetric conditions from a trusted doctor.
2. As a patient, I want to filter articles by category (such as Maternity & Pregnancy, Laparoscopic Surgery, Infertility & IVF, PCOS & PCOD, and Women's Wellness), so that I can quickly find relevant medical guidance for my symptoms.
3. As a patient, I want an instant keyword search bar on the blog listing page, so that I can find topics like "endometriosis" or "first trimester" without scrolling through everything.
4. As a patient, I want to see the estimated reading time on each article card and detail page, so that I know how long the article will take to read.
5. As a patient, I want each article to feature a clear, structured layout with headings, clinical callouts, and key takeaways, so that complex medical concepts are easy to understand.
6. As a patient, I want a 1-click WhatsApp and social share button on every article, so that I can share useful health tips with friends and family.
7. As a patient, I want a "Meet Dr. Pooja Wadgaonkar Patil" author card and direct "Book Consultation" CTA on every article, so that I can easily schedule an appointment after reading about my condition.
8. As a site visitor on the homepage, I want the Patient Education section to display the latest 3 published articles dynamically with a "View All Articles" link to the blog.
9. As Dr. Pooja / clinic admin, I want to log in securely at a dedicated login route using email and password, so that unauthorized users cannot alter clinic publications.
10. As Dr. Pooja / clinic admin, I want unauthenticated attempts to access admin routes to be redirected to the login page, so that the management area is secure.
11. As Dr. Pooja, I want an overview dashboard showing metrics (total posts, published posts, drafts, total views), so that I can gauge the status and reach of my blog.
12. As Dr. Pooja, I want a dedicated post manager table with search, category filtering, and status badges, so that I can quickly organize and locate my articles.
13. As Dr. Pooja, I want a 1-click toggle switch to switch an article between Draft and Published status, so that I can prepare articles in advance.
14. As Dr. Pooja, I want a modern WYSIWYG rich text editor with toolbars for headings, lists, quotes, medical advice callout boxes, and inline links, so that writing patient articles is effortless.
15. As Dr. Pooja, I want to upload featured cover images by drag-and-drop to Supabase Storage or by pasting an image URL, so that my articles have visual appeal.
16. As Dr. Pooja, I want custom SEO controls (custom URL slug, meta title, meta description, and OpenGraph preview) for each post, so that my articles rank well on Google search.
17. As Dr. Pooja, I want a "Live Preview" modal in the editor, so that I can see exactly how the article looks to patients before making it public.
18. As Dr. Pooja, I want a delete confirmation modal when removing an article, so that I do not accidentally delete important content.
19. As Dr. Pooja, I want a quick logout option in the admin navigation, so that I can securely end my session.
20. As a developer or offline user, I want the blog system to gracefully fallback to mock educational articles if Supabase is offline or unconfigured, so that the website never breaks or crashes.

## Implementation Decisions

### Data Model & Persistence
- Relational schema storing article records with: unique identifier, title, slug, excerpt, structured content (HTML/JSON), cover image URL, category, tags, published state flag, published timestamp, reading time estimate, SEO meta title, SEO meta description, view count, author name, and audit timestamps.
- Row Level Security (RLS) policies:
  - Public read access permitted only for records where `published = true`.
  - Authenticated admin access permitted for full CRUD operations.
- Supabase Storage bucket for blog media assets with public read access and authenticated upload restrictions.
- Resilient local fallback store providing initial medical education articles across core domains (Maternity, Laparoscopy, Infertility, PCOS).

### Authentication & Access Control
- Supabase Auth utilizing Email + Password credentials.
- Protected admin routes guarded via session verification with automatic redirect to login for unauthenticated visitors.
- Branded login interface matching FemHealth Clinic visual identity.

### Content Authoring & Editor
- Rich text WYSIWYG authoring component supporting heading levels, emphasis formatting, bulleted/numbered lists, blockquotes, medical callout boxes, and link insertion.
- Cover image asset upload supporting both direct file drop to cloud storage and direct image URL specification.
- Automatic slug generation derived from article title with manual override capability.
- In-context live preview modal simulating the public reader view before publishing.

### Public Experience & Site Integration
- Public blog listing page featuring real-time client-side search, category filter pills, featured article spotlight, and responsive article grid.
- Dynamic article detail page generating OpenGraph/Twitter SEO tags, reading time, breadcrumb hierarchy, doctor author card, social sharing actions, and related articles carousel.
- Global navigation links in header and footer.
- Dynamic integration into homepage Patient Education feed.

## Testing Decisions

### Good Test Principles
- Test external behavior from the user's perspective (page rendering, search filtering, authentication redirects, article creation, publish state transitions, and responsive layout), never internal implementation minutiae.

### Modules to Test & Verify
1. **Public Reader Seam**:
   - Verify blog index renders categories, search bar filters cards dynamically, and clicking a card routes to the article.
   - Verify article page renders full content, author card, reading time, social share triggers, and related articles.
   - Verify non-existent slugs display a clean 404 page.
2. **Admin Auth & Route Guard Seam**:
   - Verify visiting admin routes while unauthenticated redirects to login.
   - Verify successful credential submission redirects to the dashboard.
   - Verify logout terminates the session.
3. **Admin Post Management & Editor Seam**:
   - Verify creating and saving a post updates the administrative post table.
   - Verify draft posts do not appear on public pages.
   - Verify toggling to published makes the post visible on public pages.
   - Verify deletion prompts for confirmation and removes the post.
4. **Offline Resilience Seam**:
   - Verify public pages function seamlessly with fallback articles when database connection is inactive.

## Out of Scope

- Patient comment threads or interactive discussion forums (to avoid unmoderated medical advice liabilities).
- Multi-tier editorial review approval hierarchies.
- Paid subscription paywalls or premium content tiers.

## Further Notes

- A one-click SQL migration script will be maintained to initialize all tables, RLS rules, storage buckets, and initial seed data in Supabase.

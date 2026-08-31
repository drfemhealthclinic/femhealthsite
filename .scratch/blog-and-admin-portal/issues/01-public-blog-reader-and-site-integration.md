# 01: Public Blog Reader & Global Site Integration

**What to build:** An end-to-end public patient blog experience where visitors can discover and read medical articles written by Dr. Pooja Wadgaonkar Patil. Visitors can navigate to the blog via header and footer links, filter by medical specialty categories, search by keywords in real time, view estimated reading times, read structured articles with clinical callout boxes, share articles via WhatsApp/social media, and book consultations. The homepage Patient Education section dynamically showcases the latest published articles. Includes a resilient fallback data layer ensuring the site works smoothly offline or before Supabase credentials are configured.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Navigation header in Navbar includes a working "Blog" link that highlights when active
- [x] Footer includes "Blog & Articles" under Quick Links
- [x] Public `/blog` route renders hero banner, category filter pills (All, Maternity & Pregnancy, Laparoscopic Surgery, Infertility & IVF, PCOS & PCOD, Women's Wellness), and live search bar
- [x] Typing in the search bar instantly filters articles by title, excerpt, category, or tags
- [x] Clicking any article card opens `/blog/[slug]` rendering the full article content, cover image, category badge, publication date, and estimated reading time
- [x] Article detail page renders "Meet Dr. Pooja Wadgaonkar Patil" author card, 1-click WhatsApp & social sharing buttons, and a related articles carousel
- [x] Invalid article slugs gracefully render a clear not-found / 404 state with a return to blog button
- [x] Homepage `PatientEducation.tsx` section dynamically renders the top 3 latest published articles with links to their respective `/blog/[slug]` pages
- [x] The entire public blog experience works seamlessly using built-in fallback medical content when Supabase is not connected

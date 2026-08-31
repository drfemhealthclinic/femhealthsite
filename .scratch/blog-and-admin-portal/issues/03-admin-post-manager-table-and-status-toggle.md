# 03: Admin Post Manager Table with Quick Status Toggle & Deletion

**What to build:** An administrative post management interface (`/admin/posts`) where Dr. Pooja can browse and manage all articles in one place. The table supports searching by title, filtering by category and publication status (Published / Draft), viewing metrics per article (views, published date, category), a 1-click switch to toggle between Draft and Published status (immediately syncing with the public site), and a delete action protected by a confirmation modal.

**Blocked by:** 02: Admin Authentication, Route Guard & Dashboard

**Status:** completed

- [x] `/admin/posts` displays a structured table of all articles with thumbnail, title, category badge, publication status badge, views count, and last updated date
- [x] Search input allows real-time filtering of the admin posts table by title or slug
- [x] Category dropdown filter allows narrowing down posts by medical domain
- [x] Status filter allows viewing All, Published only, or Drafts only
- [x] 1-click toggle switch allows instantly switching an article between Draft and Published status without opening the full editor
- [x] Draft articles are immediately verified as hidden from public `/blog`, while Published articles become visible
- [x] Clicking "Delete" opens a modal requiring confirmation before removing the article record
- [x] Confirming deletion removes the post and refreshes the table with an update toast notification

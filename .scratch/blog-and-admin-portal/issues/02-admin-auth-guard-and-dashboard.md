# 02: Admin Authentication, Route Guard & Dashboard

**What to build:** A secure admin portal where Dr. Pooja Wadgaonkar Patil or authorized clinic staff can log in using email and password credentials. Unauthenticated attempts to access `/admin` or any nested admin routes are automatically intercepted and redirected to `/admin/login`. Once authenticated, the user is redirected to the `/admin` dashboard displaying key blog analytics (Total Articles, Published, Drafts, Total Views), quick navigation links, and a secure Logout button.

**Blocked by:** 01: Public Blog Reader & Global Site Integration

**Status:** completed

- [x] `/admin/login` renders a branded, elegant login card matching FemHealth clinic visual styling
- [x] Submitting valid clinic admin credentials authenticates the user via Supabase Auth and redirects to `/admin`
- [x] Submitting invalid credentials shows a clear, human-readable error alert
- [x] Unauthenticated requests to `/admin` and all `/admin/*` sub-routes are redirected to `/admin/login`
- [x] Admin shell layout renders a persistent header/sidebar with navigation (Dashboard, Posts, New Post, Back to Site) and clinic doctor profile
- [x] `/admin` dashboard displays live metric cards: Total Posts, Published Posts, Drafts, and Total Views
- [x] Clicking "Logout" in the admin portal clears the authentication session and redirects back to `/admin/login`

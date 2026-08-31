# 03: Homepage Integration, Image Optimization & Verification

**What to build:**  
Integrate the new `ServicesShowcase` into the Homepage (`src/app/page.tsx`), retiring the collapsed `ServicesAccordion`. Verify responsive image optimization across viewports, validate that all 22 procedure items render accurately, ensure zero TypeScript errors (`npx tsc --noEmit`), and verify a clean Next.js production build (`npm run build`).

**Blocked by:** 02: Alternating Z-Pattern Editorial Component & Treatment Tag Grid

**Status:** ready-for-agent

- [ ] Homepage seamlessly renders the new `ServicesShowcase` in place of the old accordion
- [ ] Responsive images render cleanly without layout shift or aspect ratio warnings
- [ ] Full content audit: All 22 clinical points verified against Dr. Pooja's clinical scope
- [ ] Production build (`npm run build`) passes with 0 errors

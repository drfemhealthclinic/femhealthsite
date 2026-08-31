# Specification: Redesigned Clinical Offerings & Services Showcase

## Problem Statement

The current "Clinical Offerings / Services Overview" section on the FemHealth Clinic homepage relies on a collapsed accordion component where 3 out of 4 clinical specialties and their procedures are hidden by default. When an accordion is opened, the medical services are displayed as generic, dry HTML bullet lists without any visual accompaniment.

This creates several friction points for patients:
1. **Hidden Information**: Expectant mothers and surgical patients must hunt and click to see if Dr. Pooja treats their specific condition (e.g. VBAC, high-risk pregnancy, fibroids, or PCOS).
2. **Clinical / Insurance Tone**: Plain bullet points feel cold and transactional rather than warm, reassuring, and doctor-led.
3. **Lack of Visual Identity**: The absence of high-quality medical imagery misses an opportunity to convey clinical excellence, state-of-the-art facilities, and empathetic care.

## Solution

Replace the collapsed accordion with an expansive, editorial **Clinical Offerings Showcase** featuring:
1. **100% Visible Upfront**: All 4 core specialties (*Advanced Infertility*, *Minimally Invasive Laparoscopic Surgery*, *Comprehensive Obstetrics*, and *General & Preventive Gynaecology*) are openly displayed without hiding behind dropdowns.
2. **Frozen Content Integrity**: Preserve 100% of Dr. Pooja's 22 clinical procedure points word-for-word with zero deletion or paraphrasing.
3. **Dedicated High-Resolution Imagery**: Curated medical photos paired with each specialty, enriched with specialty badges and organic framing.
4. **Elevated Card Layout (No Raw Bullets)**: Present procedures as clean, soft-tinted clinical tag cards featuring subtle rose/plum check icons in an airy multi-column grid.
5. **Alternating Z-Pattern Layout**: Dynamic visual rhythm alternating image-left and image-right across desktop viewports, with seamless stacking on mobile.
6. **1-Click Specialty Consultation Action**: Direct WhatsApp / booking button pre-filled with the selected clinical specialty.

---

## User Stories

1. As an expectant mother visiting the homepage, I want to immediately see all pregnancy care and high-risk maternity services without clicking into hidden dropdowns, so that I know Dr. Pooja handles normal deliveries, VBAC, and gestational complications.
2. As a patient experiencing pelvic pain or fibroid symptoms, I want to clearly read about laparoscopic and minimally invasive surgery options alongside modern clinical imagery, so that I feel confident in Dr. Pooja's surgical expertise and quick recovery times.
3. As a woman seeking fertility evaluation or PCOS support, I want to scan clear, individual treatment tag cards rather than a wall of bullet points, so that I can easily digest the medical offerings without feeling overwhelmed.
4. As a mobile visitor, I want each clinical offering to stack cleanly with a photo, title, and clear procedure cards, so that the mobile reading experience is effortless and engaging.
5. As a prospective patient, I want to see high-quality, empathetic medical imagery for each specialty, so that the clinic feels trustworthy, warm, and state-of-the-art.
6. As a patient ready to schedule an appointment for a specific condition, I want a direct "Consult for [Specialty]" button on each service block, so that my inquiry is pre-filled with the exact care area I need.
7. As Dr. Pooja, I want all 22 clinical points across my 4 pillars preserved verbatim, so that my documented clinical scope and medical accreditations remain completely accurate.
8. As a website visitor using a screen reader or keyboard navigation, I want all clinical offerings and interactive buttons to follow accessible HTML landmarks and focus outlines, so that I can easily navigate through the services.
9. As a patient exploring treatment options, I want subtle hover micro-interactions on the procedure tag cards, so that the website feels premium and responsive to my engagement.
10. As a clinic administrator, I want the services showcase to load fast with optimized Next.js responsive image sizes and modern web standards, so that page load speed remains fast.

---

## Implementation Decisions

### 1. Visual Architecture & Layout
- **Alternating Full-Width Editorial Feature Rows (Z-Pattern)**:
  - **Row 01 (Infertility & Reproductive Health)**: High-res Photo Left ➔ Number `01`, Specialty Header & Procedure Tag Grid Right.
  - **Row 02 (Minimally Invasive / Laparoscopic Surgery)**: Number `02`, Specialty Header & 8-Item Procedure Grid Left ➔ High-res Photo Right.
  - **Row 03 (Comprehensive Obstetrics / Maternity Care)**: High-res Photo Left ➔ Number `03`, Specialty Header & Procedure Tag Grid Right.
  - **Row 04 (General & Preventive Gynaecology)**: Number `04`, Specialty Header & Procedure Tag Grid Left ➔ High-res Photo Right.
- **Mobile Behavior**: Fluidly collapses to single-column order (Photo on top ➔ Specialty Title ➔ Procedure Tags ➔ CTA Button) with consistent padding and spacing.

### 2. Treatment Points Presentation (Zero Bullets)
- Every verbatim point is housed inside an individual, soft-bordered clinical tag card:
  - Background: `#FAF7F9` (warm neutral surface) transitioning on hover to white with plum border.
  - Indicator: Subtle rose checkmark icon (`material-symbols-outlined: check_circle`) with `fontVariationSettings: "'FILL' 1"`.
  - Typography: 13px–14px clean sans-serif text with comfortable leading.
- Rendered in a responsive 2-column grid (`grid grid-cols-1 sm:grid-cols-2 gap-2.5`) for optimal readability.

### 3. Verbatim Content Contract
- **01. Advanced Infertility & Reproductive Health**:
  1. Comprehensive Fertility Evaluation (Male & Female)
  2. Ovulation Induction & Follicular Monitoring
  3. Intrauterine Insemination (IUI)
  4. Management of Polycystic Ovarian Syndrome (PCOS) & Endometriosis
  5. Recurrent Pregnancy Loss Evaluation
- **02. Minimally Invasive / Laparoscopic Surgery**:
  1. Keyhole Surgeries for Faster Recovery & Minimal Pain
  2. Laparoscopic Hysterectomy (Uterus Removal)
  3. Laparoscopic Myomectomy (Fibroid Removal)
  4. Ovarian Cystectomy (Cyst Removal)
  5. Diagnostic & Operative Laparoscopy / Hysteroscopy for Infertility
  6. Treatment for Ectopic Pregnancy
  7. Laparoscopic Tubal Ligation
  8. Hysteroscopic Polypectomy & D&C
- **03. Comprehensive Obstetrics (Maternity Care)**:
  1. Pre-conception Counseling & Health Optimization
  2. Antenatal (Pregnancy) Care & Routine Screenings
  3. High-Risk Pregnancy Management (Gestational Diabetes, Hypertension, Multiple Gestations)
  4. Normal Delivery, Vaginal Birth After Cesarean (VBAC), & C-Sections
  5. Postnatal Care, Breastfeeding Support, & Postpartum Mental Health
- **04. General & Preventive Gynaecology**:
  1. Treatment for Abnormal Uterine Bleeding (AUB) & Irregular Cycles
  2. Adolescent Gynaecology & Menstrual Disorders
  3. Pap Smears, HPV Vaccination & Cervical Cancer Screening
  4. Perimenopause & Menopause Management

### 4. Imagery & Media Treatment
- Curated high-resolution medical imagery for all 4 pillars using responsive Next.js `<Image />` with `sizes`, `aspect-[4/3]` or `aspect-[16/10]`, organic rounded corners (`rounded-3xl`), and subtle plum/rose gradient auras.
- Remote image hostnames configured and verified in `next.config.ts`.

### 5. Conversion & CTAs
- Each row contains a direct specialty button (e.g., *"Consult for Maternity Care"*, *"Inquire About Laparoscopic Surgery"*) linking directly to WhatsApp with pre-filled text or the booking workflow.

---

## Testing Decisions

1. **Content Completeness Test**:
   - Verify that all 22 procedure items are rendered verbatim without missing a single item.
2. **Visual & Responsive Layout Testing**:
   - Verify the alternating Z-pattern layout on desktop (>= 1024px).
   - Verify clean stacking on mobile viewports (< 768px).
   - Verify image aspect ratios and smooth loading without layout shift.
3. **Interactive & CTA Testing**:
   - Verify that each button properly generates the WhatsApp URL with the specialty pre-populated.
4. **TypeScript & Build Verification**:
   - `npx tsc --noEmit` returns 0 errors.
   - `npm run build` succeeds and prerenders all pages.

---

## Out of Scope

- Adding public comment or review forms inside the services section.
- Creating standalone dedicated subpages for all 22 individual sub-procedures (handled via the Blog and Contact pages).
- Altering the clinic's core color palette or global branding tokens.

---

## Further Notes

- Component will replace `src/components/home/ServicesAccordion.tsx` or be renamed to `src/components/home/ServicesShowcase.tsx` and imported into `src/app/page.tsx`.

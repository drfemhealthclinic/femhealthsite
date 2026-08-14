---
name: Editorial Wellness Narrative
colors:
  surface: '#fbf9fa'
  surface-dim: '#dbd9da'
  surface-bright: '#fbf9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f4'
  surface-container: '#efedee'
  surface-container-high: '#eae7e8'
  surface-container-highest: '#e4e2e3'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4c444c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f1'
  outline: '#7e747c'
  outline-variant: '#cfc3cc'
  surface-tint: '#745377'
  primary: '#614265'
  on-primary: '#ffffff'
  primary-container: '#7b5a7e'
  on-primary-container: '#ffd7ff'
  inverse-primary: '#e2bae3'
  secondary: '#6b5774'
  on-secondary: '#ffffff'
  secondary-container: '#f1d7fa'
  on-secondary-container: '#705b79'
  tertiary: '#882b4c'
  on-tertiary: '#ffffff'
  tertiary-container: '#a64364'
  on-tertiary-container: '#ffdae2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fed6ff'
  primary-fixed-dim: '#e2bae3'
  on-primary-fixed: '#2b1130'
  on-primary-fixed-variant: '#5a3c5e'
  secondary-fixed: '#f4dafd'
  secondary-fixed-dim: '#d7bee0'
  on-secondary-fixed: '#25152e'
  on-secondary-fixed-variant: '#53405c'
  tertiary-fixed: '#ffd9e1'
  tertiary-fixed-dim: '#ffb1c5'
  on-tertiary-fixed: '#3f001b'
  on-tertiary-fixed-variant: '#7f2446'
  background: '#fbf9fa'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e3'
  custom-primary: '#7b5a7e'
  deep-purple: '#4e3953'
  accent-magenta: '#d46789'
  accent-pink: '#e898a8'
  light-lavender: '#c0a8c9'
  charcoal: '#464647'
  secondary-grey: '#878787'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-padding: 120px
---

## Brand & Style

The design system is built on the principle of **Editorial Minimalism** fused with **Organic Tactility**. It balances the authoritative weight of a premium medical practice with the compassionate, human-centric approach required for women's healthcare. 

The aesthetic rejects "SaaS-like" sterility in favor of a sophisticated, literary feel. It utilizes high-quality typography, intentional whitespace, and a restrained palette to create a "breathable" interface that reduces patient anxiety. Tactility is introduced through subtle tonal layering and soft shadows, moving away from flat design toward a more grounded, physical presence.

**Key Brand Pillars:**
- **Credibility:** Medical excellence conveyed through classical serif typography and structured grids.
- **Compassion:** A warm, organic color palette that avoids the coldness of traditional clinical blues.
- **Sophistication:** A high-end editorial feel that mirrors luxury health publications rather than standard medical portals.

## Colors

The palette is anchored by **Primary Purple (#7B5A7E)**, used for structural elements and primary actions to establish professional gravity. **Deep Purple (#4E3953)** provides necessary contrast for text and high-hierarchy navigation.

**Accent Tones:**
- **Accent Magenta (#D46789)** and **Accent Pink (#E898A8)** are used sparingly for highlights, health alerts, or subtle call-to-actions to maintain a professional, rather than "lifestyle," feel.
- **Light Lavender (#C0A8C9)** serves as a soft background alternative or a secondary button state, providing a bridge between the deep purples and neutral whites.

**Neutrals:**
- **Charcoal (#464647)** is the primary color for body text to ensure maximum readability and clinical seriousness.
- **Secondary Grey (#878787)** is reserved for captions, inactive states, and decorative borders.

## Typography

This system employs a high-contrast typographic pairing. **Playfair Display** provides an editorial, authoritative serif voice for all headlines. **Montserrat** offers a clean, geometric sans-serif counterpoint for body copy, ensuring functional clarity and medical accessibility.

- **Headlines:** Use generous line heights to prevent a "crowded" medical look. `display-lg` should be used for hero sections with significant whitespace.
- **Body Copy:** Maintain `body-md` for general information; use `body-lg` for introductory paragraphs or patient testimonials.
- **Labels:** Use `label-sm` with slight tracking for navigation links, form labels, and small metadata.

## Layout & Spacing

The layout follows a strict **12-column fluid grid** for desktop and a **4-column grid** for mobile. The spacing rhythm is strictly based on 8px increments.

**Layout Philosophy:**
- **Generous Whitespace:** Section containers should utilize `section-padding` to create a "gallery" feel, allowing medical information to be processed easily without cognitive load.
- **Alignment:** Content is generally left-aligned to mimic traditional editorial layouts, with the exception of hero headers or badge elements which may be centered.
- **Breakpoints:**
    - Desktop: 1440px+ (12 columns, 80px margins)
    - Tablet: 768px - 1024px (8 columns, 40px margins)
    - Mobile: <768px (4 columns, 20px margins)

## Elevation & Depth

To achieve "Organic Tactility," this design system avoids heavy shadows. Instead, it uses **Tonal Layering** and **Ambient Depth**.

- **Surface Levels:** 
    - Level 0 (Base): The primary page background (#FDFBFC).
    - Level 1 (Cards): Pure white surfaces with a very soft, diffused shadow (15% opacity Primary Purple tint, 20px blur, 4px Y-offset).
    - Level 2 (Interactions): Elements that are hovered or active gain a slightly deeper shadow and a 1px border of `Light Lavender`.
- **Dividers:** Use 1px solid lines in `Secondary Grey` at 20% opacity to separate content without creating hard visual breaks.

## Shapes

The shape language is **restrained and professional**. We avoid hyper-rounded "bubbly" shapes to maintain clinical credibility. 

- **Primary Elements:** Buttons, input fields, and cards use a 0.25rem (4px) corner radius.
- **Large Containers:** Image frames and main content cards may use up to 0.75rem (12px) for a softer, more inviting feel.
- **Iconography:** Use "Linear" or "Outline" styles with a 1.5pt stroke weight. Icons should have slightly rounded terminals to match the font geometry of Montserrat.

## Components

### Buttons
- **Primary:** Background `Primary Purple`, text White, 4px radius. 16px vertical / 32px horizontal padding.
- **Secondary:** Border 1px `Primary Purple`, text `Primary Purple`, transparent background.
- **Ghost:** Text `Deep Purple`, no border, active state uses `Light Lavender` background at 20% opacity.

### Input Fields
- Labels must use `label-sm`.
- Borders are 1px `Secondary Grey`. On focus, the border shifts to `Primary Purple` with a subtle glow (2px spread).
- Error states use `Accent Magenta`.

### Cards & Containers
- Cards should never have a dark background. Use white or the lightest tint of lavender.
- Padding inside cards should be minimum 32px to maintain the editorial breathability.

### Logo Usage
- **Primary Website Logo:** Fixed top-left in the navigation bar.
- **Icon Mark:** Used as a favicon and a subtle watermark in section backgrounds or as a bullet point alternative in premium lists.
- **Circular Badge:** Used exclusively for "Specialist" certifications or "Dr. Pooja Wadgaonkar" signatures.

### Lists & Navigation
- Navigation items use `label-sm` with a `Primary Purple` underline on hover.
- Lists should use the Icon Mark as a custom bullet for a bespoke, branded feel.

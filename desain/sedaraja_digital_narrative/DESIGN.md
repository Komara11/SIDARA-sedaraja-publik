---
name: Sedaraja Digital Narrative
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3f4944'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6f7973'
  outline-variant: '#bec9c2'
  surface-tint: '#1b6b51'
  primary: '#004532'
  on-primary: '#ffffff'
  primary-container: '#065f46'
  on-primary-container: '#8bd6b7'
  inverse-primary: '#8bd6b6'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#00415f'
  on-tertiary: '#ffffff'
  tertiary-container: '#005980'
  on-tertiary-container: '#8bcfff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f2d1'
  primary-fixed-dim: '#8bd6b6'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#00513b'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is anchored in a **Corporate Modern** aesthetic with a **Tactile** warmth, specifically tailored for the digital transformation of rural governance and inventory. The visual narrative balances the precision of an administrative tool with the organic, growth-oriented essence of Sedaraja village.

The identity evokes professional reliability and community trust. It utilizes a **Card-Based** layout to compartmentalize complex data into digestible, approachable units. Surfaces are treated with a light, airy feel to ensure the interface remains clear even when displaying dense agricultural or demographic statistics. The emotional goal is to provide users with a sense of order, progress, and environmental stewardship.

## Colors

The palette is derived from the natural landscapes of Sedaraja:
- **Primary (Forest Green):** Used for global navigation, primary buttons, and authoritative branding elements. It signifies stability and the village's agricultural roots.
- **Secondary (Earthy Gold):** Reserved for high-value call-to-actions, highlight states, and "Premium Potensi" tags. It provides a warm contrast to the deep greens.
- **Tertiary (Sky Blue):** Utilized for informational accents, link states, and interactive icons to maintain a digital-first feeling.
- **Neutral:** A slate-based neutral scale ensures that text and structural borders remain legible without the harshness of pure black, maintaining the system's professional softness.

## Typography

The typography utilizes **Inter** exclusively to lean into a systematic, utilitarian, and clean digital experience. 

- **Headlines:** Use tighter letter spacing and semi-bold weights to command attention on dashboard summaries and village headers.
- **Body:** Standardized at 16px for optimal legibility during long-form reading of village reports and inventory descriptions.
- **Labels:** Small, all-caps labels are used for metadata, category tags, and "Potensi" badges to differentiate them from functional body text.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to maintain structural integrity, transitioning to a **Fluid Grid** for mobile devices.

- **Desktop:** 12-column grid with a 1280px max-width. Large 48px side margins create an expansive, premium feel.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px gutters.
- **Rhythm:** Spacing follows an 8px base unit. Internal card padding is consistently 24px (`stack-md`) to ensure data doesn't feel cramped.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layers**. Instead of harsh borders, the system uses soft, diffused shadows to lift cards off the background.

- **Surface (Background):** A very light gray (#F8FAFC) to reduce eye strain.
- **Level 1 (Cards):** Pure white background with a 4% opacity shadow, 12px blur, and 4px vertical offset.
- **Level 2 (Dropdowns/Modals):** Pure white background with a 12% opacity shadow, 24px blur, and 8px vertical offset.
- **Interactions:** On hover, cards should subtly lift (shadow opacity increases and offset deepens) to provide tactile feedback to the user.

## Shapes

The shape language is defined by a **Rounded** philosophy. Large corner radii reflect a modern, friendly approach to government technology.

- **Standard Components:** Buttons and inputs use `rounded-md` (0.5rem).
- **Cards & Containers:** Primary containers and "Potensi Desa" feature cards use `rounded-2xl` (1.5rem) to create a distinct, soft architectural look.
- **Visual Flourishes:** Use circular clipping for profile images and iconography backgrounds to complement the rounded UI.

## Components

### Buttons & Controls
- **Primary Button:** Solid #065F46 with white text. High contrast, 1.5rem roundedness for a "pill-lite" look.
- **Secondary Button:** Ghost style with #065F46 border and text.
- **Inputs:** Soft gray background (#F1F5F9) with no border in default state; 2px Primary Green border on focus.

### Cards & Features
- **Stats Cards:** Large `display-lg` numbers in Primary Green, paired with a small upward trend icon in Sky Blue. 
- **Potensi Desa Cards:** Use a top-aligned image with a 1.5rem top-radius, followed by 24px internal padding for title and description.
- **Badges/Chips:** Small, rounded-full shapes with low-opacity background tints of the Primary or Secondary colors (e.g., 10% Forest Green background with 100% Forest Green text).

### Navigation
- **Header:** A clean, white sticky header with a subtle Level 1 shadow. Navigation links should use `label-sm` with a Primary Green underline for the active state.
- **Feature Grids:** Use a 3-column layout on desktop to showcase village assets, ensuring each card has ample whitespace and a clear call-to-action button.
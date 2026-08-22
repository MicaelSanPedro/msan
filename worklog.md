# TechMate Color Palette Transformation: Amber → Emerald + Gray

## Date: 2025-06-06

## Summary
Complete color palette transformation from amber/gold accent to emerald/green accent with gray tones. All glassmorphism effects preserved, cool green-tinted backgrounds applied.

## Changes Made

### 1. globals.css (Foundation — 3170 lines)
**CSS Variables:**
- `--accent`: `#f9bd18` → `#34d399` (emerald-400)
- `--accent-2`: `#fbbf24` → `#6ee7b7` (emerald-300)
- `--accent-deep`: `#cb8c0a` → `#059669` (emerald-600)
- `--accent-glow`: `rgba(249,189,24,0.45)` → `rgba(52,211,153,0.45)`
- `--background` (dark): `#08070a` → `#060a08` (cool green tint)
- `--background` (light): `#f8f7f5` → `#f0f5f2` (cool green tint)

**All Sections Updated:**
- Light mode overrides (prose, settings, search, scrollbars, categories, mobile menu)
- Selection color: `rgba(52,211,153,0.35)`
- Shimmer text gradient: emerald-400 → emerald-300 → emerald-200
- Grid background: `rgba(52,211,153,0.02)`
- Scrollbars (dark + light): emerald gradient
- Glass nav scrolled border: `rgba(52,211,153,0.06)`
- Liquid glass card hover: `rgba(52,211,153,0.08)`
- Liquid glass input border: `rgba(52,211,153,0.2)`
- Conic border glow: emerald
- Terminal block: emerald borders + prompt color
- Search bar: emerald border + glow
- Card glow hover: emerald glow
- Hero ring: emerald
- Buttons: emerald gradient backgrounds + shadows
- Prose: links, code blocks, tables, blockquotes, hr, inline code all emerald
- Light leaks: `light-leak--amber` → `light-leak--emerald`
- Welcome screen: all amber → emerald (glow, avatar, rings, progress bar, name input, photo upload)
- Settings panel: emerald focus/border
- Mobile menu: emerald active states, shine line, CTA button
- Mobile search bar: emerald focus glow
- Thin scrollbar: emerald

### 2. src/app/page.tsx
- Hero badge, subtitle spans, CTA button, stats, section headers, about card: all amber Tailwind classes → emerald equivalents
- Shadow rgba values: emerald
- Background dark refs: `#080a09`

### 3. src/app/layout.tsx
- theme-color meta: `#060a08` (dark), `#f0f5f2` (light)
- Light leak class: `light-leak--emerald`

### 4. src/components/Navbar.tsx
- Nav indicator: emerald gradient, border, shadow
- Active link: `text-emerald-100`
- Mobile search results: `text-emerald-400`
- Mobile menu user section: emerald avatar border, shadow, icon bg/color

### 5. src/components/PostCard.tsx
- Arrow icon, hover shadow, active border, title hover, fallback gradient, bottom fade

### 6. src/components/FeaturedPost.tsx
- Compact + hero variants: hover shadow, title hover, link color, fallback gradient, bottom bg, gradient overlay

### 7. src/components/Footer.tsx
- Top divider, background decoration, social hover, headings, link hover, link hover bar, copyright heart, copyright text

### 8. src/components/CategoryBadge.tsx
- Linux category: now uses emerald-900/60, emerald-100, emerald-500/50

### 9. src/components/Logo.tsx
- Glow filter: `rgba(52,211,153,0.45)`
- Variant type: `"amber" | "dark"` → `"emerald" | "dark"`

### 10. src/components/SearchBar.tsx
- Specular line: `via-emerald-300/30`
- Search icon, result icon: `text-emerald-400`

### 11. src/components/CategoryCard.tsx
- Linux theme: hex `#34d399`, rgb `52, 211, 153`
- Default theme: same emerald values

### 12. src/components/ThemeSync.tsx
- Removed duplicate amber preset, kept emerald as first option

### 13. src/components/BokehParticles.tsx
- Updated comments from amber to emerald

### 14. src/components/WelcomeScreen.tsx
- Logo variant: `variant="emerald"`

### 15. src/app/settings/page.tsx
- Accent colors: replaced "Ambar"/amber entry with "Esmeralda"/emerald, removed duplicate
- Default accent: `"amber"` → `"emerald"`

### 16. All other component files
- AuthButton, SignInModal, Newsletter, ShareButtons, SettingsPanel, ReadingProgressBar, Comments, TableOfContents, ScrollToTop, CategoryFilter, badge.tsx, button.tsx: all amber Tailwind classes → emerald

### 17. All other page files
- blog/page.tsx, blog/[slug]/page.tsx, favoritos/FavoritesPageClient.tsx, search/page.tsx, not-found.tsx: all amber references → emerald

## Color Mapping Reference

| Amber (old) | Emerald (new) | Usage |
|---|---|---|
| `#f9bd18` | `#34d399` | Primary accent (emerald-400) |
| `#fbbf24` | `#6ee7b7` | Secondary accent (emerald-300) |
| `#fde68a` | `#a7f3d0` | Light accent (emerald-200) |
| `#cb8c0a` | `#059669` | Deep accent (emerald-600) |
| `#b45309` | `#047857` | Dark accent light (emerald-700) |
| `#92400e` | `#065f46` | Darker accent light (emerald-800) |
| `#d97706` | `#059669` | Medium accent light |
| `#f59e0b` | `#10b981` | Medium accent (emerald-500) |
| `#08070a` | `#060a08` | Dark background |
| `#f8f7f5` | `#f0f5f2` | Light background |

## Verification
- ✅ Build successful (`next build` — no errors)
- ✅ Zero `amber` references remaining in `src/`
- ✅ Zero old hex color values remaining
- ✅ All Portuguese text content preserved
- ✅ Glassmorphism architecture unchanged
- ✅ No API routes modified
- ✅ No markdown posts modified
- ✅ Dark class default preserved on `<html>`

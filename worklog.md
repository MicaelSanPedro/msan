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

---

# Liquid Glass High-Fidelity Refactoring

## Date: 2025-06-07

## Summary
Complete visual layer refactoring to achieve high-fidelity Liquid Glass (Glassmorphism Orgânico de Alta Precisão). All glass surfaces now use consistent diffraction/refraction/blur parameters with photorealistic borders, multidirectional inset lighting, organic fluid curvature, and animated mesh gradient background.

## Changes Made

### 1. globals.css (~3250 lines)
**CSS Variables:**
- `--r-sm`: 0.5rem → 0.75rem
- `--r-md`: 0.75rem → 1rem
- `--r-lg`: 1rem → 1.5rem
- `--r-xl`: 1.25rem → 2rem
- `--r-2xl`: 1.75rem → 2.5rem

**Glass Core — ALL liquid-glass-* and glass-* classes:**
- `backdrop-filter`: `blur(40-50px) saturate(180-220%) brightness(105-110%)` → `blur(24px) saturate(200%) contrast(105%)`
- Backgrounds: `rgba(255,255,255, 0.08-0.10) → 0.035 → 0.008` → `rgba(255,255,255, 0.18) → rgba(255,255,255, 0.05)`
- Borders: `0.5px solid rgba(255,255,255, 0.12-0.18)` → `1px solid rgba(255,255,255, 0.3)`
- Box-shadows: Added dual inset shadows to ALL glass surfaces:
  - `inset 0 1px 2px 0 rgba(255,255,255, 0.6)` (top-light specular)
  - `inset 0 -1px 2px 0 rgba(0, 0, 0, 0.1)` (bottom-dark refraction)
  - `0 20px 50px rgba(0, 0, 0, 0.25)` (ambient)

**Animated Mesh Gradient Background:**
- Added `@keyframes mesh-move` animation (20s ease-in-out infinite)
- Added `.mesh-bg` class with 5 radial-gradient ellipses in emerald palette
- `filter: blur(60px)` for organic diffusion
- Kept `.grid-bg` as fallback

**Card Shine Effect:**
- Increased shine intensity: `rgba(255,255,255, 0.08)` → `rgba(255,255,255, 0.12)`

**Spotlight Effect:**
- Increased spotlight intensity: `rgba(255,255,255, 0.06)` → `rgba(255,255,255, 0.10)`

**Buttons:**
- `.btn-secondary`: Updated to new glass spec (blur 24px, contrast 105%, 1px border at 0.3 opacity, dual inset shadows)
- `.btn-primary`: Kept consistent, verified inset shadows

**Search Bar:**
- `.searchbar-input-wrap`: border-radius 16px, blur 24px, contrast 105%, new border/shadow spec
- `.searchbar-dropdown`: border-radius 28px, blur 24px, contrast 105%, new border/shadow spec
- Focus states: `box-shadow: 0 0 0 3px rgba(52,211,153,0.2), ...inset shadows..., border-color: rgba(255,255,255,0.45)`

**Card Hover Glow:**
- `.card-glow-hover`: Added `transform: translateY(-6px) scale(1.015)` on hover
- Added `:active` state: `transform: translateY(-2px) scale(1.005)`
- Unified transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`

**Light Leaks:**
- Increased sizes: emerald 450→600px, rose 380→500px, sky 320→420px
- Increased opacity: emerald 0.12→0.18, rose 0.08→0.12, sky 0.06→0.10

**Scrollbar:**
- Thumb gradient: `rgba(52,211,153,0.5)` → `rgba(52,211,153,0.6)`
- Firefox: `rgba(52,211,153,0.5)` → `rgba(52,211,153,0.6)`

**Mobile Menu:**
- Close button: border-radius 12→16px, full glass treatment (blur 24px, contrast 105%, 1px border, dual inset shadows)

**Border Radius Updates:**
- `.liquid-glass-card`: 1rem → 24px
- `.liquid-glass-panel`: 1rem → 28px
- `.liquid-glass-input`: added 16px border-radius
- `.glass-input`: added 16px border-radius
- `.searchbar-input-wrap`: 0.75rem → 16px
- `.searchbar-dropdown`: 0.75rem → 28px

### 2. src/app/layout.tsx
- Replaced `<div className="grid-bg" />` with `<div className="mesh-bg" />`

### 3. src/components/PostCard.tsx
- `rounded-2xl` → `rounded-3xl`
- `backdrop-blur-[40px]` → `backdrop-blur-[24px]` + `contrast-[105%]`
- `border-white/[0.15]` → `border-white/30`
- Shadow: dual inset + ambient (inline)
- Hover: `hover:-translate-y-1` → `hover:-translate-y-1.5 hover:scale-[1.015]`
- Active: `active:scale-[0.99]` → `active:scale-[1.005]`
- Background: `from-white/[0.08] to-white/[0.015]` → `from-white/[0.18] to-white/[0.05]`
- Arrow icon: same glass treatment
- Fallback gradient: `#080a09` → `#0a0f0c`
- Text opacity: excerpt 45→60, dates 35→45

### 4. src/components/FeaturedPost.tsx
- Compact: same glass treatment as PostCard (rounded-3xl, blur 24px, contrast 105%, border-white/30)
- Hero: `rounded-2xl sm:rounded-3xl` → `rounded-3xl sm:rounded-[32px]`
- Hero: border-white/[0.12] → border-white/30
- Text opacity: compact excerpt 45→60, compact date 35→45, hero date 60→65

### 5. src/components/CategoryCard.tsx
- `rounded-2xl` → `rounded-3xl`
- Inline style `backdropFilter`: blur(40px) → blur(24px) + contrast(105%)
- Inline style border: 0.18 → 0.3
- Inline style boxShadow: dual inset + ambient
- Hover: `-translate-y-1` → `-translate-y-1.5 scale-[1.015]`
- Active: `scale-[0.99]` → `scale-[1.005]`
- Text opacity: tagline 50→65

### 6. src/components/Navbar.tsx
- Nav pill container: blur 40→24px, saturate contrast 105%, border-white/30
- Nav indicator: blur 40→24px, contrast 105%
- Active link: text-white/55 → text-white/70
- Placeholder: text-white/30 → text-white/40
- Search result meta: text-white/30 → text-white/40
- No results: text-white/30 → text-white/40
- Result count: text-white/20 → text-white/30
- User greeting: text-white/40 → text-white/55

### 7. src/components/SearchBar.tsx
- Search button: blur 40→24px, border-white/30, dual inset shadows
- Text: 40→55, 25→40, 40→55, 30→30, 30→40
- Dropdown specular: via-white/40 → via-white/60

### 8. src/components/Footer.tsx
- Social icons: `rounded-xl` → `rounded-2xl`, blur 40→24px, border-white/30, dual inset shadows
- Description: text-white/40 → text-white/55
- Category links: text-white/45 → text-white/60
- Status text: text-white/50 → text-white/65
- Version/credit: text-white/35 → text-white/45
- Copyright: text-white/30 → text-white/40, text-white/50 → text-white/65

### 9. src/app/page.tsx
- Hero badge: blur 40→24px, border-white/30, dual inset shadows
- Subtitle: text-white/40 → text-white/55
- Stats section: text-white/35 → text-white/45
- About card: rounded-3xl, blur 24px, border-white/30, dual inset shadows
- About text: text-white/65 → text-white/80
- Stack/Contribuir/Café cards: rounded-3xl, blur 24px, border-white/30, dual inset shadows
- Icon containers: rounded-xl → rounded-2xl, blur 24px, contrast 105%
- Card text: text-white/55 → text-white/65
- Section subtitle: text-white/40 → text-white/55

### 10. All other component files (batch sed)
- `backdrop-blur-[40px/50/60px]` → `backdrop-blur-[24px]` across all tsx files
- `saturate-[180%]` → `saturate-[200%]`
- `brightness-[105%/108%/110%]` → `contrast-[105%]`
- `border-white/[0.08/0.10/0.12/0.14/0.15]` → `border-white/30`
- `from-white/[0.08/0.10]` → `from-white/[0.18]`
- `to-white/[0.01/0.02/0.015]` → `to-white/[0.05]`
- Text opacity shift in blog pages/favorites/search/not-found/AuthButton

## Verification
- ✅ Build successful (`npm run build` — compiled, TS passed, 23 pages generated)
- ✅ Zero `backdrop-blur-[40px]` remaining in `src/`
- ✅ Zero `border-white/[0.14]` remaining in `src/`
- ✅ Zero `brightness-[` remaining in glass contexts
- ✅ All Portuguese text content preserved
- ✅ No API routes modified
- ✅ No markdown posts modified
- ✅ Dark class default preserved on `<html>`
- ✅ Mesh gradient background renders in place of grid

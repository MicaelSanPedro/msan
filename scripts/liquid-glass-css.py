#!/usr/bin/env python3
"""Liquid Glass 3D CSS generator - replaces glass system sections in globals.css."""

import re

with open('/home/z/my-project/src/app/globals.css', 'r') as f:
    css = f.read()

# ═══════════════════════════════════════════════════════════════
# 1. ADD new CSS custom properties to :root
# ═══════════════════════════════════════════════════════════════

new_root_vars = """
  /* ═══ Liquid Glass 3D System Variables ═══ */
  --glass-bg-1: rgba(255, 255, 255, 0.14);
  --glass-bg-2: rgba(255, 255, 255, 0.04);
  --glass-bg-3: rgba(255, 255, 255, 0.07);
  --glass-blur: 24px;
  --glass-saturate: 220%;
  --glass-contrast: 105%;
  --glass-border-opacity: 0.35;
  --glass-transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  /* Volumetric shadow system */
  --glass-volumetric:
    inset 0 2px 4px 0 rgba(255, 255, 255, 0.8),
    inset 0 -4px 12px 0 rgba(255, 255, 255, 0.15),
    inset 0 -10px 20px 0 rgba(0, 0, 0, 0.2),
    0 30px 60px -12px rgba(0, 0, 0, 0.35);
  --glass-volumetric-hover:
    inset 0 2px 4px 0 rgba(255, 255, 255, 0.9),
    inset 0 -4px 12px 0 rgba(255, 255, 255, 0.2),
    inset 0 -10px 20px 0 rgba(0, 0, 0, 0.15),
    0 40px 80px -12px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(52, 211, 153, 0.12);

  /* Mouse-tracking light position (updated by JS) */
  --light-x: 50%;
  --light-y: 20%;
  --light-angle: 135deg;
"""

# Insert before the closing brace of :root
css = css.replace(
    '  --r-2xl: 2.5rem;\n}',
    '  --r-2xl: 2.5rem;\n' + new_root_vars + '}'
)

# Also add light mode volumetric overrides
light_mode_vars = """
  --glass-bg-1: rgba(255, 255, 255, 0.55);
  --glass-bg-2: rgba(255, 255, 255, 0.25);
  --glass-bg-3: rgba(255, 255, 255, 0.35);
  --glass-border-opacity: 0.25;
  --glass-volumetric:
    inset 0 2px 4px 0 rgba(255, 255, 255, 0.9),
    inset 0 -2px 8px 0 rgba(0, 0, 0, 0.04),
    0 20px 50px -12px rgba(0, 0, 0, 0.1);
  --glass-volumetric-hover:
    inset 0 2px 4px 0 rgba(255, 255, 255, 1),
    inset 0 -2px 8px 0 rgba(0, 0, 0, 0.03),
    0 30px 60px -12px rgba(0, 0, 0, 0.12);
"""

css = css.replace(
    '  --border-2: rgba(0, 0, 0, 0.12);\n}',
    '  --border-2: rgba(0, 0, 0, 0.12);\n' + light_mode_vars + '}'
)

print("Step 1: Root variables updated")

# ═══════════════════════════════════════════════════════════════
# 2. ADD new fluid dynamics keyframe animations
# ═══════════════════════════════════════════════════════════════

new_keyframes = """
@keyframes fluid-surface {
  0%, 100% { border-radius: var(--glass-radius, 24px); }
  25% { border-radius: calc(var(--glass-radius, 24px) + 2px) calc(var(--glass-radius, 24px) - 1px) calc(var(--glass-radius, 24px) + 1px) calc(var(--glass-radius, 24px) - 2px); }
  50% { border-radius: calc(var(--glass-radius, 24px) - 1px) calc(var(--glass-radius, 24px) + 2px) calc(var(--glass-radius, 24px) - 2px) calc(var(--glass-radius, 24px) + 1px); }
  75% { border-radius: calc(var(--glass-radius, 24px) + 1px) calc(var(--glass-radius, 24px) - 2px) calc(var(--glass-radius, 24px) + 2px) calc(var(--glass-radius, 24px) - 1px); }
}
@keyframes caustic-shimmer {
  0% { background-position: 0% 0%; opacity: 0.6; }
  33% { background-position: 100% 50%; opacity: 0.8; }
  66% { background-position: 50% 100%; opacity: 0.5; }
  100% { background-position: 0% 0%; opacity: 0.6; }
}
@keyframes prismatic-drift {
  0%, 100% { --light-angle: 135deg; }
  25% { --light-angle: 180deg; }
  50% { --light-angle: 225deg; }
  75% { --light-angle: 160deg; }
}
@keyframes refraction-pulse {
  0%, 100% { backdrop-filter: blur(24px) saturate(220%) contrast(105%); -webkit-backdrop-filter: blur(24px) saturate(220%) contrast(105%); }
  50% { backdrop-filter: blur(26px) saturate(225%) contrast(107%); -webkit-backdrop-filter: blur(26px) saturate(225%) contrast(107%); }
}
@keyframes specular-shift {
  0%, 100% { opacity: 0.7; transform: translateX(0); }
  30% { opacity: 0.9; transform: translateX(2%); }
  70% { opacity: 0.6; transform: translateX(-2%); }
}
@keyframes caustic-shadow-move {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  33% { transform: translate(2px, -1px) scale(1.02); opacity: 0.5; }
  66% { transform: translate(-1px, 2px) scale(0.98); opacity: 0.35; }
}
"""

# Insert after the existing @keyframes float-y block
css = css.replace(
    '@keyframes float-y {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-6px); }\n}',
    '@keyframes float-y {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-6px); }\n}' + new_keyframes
)

print("Step 2: New keyframes added")

# ═══════════════════════════════════════════════════════════════
# 3. REPLACE the entire Liquid Glass System section
# ═══════════════════════════════════════════════════════════════

new_liquid_glass_system = r"""/* ─── Liquid Glass 3D System ─────────────── */

/* SVG Refraction filter mixin - applied via filter property */
.liquid-refraction {
  filter: url(#liquid-refraction);
}

/* Prismatic border base - conic gradient simulating light prism */
.prismatic-border {
  position: relative;
  border: 1.5px solid transparent;
  background-clip: padding-box;
  background-origin: border-box;
}
.prismatic-border::before {
  content: '';
  position: absolute;
  inset: -1.5px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--light-angle, 135deg) at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.5) 0deg,
    rgba(52, 211, 153, 0.2) 60deg,
    rgba(56, 189, 248, 0.12) 120deg,
    rgba(168, 85, 247, 0.08) 180deg,
    rgba(52, 211, 153, 0.15) 240deg,
    rgba(255, 255, 255, 0.4) 300deg,
    rgba(255, 255, 255, 0.5) 360deg
  );
  z-index: -1;
  pointer-events: none;
  animation: prismatic-drift 12s ease-in-out infinite;
}

/* Caustic light projection layer */
.caustic-layer {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(ellipse 80% 50% at var(--light-x, 50%) var(--light-y, 20%), rgba(255, 255, 255, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 40% 30% at calc(var(--light-x, 50%) + 10%) calc(var(--light-y, 20%) + 15%), rgba(52, 211, 153, 0.04) 0%, transparent 50%);
  background-size: 200% 200%;
  animation: caustic-shimmer 8s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

/* Base liquid glass material - 3D volumetric */
.liquid-glass {
  position: relative;
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 50%,
    var(--glass-bg-3) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  border-radius: var(--glass-radius, 24px);
  box-shadow: var(--glass-volumetric);
  overflow: hidden;
  transition: var(--glass-transition);
  animation: refraction-pulse 8s ease-in-out infinite;
}

/* ::before = Glossy surface reflection layer */
.liquid-glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 15%,
    rgba(255, 255, 255, 0.85) 50%,
    rgba(255, 255, 255, 0.5) 85%,
    transparent 100%
  );
 z-index: 3;
  pointer-events: none;
  animation: specular-shift 6s ease-in-out infinite;
}

/* ::after = Volumetric glass mass + caustic inner glow */
.liquid-glass::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(
      ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
      rgba(255, 255, 255, 0.12) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 80% 60% at calc(100% - var(--light-x, 50%)) calc(100% - var(--light-y, 20%)),
      rgba(52, 211, 153, 0.03) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 1;
  animation: caustic-shadow-move 10s ease-in-out infinite;
}
.liquid-glass > * {
  position: relative;
  z-index: 2;
}

/* Liquid glass — nav variant */
.liquid-glass-nav {
  position: relative;
  background: linear-gradient(
    180deg,
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border-bottom: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  box-shadow: var(--glass-volumetric);
  transition: var(--glass-transition);
  animation: refraction-pulse 8s ease-in-out infinite;
}
.liquid-glass-nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 3%;
  right: 3%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 15%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.4) 85%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
  animation: specular-shift 6s ease-in-out infinite;
}
.liquid-glass-nav::after {
  content: '';
  position: absolute;
  bottom: -28px;
  left: 0;
  right: 0;
  height: 28px;
  background: linear-gradient(to bottom, rgba(8, 7, 10, 0.5), transparent);
  pointer-events: none;
  z-index: -1;
}
.liquid-glass-nav.scrolled {
  background: linear-gradient(
    180deg,
    var(--glass-bg-1) 0%,
    rgba(255, 255, 255, 0.07) 100%
  );
  box-shadow: var(--glass-volumetric);
  border-bottom: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
}
@supports not (backdrop-filter: blur(20px)) {
  .liquid-glass-nav { background: rgba(8, 7, 10, 0.95); }
  .liquid-glass-nav::before { display: none; }
  .liquid-glass-nav::after { display: none; }
}
@media (max-width: 640px) {
  .liquid-glass-nav::after { display: none; }
}

/* Liquid glass — card variant with volumetric depth */
.liquid-glass-card {
  position: relative;
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 50%,
    var(--glass-bg-3) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  border-radius: var(--glass-radius, 24px);
  box-shadow: var(--glass-volumetric);
  overflow: hidden;
  transition: var(--glass-transition);
  animation: refraction-pulse 8s ease-in-out infinite;
}
/* ::before = Prismatic border glow + specular top highlight */
.liquid-glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 10%,
    rgba(52, 211, 153, 0.25) 30%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(56, 189, 248, 0.15) 70%,
    rgba(255, 255, 255, 0.5) 90%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
  animation: specular-shift 6s ease-in-out infinite;
}
/* ::after = Volumetric inner refraction + caustic glow */
.liquid-glass-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(
      ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 90% 70% at calc(100% - var(--light-x, 50%)) calc(100% - var(--light-y, 20%)),
      rgba(52, 211, 153, 0.03) 0%,
      transparent 45%
    );
  pointer-events: none;
  z-index: 1;
  animation: caustic-shadow-move 10s ease-in-out infinite;
}
.liquid-glass-card > * {
  position: relative;
  z-index: 2;
}
.liquid-glass-card:hover {
  transform: translateY(-6px) scale(1.015);
  box-shadow: var(--glass-volumetric-hover);
  border-color: rgba(255, 255, 255, 0.5);
}
.liquid-glass-card:active {
  transform: translateY(-2px) scale(1.005);
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.6),
    inset 0 -2px 6px 0 rgba(0, 0, 0, 0.15),
    0 15px 30px -8px rgba(0, 0, 0, 0.3);
}
@supports not (backdrop-filter: blur(16px)) {
  .liquid-glass-card { background: rgba(13, 13, 13, 0.92); }
}

/* Liquid glass — pill variant (glass droplet buttons) */
.liquid-glass-pill {
  position: relative;
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 50%,
    var(--glass-bg-3) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  border-radius: 9999px;
  box-shadow: var(--glass-volumetric);
  overflow: hidden;
  transition: var(--glass-transition);
  animation: refraction-pulse 8s ease-in-out infinite;
}
.liquid-glass-pill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 12%;
  right: 12%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 30%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.6) 70%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.liquid-glass-pill::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 50% 35% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.15) 0%,
    transparent 55%
  );
  pointer-events: none;
  z-index: 1;
}
.liquid-glass-pill > * {
  position: relative;
  z-index: 2;
}
.liquid-glass-pill:hover {
  box-shadow: var(--glass-volumetric-hover);
  border-color: rgba(255, 255, 255, 0.5);
}
.liquid-glass-pill:active {
  transform: scale(0.97);
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.4),
    inset 0 -2px 6px 0 rgba(0, 0, 0, 0.2),
    0 8px 20px -6px rgba(0, 0, 0, 0.3);
}
@supports not (backdrop-filter: blur(16px)) {
  .liquid-glass-pill { background: rgba(13, 13, 13, 0.9); }
}

/* Liquid glass — panel variant (dropdowns/modals) */
.liquid-glass-panel {
  position: relative;
  background: linear-gradient(
    145deg,
    rgba(18, 18, 22, 0.88) 0%,
    rgba(12, 12, 14, 0.94) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  border-radius: 28px;
  box-shadow: var(--glass-volumetric);
  overflow: hidden;
  transition: var(--glass-transition);
}
.liquid-glass-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.35) 20%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.35) 80%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.liquid-glass-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.06) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}
.liquid-glass-panel > * {
  position: relative;
  z-index: 2;
}
@supports not (backdrop-filter: blur(20px)) {
  .liquid-glass-panel { background: rgba(10, 10, 10, 0.97); }
}

/* Liquid glass — input variant with prismatic focus */
.liquid-glass-input {
  position: relative;
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(52, 211, 153, 0.25);
  border-radius: 16px;
  box-shadow: var(--glass-volumetric);
  transition: var(--glass-transition);
}
.liquid-glass-input::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.45) 30%,
    rgba(52, 211, 153, 0.3) 50%,
    rgba(255, 255, 255, 0.45) 70%,
    transparent 100%
  );
  z-index: 2;
  pointer-events: none;
}
.liquid-glass-input::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(52, 211, 153, 0.06) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}
.liquid-glass-input > * {
  position: relative;
  z-index: 2;
}
.liquid-glass-input:focus {
  box-shadow:
    0 0 0 3px rgba(52, 211, 153, 0.2),
    var(--glass-volumetric);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Liquid glass — mobile menu variant */
.liquid-glass-mobile-menu {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(18, 18, 22, 0.9) 0%,
    rgba(12, 12, 14, 0.96) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border-bottom: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  box-shadow: var(--glass-volumetric);
  overflow: hidden;
  transition: var(--glass-transition);
}
.liquid-glass-mobile-menu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 20%,
    rgba(52, 211, 153, 0.25) 50%,
    rgba(255, 255, 255, 0.3) 80%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.liquid-glass-mobile-menu::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.04) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}

/* Prismatic / rainbow edge effect (enhanced) */
.liquid-glass-prismatic {
  position: relative;
  border: 1.5px solid transparent;
  background-clip: padding-box;
}
.liquid-glass-prismatic::before {
  content: '';
  position: absolute;
  inset: -1.5px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--light-angle, 135deg) at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 100, 100, 0.2),
    rgba(100, 255, 100, 0.2),
    rgba(100, 100, 255, 0.15),
    rgba(255, 255, 100, 0.15),
    rgba(255, 100, 100, 0.2)
  );
  z-index: -1;
  pointer-events: none;
  animation: prismatic-drift 12s ease-in-out infinite;
}
"""

# Find and replace the old Liquid Glass System section
# It starts with "/* ─── Liquid Glass System" and ends before "/* ─── Legacy Glass Classes"
pattern = r'/\* ─── Liquid Glass System ──────────── \*/.*?(?=\n/\* ─── Legacy Glass Classes)'
match = re.search(pattern, css, re.DOTALL)
if match:
    css = css[:match.start()] + new_liquid_glass_system + '\n' + css[match.end():]
    print("Step 3: Liquid Glass System replaced")
else:
    print("WARNING: Could not find Liquid Glass System section")

# ═══════════════════════════════════════════════════════════════
# 4. REPLACE Legacy Glass Classes
# ═══════════════════════════════════════════════════════════════

new_legacy_glass = r"""/* ─── Legacy Glass Classes (Liquid Glass 3D) ─── */
.glass-card {
  position: relative;
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 50%,
    var(--glass-bg-3) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  border-radius: var(--r-lg);
  box-shadow: var(--glass-volumetric);
  overflow: hidden;
  transition: var(--glass-transition);
  animation: refraction-pulse 8s ease-in-out infinite;
}
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 15%,
    rgba(52, 211, 153, 0.2) 35%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(56, 189, 248, 0.12) 65%,
    rgba(255, 255, 255, 0.5) 85%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
  animation: specular-shift 6s ease-in-out infinite;
}
.glass-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.08) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
  animation: caustic-shadow-move 10s ease-in-out infinite;
}
.glass-card > * {
  position: relative;
  z-index: 2;
}
.glass-card:hover {
  transform: translateY(-6px) scale(1.015);
  box-shadow: var(--glass-volumetric-hover);
  border-color: rgba(255, 255, 255, 0.5);
}
.glass-card:active {
  transform: translateY(-2px) scale(1.005);
}
@supports not (backdrop-filter: blur(16px)) {
  .glass-card { background: rgba(13, 13, 13, 0.92); }
}

.glass-nav {
  position: relative;
  background: linear-gradient(
    180deg,
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border-bottom: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  box-shadow: var(--glass-volumetric);
  transition: var(--glass-transition);
}
.glass-nav::after {
  content: '';
  position: absolute;
  bottom: -28px;
  left: 0;
  right: 0;
  height: 28px;
  background: linear-gradient(to bottom, rgba(8, 7, 10, 0.5), transparent);
  pointer-events: none;
  z-index: -1;
}
.glass-nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 3%;
  right: 3%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 15%,
    rgba(255, 255, 255, 0.65) 50%,
    rgba(255, 255, 255, 0.4) 85%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
  animation: specular-shift 6s ease-in-out infinite;
}
.glass-nav.scrolled {
  background: linear-gradient(
    180deg,
    var(--glass-bg-1) 0%,
    rgba(255, 255, 255, 0.07) 100%
  );
  box-shadow: var(--glass-volumetric);
  border-bottom: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
}
@supports not (backdrop-filter: blur(20px)) {
  .glass-nav { background: rgba(8, 7, 10, 0.95); }
  .glass-nav::before { display: none; }
  .glass-nav::after { display: none; }
}
@media (max-width: 640px) {
  .glass-nav::after { display: none; }
}

.glass-input {
  position: relative;
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  border-radius: 16px;
  box-shadow: var(--glass-volumetric);
  transition: var(--glass-transition);
}
.glass-input::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 25%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.4) 75%,
    transparent 100%
  );
  z-index: 2;
  pointer-events: none;
}
.glass-input::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.06) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}
.glass-input > * {
  position: relative;
  z-index: 2;
}
.glass-input:focus {
  box-shadow:
    0 0 0 3px rgba(52, 211, 153, 0.2),
    var(--glass-volumetric);
  border-color: rgba(255, 255, 255, 0.5);
}

.glass-light {
  position: relative;
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  box-shadow: var(--glass-volumetric);
  transition: var(--glass-transition);
}
.glass-light::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.06) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}
.glass-light > * {
  position: relative;
  z-index: 2;
}
"""

# Replace the Legacy Glass Classes section
pattern2 = r'/\* ─── Legacy Glass Classes.*?(?=\n/\* ─── Global Backdrop)'
match2 = re.search(pattern2, css, re.DOTALL)
if match2:
    css = css[:match2.start()] + new_legacy_glass + '\n' + css[match2.end():]
    print("Step 4: Legacy Glass Classes replaced")
else:
    print("WARNING: Could not find Legacy Glass Classes section")

# ═══════════════════════════════════════════════════════════════
# 5. UPDATE Buttons with volumetric 3D glass droplet style
# ═══════════════════════════════════════════════════════════════

new_buttons = r"""/* ─── Buttons (Liquid Glass Droplets) ───── */
.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #022c22;
  background: linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 45%, #34d399 100%);
  box-shadow:
    0 2px 4px 0 rgba(255,255,255,0.9) inset,
    0 -3px 8px 0 rgba(0,0,0,0.2) inset,
    0 12px 32px -8px rgba(52, 211, 153, 0.45),
    0 0 0 1px rgba(52, 211, 153, 0.4);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, filter 0.2s ease;
  overflow: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
}
/* Glass sheen overlay on btn-primary */
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.12) 35%,
    rgba(255, 255, 255, 0.0) 100%
  );
  pointer-events: none;
  z-index: 1;
}
/* Specular top highlight on btn-primary */
.btn-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.7) 25%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(255, 255, 255, 0.7) 75%,
    transparent 100%
  );
  z-index: 2;
  pointer-events: none;
}
.btn-primary:hover {
  transform: translateY(-2px) scale(1.03);
  filter: brightness(1.08);
  box-shadow:
    0 2px 4px 0 rgba(255,255,255,1) inset,
    0 -3px 8px 0 rgba(0,0,0,0.25) inset,
    0 20px 40px -6px rgba(52, 211, 153, 0.6),
    0 0 0 1.5px rgba(52, 211, 153, 0.6);
}
.btn-primary:active {
  transform: translateY(1px) scale(0.97);
  box-shadow:
    0 1px 2px 0 rgba(255,255,255,0.5) inset,
    0 -1px 4px 0 rgba(0,0,0,0.3) inset,
    0 4px 12px -4px rgba(52, 211, 153, 0.4);
}
.btn-primary > * { position: relative; z-index: 3; }

.btn-secondary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.85);
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    var(--glass-bg-1) 0%,
    var(--glass-bg-2) 50%,
    var(--glass-bg-3) 100%
  );
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  box-shadow: var(--glass-volumetric);
  transition: var(--glass-transition);
  overflow: hidden;
}
.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 12%;
  right: 12%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 25%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.5) 75%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
}
.btn-secondary::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 50% 35% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.1) 0%,
    transparent 55%
  );
  pointer-events: none;
  z-index: 0;
}
.btn-secondary:hover {
  background: linear-gradient(
    var(--glass-bg-angle, 135deg),
    rgba(255, 255, 255, 0.22) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: var(--glass-volumetric-hover);
  color: #fff;
  transform: translateY(-2px) scale(1.03);
}
.btn-secondary:active {
  transform: translateY(1px) scale(0.97);
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.4),
    inset 0 -2px 6px 0 rgba(0, 0, 0, 0.2),
    0 8px 20px -6px rgba(0, 0, 0, 0.3);
}
.btn-secondary > * { position: relative; z-index: 2; }
"""

# Replace the Buttons section
pattern3 = r'/\* ─── Buttons ───────────────────────────────── \*/.*?(?=\n/\* ─── Live dot)'
match3 = re.search(pattern3, css, re.DOTALL)
if match3:
    css = css[:match3.start()] + new_buttons + '\n' + css[match3.end():]
    print("Step 5: Buttons replaced")
else:
    print("WARNING: Could not find Buttons section")

# ═══════════════════════════════════════════════════════════════
# 6. UPDATE Search bar with prismatic borders
# ═══════════════════════════════════════════════════════════════

new_searchbar = r"""/* ─── Search bar (desktop) — Liquid Glass 3D ─── */
.searchbar-input-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 280px;
  padding: 0.55rem 0.75rem 0.55rem 1rem;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  background: linear-gradient(135deg, var(--glass-bg-1), var(--glass-bg-2));
  border: 1.5px solid rgba(255,255,255, var(--glass-border-opacity));
  box-shadow: var(--glass-volumetric);
  animation: searchbar-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transition: var(--glass-transition);
}
.searchbar-input-wrap::before {
  content: '';
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 20%,
    rgba(52, 211, 153, 0.2) 40%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(56, 189, 248, 0.12) 60%,
    rgba(255, 255, 255, 0.4) 80%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.searchbar-input-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.06) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
}
.searchbar-input-wrap > * {
  position: relative;
  z-index: 2;
}
.searchbar-input-closing {
  animation: searchbar-out 0.2s cubic-bezier(0.5, 0, 0.75, 0) forwards;
}
@keyframes searchbar-in {
  from { opacity: 0; transform: scaleX(0.85) scaleY(0.9); transform-origin: right center; }
  to { opacity: 1; transform: scaleX(1) scaleY(1); transform-origin: right center; }
}
@keyframes searchbar-out {
  from { opacity: 1; transform: scaleX(1) scaleY(1); transform-origin: right center; }
  to { opacity: 0; transform: scaleX(0.85) scaleY(0.9); transform-origin: right center; }
}
.searchbar-input-wrap:focus-within {
  box-shadow:
    0 0 0 3px rgba(52, 211, 153, 0.2),
    var(--glass-volumetric);
  border-color: rgba(255, 255, 255, 0.5);
}
.searchbar-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  font-size: 0.875rem;
  color: white;
  outline: none;
}
.searchbar-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}
.searchbar-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  left: auto;
  width: 340px;
  border-radius: 28px;
  overflow: hidden;
  z-index: 50;
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  background: linear-gradient(135deg, rgba(18,18,22,0.88), rgba(12,12,14,0.94));
  border: 1.5px solid rgba(255,255,255, var(--glass-border-opacity));
  box-shadow: var(--glass-volumetric);
  animation: searchbar-drop-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.searchbar-dropdown::before {
  content: '';
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.35) 20%,
    rgba(52, 211, 153, 0.15) 45%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(56, 189, 248, 0.1) 55%,
    rgba(255, 255, 255, 0.35) 80%,
    transparent 100%
  );
  z-index: 3;
  pointer-events: none;
}
.searchbar-closing .searchbar-dropdown {
  animation: searchbar-drop-out 0.15s cubic-bezier(0.5, 0, 0.75, 0) forwards;
}
@keyframes searchbar-drop-in {
  from { opacity: 0; transform: translateY(-6px) scaleY(0.96); }
  to { opacity: 1; transform: translateY(0) scaleY(1); }
}
@keyframes searchbar-drop-out {
  from { opacity: 1; transform: translateY(0) scaleY(1); }
  to { opacity: 0; transform: translateY(-4px) scaleY(0.97); }
}
.searchbar-result {
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: rgba(255,255,255,0.8);
  transition: background 0.15s ease;
}
.searchbar-result:hover,
.searchbar-result-active {
  background: rgba(52, 211, 153, 0.1);
  backdrop-filter: blur(10px);
}
"""

# Replace the Search bar section
pattern4 = r'/\* ─── Search bar \(desktop\).*?(?=\n/\* ─── Search \(liquid glass\))'
match4 = re.search(pattern4, css, re.DOTALL)
if match4:
    css = css[:match4.start()] + new_searchbar + '\n' + css[match4.end():]
    print("Step 6: Search bar replaced")
else:
    print("WARNING: Could not find Search bar section")

# ═══════════════════════════════════════════════════════════════
# 7. UPDATE card-glow-hover with volumetric shadows
# ═══════════════════════════════════════════════════════════════

new_card_glow = r"""/* ─── Card hover glow (Liquid Glass 3D) ─── */
.card-glow-hover {
  position: relative;
  transition: var(--glass-transition);
}
.card-glow-hover::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 60% 40% at var(--light-x, 50%) var(--light-y, 20%),
    rgba(255, 255, 255, 0.06) 0%,
    transparent 50%
  );
  pointer-events: none;
  z-index: 1;
  animation: caustic-shadow-move 10s ease-in-out infinite;
}
.card-glow-hover > * {
  position: relative;
  z-index: 2;
}
.card-glow-hover:hover {
  transform: translateY(-6px) scale(1.015);
  box-shadow: var(--glass-volumetric-hover);
  border-color: rgba(255, 255, 255, 0.5);
}
.card-glow-hover:active {
  transform: translateY(-2px) scale(1.005);
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.5),
    inset 0 -2px 6px 0 rgba(0, 0, 0, 0.15),
    0 15px 30px -8px rgba(0, 0, 0, 0.3);
}
"""

pattern5 = r'/\* ─── Card hover glow.*?(?=\n/\* ─── Hero ring)'
match5 = re.search(pattern5, css, re.DOTALL)
if match5:
    css = css[:match5.start()] + new_card_glow + '\n' + css[match5.end():]
    print("Step 7: Card glow hover replaced")
else:
    print("WARNING: Could not find Card glow hover section")

# ═══════════════════════════════════════════════════════════════
# 8. UPDATE mobile-search-bar with volumetric glass
# ═══════════════════════════════════════════════════════════════

new_mobile_search = r"""/* ─── Mobile Search Bar (Liquid Glass Droplet) ─── */
.mobile-search-bar {
  display: inline-flex;
  align-items: center;
  width: 145px;
  border-radius: 9999px;
  background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
  border: 1.5px solid rgba(255,255,255, var(--glass-border-opacity));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  box-shadow: var(--glass-volumetric);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease, border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}
.mobile-search-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 25%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.4) 75%,
    transparent 100%
  );
  z-index: 2;
  pointer-events: none;
}
.mobile-search-bar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 50% 35% at 30% 20%,
    rgba(255, 255, 255, 0.08) 0%,
    transparent 55%
  );
  pointer-events: none;
  z-index: 1;
}
.mobile-search-bar > * {
  position: relative;
  z-index: 2;
}
"""

pattern6 = r'/\* ─── Mobile Search Bar.*?(?=\n/\* Completely strip)'
match6 = re.search(pattern6, css, re.DOTALL)
if match6:
    css = css[:match6.start()] + new_mobile_search + '\n' + css[match6.end():]
    print("Step 8: Mobile search bar replaced")
else:
    print("WARNING: Could not find Mobile search bar section")

# ═══════════════════════════════════════════════════════════════
# 9. UPDATE mobile-search-results with prismatic borders
# ═══════════════════════════════════════════════════════════════

new_mobile_results = r"""/* Mobile search results dropdown — Liquid Glass 3D */
.mobile-search-results {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(18, 18, 22, 0.92) 0%,
    rgba(12, 12, 14, 0.96) 100%
  );
  backdrop-filter: blur(50px) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(50px) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  border-radius: 20px;
  box-shadow: var(--glass-volumetric);
  overflow: hidden;
}
.mobile-search-results::before {
  content: "";
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.25) 20%,
    rgba(52, 211, 153, 0.15) 45%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(56, 189, 248, 0.08) 55%,
    rgba(255, 255, 255, 0.25) 80%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 3;
}
"""

pattern7 = r'/\* Mobile search results dropdown \*/.*?(?=\n/\* Light mode for mobile floating)'
match7 = re.search(pattern7, css, re.DOTALL)
if match7:
    css = css[:match7.start()] + new_mobile_results + '\n' + css[match7.end():]
    print("Step 9: Mobile search results replaced")
else:
    print("WARNING: Could not find Mobile search results section")

# ═══════════════════════════════════════════════════════════════
# 10. UPDATE mobile-menu-close with glass droplet style
# ═══════════════════════════════════════════════════════════════

old_close_btn = '''.mobile-menu-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
  backdrop-filter: blur(24px) saturate(200%) contrast(105%);
  -webkit-backdrop-filter: blur(24px) saturate(200%) contrast(105%);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow:
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.1),
    0 20px 50px rgba(0, 0, 0, 0.25);
}'''

new_close_btn = '''.mobile-menu-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: 1.5px solid rgba(255, 255, 255, var(--glass-border-opacity));
  background: linear-gradient(135deg, var(--glass-bg-1), var(--glass-bg-2));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate)) contrast(var(--glass-contrast));
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: var(--glass-transition);
  box-shadow: var(--glass-volumetric);
}'''

css = css.replace(old_close_btn, new_close_btn)
print("Step 10: Mobile menu close button updated")

# ═══════════════════════════════════════════════════════════════
# 11. UPDATE spotlight hover with 3D lighting
# ═══════════════════════════════════════════════════════════════

new_spotlight = r"""/* ─── Spotlight (mouse-follow) hover (Liquid Glass 3D) ──── */
.spotlight {
  position: relative;
  isolation: isolate;
}
.spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    400px circle at var(--light-x, 50%) var(--light-y, 50%),
    rgba(255, 255, 255, 0.12),
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}
.spotlight:hover::before { opacity: 1; }
.spotlight > * { position: relative; z-index: 1; }
"""

pattern8 = r'/\* ─── Spotlight.*?(?=\n/\* ─── Conic border glow)'
match8 = re.search(pattern8, css, re.DOTALL)
if match8:
    css = css[:match8.start()] + new_spotlight + '\n' + css[match8.end():]
    print("Step 11: Spotlight updated")
else:
    print("WARNING: Could not find Spotlight section")

# ═══════════════════════════════════════════════════════════════
# 12. UPDATE mobile-menu-cta-btn with glass droplet
# ═══════════════════════════════════════════════════════════════

old_cta = '''.mobile-menu-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 14px;'''

new_cta = '''.mobile-menu-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 9999px;'''

css = css.replace(old_cta, new_cta)
print("Step 12: Mobile CTA button updated to pill")

# ═══════════════════════════════════════════════════════════════
# Write the final CSS
# ═══════════════════════════════════════════════════════════════

with open('/home/z/my-project/src/app/globals.css', 'w') as f:
    f.write(css)

print(f"\nDone! Final CSS: {len(css)} lines / {len(css.split(chr(10)))} lines")
print("globals.css written successfully")

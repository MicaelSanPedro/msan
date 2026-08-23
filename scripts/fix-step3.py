import re

with open('/home/z/my-project/src/app/globals.css', 'r') as f:
    css = f.read()

# The new liquid glass system content
new_liquid_glass_system = r'''/* ─── Liquid Glass 3D System ─────────────── */

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

/* Liquid glass - nav variant */
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

/* Liquid glass - card variant with volumetric depth */
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

/* Liquid glass - pill variant (glass droplet buttons) */
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

/* Liquid glass - panel variant (dropdowns/modals) */
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

/* Liquid glass - input variant with prismatic focus */
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
    rgba(255, 255, 255, 0.45) 25%,
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

/* Liquid glass - mobile menu variant */
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

/* Prismatic / rainbow edge effect (enhanced with mouse tracking) */
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
'''

start_marker = '/* ─── Liquid Glass System'
end_marker = '/* ─── Legacy Glass Classes'

start_idx = css.find(start_marker)
end_idx = css.find(end_marker)

if start_idx != -1 and end_idx != -1:
    css = css[:start_idx] + new_liquid_glass_system + '\n' + css[end_idx:]
    with open('/home/z/my-project/src/app/globals.css', 'w') as f:
        f.write(css)
    print(f"Replaced section from char {start_idx} to {end_idx}")
    print(f"New file: {len(css.split(chr(10)))} lines")
else:
    print(f"ERROR: start={start_idx}, end={end_idx}")
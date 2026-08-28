// ============================================================
// Pseudo-3D Racing Game Engine
// Classic OutRun / Rad Racer style — Single-file TypeScript
// ============================================================

// ======================== TYPES ========================

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}

interface Segment {
  index: number;
  curve: number;
  y: number;
  z: number;
  px: number;
  py: number;
  pw: number;
  pscale: number;
  visible: boolean;
}

interface TrafficCar {
  offset: number;
  z: number;
  speed: number;
  color: string;
  passed: boolean;
  px: number;
  py: number;
  pscale: number;
  visible: boolean;
}

interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}

// ======================== CONSTANTS ========================

const SEG = 200;
const ROAD_W = 2000;
const CAM_H = 1000;
const FOV = 100;
const CAM_D = 1 / Math.tan(((FOV / 2) * Math.PI) / 180);
const DRAW = 200;
const RUMBLE_N = 3;
const LANES = 3;

const MAX_SPD = SEG * 60;
const ACCEL = MAX_SPD / 5;
const DECEL = -MAX_SPD / 5;
const BRAKE_F = -MAX_SPD;
const OFF_DECEL = -MAX_SPD / 2;
const OFF_MAX = MAX_SPD / 4;
const CENTRI = 0.3;

const LIVES = 3;
const INV_TIME = 2;
const TRAFFIC_COUNT = 18;

const CAR_COLS = [
  '#e74c3c', '#3498db', '#f1c40f', '#2ecc71',
  '#9b59b6', '#e67e22', '#1abc9c', '#ecf0f1',
  '#e84393', '#00cec9', '#fd79a8', '#6c5ce7',
];

// ======================== UTILITIES ========================

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
function easeIn(a: number, b: number, t: number): number {
  return a + (b - a) * t * t;
}
function easeOut(a: number, b: number, t: number): number {
  return a + (b - a) * (1 - (1 - t) * (1 - t));
}
function easeIO(a: number, b: number, t: number): number {
  return a + (b - a) * (-Math.cos(t * Math.PI) / 2 + 0.5);
}
function rand(lo: number, hi: number): number {
  return Math.random() * (hi - lo) + lo;
}
function pick<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}

function hexRgb(h: string): [number, number, number] {
  return [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
}

function mixC(c1: string, c2: string, t: number): string {
  const [r1, g1, b1] = hexRgb(c1);
  const [r2, g2, b2] = hexRgb(c2);
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  return `rgb(${r},${g},${b})`;
}

// ======================== ROAD BUILDER ========================

function buildRoad(): Segment[] {
  const segs: Segment[] = [];
  let curY = 0;

  const add = (curve: number, y: number) => {
    segs.push({
      index: segs.length, curve, y,
      z: segs.length * SEG,
      px: 0, py: 0, pw: 0, pscale: 0, visible: false,
    });
  };

  const road = (ent: number, hold: number, leave: number, curve: number, dy: number) => {
    const sY = curY;
    const eY = curY + dy;
    const tot = Math.max(1, ent + hold + leave);
    for (let i = 0; i < ent; i++)
      add(easeIn(0, curve, i / Math.max(1, ent)), easeIO(sY, eY, i / tot));
    for (let i = 0; i < hold; i++)
      add(curve, easeIO(sY, eY, (ent + i) / tot));
    for (let i = 0; i < leave; i++)
      add(easeIO(curve, 0, i / Math.max(1, leave)), easeIO(sY, eY, (ent + hold + i) / tot));
    curY = eY;
  };

  // Build varied track — each "chapter" returns elevation to 0
  road(0, 50, 0, 0, 0);           // start straight
  road(10, 40, 10, 2, 200);       // gentle right + up
  road(0, 20, 0, 0, 0);           // straight
  road(10, 30, 10, -3, -200);     // left curve back down
  road(0, 15, 0, 0, 0);           // straight

  road(20, 30, 20, 0, 500);       // big uphill
  road(10, 30, 10, 3, 0);         // hilltop right
  road(15, 40, 15, -4, -500);     // downhill left
  road(0, 20, 0, 0, 0);           // valley

  road(20, 25, 20, 0, 400);       // uphill
  road(10, 25, 10, 5, 0);         // S-curve right
  road(10, 25, 10, -5, 0);        // S-curve left
  road(15, 30, 15, 0, -400);      // downhill
  road(0, 25, 0, 0, 0);           // straight

  road(15, 30, 15, -6, 300);      // sharp left + up
  road(15, 30, 15, 5, -300);      // right curve down
  road(0, 30, 0, 0, 0);           // straight

  road(20, 25, 20, 0, 600);       // big hill
  road(10, 20, 10, -4, 0);        // hilltop left
  road(20, 25, 20, 0, -600);      // big descent
  road(0, 20, 0, 0, 0);           // valley

  road(10, 40, 10, 3, 0);         // right sweeper
  road(10, 40, 10, -3, 0);        // left sweeper
  road(0, 20, 0, 0, 0);

  road(15, 25, 15, 4, 250);       // right + hill
  road(15, 25, 15, -2, -250);     // gentle left down
  road(0, 30, 0, 0, 0);

  road(10, 30, 10, -5, 0);        // sharp left
  road(10, 50, 10, 0, 0);         // long straight
  road(10, 30, 10, 2, 0);         // gentle right to finish
  road(0, 60, 0, 0, 0);           // final straight

  while (segs.length < 1400) road(0, 10, 0, 0, 0);
  return segs;
}

// ======================== RACING GAME ========================

export class RacingGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private running = false;
  private rafId = 0;
  private lastT = 0;
  private isMobile = false;

  // Road
  private segments: Segment[] = [];
  private totalLen = 0;

  // Game state
  private state = GameState.MENU;
  private playerZ = 0;
  private playerX = 0;
  private speed = 0;
  private score = 0;
  private distance = 0;
  private lives = LIVES;
  private invincible = false;
  private invTimer = 0;
  private shakeT = 0;
  private highScore = 0;
  private menuZ = 0;

  // Input
  private input: InputState = { left: false, right: false, up: false, down: false };
  private touches = new Map<number, { x: number; y: number }>();

  // Traffic
  private traffic: TrafficCar[] = [];

  // Bound handlers (for cleanup)
  private onKeyDown: (e: KeyboardEvent) => void;
  private onKeyUp: (e: KeyboardEvent) => void;
  private onTouchStart: (e: TouchEvent) => void;
  private onTouchMove: (e: TouchEvent) => void;
  private onTouchEnd: (e: TouchEvent) => void;
  private onResize: () => void;
  private loop: (t: number) => void;

  // ---- CONSTRUCTOR ----
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get 2d context');
    this.ctx = ctx;

    this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Build road
    this.segments = buildRoad();
    this.totalLen = this.segments.length * SEG;

    // Load high score
    try {
      const saved = localStorage.getItem('racing_highscore');
      if (saved) this.highScore = parseInt(saved, 10) || 0;
    } catch { /* ignore */ }

    // Resize
    this.onResize = () => this.resize();
    this.resize();
    window.addEventListener('resize', this.onResize);

    // Input — keyboard
    this.onKeyDown = (e: KeyboardEvent) => {
      this.handleKey(e.code, true);
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        this.handleAction();
      }
    };
    this.onKeyUp = (e: KeyboardEvent) => this.handleKey(e.code, false);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    // Input — touch
    this.onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        this.touches.set(t.identifier, { x: t.clientX, y: t.clientY });
      }
      this.syncTouch();
    };
    this.onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        if (this.touches.has(t.identifier))
          this.touches.set(t.identifier, { x: t.clientX, y: t.clientY });
      }
      this.syncTouch();
    };
    this.onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++)
        this.touches.delete(e.changedTouches[i].identifier);
      this.syncTouch();
      if (this.state !== GameState.PLAYING && this.touches.size === 0)
        this.handleAction();
    };
    canvas.addEventListener('touchstart', this.onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', this.onTouchMove, { passive: false });
    canvas.addEventListener('touchend', this.onTouchEnd, { passive: false });

    // Game loop
    this.loop = (t: number) => {
      if (!this.running) return;
      const dt = Math.min((t - this.lastT) / 1000, 0.05);
      this.lastT = t;
      this.update(dt);
      this.render();
      this.rafId = requestAnimationFrame(this.loop);
    };
  }

  // ---- LIFECYCLE ----
  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastT = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.canvas.removeEventListener('touchstart', this.onTouchStart);
    this.canvas.removeEventListener('touchmove', this.onTouchMove);
    this.canvas.removeEventListener('touchend', this.onTouchEnd);
  }

  private resize(): void {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  }

  // ---- INPUT ----
  private handleKey(code: string, down: boolean): void {
    switch (code) {
      case 'ArrowLeft': case 'KeyA': this.input.left = down; break;
      case 'ArrowRight': case 'KeyD': this.input.right = down; break;
      case 'ArrowUp': case 'KeyW': this.input.up = down; break;
      case 'ArrowDown': case 'KeyS': this.input.down = down; break;
    }
  }

  private syncTouch(): void {
    this.input.left = false;
    this.input.right = false;
    this.input.up = this.touches.size > 0;
    for (const [, pos] of this.touches) {
      if (pos.x < this.w * 0.4) this.input.left = true;
      else if (pos.x > this.w * 0.6) this.input.right = true;
    }
  }

  private handleAction(): void {
    if (this.state === GameState.MENU) {
      this.resetGame();
      this.state = GameState.PLAYING;
    } else if (this.state === GameState.GAME_OVER) {
      this.state = GameState.MENU;
    }
  }

  // ---- GAME RESET ----
  private resetGame(): void {
    this.playerZ = 0;
    this.playerX = 0;
    this.speed = 0;
    this.score = 0;
    this.distance = 0;
    this.lives = LIVES;
    this.invincible = false;
    this.invTimer = 0;
    this.shakeT = 0;
    this.traffic = [];
    this.spawnTraffic(true);
  }

  // ---- UPDATE ----
  private update(dt: number): void {
    if (this.state === GameState.PLAYING) this.updatePlay(dt);
    else this.menuZ += MAX_SPD * 0.25 * dt;

    if (this.shakeT > 0) this.shakeT = Math.max(0, this.shakeT - dt);
  }

  private updatePlay(dt: number): void {
    const seg = this.segments[Math.floor(this.playerZ / SEG) % this.segments.length];
    const spdPct = this.speed / MAX_SPD;

    // Acceleration
    if (this.input.up) this.speed += ACCEL * dt;
    else if (this.input.down) this.speed += BRAKE_F * dt;
    else this.speed += DECEL * dt;

    // Off-road penalty
    const offRoad = Math.abs(this.playerX) > 1;
    if (offRoad) {
      if (this.speed > OFF_MAX) this.speed += OFF_DECEL * dt;
      if (this.speed > OFF_MAX) this.speed = OFF_MAX;
    }

    this.speed = clamp(this.speed, 0, MAX_SPD);

    // Steering
    const steerSpd = 3.0 * dt * (offRoad ? 0.5 : 1);
    if (this.input.left) this.playerX -= steerSpd;
    if (this.input.right) this.playerX += steerSpd;

    // Centrifugal force
    this.playerX -= seg.curve * spdPct * CENTRI * dt * 2;

    this.playerX = clamp(this.playerX, -2.5, 2.5);

    // Move forward
    const dz = this.speed * dt;
    this.playerZ += dz;
    if (this.playerZ >= this.totalLen) this.playerZ -= this.totalLen;

    // Distance & score
    this.distance += dz;
    this.score += dz * 0.01 * (1 + spdPct);

    // Invincibility
    if (this.invincible) {
      this.invTimer -= dt;
      if (this.invTimer <= 0) this.invincible = false;
    }

    // Traffic
    this.updateTraffic(dt);
    this.checkCollisions();
    this.spawnTraffic(false);
  }

  // ---- TRAFFIC ----
  private updateTraffic(dt: number): void {
    for (const car of this.traffic) {
      car.z += car.speed * dt;
      if (car.z >= this.totalLen) car.z -= this.totalLen;

      // Check if player passed
      if (!car.passed) {
        const diff = this.playerZ - car.z;
        if (diff > 0 && diff < SEG * 3) {
          car.passed = true;
          this.score += 500;
        }
      }

      car.visible = false;
    }
  }

  private spawnTraffic(initial: boolean): void {
    // Remove cars too far behind
    this.traffic = this.traffic.filter(c => {
      const diff = c.z - this.playerZ;
      const wrapped = diff < -this.totalLen / 2 ? diff + this.totalLen : diff;
      return wrapped > -SEG * 30;
    });

    const count = initial ? TRAFFIC_COUNT : TRAFFIC_COUNT - this.traffic.length;
    for (let i = 0; i < count; i++) {
      const ahead = SEG * (15 + Math.random() * (DRAW - 20));
      let z = this.playerZ + ahead;
      if (z >= this.totalLen) z -= this.totalLen;

      // Pick a lane: -0.6, 0, 0.6
      const lanes = [-0.6, 0, 0.6];
      const offset = pick(lanes) + rand(-0.08, 0.08);
      const spd = MAX_SPD * rand(0.15, 0.45);

      this.traffic.push({
        offset,
        z,
        speed: spd,
        color: pick(CAR_COLS),
        passed: false,
        px: 0, py: 0, pscale: 0, visible: false,
      });
    }
  }

  private checkCollisions(): void {
    if (this.invincible) return;
    for (const car of this.traffic) {
      let diff = car.z - this.playerZ;
      if (diff < -this.totalLen / 2) diff += this.totalLen;
      if (diff > this.totalLen / 2) diff -= this.totalLen;

      if (Math.abs(diff) < SEG * 0.45) {
        if (Math.abs(car.offset - this.playerX) < 0.28) {
          this.onCollision();
          return;
        }
      }
    }
  }

  private onCollision(): void {
    this.lives--;
    this.speed *= 0.2;
    this.invincible = true;
    this.invTimer = INV_TIME;
    this.shakeT = 0.4;

    if (this.lives <= 0) {
      this.state = GameState.GAME_OVER;
      if (this.score > this.highScore) {
        this.highScore = Math.floor(this.score);
        try { localStorage.setItem('racing_highscore', String(this.highScore)); } catch { /* */ }
      }
    }
  }

  // ---- RENDER ----
  private render(): void {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;
    ctx.clearRect(0, 0, w, h);

    ctx.save();
    // Screen shake
    if (this.shakeT > 0) {
      const si = this.shakeT * 25;
      ctx.translate((Math.random() - 0.5) * 2 * si, (Math.random() - 0.5) * 2 * si);
    }

    // Which z to use for rendering
    const renderZ = this.state === GameState.PLAYING ? this.playerZ : this.menuZ;
    const renderX = this.state === GameState.PLAYING ? this.playerX : 0;

    this.renderSky();
    this.renderClouds(renderZ);
    this.renderMountains(renderZ);
    this.projectAndDrawRoad(renderZ, renderX);
    this.drawTrafficCars(renderZ);

    // Night overlay
    const night = this.getNightAlpha(renderZ);
    if (night > 0.01) {
      ctx.fillStyle = `rgba(0,0,40,${night * 0.55})`;
      ctx.fillRect(0, 0, w, h);
    }

    if (this.state === GameState.PLAYING) {
      if (this.speed > MAX_SPD * 0.65) this.drawSpeedLines();
      this.drawPlayerCar();
      this.drawHUD();
      if (this.isMobile) this.drawTouchControls();
    }

    ctx.restore();

    if (this.state === GameState.MENU) this.drawMenu();
    else if (this.state === GameState.GAME_OVER) this.drawGameOver();
  }

  // ---- BACKGROUND ----
  private renderSky(): void {
    const ctx = this.ctx;
    const [top, bot] = this.getSkyColors();
    const horizonY = this.h * 0.48;
    const g = ctx.createLinearGradient(0, 0, 0, horizonY + 20);
    g.addColorStop(0, top);
    g.addColorStop(1, bot);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.w, horizonY + 20);
    // Fill below horizon with bottom sky color (road will overdraw)
    ctx.fillStyle = bot;
    ctx.fillRect(0, horizonY, this.w, this.h - horizonY);
  }

  private getSkyColors(): [string, string] {
    const pos = this.state === GameState.PLAYING
      ? (this.playerZ / this.totalLen) % 1
      : (this.menuZ / this.totalLen) % 1;
    if (pos < 0.25 || pos >= 0.75) return ['#4A90D9', '#87CEEB'];
    if (pos < 0.35) { const t = (pos - 0.25) / 0.1; return [mixC('#4A90D9', '#FF6B35', t), mixC('#87CEEB', '#FFD700', t)]; }
    if (pos < 0.55) return ['#0A1628', '#1A2A4A'];
    if (pos < 0.65) { const t = (pos - 0.55) / 0.1; return [mixC('#0A1628', '#FF8C42', t), mixC('#1A2A4A', '#FFD700', t)]; }
    const t = (pos - 0.65) / 0.1;
    return [mixC('#FF8C42', '#4A90D9', t), mixC('#FFD700', '#87CEEB', t)];
  }

  private getNightAlpha(z: number): number {
    const pos = (z / this.totalLen) % 1;
    if (pos < 0.25 || pos >= 0.75) return 0;
    if (pos < 0.35) return (pos - 0.25) / 0.1;
    if (pos < 0.55) return 1;
    if (pos < 0.65) return 1 - (pos - 0.55) / 0.1;
    return 0;
  }

  private renderClouds(z: number): void {
    const ctx = this.ctx;
    const off = -(z * 0.00015) % (this.w + 300);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    for (let i = 0; i < 6; i++) {
      const cx = ((i * this.w * 0.22 + off) % (this.w + 300)) - 150;
      const cy = 25 + (i * 37) % 80;
      const sz = 45 + (i * 23) % 40;
      ctx.beginPath();
      ctx.ellipse(cx, cy, sz, sz * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx - sz * 0.4, cy + 4, sz * 0.6, sz * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + sz * 0.45, cy + 3, sz * 0.55, sz * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private renderMountains(z: number): void {
    const baseY = this.h * 0.48;
    // Far range
    this.drawRange(baseY, 60, 120, z * 0.0003, '#2D5A1E', 220);
    // Near range
    this.drawRange(baseY, 35, 90, z * 0.0006, '#1A3A0A', 160);
  }

  private drawRange(baseY: number, minH: number, maxH: number, off: number, color: string, spacing: number): void {
    const ctx = this.ctx;
    const w = this.w;
    const o = -(off) % spacing;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, baseY + 5);
    for (let x = o - spacing; x <= w + spacing; x += spacing) {
      const seed = Math.abs(Math.sin(x * 0.0037 + off * 0.1)) ;
      const h = minH + seed * (maxH - minH);
      ctx.lineTo(x + spacing * 0.5, baseY - h);
      ctx.lineTo(x + spacing, baseY - h * 0.25);
    }
    ctx.lineTo(w + 50, baseY + 5);
    ctx.closePath();
    ctx.fill();
  }

  // ---- ROAD RENDERING ----
  private projectAndDrawRoad(camZ: number, camX: number): void {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;
    const n = this.segments.length;
    const baseIdx = Math.floor(camZ / SEG) % n;
    const basePct = (camZ % SEG) / SEG;

    let cx = 0;
    let dx = -(this.segments[baseIdx].curve * basePct);
    let maxY = h;

    // Project all visible segments
    for (let i = 0; i < DRAW; i++) {
      const idx = (baseIdx + i) % n;
      const seg = this.segments[idx];
      const looped = idx < baseIdx;
      const sz = seg.z + (looped ? this.totalLen : 0);
      const z = sz - camZ;

      dx += seg.curve;
      cx += dx;

      if (z <= 0) {
        seg.px = 0; seg.py = h; seg.pw = 0; seg.pscale = 0; seg.visible = false;
        continue;
      }

      const sc = CAM_D / z;
      seg.px = w / 2 + (cx - camX * ROAD_W * 0.5) * sc * w * 0.5;
      seg.py = h / 2 - (seg.y - CAM_H) * sc * h * 0.5;
      seg.pw = ROAD_W * sc * w * 0.5;
      seg.pscale = sc;
      seg.visible = seg.py < maxY;
      if (seg.visible) maxY = seg.py;
    }

    // Draw from far to near
    for (let i = DRAW - 1; i > 0; i--) {
      const i1 = (baseIdx + i) % n;
      const i2 = (baseIdx + i - 1) % n;
      const s1 = this.segments[i1];
      const s2 = this.segments[i2];
      if (!s1.visible && !s2.visible) continue;
      if (s2.py <= s1.py + 1) continue;

      const cSet = Math.floor(i1 / RUMBLE_N) % 2;
      this.drawStrip(s1, s2, cSet, i / DRAW);
    }
  }

  private drawStrip(s1: Segment, s2: Segment, cSet: number, fogT: number): void {
    const ctx = this.ctx;
    const w = this.w;
    const y1 = s1.py, y2 = s2.py;
    const x1 = s1.px, x2 = s2.px;
    const w1 = s1.pw, w2 = s2.pw;
    const stripH = y2 - y1;
    if (stripH <= 0) return;

    // Grass
    ctx.fillStyle = cSet === 0 ? '#10AA10' : '#009A00';
    ctx.fillRect(0, y1, w, stripH);

    // Rumble
    const rw1 = w1 * 1.12, rw2 = w2 * 1.12;
    ctx.fillStyle = cSet === 0 ? '#CC0000' : '#DDDDDD';
    this.poly(x1 - rw1, y1, x1 + rw1, y1, x2 + rw2, y2, x2 - rw2, y2);

    // Road
    ctx.fillStyle = cSet === 0 ? '#6B6B6B' : '#696969';
    this.poly(x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2);

    // Lane markings (dashed)
    if (cSet === 0 && w1 > 4) {
      ctx.fillStyle = '#BBBBBB';
      for (let l = 1; l < LANES; l++) {
        const frac = l / LANES;
        const lw1 = Math.max(1, w1 * 0.02);
        const lw2 = Math.max(1, w2 * 0.02);
        const lx1 = lerp(x1 - w1, x1 + w1, frac);
        const lx2 = lerp(x2 - w2, x2 + w2, frac);
        this.poly(lx1 - lw1, y1, lx1 + lw1, y1, lx2 + lw2, y2, lx2 - lw2, y2);
      }
    }

    // Fog
    if (fogT > 0.15) {
      const alpha = (fogT - 0.15) * 0.85;
      ctx.fillStyle = `rgba(180,200,220,${clamp(alpha, 0, 0.85)})`;
      ctx.fillRect(0, y1, w, stripH);
    }
  }

  private poly(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  }

  // ---- TRAFFIC CARS ----
  private drawTrafficCars(camZ: number): void {
    const n = this.segments.length;
    // Project traffic onto segments
    for (const car of this.traffic) {
      let diff = car.z - camZ;
      if (diff < -this.totalLen / 2) diff += this.totalLen;
      if (diff > this.totalLen / 2) diff -= this.totalLen;
      if (diff < SEG * 0.5 || diff > SEG * DRAW) { car.visible = false; continue; }

      const idx = Math.floor(car.z / SEG) % n;
      const seg = this.segments[idx];
      if (!seg.visible) { car.visible = false; continue; }

      car.px = seg.px + car.offset * seg.pw;
      car.py = seg.py;
      car.pscale = seg.pscale;
      car.visible = seg.pw > 3;
    }

    // Sort far to near (draw far first)
    const sorted = this.traffic.filter(c => c.visible).sort((a, b) => {
      const da = a.z - camZ; const db = b.z - camZ;
      return db - da;
    });

    for (const car of sorted) this.drawCar(car.px, car.py, car.pscale, car.color, false);
  }

  // ---- CAR DRAWING ----
  private drawCar(cx: number, cy: number, sc: number, color: string, isPlayer: boolean): void {
    const ctx = this.ctx;
    const s = isPlayer ? 1 : sc * this.h * 0.5;
    if (s < 1.5 && !isPlayer) return;

    ctx.save();
    ctx.translate(cx, cy);

    const bw = (isPlayer ? 70 : 50) * (isPlayer ? 1 : s / (this.h * 0.3));
    const bh = (isPlayer ? 110 : 75) * (isPlayer ? 1 : s / (this.h * 0.3));
    const scale = isPlayer ? 1 : clamp(s / 40, 0.15, 3);

    if (!isPlayer) ctx.scale(scale, scale);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 2, bw * 0.55, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body (sleek shape)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-bw * 0.48, bh * 0.42);
    ctx.lineTo(-bw * 0.38, -bh * 0.1);
    ctx.lineTo(-bw * 0.22, -bh * 0.38);
    ctx.lineTo(bw * 0.22, -bh * 0.38);
    ctx.lineTo(bw * 0.38, -bh * 0.1);
    ctx.lineTo(bw * 0.48, bh * 0.42);
    ctx.closePath();
    ctx.fill();

    // Darker body shade
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.moveTo(0, -bh * 0.38);
    ctx.lineTo(bw * 0.22, -bh * 0.38);
    ctx.lineTo(bw * 0.38, -bh * 0.1);
    ctx.lineTo(bw * 0.48, bh * 0.42);
    ctx.lineTo(0, bh * 0.42);
    ctx.closePath();
    ctx.fill();

    // Windshield
    ctx.fillStyle = isPlayer ? '#5DADE2' : '#5DADE2';
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(-bw * 0.28, -bh * 0.15);
    ctx.lineTo(-bw * 0.2, -bh * 0.33);
    ctx.lineTo(bw * 0.2, -bh * 0.33);
    ctx.lineTo(bw * 0.28, -bh * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    // Rear window
    ctx.fillStyle = '#3B7DD8';
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(-bw * 0.25, bh * 0.15);
    ctx.lineTo(-bw * 0.32, bh * 0.02);
    ctx.lineTo(bw * 0.32, bh * 0.02);
    ctx.lineTo(bw * 0.25, bh * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    // Wheels
    ctx.fillStyle = '#1a1a2e';
    const wheelW = bw * 0.12;
    const wheelH = bh * 0.18;
    ctx.fillRect(-bw * 0.52, -bh * 0.25, wheelW, wheelH);
    ctx.fillRect(bw * 0.52 - wheelW, -bh * 0.25, wheelW, wheelH);
    ctx.fillRect(-bw * 0.52, bh * 0.12, wheelW, wheelH);
    ctx.fillRect(bw * 0.52 - wheelW, bh * 0.12, wheelW, wheelH);

    // Headlights
    ctx.fillStyle = '#FFE066';
    ctx.shadowColor = '#FFE066';
    ctx.shadowBlur = isPlayer ? 8 : 4;
    ctx.fillRect(-bw * 0.35, -bh * 0.4, bw * 0.12, bh * 0.04);
    ctx.fillRect(bw * 0.35 - bw * 0.12, -bh * 0.4, bw * 0.12, bh * 0.04);
    ctx.shadowBlur = 0;

    // Taillights
    ctx.fillStyle = '#FF3333';
    ctx.shadowColor = '#FF3333';
    ctx.shadowBlur = isPlayer ? 6 : 3;
    ctx.fillRect(-bw * 0.4, bh * 0.38, bw * 0.15, bh * 0.04);
    ctx.fillRect(bw * 0.4 - bw * 0.15, bh * 0.38, bw * 0.15, bh * 0.04);
    ctx.shadowBlur = 0;

    // Racing stripes (player only)
    if (isPlayer) {
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(-bw * 0.06, -bh * 0.35, bw * 0.04, bh * 0.7);
      ctx.fillRect(bw * 0.02, -bh * 0.35, bw * 0.04, bh * 0.7);
    }

    ctx.restore();
  }

  private drawPlayerCar(): void {
    // Invincibility flash
    if (this.invincible && Math.floor(this.invTimer * 10) % 2 === 0) return;

    const cx = this.w / 2;
    const cy = this.h - this.h * 0.12;
    const tilt = (this.input.left ? 1 : 0) - (this.input.right ? 1 : 0);

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(tilt * -0.04);
    this.ctx.translate(-cx, -cy);
    this.drawCar(cx, cy, 1, '#E63946', true);
    this.ctx.restore();
  }

  // ---- SPEED LINES ----
  private drawSpeedLines(): void {
    const ctx = this.ctx;
    const intensity = (this.speed / MAX_SPD - 0.65) / 0.35;
    const alpha = clamp(intensity * 0.35, 0, 0.35);
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 2;
    const count = Math.floor(intensity * 15);
    const time = performance.now() * 0.003;

    for (let i = 0; i < count; i++) {
      const seed = (i * 137.5 + time) % 1;
      const side = i % 2 === 0 ? -1 : 1;
      const x = this.w / 2 + side * (this.w * 0.35 + seed * this.w * 0.15);
      const y1 = seed * this.h * 0.6;
      const y2 = y1 + 30 + intensity * 60;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x + side * 5, y2);
      ctx.stroke();
    }
  }

  // ---- HUD ----
  private drawHUD(): void {
    const ctx = this.ctx;
    const w = this.w;
    const pad = 20;
    const fontSize = clamp(w * 0.025, 14, 22);

    ctx.textBaseline = 'top';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    // Score (top-left)
    ctx.textAlign = 'left';
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`SCORE`, pad, pad);
    ctx.font = `bold ${fontSize * 1.4}px "Courier New", monospace`;
    ctx.fillText(`${Math.floor(this.score).toLocaleString()}`, pad, pad + fontSize + 4);

    // Speed (top-center)
    const kmh = Math.floor((this.speed / MAX_SPD) * 280);
    ctx.textAlign = 'center';
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    ctx.fillStyle = kmh > 220 ? '#FF6B6B' : '#FFFFFF';
    ctx.fillText(`${kmh} km/h`, w / 2, pad);

    // Distance (top-right)
    const meters = Math.floor(this.distance / 10);
    const km = (meters / 1000).toFixed(1);
    ctx.textAlign = 'right';
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(meters >= 1000 ? `${km} km` : `${meters} m`, w - pad, pad);

    // Lives (bottom-center) — small car icons
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    const iconSize = clamp(w * 0.025, 12, 20);
    const spacing = iconSize * 2.5;
    const startX = w / 2 - (this.lives - 1) * spacing / 2;
    const ly = this.h - pad - iconSize * 1.2;

    for (let i = 0; i < this.lives; i++) {
      const lx = startX + i * spacing;
      ctx.fillStyle = '#E63946';
      ctx.beginPath();
      ctx.moveTo(lx - iconSize * 0.4, ly + iconSize * 0.35);
      ctx.lineTo(lx - iconSize * 0.3, ly - iconSize * 0.15);
      ctx.lineTo(lx + iconSize * 0.3, ly - iconSize * 0.15);
      ctx.lineTo(lx + iconSize * 0.4, ly + iconSize * 0.35);
      ctx.closePath();
      ctx.fill();
      // windshield
      ctx.fillStyle = '#5DADE2';
      ctx.fillRect(lx - iconSize * 0.2, ly - iconSize * 0.1, iconSize * 0.4, iconSize * 0.15);
    }
  }

  // ---- TOUCH CONTROLS ----
  private drawTouchControls(): void {
    const ctx = this.ctx;
    const r = clamp(this.w * 0.06, 28, 50);
    const by = this.h - r - 30;
    const alpha = 0.15;

    // Left
    ctx.fillStyle = this.input.left ? `rgba(255,255,255,${alpha + 0.15})` : `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(70, by, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Arrow
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.moveTo(85, by);
    ctx.lineTo(60, by);
    ctx.lineTo(72, by - 12);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(85, by);
    ctx.lineTo(60, by);
    ctx.lineTo(72, by + 12);
    ctx.closePath();
    ctx.fill();

    // Right
    const rx = this.w - 70;
    ctx.fillStyle = this.input.right ? `rgba(255,255,255,${alpha + 0.15})` : `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(rx, by, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.moveTo(rx - 25, by);
    ctx.lineTo(rx, by);
    ctx.lineTo(rx - 12, by - 12);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(rx - 25, by);
    ctx.lineTo(rx, by);
    ctx.lineTo(rx - 12, by + 12);
    ctx.closePath();
    ctx.fill();
  }

  // ---- MENU ----
  private drawMenu(): void {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;

    // Overlay
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, 0, w, h);

    // Title
    const titleSize = clamp(w * 0.08, 36, 72);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${titleSize}px "Arial Black", "Impact", sans-serif`;
    ctx.fillStyle = '#E63946';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText('ROAD RACER', w / 2, h * 0.3);

    // Subtitle
    const subSize = clamp(w * 0.025, 14, 24);
    ctx.font = `bold ${subSize}px "Courier New", monospace`;
    ctx.fillStyle = '#FFD700';
    ctx.shadowBlur = 4;
    ctx.fillText('PSEUDO-3D RACING', w / 2, h * 0.3 + titleSize * 0.7);

    // High score
    if (this.highScore > 0) {
      ctx.font = `bold ${subSize}px "Courier New", monospace`;
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 2;
      ctx.fillText(`HIGH SCORE: ${this.highScore.toLocaleString()}`, w / 2, h * 0.45);
    }

    // Instructions
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    const instrSize = clamp(w * 0.02, 12, 18);

    ctx.font = `${instrSize}px "Courier New", monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    if (this.isMobile) {
      ctx.fillText('TOUCH LEFT / RIGHT TO STEER', w / 2, h * 0.56);
      ctx.fillText('AUTO-ACCELERATE ON TOUCH', w / 2, h * 0.56 + instrSize * 1.8);
    } else {
      ctx.fillText('ARROW KEYS / WASD TO DRIVE', w / 2, h * 0.56);
    }
    ctx.fillText('DODGE TRAFFIC • SURVIVE AS LONG AS YOU CAN', w / 2, h * 0.56 + instrSize * 3.6);

    // Start prompt
    const pulse = 0.6 + 0.4 * Math.sin(performance.now() * 0.004);
    ctx.globalAlpha = pulse;
    ctx.font = `bold ${clamp(w * 0.03, 16, 28)}px "Courier New", monospace`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.isMobile ? 'TAP TO START' : 'PRESS ENTER TO START', w / 2, h * 0.72);
    ctx.globalAlpha = 1;
  }

  // ---- GAME OVER ----
  private drawGameOver(): void {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, w, h);

    const titleSize = clamp(w * 0.07, 32, 64);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${titleSize}px "Arial Black", "Impact", sans-serif`;
    ctx.fillStyle = '#E63946';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText('GAME OVER', w / 2, h * 0.3);

    const statSize = clamp(w * 0.028, 16, 26);
    ctx.shadowBlur = 2;

    ctx.font = `bold ${statSize}px "Courier New", monospace`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`SCORE: ${Math.floor(this.score).toLocaleString()}`, w / 2, h * 0.43);

    ctx.fillStyle = '#FFD700';
    ctx.fillText(`HIGH SCORE: ${this.highScore.toLocaleString()}`, w / 2, h * 0.43 + statSize * 1.8);

    const meters = Math.floor(this.distance / 10);
    ctx.fillStyle = '#AAAAAA';
    ctx.font = `${statSize * 0.85}px "Courier New", monospace`;
    ctx.fillText(`DISTANCE: ${meters >= 1000 ? (meters / 1000).toFixed(1) + ' km' : meters + ' m'}`, w / 2, h * 0.43 + statSize * 3.4);

    const pulse = 0.6 + 0.4 * Math.sin(performance.now() * 0.004);
    ctx.globalAlpha = pulse;
    ctx.font = `bold ${clamp(w * 0.025, 14, 24)}px "Courier New", monospace`;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowBlur = 0;
    ctx.fillText(this.isMobile ? 'TAP TO CONTINUE' : 'PRESS ENTER TO CONTINUE', w / 2, h * 0.65);
    ctx.globalAlpha = 1;
  }
}
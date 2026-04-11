<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>PharmVigilance AI — Banner</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* ═══════════════════════════════════════
   BANNER SHELL
═══════════════════════════════════════ */
.banner {
  position: relative;
  width: 960px;
  height: 170px;
  background: #080808;
  border: 1px solid #1f0000;
  overflow: hidden;
  font-family: 'Share Tech Mono', monospace;
}

/* scanlines */
.banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 3px,
    rgba(0,0,0,.13) 3px,
    rgba(0,0,0,.13) 4px
  );
  pointer-events: none;
  z-index: 30;
}

/* ═══════════════════════════════════════
   LEFT  ─  NEURAL BRAIN  (canvas)
═══════════════════════════════════════ */
.brain-zone {
  position: absolute;
  left: 0; top: 0;
  width: 210px;
  height: 170px;
  z-index: 2;
}

#brainCanvas {
  position: absolute;
  left: 0; top: 0;
  width: 210px;
  height: 170px;
}

/* soft glow behind brain */
.brain-glow {
  position: absolute;
  left: -20px; top: 10px;
  width: 220px; height: 160px;
  background: radial-gradient(ellipse at 50% 55%,
    rgba(200,20,0,.22) 0%,
    rgba(180,0,0,.08) 45%,
    transparent 75%
  );
  z-index: 1;
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,100% { opacity:.7; transform:scale(1); }
  50%      { opacity:1;  transform:scale(1.06); }
}

/* ═══════════════════════════════════════
   DIVIDER
═══════════════════════════════════════ */
.divider {
  position: absolute;
  left: 205px; top: 0;
  width: 2px; height: 100%;
  background: linear-gradient(180deg,
    transparent 0%,
    #cc0000 15%,
    #ff2200 50%,
    #cc0000 85%,
    transparent 100%
  );
  box-shadow: 0 0 10px #cc0000, 0 0 24px rgba(204,0,0,.35);
  z-index: 10;
  animation: divPulse 2.4s ease-in-out infinite;
}

@keyframes divPulse {
  0%,100% { box-shadow: 0 0 10px #cc0000, 0 0 24px rgba(204,0,0,.35); }
  50%      { box-shadow: 0 0 18px #ff3300, 0 0 40px rgba(255,51,0,.55); }
}

/* ═══════════════════════════════════════
   RIGHT  ─  CONTENT
═══════════════════════════════════════ */
.content {
  position: absolute;
  left: 218px; right: 0; top: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 22px;
  z-index: 10;
}

/* ── ONLINE pill ── */
.online-pill {
  position: absolute;
  top: 13px; right: 16px;
  display: flex; align-items: center; gap: 7px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 9px; letter-spacing: 2.5px;
  color: #00ff55;
}

.online-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #00ff55;
  box-shadow: 0 0 6px #00ff55, 0 0 14px rgba(0,255,85,.5);
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%,100% { opacity:1; }
  50%      { opacity:.25; }
}

/* ── Logo row ── */
.logo-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 3px;
  line-height: 1;
}

.logo-pharm {
  font-family: 'Orbitron', sans-serif;
  font-size: 34px;
  font-weight: 900;
  color: #cc0000;
  letter-spacing: 2px;
  text-shadow: 0 0 18px rgba(204,0,0,.6), 0 0 40px rgba(204,0,0,.25);
}

.logo-vigilance {
  font-family: 'Orbitron', sans-serif;
  font-size: 34px;
  font-weight: 900;
  color: #f0f0f0;
  letter-spacing: 2px;
}

.logo-ai {
  font-family: 'Orbitron', sans-serif;
  font-size: 34px;
  font-weight: 900;
  color: #cc0000;
  letter-spacing: 2px;
  margin-left: 10px;
  text-shadow: 0 0 18px rgba(204,0,0,.6);
}

/* ── Subtitle ── */
.subtitle {
  font-size: 9px;
  letter-spacing: 4px;
  color: #aa2200;
  text-transform: uppercase;
  margin-bottom: 12px;
}

/* ── Stats row ── */
.stats {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.stat {
  display: flex;
  flex-direction: column;
  border: 1px solid #330000;
  padding: 4px 12px;
  min-width: 72px;
  background: rgba(30,0,0,.5);
  position: relative;
}

.stat::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 1px;
  background: linear-gradient(90deg, #cc0000, transparent);
  opacity: .5;
}

.stat-label {
  font-size: 7px;
  letter-spacing: 1.5px;
  color: #553333;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.stat-val {
  font-size: 16px;
  font-weight: bold;
  color: #cc0000;
  letter-spacing: .5px;
}

.stat.amber .stat-val  { color: #f5a623; }
.stat.amber            { border-color: #443300; }
.stat.amber::after     { background: linear-gradient(90deg, #f5a623, transparent); }

.stat.green .stat-val  { color: #00ff55; }
.stat.green            { border-color: #003311; }
.stat.green::after     { background: linear-gradient(90deg, #00ff55, transparent); }

/* ── Tech badges ── */
.badges {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.badge {
  font-size: 8px;
  letter-spacing: 1.2px;
  padding: 2px 9px;
  border: 1px solid #440000;
  color: #993333;
  text-transform: uppercase;
  background: rgba(68,0,0,.2);
}

/* ── Top border accent ── */
.top-line {
  position: absolute;
  top: 0; left: 205px; right: 0;
  height: 2px;
  background: linear-gradient(90deg, #cc0000 0%, rgba(204,0,0,.3) 60%, transparent 100%);
}

/* ── Bottom border accent ── */
.bottom-line {
  position: absolute;
  bottom: 0; left: 205px; right: 0;
  height: 1px;
  background: linear-gradient(90deg, #660000 0%, transparent 80%);
}

/* ── Corner marks ── */
.corner { position: absolute; width: 10px; height: 10px; z-index: 20; }
.c-tr { top:0; right:0; border-top:2px solid #cc0000; border-right:2px solid #cc0000; }
.c-br { bottom:0; right:0; border-bottom:2px solid #440000; border-right:2px solid #440000; }

/* ── Tagline ticker ── */
.ticker {
  position: absolute;
  bottom: 7px;
  right: 16px;
  font-size: 8px;
  color: #441111;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
</style>
</head>
<body>

<div class="banner">

  <!-- Neural brain — left zone -->
  <div class="brain-zone">
    <div class="brain-glow"></div>
    <canvas id="brainCanvas" width="210" height="170"></canvas>
  </div>

  <!-- Divider -->
  <div class="divider"></div>

  <!-- Top / bottom lines -->
  <div class="top-line"></div>
  <div class="bottom-line"></div>

  <!-- Corners -->
  <div class="corner c-tr"></div>
  <div class="corner c-br"></div>

  <!-- ONLINE pill -->
  <div class="online-pill">
    <div class="online-dot"></div>
    ONLINE
  </div>

  <!-- Main content -->
  <div class="content">

    <div class="logo-row">
      <span class="logo-pharm">PHARM</span>
      <span class="logo-vigilance">VIGILANCE</span>
      <span class="logo-ai">AI</span>
    </div>

    <div class="subtitle">Advanced Drug Reaction Intelligence Platform</div>

    <div class="stats">
      <div class="stat">
        <span class="stat-label">ROC-AUC</span>
        <span class="stat-val">0.912</span>
      </div>
      <div class="stat amber">
        <span class="stat-label">Accuracy</span>
        <span class="stat-val">83.2%</span>
      </div>
      <div class="stat amber">
        <span class="stat-label">Samples</span>
        <span class="stat-val">3,000</span>
      </div>
      <div class="stat green">
        <span class="stat-label">Status</span>
        <span class="stat-val">ONLINE</span>
      </div>
    </div>

    <div class="badges">
      <span class="badge">Python 3.10</span>
      <span class="badge">Flask</span>
      <span class="badge">scikit-learn</span>
      <span class="badge">Chart.js</span>
      <span class="badge">REST API</span>
    </div>

  </div>

  <!-- Ticker bottom right -->
  <div class="ticker">Predict Adverse Reactions Before They Happen</div>

</div>

<script>
(function () {
  const canvas = document.getElementById('brainCanvas');
  const ctx    = canvas.getContext('2d');
  const W = 210, H = 170;

  // Hand-placed nodes in a brain silhouette shape
  const RAW = [
    [105,82],[90,72],[120,72],[78,88],[132,88],
    [100,98],[115,95],[88,60],[122,60],
    [78,50],[132,50],[68,65],[142,65],
    [96,44],[114,44],
    [70,100],[140,100],[75,115],[135,115],
    [95,118],[115,118],[105,130],
    [62,80],[148,80],[85,135],[125,135],
    [105,55],
  ];

  const nodes = RAW.map(([bx, by]) => ({
    bx, by,
    x: bx, y: by,
    r: 2 + Math.random() * 1.8,
    phase: Math.random() * Math.PI * 2,
    speed: 0.018 + Math.random() * 0.022,
    ax: (Math.random() - .5) * 3.5,
    ay: (Math.random() - .5) * 2.8,
    lit: 0,
  }));

  const THRESH = 58;
  const edges = [];
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = RAW[i][0] - RAW[j][0];
      const dy = RAW[i][1] - RAW[j][1];
      if (Math.sqrt(dx*dx + dy*dy) < THRESH)
        edges.push({ i, j });
    }

  let signals = [];
  let tick = 0;

  function spawnSignal() {
    const e = edges[Math.floor(Math.random() * edges.length)];
    signals.push({ e, t: 0, spd: .014 + Math.random() * .018, fwd: Math.random() > .5 });
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createRadialGradient(105, 90, 5, 105, 90, 110);
    bg.addColorStop(0,  'rgba(25,3,3,.95)');
    bg.addColorStop(.6, 'rgba(10,0,0,.98)');
    bg.addColorStop(1,  'rgba(0,0,0,1)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    tick++;

    nodes.forEach(n => {
      n.phase += n.speed;
      n.x = n.bx + Math.sin(n.phase)       * n.ax;
      n.y = n.by + Math.cos(n.phase * 1.3) * n.ay;
      if (n.lit > 0) n.lit--;
    });

    edges.forEach(({ i, j }) => {
      const a = nodes[i], b = nodes[j];
      const litLevel = Math.max(a.lit, b.lit);
      const alpha = litLevel > 0
        ? .12 + .22 * (litLevel / 20)
        : .07 + .06 * Math.abs(Math.sin(tick * .012 + i));

      const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      g.addColorStop(0,  `rgba(180,10,0,${alpha})`);
      g.addColorStop(.5, `rgba(220,30,0,${alpha * 1.4})`);
      g.addColorStop(1,  `rgba(180,10,0,${alpha})`);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = g;
      ctx.lineWidth = litLevel > 0 ? 1.2 : 0.7;
      ctx.stroke();
    });

    signals = signals.filter(s => {
      const a = nodes[s.e.i], b = nodes[s.e.j];
      const t = s.fwd ? s.t : 1 - s.t;
      const px = a.x + (b.x - a.x) * t;
      const py = a.y + (b.y - a.y) * t;

      const sg = ctx.createRadialGradient(px, py, 0, px, py, 9);
      sg.addColorStop(0,  'rgba(255,100,0,.95)');
      sg.addColorStop(.35,'rgba(200,20,0,.5)');
      sg.addColorStop(1,  'transparent');
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#ff9944';
      ctx.fill();

      if (s.t > .88) {
        const dest = s.fwd ? nodes[s.e.j] : nodes[s.e.i];
        dest.lit = 20;
      }

      s.t += s.spd;
      return s.t < 1.05;
    });

    nodes.forEach(n => {
      const isLit = n.lit > 0;
      const alpha = n.lit / 20;

      if (isLit) {
        const og = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 12);
        og.addColorStop(0, `rgba(255,120,0,${.7 * alpha})`);
        og.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = og;
        ctx.fill();
      }

      const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r + 3);
      ng.addColorStop(0,  isLit ? 'rgba(255,140,40,1)'  : 'rgba(200,30,0,1)');
      ng.addColorStop(.5, isLit ? 'rgba(200,60,0,.5)'   : 'rgba(150,10,0,.4)');
      ng.addColorStop(1,  'transparent');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
      ctx.fillStyle = ng;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = isLit ? '#ffaa44' : '#dd2200';
      ctx.fill();
    });

    if (tick % 32 === 0)  spawnSignal();
    if (tick % 32 === 16) spawnSignal();
    if (tick % 80 === 0)  spawnSignal();

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
</script>

</body>
</html>

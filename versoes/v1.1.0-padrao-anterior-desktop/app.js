(function () {
  const root = document.documentElement;
  const statusLabel = document.getElementById("theme-status-label");
  const canvas = document.getElementById("glass-toggle-header");

  // =========================================================================
  // 1. CROSSFADE ÓPTICO SUAVE DE FONTES DISPLAY (PLUS JAKARTA SANS <-> SYNE)
  // =========================================================================
  const displayElements = document.querySelectorAll(
    ".brand-name, .hero-title, .section-title, .case-title, .subsection-title, .matrix-heading, .footer-title"
  );

  function setupFontCrossfade() {
    displayElements.forEach((el) => {
      if (el.classList.contains("font-morph-host")) return;
      const text = el.textContent.trim();
      el.classList.add("font-morph-host");
      el.textContent = "";

      const darkSpan = document.createElement("span");
      darkSpan.className = "font-layer-dark";
      darkSpan.textContent = text;

      const lightSpan = document.createElement("span");
      lightSpan.className = "font-layer-light";
      lightSpan.setAttribute("aria-hidden", "true");
      lightSpan.textContent = text;

      el.appendChild(darkSpan);
      el.appendChild(lightSpan);
    });
  }

  function updateDisplayElementText(el, newText) {
    if (!el) return;
    const darkSpan = el.querySelector(".font-layer-dark");
    const lightSpan = el.querySelector(".font-layer-light");
    if (darkSpan && lightSpan) {
      darkSpan.textContent = newText;
      lightSpan.textContent = newText;
    } else {
      el.textContent = newText;
    }
  }

  setupFontCrossfade();

  // =========================================================================
  // 2. PALETAS DO SITE (DARK TERMINAL PADRÃO <-> EDITORIAL CLARO)
  // =========================================================================
  const THEME_DARK = {
    // Opção 3 · Dark Terminal de Precisão (p = 0, PADRÃO)
    fundo: [14, 14, 16],           // #0E0E10
    superficie: [21, 21, 24],      // #151518
    superficieForte: [29, 29, 34], // #1D1D22
    painelCodigo: [9, 9, 11],      // #09090B
    texto: [236, 236, 239],        // #ECECEF
    suave: [160, 160, 171],        // #A0A0AB
    acento: [217, 119, 6],         // #D97706
    acentoHover: [180, 83, 9],     // #B45309
    acentoTinta: [14, 14, 16],     // #0E0E10
    borda: [38, 38, 43],           // #26262B
    bordaForte: [217, 119, 6],     // #D97706
    statusAtivoBg: [46, 33, 18],   // #2E2112
    statusAtivoTxt: [251, 191, 36],// #FBBF24
    statusProgBg: [31, 31, 36],    // #1F1F24
    statusProgTxt: [196, 196, 204] // #C4C4CC
  };

  const THEME_LIGHT = {
    // Opção 1 · Editorial Suíço & Engenharia (p = 1)
    fundo: [245, 244, 240],          // #F5F4F0
    superficie: [236, 234, 227],     // #ECEAE3
    superficieForte: [227, 224, 214],// #E3E0D6
    painelCodigo: [22, 22, 24],      // #161618
    texto: [20, 20, 19],             // #141413
    suave: [82, 81, 77],             // #52514D
    acento: [29, 78, 216],           // #1D4ED8
    acentoHover: [30, 64, 175],      // #1E40AF
    acentoTinta: [255, 255, 255],    // #FFFFFF
    borda: [213, 210, 200],          // #D5D2C8
    bordaForte: [20, 20, 19],        // #141413
    statusAtivoBg: [220, 230, 253],  // #DCE6FD
    statusAtivoTxt: [30, 58, 138],   // #1E3A8A
    statusProgBg: [229, 227, 220],   // #E5E3DC
    statusProgTxt: [63, 62, 58]      // #3F3E3A
  };

  const smooth = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function mix(a, b, t) {
    return a + (b - a) * t;
  }

  function mixRGB(c1, c2, t) {
    const r = Math.round(mix(c1[0], c2[0], t));
    const g = Math.round(mix(c1[1], c2[1], t));
    const b = Math.round(mix(c1[2], c2[2], t));
    return `rgb(${r}, ${g}, ${b})`;
  }

  const params = new URLSearchParams(window.location.search);
  const urlDir = params.get("dir");
  let blueprintLocked = urlDir === "blueprint";

  function applyPageTheme(theme) {
    if (blueprintLocked) {
      root.setAttribute("data-direction", "blueprint");
      if (statusLabel) {
        statusLabel.textContent = "OPÇÃO 02 // BLUEPRINT DADOS";
      }
      return;
    }

    const isLight = theme > 0.5;
    root.setAttribute("data-direction", isLight ? "editorial" : "terminal");

    // Transição de tinta com contraste preservado no meio do arraste
    const inkT = isLight
      ? smooth(0.5, 0.68, theme)
      : smooth(0.32, 0.5, theme) * 0.25;

    // Crossfade óptico suave entre as duas famílias tipográficas de display
    const fontMorph = easeIO(smooth(0.12, 0.88, theme));
    const style = root.style;
    style.setProperty("--morph-dark-opacity", (1 - fontMorph).toFixed(3));
    style.setProperty("--morph-light-opacity", fontMorph.toFixed(3));
    style.setProperty("--morph-dark-y", `${(-2.5 * fontMorph).toFixed(2)}px`);
    style.setProperty("--morph-light-y", `${(2.5 * (1 - fontMorph)).toFixed(2)}px`);

    style.setProperty("--cor-fundo", mixRGB(THEME_DARK.fundo, THEME_LIGHT.fundo, theme));
    style.setProperty("--cor-superficie", mixRGB(THEME_DARK.superficie, THEME_LIGHT.superficie, theme));
    style.setProperty("--cor-superficie-forte", mixRGB(THEME_DARK.superficieForte, THEME_LIGHT.superficieForte, theme));
    style.setProperty("--cor-painel-codigo", mixRGB(THEME_DARK.painelCodigo, THEME_LIGHT.painelCodigo, theme));
    style.setProperty("--cor-texto", mixRGB(THEME_DARK.texto, THEME_LIGHT.texto, inkT));
    style.setProperty("--cor-suave", mixRGB(THEME_DARK.suave, THEME_LIGHT.suave, inkT));
    style.setProperty("--cor-acento", mixRGB(THEME_DARK.acento, THEME_LIGHT.acento, theme));
    style.setProperty("--cor-acento-hover", mixRGB(THEME_DARK.acentoHover, THEME_LIGHT.acentoHover, theme));
    style.setProperty("--cor-acento-tinta", mixRGB(THEME_DARK.acentoTinta, THEME_LIGHT.acentoTinta, theme));
    style.setProperty("--cor-borda", mixRGB(THEME_DARK.borda, THEME_LIGHT.borda, theme));
    style.setProperty("--cor-borda-forte", mixRGB(THEME_DARK.bordaForte, THEME_LIGHT.bordaForte, theme));
    style.setProperty("--cor-status-ativo-bg", mixRGB(THEME_DARK.statusAtivoBg, THEME_LIGHT.statusAtivoBg, theme));
    style.setProperty("--cor-status-ativo-txt", mixRGB(THEME_DARK.statusAtivoTxt, THEME_LIGHT.statusAtivoTxt, theme));
    style.setProperty("--cor-status-prog-bg", mixRGB(THEME_DARK.statusProgBg, THEME_LIGHT.statusProgBg, theme));
    style.setProperty("--cor-status-prog-txt", mixRGB(THEME_DARK.statusProgTxt, THEME_LIGHT.statusProgTxt, theme));

    if (statusLabel) {
      statusLabel.textContent = isLight
        ? "TEMA: EDITORIAL CLARO (OPÇÃO 01)"
        : "TEMA: DARK TERMINAL (PADRÃO)";
    }
    if (canvas) {
      canvas.setAttribute("aria-checked", String(isLight));
    }
  }

  // =========================================================================
  // 3. MOTOR WEBGL2 + FÍSICA POR PIXEL FIEL AO MODELO DE REFERÊNCIA
  // (experiments.thisiswhitespace.com/standalone/glass-light-toggle/main.js)
  // =========================================================================
  if (canvas) {
    const gl = canvas.getContext("webgl2", { antialias: false, premultipliedAlpha: false });

    const TRACK = { w: 432, h: 224, r: 72 };
    const PAD = 13;
    const KNOB_HALF = (TRACK.h - PAD * 2) / 2; // 99
    const KNOB_R = 58;
    const GRID = 17, C0 = 8, PITCH = 5.7, PSIZE = 4.6;

    let dpr = 1, vw = 0, vh = 0, cx = 0, cy = 0, leftX = 0, rightX = 0, S = 1;
    const box = { x: 0, y: 0, w: TRACK.w + 120, h: TRACK.h + 120 };

    function buildMoon() {
      const out = [];
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const dx = x - C0, dy = y - C0;
          const inMain = dx * dx + dy * dy <= 6.6 * 6.6;
          const sx = x - 11.3, sy = y - 5.6;
          const inShadow = sx * sx + sy * sy <= 5.4 * 5.4;
          if (inMain && !inShadow) out.push({ x, y, b: 1, kind: "lit" });
          else if (inMain && inShadow && (x + y) % 2 === 0) out.push({ x, y, b: 0.2, kind: "earth" });
        }
      }
      for (const c of out) {
        if ((c.x === 3 && c.y === 9) || (c.x === 6 && c.y === 12) || (c.x === 4 && c.y === 12)) c.b = 0.5;
      }
      const stars = [
        [15, 1, 1], [14, 1, 0.45], [16, 1, 0.45], [15, 0, 0.45],
        [15, 2, 0.45], [11, 0, 0.75], [16, 5, 0.6]
      ];
      for (const [x, y, b] of stars) out.push({ x, y, b, kind: "star" });
      return out;
    }

    function buildSun() {
      const m = new Map();
      const add = (x, y, b, kind, ang = 0) => {
        const k = x + "," + y;
        if (!m.has(k)) m.set(k, { x, y, b, kind, ang });
      };
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const dx = x - C0, dy = y - C0;
          if (dx * dx + dy * dy <= 3.7 * 3.7) add(x, y, 1, "core");
        }
      }
      for (let a = 0; a < 8; a++) {
        const ang = (a * Math.PI) / 4;
        const rs = a % 2 ? [5.9, 7.2] : [5.6, 6.6, 7.6];
        for (const r of rs) {
          add(Math.round(C0 + Math.cos(ang) * r), Math.round(C0 + Math.sin(ang) * r), 1, "ray", ang);
        }
      }
      return [...m.values()];
    }

    const MOON = buildMoon();
    const SUN = buildSun();
    const angKey = (c) => {
      const a = Math.atan2(c.y - C0, c.x - C0);
      return ((a + Math.PI * 0.75 + Math.PI * 2) % (Math.PI * 2)) + Math.hypot(c.x - C0, c.y - C0) * 1e-3;
    };
    const rnd = (a, b) => a + Math.random() * (b - a);

    function pairUp() {
      const A = [...MOON].sort((p, q) => angKey(p) - angKey(q));
      const B = [...SUN].sort((p, q) => angKey(p) - angKey(q));
      const pairs = [];
      const big = A.length >= B.length ? A : B;
      const small = big === A ? B : A;
      let last = -1;
      for (let i = 0; i < big.length; i++) {
        const j = Math.floor((i * small.length) / big.length);
        const first = j !== last;
        last = j;
        const s = { ...small[j], b: first ? small[j].b : 0 };
        pairs.push(big === A ? [big[i], s] : [s, big[i]]);
      }
      return pairs.map(([a, b]) => {
        const lead = 1 - a.x / (GRID - 1);
        return {
          a,
          b,
          delay: 0.04 + lead * 0.26 + rnd(0, 0.06),
          curl: rnd(-1, 1) * 16 + (a.y - C0) * 0.9,
          lift: rnd(2, 12),
          k: rnd(260, 460),
          drag: rnd(0.004, 0.016),
          phase: rnd(0, Math.PI * 2),
          tw: rnd(1.5, 3.2),
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          inited: false
        };
      });
    }

    const PIX = pairUp();

    const pcan = document.createElement("canvas");
    const pctx = pcan.getContext("2d");
    const gcan = document.createElement("canvas");
    const gctx = gcan.getContext("2d");
    const HAS_FILTER =
      typeof gctx.filter === "string" && ((gctx.filter = "blur(1px)"), gctx.filter === "blur(1px)");
    gctx.filter = "none";

    const P = {
      path: "glass",
      moonColor: "#6f86ff",
      sunColor: "#ffa82e",
      intensity: 1.89,
      lightWidth: 0.92,
      orbit: true,
      trackIcons: false,
      refraction: 40,
      frost: 0.76,
      swirl: 1.62,
      burst: 0.38,
      glow: 0.64,
      stiffness: 129
    };

    const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

    function trackPoint(u) {
      const ins = 6.5, hx = TRACK.w / 2 - ins, hy = TRACK.h / 2 - ins, r = TRACK.r - ins;
      const a = hx - r, b = 2 * (hy - r), q = (Math.PI * r) / 2;
      const segs = [
        [a, (t) => [t, hy]],
        [q, (t) => { const th = Math.PI / 2 - t / r; return [a + r * Math.cos(th), hy - r + r * Math.sin(th)]; }],
        [b, (t) => [hx, hy - r - t]],
        [q, (t) => { const th = -t / r; return [a + r * Math.cos(th), -(hy - r) + r * Math.sin(th)]; }],
        [2 * a, (t) => [a - t, -hy]],
        [q, (t) => { const th = -Math.PI / 2 - t / r; return [-a + r * Math.cos(th), -(hy - r) + r * Math.sin(th)]; }],
        [b, (t) => [-hx, -(hy - r) + t]],
        [q, (t) => { const th = Math.PI - t / r; return [-a + r * Math.cos(th), hy - r + r * Math.sin(th)]; }],
        [a, (t) => [-a + t, hy]]
      ];
      const per = segs.reduce((s, [l]) => s + l, 0);
      u = ((u % per) + per) % per;
      for (const [l, fn] of segs) {
        if (u <= l) {
          const [x, y] = fn(u);
          return [cx + x, cy + y];
        }
        u -= l;
      }
      return [cx, cy + hy];
    }

    function trackPerimeter() {
      const ins = 6.5, hx = TRACK.w / 2 - ins, hy = TRACK.h / 2 - ins, r = TRACK.r - ins;
      return 4 * (hx - r) + 4 * (hy - r) + 2 * Math.PI * r;
    }

    // Tema Dark (p = 0, target = 0) é o padrão inicial
    const startLight = urlDir === "editorial" ? 1 : 0;
    const state = {
      p: startLight,
      v: 0,
      target: startLight,
      dragging: false,
      dragStartX: 0,
      dragStartP: startLight,
      moved: 0,
      lastX: 0,
      lastT: 0,
      dragV: 0,
      hover: 0,
      hoverT: 0,
      press: 0,
      pressT: 0,
      led: 1,
      kick: 0,
      dir: startLight ? -1 : 1,
      sp: startLight,
      spv: 0,
      pendingClick: false
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = Math.max(80, rect.width || 132);
      vh = Math.max(44, rect.height || 70);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      cx = vw / 2;
      cy = vh / 2;
      // Escala no espaço de design (432x224 com margem para halo e sombra)
      S = Math.min(vw / (TRACK.w + 92), vh / (TRACK.h + 84));
      const inner = TRACK.w / 2 - PAD - KNOB_HALF;
      leftX = cx - inner;
      rightX = cx + inner;
      box.x = cx - box.w / 2;
      box.y = cy - box.h / 2;
      pcan.width = Math.round(box.w * dpr);
      pcan.height = Math.round(box.h * dpr);
      gcan.width = Math.round((box.w * dpr) / 2);
      gcan.height = Math.round((box.h * dpr) / 2);
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    }

    if (gl) {
      const VS = `#version 300 es
      in vec2 a;
      void main(){ gl_Position = vec4(a,0.,1.); }`;

      const FS = `#version 300 es
      precision highp float;
      out vec4 o;
      uniform vec2 uRes;
      uniform float uDpr;
      uniform float uScale;
      uniform vec2 uC;
      uniform vec2 uTH;
      uniform float uTR;
      uniform vec2 uK;
      uniform vec2 uKH;
      uniform float uKR;
      uniform float uTheme, uTime, uLed, uLift;
      uniform vec4 uBox;
      uniform sampler2D uPix, uGlow;
      uniform vec3 uLight;
      uniform float uTheta, uHalfW, uRefract, uFrost, uGlowAmt, uMode, uStripLen;
      uniform vec2 uStrip;
      #define AMBER uLight
      float gPixA = 0.;

      vec3 glow(vec3 col, float amt){
        vec3 dark = col + uLight * amt;
        vec3 lit = mix(col, uLight * 1.04 + 0.03, clamp(1. - exp(-amt * 1.3), 0., 0.88));
        return mix(dark, lit, uTheme);
      }
      float sdRB(vec2 p, vec2 b, float r){
        vec2 q = abs(p) - b + r;
        return length(max(q,0.)) + min(max(q.x,q.y),0.) - r;
      }
      float hash(vec2 p){
        p = fract(p*vec2(443.897,441.423));
        p += dot(p, p.yx+19.19);
        return fract((p.x+p.y)*p.x);
      }
      float tex(sampler2D s, vec2 p){
        vec2 uv = (p - uBox.xy) / uBox.zw;
        if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) return 0.;
        return texture(s, uv).a;
      }
      float ledSd(vec2 p){
        if (uMode > 0.5) {
          float rad = sdRB(p - uC, uTH, uTR) + 6.5;
          float tang = max(length(p - uStrip) - uStripLen, 0.);
          return length(vec2(rad, tang)) - 1.5;
        }
        vec2 q = p - uK;
        float sk = sdRB(q, uKH, uKR);
        float a = atan(q.y, q.x);
        float da = abs(atan(sin(a - uTheta), cos(a - uTheta)));
        float tang = max(da - uHalfW, 0.) * 104.;
        float rad = sk - 6.5;
        return length(vec2(rad, tang)) - 1.5;
      }
      float ledFloor(vec2 p){
        float ls = max(ledSd(p), 0.);
        return (exp(-ls/14.)*0.85 + exp(-ls/55.)*0.32) * uLed;
      }
      vec3 floorScene(vec2 p, float frost, vec2 ca){
        float th = uTheme;
        vec3 base = mix(vec3(0.030), vec3(0.900), th);
        base *= 1. + (p.y - uC.y)/uTH.y * mix(0.05, 0.012, th);
        float sOff = sdRB(p - uC - vec2(0., 7.), uTH, uTR);
        float inner = smoothstep(-14., 3., sOff);
        base = mix(base * (1. - inner*0.6), base - inner*0.085, th);
        float g = ledFloor(p);
        base = glow(base, g*0.55);
        vec3 a;
        a.r = mix(tex(uPix, p - ca), tex(uGlow, p - ca)*1.35, frost);
        a.g = mix(tex(uPix, p     ), tex(uGlow, p     )*1.35, frost);
        a.b = mix(tex(uPix, p + ca), tex(uGlow, p + ca)*1.35, frost);
        float lum = dot(base, vec3(0.299, 0.587, 0.114));
        float inkT = smoothstep(0.40, 0.56, lum);
        vec3 pc = mix(vec3(1.0, 0.965, 0.925), vec3(0.11, 0.105, 0.10), inkT);
        pc = mix(pc + AMBER*g*0.9, pc + vec3(0.25,0.08,0.0)*g, th);
        gPixA = clamp(a.g, 0., 1.);
        vec3 col = mix(base, pc, clamp(a, 0., 1.));
        col += vec3(1.0, 0.78, 0.55) * tex(uGlow, p) * uGlowAmt * (1. - th);
        return col;
      }
      void main(){
        vec2 praw = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
        vec2 p = uC + (praw - uC) / uScale;
        float th = uTheme;
        // Superfície externa idêntica ao fundo do cabeçalho (#0E0E10 dark <-> #F5F4F0 light)
        vec3 dBg = vec3(14.0/255.0, 14.0/255.0, 16.0/255.0);
        vec3 lBg = vec3(245.0/255.0, 244.0/255.0, 240.0/255.0);
        vec3 baseBg = mix(dBg, lBg, th);
        vec3 col = baseBg;
        float st = sdRB(p - uC, uTH, uTR);
        if (st < 2.) {
          vec3 tc = floorScene(p, 0., vec2(0.));
          float sk0 = sdRB(p - uK - vec2(0., 7. + uLift*5.), uKH, uKR);
          float ksh = 1. - smoothstep(-8., 20. + uLift*8., sk0);
          tc *= 1. - ksh * mix(0.6, 0.2, th);
          float rim = 1. - smoothstep(0., 1.3, abs(st + 0.75));
          float bottom = smoothstep(-uTH.y*0.6, uTH.y, p.y - uC.y);
          tc += rim * mix(mix(0.035, 0.09, bottom), mix(-0.07, 0.07, bottom), th);
          col = mix(tc, col, smoothstep(-0.6, 0.6, st));
        }
        float sk = sdRB(p - uK, uKH, uKR);
        if (sk < 2.) {
          vec2 e = vec2(0.5, 0.);
          vec2 n = vec2(
            sdRB(p + e.xy - uK, uKH, uKR) - sdRB(p - e.xy - uK, uKH, uKR),
            sdRB(p + e.yx - uK, uKH, uKR) - sdRB(p - e.yx - uK, uKH, uKR)
          );
          n = n / max(length(n), 1e-4);
          float d = max(-sk, 0.);
          float t = clamp(d / 26., 0., 1.);
          float slope = pow(1. - t, 2.6);
          vec2 off = -n * slope * uRefract - (p - uK) * 0.055;
          float frost = 0.06 + uFrost * slope;
          vec3 g = floorScene(p + off, frost, n * slope * 3.2 + (p - uK) * 0.006);
          float vy = clamp((p.y - (uK.y - uKH.y)) / (2. * uKH.y), 0., 1.);
          vec3 dGlass = g * 0.84 + vec3(0.135) * (1. - vy * 0.55);
          vec3 lGlass = mix(g, vec3(0.99), 0.5 * (1. - gPixA * 0.8));
          vec3 kc = mix(dGlass, lGlass, th);
          float lq = max(ledSd(p), 0.);
          float sc = (exp(-lq / 24.) * 0.8 + exp(-lq / 64.) * 0.2) * uLed;
          kc = glow(kc, sc * 0.8);
          float rg = exp(-d / 2.2) * exp(-lq / 40.) * uLed;
          kc = glow(kc, rg * 1.3);
          vec2 Ld = normalize(vec2(-0.35, -1.0));
          float ndl = dot(n, Ld);
          kc += pow(max(ndl, 0.), 2.) * exp(-d / 1.25) * mix(0.42, 0.7, th);
          kc += max(ndl, 0.) * slope * mix(0.07, 0.16, th);
          kc *= 1. - max(-ndl, 0.) * slope * mix(0.28, 0.07, th);
          kc += exp(-d / 0.7) * mix(0.07, 0.12, th);
          col = mix(kc, col, smoothstep(-0.7, 0.7, sk));
        }
        float lsd = ledSd(p);
        float lm = 1. - smoothstep(-0.6, 0.6, lsd);
        vec3 lc = mix(uLight * 1.05, mix(uLight, vec3(1.0), 0.65), smoothstep(-0.2, -1.4, lsd));
        col = mix(col, lc * (0.8 + 0.35 * uLed), lm);
        float ledHaloMask = smoothstep(20.0, 0.0, max(lsd, 0.)) * smoothstep(28.0, 2.0, st);
        col = glow(col, exp(-max(lsd, 0.) / 4.5) * 0.55 * uLed * (1. - lm) * ledHaloMask);
        float insideMask = smoothstep(0.6, -0.6, min(st, sk));
        col += (hash(gl_FragCoord.xy + fract(uTime) * 91.7) - 0.5) * 0.014 * insideMask;
        o = vec4(clamp(col, 0., 1.), 1.);
      }`;

      function sh(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
        return s;
      }

      const prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aLoc = gl.getAttribLocation(prog, "a");
      gl.enableVertexAttribArray(aLoc);
      gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

      const U = {};
      for (const n of [
        "uScale", "uMode", "uStrip", "uStripLen", "uLight", "uTheta", "uHalfW",
        "uRefract", "uFrost", "uGlowAmt", "uRes", "uDpr", "uC", "uTH", "uTR",
        "uK", "uKH", "uKR", "uTheme", "uTime", "uLed", "uLift", "uBox", "uPix", "uGlow"
      ]) {
        U[n] = gl.getUniformLocation(prog, n);
      }

      function mkTex(unit) {
        const t = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return t;
      }

      const texPix = mkTex(0);
      const texGlow = mkTex(1);
      gl.uniform1i(U.uPix, 0);
      gl.uniform1i(U.uGlow, 1);

      function pixelTarget(px, p, time, kx) {
        const t = Math.min(1, Math.max(0, (p - px.delay) / 0.62));
        const e = easeIO(t);
        const ox = (px.a.x - C0) * PITCH, oy = (px.a.y - C0) * PITCH;
        const tx = (px.b.x - C0) * PITCH, ty = (px.b.y - C0) * PITCH;
        const dx = tx - ox, dy = ty - oy, len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len;
        const arc = Math.sin(Math.PI * e);
        let x = ox + dx * e + nx * px.curl * P.swirl * arc;
        let y = oy + dy * e + ny * px.curl * P.swirl * arc;
        const r = Math.hypot(x, y) || 1;
        x += (x / r) * px.lift * arc * 1.4 * P.burst;
        y += (y / r) * px.lift * arc * 1.4 * P.burst;
        let ba = px.a.b, bb = px.b.b;
        if (px.a.kind === "star") ba *= 0.45 + 0.55 * Math.pow(Math.sin(time * px.tw + px.phase), 2);
        if (px.b.kind === "ray") bb *= 0.78 + 0.22 * (0.5 + 0.5 * Math.sin(time * 2.2 - px.b.ang));
        const bright = (ba + (bb - ba) * e) * (1 + 0.3 * arc);
        const size = PSIZE * (1 - 0.45 * arc);
        return { x: kx + x, y: cy + y, bright, size };
      }

      let lastT = performance.now();

      function frame(now) {
        const dt = Math.min(1 / 30, (now - lastT) / 1000);
        lastT = now;
        const time = now / 1000;
        const s = state;

        // Mola do bloco de vidro (4 sub-passos por frame)
        if (!s.dragging) {
          const k = P.stiffness, c = 2 * Math.sqrt(k) * 0.6;
          const steps = 4, h = dt / steps;
          for (let i = 0; i < steps; i++) {
            const a = -k * (s.p - s.target) - c * s.v;
            s.v += a * h;
            s.p += s.v * h;
          }
        }

        s.hover += (s.hoverT - s.hover) * Math.min(1, dt * 10);
        s.press += (s.pressT - s.press) * Math.min(1, dt * 18);
        s.kick *= Math.exp(-dt * 3.5);
        s.led = 1 + s.hover * 0.08 + Math.min(Math.abs(s.v) * 0.05, 0.18) + s.kick * 0.12;

        // Física de deformação do bloco por velocidade (stretch) e compressão nos cantos (over)
        const pc = Math.min(1, Math.max(0, s.p));
        const over = Math.max(-s.p, s.p - 1, 0);
        const speed = Math.abs(s.v);
        const stretch = Math.min(speed * 6.5, 16);
        let khx = KNOB_HALF + stretch - over * 110;
        let khy = Math.min(KNOB_HALF - stretch * 0.45 + over * 30, KNOB_HALF + 5);
        const squeeze = 1 - s.press * 0.035;
        khx *= squeeze;
        khy *= squeeze;

        let kx = leftX + (rightX - leftX) * pc;
        if (s.p > 1) kx += over * 110;
        else if (s.p < 0) kx -= over * 110;

        const theme = smooth(0.18, 0.82, pc);
        applyPageTheme(theme);

        // Órbita da barra de LED (base exata +PI/2 no Dark -> direita -> topo exato -PI/2 no Light -> esquerda -> base)
        {
          const goal = easeIO(pc), k = 70, c = 2 * Math.sqrt(k);
          s.spv += (-k * (s.sp - goal) - c * s.spv) * dt;
          s.sp += s.spv * dt;
        }
        const sp = Math.min(1, Math.max(0, s.sp));
        if (sp < 0.015) s.dir = 1;
        else if (sp > 0.985) s.dir = -1;
        const HALF = Math.PI / 2;
        let theta = s.dir > 0 ? HALF - Math.PI * sp : -HALF - Math.PI * (1 - sp);
        if (!P.orbit) theta = HALF;

        const cm = hex(P.moonColor), cs = hex(P.sunColor);

        let strip = [kx, cy + TRACK.h / 2];
        {
          const ins = 6.5, hx = TRACK.w / 2 - ins, hy = TRACK.h / 2 - ins, r = TRACK.r - ins;
          const a = hx - r, b = 2 * (hy - r), q = (Math.PI * r) / 2;
          const u0 = 0;
          const u1 = a + q + b + q + a;
          const per = trackPerimeter();
          let u = s.dir > 0 ? u0 + (u1 - u0) * sp : u1 + (per - u1) * (1 - sp);
          if (!P.orbit) u = kx - cx;
          strip = trackPoint(u);
        }

        // Física individual de cada pixel + arraste orgânico proporcional à velocidade do bloco (kvx)
        const kvx = s.v * (rightX - leftX);
        for (const px of PIX) {
          const tg = pixelTarget(px, pc, time, 0);
          const rx = tg.x, ry = tg.y - cy;
          if (!px.inited) {
            px.x = rx;
            px.y = ry;
            px.vx = 0;
            px.vy = 0;
            px.inited = true;
          }
          const kk = px.k, cc = 2 * Math.sqrt(kk) * 0.72;
          px.vx += (-kk * (px.x - rx) - cc * px.vx) * dt;
          px.vy += (-kk * (px.y - ry) - cc * px.vy) * dt;
          px.x += px.vx * dt;
          px.y += px.vy * dt;
          const drag = Math.max(-14, Math.min(14, -kvx * px.drag));
          px.sx = kx + px.x + drag;
          px.sy = cy + px.y;
          px.bright = tg.bright;
          px.size = tg.size;
        }

        // Rasterização dos pixels na textura offscreen
        pctx.setTransform(1, 0, 0, 1, 0, 0);
        pctx.clearRect(0, 0, pcan.width, pcan.height);
        pctx.setTransform(dpr, 0, 0, dpr, -box.x * dpr, -box.y * dpr);
        pctx.fillStyle = "#fff";
        pctx.globalCompositeOperation = "source-over";
        for (const px of PIX) {
          if (px.bright <= 0.002) continue;
          pctx.globalAlpha = Math.min(1, px.bright);
          const sz = px.size;
          pctx.fillRect(px.sx - sz / 2, px.sy - sz / 2, sz, sz);
        }

        gctx.setTransform(1, 0, 0, 1, 0, 0);
        gctx.clearRect(0, 0, gcan.width, gcan.height);
        if (HAS_FILTER) {
          gctx.filter = `blur(${(4 * dpr) / 2}px)`;
          gctx.drawImage(pcan, 0, 0, gcan.width, gcan.height);
          gctx.filter = "none";
        } else {
          const r = (3 * dpr) / 2;
          for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            gctx.globalAlpha = 0.16;
            gctx.drawImage(pcan, Math.cos(a) * r, Math.sin(a) * r, gcan.width, gcan.height);
          }
          gctx.globalAlpha = 1;
        }
        pctx.globalAlpha = 1;

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texPix);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pcan);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texGlow);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, gcan);

        gl.uniform2f(U.uRes, canvas.width, canvas.height);
        gl.uniform1f(U.uDpr, dpr);
        gl.uniform1f(U.uScale, S);
        gl.uniform2f(U.uC, cx, cy);
        gl.uniform2f(U.uTH, TRACK.w / 2, TRACK.h / 2);
        gl.uniform1f(U.uTR, TRACK.r);
        gl.uniform2f(U.uK, kx, cy);
        gl.uniform2f(U.uKH, khx, khy);
        gl.uniform1f(U.uKR, Math.min(KNOB_R, khx - 1, khy - 1));
        gl.uniform1f(U.uTheme, theme);
        gl.uniform1f(U.uTime, time);
        gl.uniform1f(U.uLed, s.led * P.intensity);
        gl.uniform3f(
          U.uLight,
          cm[0] + (cs[0] - cm[0]) * theme,
          cm[1] + (cs[1] - cm[1]) * theme,
          cm[2] + (cs[2] - cm[2]) * theme
        );
        gl.uniform1f(U.uTheta, theta);
        gl.uniform1f(U.uHalfW, P.lightWidth);
        gl.uniform1f(U.uMode, P.path === "track" ? 1 : 0);
        gl.uniform2f(U.uStrip, strip[0], strip[1]);
        gl.uniform1f(U.uStripLen, P.lightWidth * 130);
        gl.uniform1f(U.uRefract, P.refraction);
        gl.uniform1f(U.uFrost, P.frost);
        gl.uniform1f(U.uGlowAmt, P.glow);
        gl.uniform1f(U.uLift, s.hover * (1 - s.press));
        gl.uniform4f(U.uBox, box.x, box.y, box.w, box.h);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
        requestAnimationFrame(frame);
      }

      function inRoundRect(x, y, hx0, hy0, hw, hh, r) {
        const qx = Math.abs(x - hx0) - hw + r, qy = Math.abs(y - hy0) - hh + r;
        return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r <= 0;
      }

      const overTrack = (x, y) => inRoundRect(x, y, cx, cy, TRACK.w / 2, TRACK.h / 2, TRACK.r);
      const knobX = () => leftX + (rightX - leftX) * Math.min(1, Math.max(0, state.p));
      const overKnob = (x, y) => inRoundRect(x, y, knobX(), cy, KNOB_HALF, KNOB_HALF, KNOB_R);

      function toggle() {
        blueprintLocked = false;
        state.target = state.target > 0.5 ? 0 : 1;
        state.kick = 1;
      }

      const toD = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        const lx = clientX - rect.left;
        const ly = clientY - rect.top;
        return [cx + (lx - cx) / S, cy + (ly - cy) / S];
      };

      canvas.addEventListener("pointermove", (e) => {
        const s = state;
        const ot = overTrack(...toD(e.clientX, e.clientY));
        canvas.style.cursor = s.dragging ? "grabbing" : ot ? "pointer" : "default";
        s.hoverT = ot && e.pointerType === "mouse" ? 1 : 0;
        if (!s.dragging) return;
        const dx = (e.clientX - s.dragStartX) / S;
        s.moved = Math.max(s.moved, Math.abs(dx) * S);
        let p = s.dragStartP + dx / (rightX - leftX);
        if (p > 1) p = 1 + (p - 1) * 0.22;
        if (p < 0) p = p * 0.22;
        const t = performance.now();
        const ddt = Math.max(1, t - s.lastT) / 1000;
        s.dragV = s.dragV * 0.6 + ((p - s.p) / ddt) * 0.4;
        s.v = s.dragV;
        s.p = p;
        s.lastT = t;
      });

      canvas.addEventListener("pointerdown", (e) => {
        if (!overTrack(...toD(e.clientX, e.clientY))) return;
        blueprintLocked = false;
        const s = state;
        canvas.setPointerCapture(e.pointerId);
        s.pressT = 1;
        s.moved = 0;
        if (overKnob(...toD(e.clientX, e.clientY))) {
          s.dragging = true;
          s.dragStartX = e.clientX;
          s.dragStartP = s.p;
          s.lastT = performance.now();
          s.dragV = 0;
        } else {
          s.pendingClick = true;
        }
      });

      function release() {
        const s = state;
        s.pressT = 0;
        if (s.dragging) {
          s.dragging = false;
          if (s.moved < 4) toggle();
          else {
            s.target = s.p + s.dragV * 0.15 > 0.5 ? 1 : 0;
            s.kick = 0.6;
          }
        } else if (s.pendingClick) {
          toggle();
        }
        s.pendingClick = false;
      }

      canvas.addEventListener("pointerup", release);
      canvas.addEventListener("pointercancel", release);
      canvas.addEventListener("pointerleave", () => {
        state.hoverT = 0;
      });

      canvas.addEventListener("keydown", (e) => {
        if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowLeft" || e.code === "ArrowRight") {
          e.preventDefault();
          toggle();
        }
      });

      window.addEventListener("resize", () => {
        resize();
        for (const px of PIX) px.inited = false;
      });

      resize();
      requestAnimationFrame(frame);
    }
  }

  // =========================================================================
  // 4. CONTROLE DO SELETOR DE LENTE TÉCNICA (VISÃO COMPLETA / BACK-END / DADOS)
  // =========================================================================
  const lensButtons = document.querySelectorAll("[data-lens-target]");
  const domainBlocks = document.querySelectorAll("[data-domain]");
  const heroHeadline = document.getElementById("hero-headline");

  const lensCopy = {
    all: "Engenharia de software back-end, sistemas web e análise de dados estruturados",
    backend: "Engenharia de software back-end e full-stack com Python/Django, TypeScript/Node.js e Clean Architecture",
    data: "Análise de dados, modelagem relacional em SQL, automação Python e Business Intelligence com Power BI"
  };

  function applyLens(lens) {
    root.setAttribute("data-lens", lens);

    lensButtons.forEach((btn) => {
      const isMatch = btn.getAttribute("data-lens-target") === lens;
      btn.classList.toggle("is-active", isMatch);
      btn.setAttribute("aria-pressed", String(isMatch));
    });

    if (heroHeadline && lensCopy[lens]) {
      updateDisplayElementText(heroHeadline, lensCopy[lens]);
    }

    domainBlocks.forEach((el) => {
      if (lens === "all") {
        el.classList.remove("is-dimmed-by-lens");
        return;
      }
      const domains = (el.getAttribute("data-domain") || "").split(/\s+/);
      const shouldShow = domains.includes(lens);
      el.classList.toggle("is-dimmed-by-lens", !shouldShow);
    });
  }

  lensButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLens(btn.getAttribute("data-lens-target"));
    });
  });

  // =========================================================================
  // 5. CONTROLE DAS ABAS DE INSPEÇÃO DE CÓDIGO / ARQUITETURA / SQL
  // =========================================================================
  const tabButtons = document.querySelectorAll("[data-tab-group]");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.getAttribute("data-tab-group");
      const targetId = btn.getAttribute("data-tab-target");

      const groupButtons = document.querySelectorAll(`[data-tab-group="${group}"]`);
      groupButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });

      const container = btn.closest(".artifact-window");
      if (!container) return;

      const panels = container.querySelectorAll(".artifact-panel");
      panels.forEach((panel) => {
        const isTarget = panel.id === targetId;
        panel.classList.toggle("is-active", isTarget);
        panel.hidden = !isTarget;
      });
    });
  });

  // =========================================================================
  // 6. BOTÃO DE COPIAR E-MAIL
  // =========================================================================
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email");
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "E-mail copiado!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      } catch (_) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
})();

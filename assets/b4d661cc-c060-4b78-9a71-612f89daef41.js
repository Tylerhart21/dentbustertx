/* global React */

/* ------ Animated counter ------ */
function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1600,
  decimals = 0
}) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);
  const start = React.useCallback(() => {
    if (started.current) return;
    started.current = true;
    const t0 = performance.now();
    const step = now => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, duration]);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already on-screen, start immediately
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      start();
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        start();
        obs.disconnect();
      }
    }, {
      threshold: 0.1
    });
    obs.observe(el);
    // Failsafe: if IO never fires, run anyway after a beat
    const fallback = setTimeout(start, 800);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, [start]);
  const display = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return /*#__PURE__*/React.createElement("span", {
    ref: ref
  }, prefix, display, suffix);
}

/* ------ Fade-in wrapper ------ */
function FadeIn({
  children,
  delay = 0,
  as: As = "div",
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already on-screen, reveal immediately
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, {
      threshold: 0.01
    });
    obs.observe(el);
    // Failsafe: if IO never fires, reveal after a short beat
    const fallback = setTimeout(() => setVisible(true), 600);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);
  return /*#__PURE__*/React.createElement(As, {
    ref: ref,
    className: "fade-up" + (visible ? " visible" : ""),
    style: {
      transitionDelay: delay + "ms",
      ...style
    },
    ...rest
  }, children);
}

/* ------ HERO ------ */
/* Storm layer — forked bolts down each edge of the hero, like the shop banner.
   Real lightning forks and travels in short irregular steps, so each bolt is a
   trunk plus branches. Every bolt loops on its own odd duration so strikes
   never sync into a visible pattern. */
const BOLTS = [{
  side: "left",
  top: "-5%",
  h: "78%",
  dur: 4.3,
  delay: 0.2,
  w: 1,
  d: "M70 0 L52 58 L68 68 L46 148 L62 158 L40 246 L56 256 L34 352 L50 362 L28 458 L44 468 L24 560 L38 570 L20 640",
  branches: ["M46 148 L22 200 L36 208 L14 266", "M40 246 L70 312 L56 320 L80 388"]
}, {
  side: "left",
  top: "22%",
  h: "66%",
  dur: 6.7,
  delay: 2.6,
  w: 0.8,
  d: "M34 0 L54 66 L38 76 L60 160 L42 170 L66 258 L48 268 L72 356 L54 366 L76 452 L58 462 L80 548",
  branches: ["M60 160 L86 214 L72 222 L94 278"]
}, {
  side: "left",
  top: "48%",
  h: "50%",
  dur: 9.1,
  delay: 5.4,
  w: 0.65,
  d: "M56 0 L40 72 L54 82 L34 172 L48 182 L26 274 L42 284 L22 380",
  branches: ["M34 172 L60 226 L48 234 L70 292"]
}, {
  side: "right",
  top: "-8%",
  h: "80%",
  dur: 5.1,
  delay: 1.1,
  w: 1,
  d: "M30 0 L48 62 L32 72 L54 154 L36 164 L60 252 L42 262 L66 358 L48 368 L72 462 L54 472 L76 566 L60 576 L80 640",
  branches: ["M54 154 L78 206 L64 214 L86 272", "M60 252 L30 318 L44 326 L20 394"]
}, {
  side: "right",
  top: "18%",
  h: "68%",
  dur: 7.9,
  delay: 3.3,
  w: 0.8,
  d: "M66 0 L46 70 L62 80 L40 166 L58 176 L34 264 L52 274 L28 362 L46 372 L22 458 L38 468 L18 552",
  branches: ["M40 166 L14 220 L28 228 L6 284"]
}, {
  side: "right",
  top: "44%",
  h: "52%",
  dur: 11.3,
  delay: 6.8,
  w: 0.65,
  d: "M42 0 L58 74 L44 84 L64 174 L50 184 L72 276 L56 286 L78 384",
  branches: ["M64 174 L38 228 L52 236 L30 294"]
}];
function LightningLayer() {
  return /*#__PURE__*/React.createElement("div", {
    className: "storm",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "storm-flash"
  }), BOLTS.map((b, i) => /*#__PURE__*/React.createElement("svg", {
    key: i,
    className: "bolt bolt-" + b.side,
    viewBox: "0 0 100 640",
    preserveAspectRatio: "none",
    style: {
      top: b.top,
      height: b.h,
      "--bw": b.w,
      animationDuration: b.dur + "s",
      animationDelay: b.delay + "s"
    }
  }, [b.d].concat(b.branches || []).map((d, j) => /*#__PURE__*/React.createElement("g", {
    key: j,
    className: j === 0 ? "seg seg-main" : "seg seg-branch"
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    className: "bolt-halo"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    className: "bolt-glow"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    className: "bolt-core"
  }))))));
}
function Hero({
  setPage
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    "data-screen-label": "01 Hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-vignette"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-grain"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-bg"
  }), /*#__PURE__*/React.createElement(LightningLayer, null), /*#__PURE__*/React.createElement("svg", {
    className: "svg-defs",
    "aria-hidden": "true",
    focusable: "false"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "grunge",
    x: "-8%",
    y: "-8%",
    width: "116%",
    height: "116%"
  }, /*#__PURE__*/React.createElement("feTurbulence", {
    type: "fractalNoise",
    baseFrequency: "0.9",
    numOctaves: "2",
    seed: "9",
    result: "n"
  }), /*#__PURE__*/React.createElement("feDisplacementMap", {
    in: "SourceGraphic",
    in2: "n",
    scale: "2.4",
    xChannelSelector: "R",
    yChannelSelector: "G"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-centered"
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "var(--accent)",
      boxShadow: "0 0 10px var(--accent)"
    }
  }), "Now booking · McKinney, Frisco, Plano")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h1", {
    className: "display hero-h1"
  }, "Hail damage?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "hero-h1-accent"
  }, "We handle everything."))), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 140
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-tagline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-tagline-a"
  }, "Zero hassle."), /*#__PURE__*/React.createElement("span", {
    className: "hero-tagline-b"
  }, "Zero dents."))), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 180
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-subline"
  }, /*#__PURE__*/React.createElement("span", null, "Repairs"), /*#__PURE__*/React.createElement("span", {
    className: "hero-subline-dot"
  }, "·"), /*#__PURE__*/React.createElement("span", null, "Insurance"), /*#__PURE__*/React.createElement("span", {
    className: "hero-subline-dot"
  }, "·"), /*#__PURE__*/React.createElement("span", null, "Rental assistance"))), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 240
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "Texas’s premier paintless dent repair team. We handle the damage, the deductible, and your insurance company — so you don’t lift a finger.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-cta-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => setPage("contact")
  }, "Book a free inspection", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-ghost btn-lg",
    href: "tel:+12148597534"
  }, /*#__PURE__*/React.createElement(Phone, {
    size: 16
  }), " Call (214) 859-7534"))), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 380
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num mono"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: 2400,
    suffix: "+"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-lbl"
  }, "Vehicles repaired")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num mono"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: 5.0,
    decimals: 1
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-lbl"
  }, "Google rating")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num mono"
  }, "$", /*#__PURE__*/React.createElement(Counter, {
    to: 0
  }), ".00"), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-lbl"
  }, "Out of pocket")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num mono"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: 100,
    suffix: "%"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-lbl"
  }, "Lifetime warranty")))))), /*#__PURE__*/React.createElement("div", {
    className: "hero-marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-marquee-track"
  }, ["Insurance approved", "Lifetime warranty", "Paintless dent repair", "$0 out of pocket", "Free pickup & delivery", "Texas owned & operated", "100+ five-star reviews", "Ceramic coating"].concat(["Insurance approved", "Lifetime warranty", "Paintless dent repair", "$0 out of pocket", "Free pickup & delivery", "Texas owned & operated", "100+ five-star reviews", "Ceramic coating"]).map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "hero-marquee-item"
  }, t, /*#__PURE__*/React.createElement("span", {
    className: "hero-marquee-dot"
  }, "·"))))), /*#__PURE__*/React.createElement("style", null, `
        .hero {
          position: relative;
          padding-top: calc(var(--nav-h) + 60px);
          padding-bottom: 0;
          overflow: hidden;
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(50% 60% at 50% 30%, rgba(207,54,45,.22) 0%, transparent 55%),
            radial-gradient(80% 80% at 25% 90%, rgba(20,28,46,.6) 0%, transparent 55%),
            linear-gradient(180deg, #0a0c11 0%, #0a0c11 60%, #0d1119 100%);
        }
        .hero-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 100%, transparent 40%, rgba(0,0,0,.5) 100%);
          pointer-events: none;
        }
        .hero-grain {
          position: absolute; inset: 0;
          opacity: 0.5;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        .hero-centered {
          display: flex; flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 0 96px;
          max-width: 920px;
          margin: 0 auto;
        }
        .hero-centered > * { margin-bottom: 0; }
        .hero-mascot {
          width: 160px; height: 160px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 12px 32px rgba(207,54,45,.35)) drop-shadow(0 4px 12px rgba(0,0,0,.5));
          margin-bottom: 24px;
        }
        /* ---- Storm: red lightning down each edge, like the shop banner ---- */
        .storm {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }
        .storm-flash {
          position: absolute;
          inset: 0;
          background: radial-gradient(130% 80% at 50% 0%, rgba(255,90,90,.55), transparent 62%);
          opacity: 0;
          animation: stormFlash 8.6s linear infinite;
        }
        @keyframes stormFlash {
          0%, 88%, 100% { opacity: 0; }
          89%   { opacity: .13; }
          90.5% { opacity: .03; }
          92%   { opacity: .09; }
          94%   { opacity: 0; }
        }
        .bolt {
          position: absolute;
          width: clamp(110px, 13vw, 230px);
          opacity: 0;
          animation-name: boltStrike;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: opacity;
        }
        .bolt-left  { left: -3%; }
        .bolt-right { right: -3%; transform: scaleX(-1); }
        .bolt path {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
        }
        /* Three passes: soft halo -> red glow -> white-hot core. That layering
           is what makes it read as light instead of a red line. */
        .bolt-halo {
          stroke: var(--accent);
          stroke-width: calc(16px * var(--bw, 1));
          opacity: .28;
          filter: blur(7px);
        }
        .bolt-glow {
          stroke: var(--accent-hi, var(--accent));
          stroke-width: calc(5.5px * var(--bw, 1));
          opacity: .95;
          filter: drop-shadow(0 0 8px var(--accent)) drop-shadow(0 0 22px var(--accent));
        }
        .bolt-core {
          stroke: #fff;
          stroke-width: calc(1.7px * var(--bw, 1));
          filter: drop-shadow(0 0 4px #fff) drop-shadow(0 0 11px rgba(255,190,190,.95));
        }
        .seg-branch .bolt-halo { stroke-width: calc(9px * var(--bw, 1)); opacity: .2; }
        .seg-branch .bolt-glow { stroke-width: calc(3px * var(--bw, 1)); opacity: .8; }
        .seg-branch .bolt-core { stroke-width: calc(1px * var(--bw, 1)); }
        /* Stutter, don't fade — a real strike flickers several times fast. */
        @keyframes boltStrike {
          0%, 84%, 100% { opacity: 0; }
          84.5% { opacity: .95; }
          85.2% { opacity: .08; }
          86%   { opacity: 1; }
          87%   { opacity: .18; }
          88%   { opacity: .9; }
          89.2% { opacity: .06; }
          90.2% { opacity: .6; }
          92%   { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolt { animation: none; opacity: .1; }
          .storm-flash { animation: none; }
        }
        @media (max-width: 760px) {
          .bolt { width: 74px; }
          .bolt-left { left: -7%; }
          .bolt-right { right: -7%; }
        }

        .svg-defs { position: absolute; width: 0; height: 0; }
        .hero-h1 {
          font-size: clamp(48px, 7.5vw, 108px);
          margin: 24px 0 0;
          letter-spacing: -0.03em;
          /* Match the banner wordmark. Anton ships upright and clean, so the
             lean, the black outline, the drop shadow and the distressed edge
             all have to be added on top of it. */
          display: inline-block;
          transform: skewX(-10deg);
          -webkit-text-stroke: 3px #080a0f;
          paint-order: stroke fill;
          text-shadow: 0 6px 0 rgba(0,0,0,.5), 0 16px 30px rgba(0,0,0,.6);
          filter: url(#grunge);
        }
        /* Solid bright red like the banner's "BUSTERS" — a gradient fill turns
           muddy once the black outline is stroked behind it. */
        .hero-h1-accent {
          background: none;
          -webkit-background-clip: border-box;
          background-clip: border-box;
          color: #ff2b2b;
          -webkit-text-fill-color: #ff2b2b;
        }
        /* Brand tagline band — mirrors the shop banner's slanted white stripe */
        .hero-tagline {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
          margin-top: 24px;
          padding: 9px 22px;
          background: #f3f5f9;
          border-radius: 3px;
          transform: skewX(-8deg);
          box-shadow: 0 10px 34px rgba(0,0,0,.55);
        }
        .hero-tagline span {
          display: inline-block;
          transform: skewX(8deg);
          font-family: var(--f-display);
          font-weight: 800;
          font-size: clamp(17px, 2.4vw, 30px);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
        }
        .hero-tagline-a { color: #0a0c11; }
        .hero-tagline-b { color: var(--accent); }
        @media (max-width: 520px) {
          .hero-tagline { padding: 8px 16px; gap: 7px; }
        }
        .hero-subline {
          margin-top: 22px;
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px 14px;
          font-family: var(--f-display);
          font-weight: 700;
          font-size: clamp(13px, 1.3vw, 16px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--fg);
        }
        .hero-subline-dot {
          color: var(--accent);
        }
        .hero-sub {
          color: var(--fg-1);
          font-size: clamp(16px, 1.3vw, 18px);
          line-height: 1.55;
          margin: 28px auto 0;
          max-width: 620px;
          text-wrap: pretty;
        }
        .hero-cta-row {
          margin-top: 36px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.4vw, 32px);
          margin-top: 56px;
          padding-top: 36px;
          border-top: 1px solid var(--border);
          width: 100%;
          max-width: 720px;
          justify-content: space-between;
        }
        .hero-stat-num {
          font-size: clamp(24px, 2.6vw, 34px);
          font-weight: 700;
          color: var(--fg);
          letter-spacing: -0.02em;
        }
        .hero-stat-lbl {
          font-family: var(--f-display);
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 0.16em;
          color: var(--fg-2);
          margin-top: 4px;
        }
        .hero-stat-divider {
          width: 1px;
          height: 36px;
          background: var(--border);
        }
        .hero-marquee {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: rgba(10,12,17,.7);
          overflow: hidden;
          padding: 18px 0;
        }
        .hero-marquee-track {
          display: flex;
          gap: 28px;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .hero-marquee-item {
          color: var(--fg-1);
          font-family: var(--f-display);
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 28px;
          white-space: nowrap;
        }
        .hero-marquee-dot {
          color: var(--accent);
          font-size: 18px;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 700px) {
          .hero-mascot { width: 120px; height: 120px; }
          .hero-stats {
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
          }
          .hero-stat-divider { display: none; }
          .hero-stat { flex: 1 1 40%; }
        }
      `));
}

/* ------ Hero Visual (real truck photo + mascot overlay) ------ */
function HeroVisual() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hero-visual"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-visual-frame"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.heroTruck || "assets/hero-truck.png",
    alt: "Hail-damaged truck",
    className: "hero-visual-img"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-visual-shade"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-card hero-card-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-card-icon",
    style: {
      background: "rgba(207,54,45,.16)",
      color: "var(--accent-hi)"
    }
  }, /*#__PURE__*/React.createElement(FileCheck, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-card-title"
  }, "Claim filed in 6 min"), /*#__PURE__*/React.createElement("div", {
    className: "hero-card-sub"
  }, "We handle your insurer."))), /*#__PURE__*/React.createElement("div", {
    className: "hero-card hero-card-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-card-icon",
    style: {
      background: "rgba(34,197,94,.16)",
      color: "#4ade80"
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-card-title"
  }, "$0 out of pocket"), /*#__PURE__*/React.createElement("div", {
    className: "hero-card-sub"
  }, "Deductible assistance.")))), /*#__PURE__*/React.createElement("style", null, `
        .hero-visual {
          position: relative;
          aspect-ratio: 5 / 4;
          max-width: 600px;
          margin-left: auto;
        }
        .hero-visual-frame {
          position: relative;
          width: 100%; height: 100%;
          border-radius: var(--r-xl);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg), 0 0 80px rgba(207,54,45,.15);
          background: linear-gradient(180deg, #0a0c11, #050608);
        }
        .hero-visual-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 35%;
          display: block;
        }
        .hero-visual-shade {
          position: absolute; inset: 0;
          background:
            radial-gradient(60% 50% at 50% 100%, rgba(0,0,0,.5) 0%, transparent 60%),
            linear-gradient(180deg, transparent 0%, rgba(10,12,17,.15) 100%);
          pointer-events: none;
        }
        .hero-card {
          position: absolute;
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px 12px 12px;
          background: rgba(20,24,34,.85);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-strong);
          border-radius: var(--r);
          box-shadow: var(--shadow-md);
          animation: floatY 4s ease-in-out infinite;
        }
        .hero-card-1 { left: -16px; bottom: 18%; }
        .hero-card-2 { right: -16px; top: 14%; animation-delay: 1.5s; }
        .hero-card-icon {
          width: 36px; height: 36px; border-radius: 8px;
          display: grid; place-items: center;
        }
        .hero-card-title {
          font-family: var(--f-display); font-weight: 700; font-size: 13.5px;
          color: var(--fg);
        }
        .hero-card-sub { font-size: 12px; color: var(--fg-2); margin-top: 2px; }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @media (max-width: 900px) {
          .hero-visual { max-width: 100%; aspect-ratio: 5 / 4; }
          .hero-card-1 { left: 8px; bottom: 12%; }
          .hero-card-2 { right: 8px; top: 10%; }
        }
      `));
}

/* ------ Hero Visual (CSS art: storm + car silhouette) — UNUSED, kept for reference ------ */
function HeroVisualSVG() {
  return /*#__PURE__*/React.createElement("div", {
    className: "hero-visual"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-visual-frame"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 600 700",
    className: "hero-visual-svg",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "sky",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#1a2030"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "#0c1019"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#070a10"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "flash",
    cx: "60%",
    cy: "20%",
    r: "40%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(207,54,45,.45)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(207,54,45,0)"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "carbody",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#1c2230"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#080a10"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "windowG",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(207,54,45,.35)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(20,30,50,.7)"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "glow",
    x: "-50%",
    y: "-50%",
    width: "200%",
    height: "200%"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "3",
    result: "b"
  }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
    in: "b"
  }), /*#__PURE__*/React.createElement("feMergeNode", {
    in: "SourceGraphic"
  })))), /*#__PURE__*/React.createElement("rect", {
    width: "600",
    height: "700",
    fill: "url(#sky)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "600",
    height: "700",
    fill: "url(#flash)"
  }), Array.from({
    length: 40
  }).map((_, i) => {
    const x = i * 37 % 600;
    const y = i * 53 % 600;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: x,
      y1: y,
      x2: x - 6,
      y2: y + 26,
      stroke: "rgba(180,200,230,.18)",
      strokeWidth: "1"
    });
  }), /*#__PURE__*/React.createElement("path", {
    d: "M380 60 L350 230 L400 230 L320 410 L370 290 L320 290 L380 60",
    fill: "rgba(255,180,200,.55)",
    filter: "url(#glow)",
    opacity: "0.55"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "300",
    cy: "600",
    rx: "280",
    ry: "40",
    fill: "rgba(207,54,45,.18)",
    filter: "url(#glow)"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(60, 380)"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "240",
    cy: "220",
    rx: "240",
    ry: "14",
    fill: "rgba(0,0,0,.7)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30 200 L40 150 Q60 120 110 110 L170 80 Q220 60 280 60 Q340 60 380 80 L430 110 Q470 130 480 160 L488 200 L30 200 Z",
    fill: "url(#carbody)",
    stroke: "#222b3a",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M130 105 L185 80 Q220 65 270 65 Q320 65 360 80 L410 105 L380 130 L150 130 Z",
    fill: "url(#windowG)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "265",
    y1: "65",
    x2: "265",
    y2: "130",
    stroke: "#0b0d14",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "265",
    y1: "135",
    x2: "265",
    y2: "195",
    stroke: "rgba(0,0,0,.5)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "200",
    r: "28",
    fill: "#0b0d14",
    stroke: "#252e40",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "200",
    r: "14",
    fill: "#1a2030"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "400",
    cy: "200",
    r: "28",
    fill: "#0b0d14",
    stroke: "#252e40",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "400",
    cy: "200",
    r: "14",
    fill: "#1a2030"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "475",
    cy: "170",
    rx: "8",
    ry: "5",
    fill: "#ffd9a0",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "475",
    cy: "170",
    rx: "18",
    ry: "9",
    fill: "#ffd9a0",
    opacity: "0.18"
  }), [[180, 110, 5], [220, 90, 4], [260, 85, 6], [310, 100, 5], [200, 165, 7], [240, 170, 5], [290, 158, 6], [340, 175, 5], [380, 160, 4], [150, 180, 4], [420, 185, 5]].map(([x, y, r], i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("circle", {
    cx: x,
    cy: y,
    r: r,
    fill: "rgba(0,0,0,.45)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: x - 1,
    cy: y - 1,
    r: r * 0.55,
    fill: "rgba(255,255,255,.04)"
  })))), Array.from({
    length: 24
  }).map((_, i) => {
    const x = (i * 79 + 20) % 600;
    const y = (i * 43 + 100) % 500;
    const r = 2 + i % 3;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: x,
      cy: y,
      r: r,
      fill: "rgba(220,230,255,.5)"
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-card hero-card-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-card-icon",
    style: {
      background: "rgba(207,54,45,.16)",
      color: "var(--accent-hi)"
    }
  }, /*#__PURE__*/React.createElement(FileCheck, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-card-title"
  }, "Claim filed in 6 min"), /*#__PURE__*/React.createElement("div", {
    className: "hero-card-sub"
  }, "We handle your insurer."))), /*#__PURE__*/React.createElement("div", {
    className: "hero-card hero-card-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-card-icon",
    style: {
      background: "rgba(34,197,94,.16)",
      color: "#4ade80"
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-card-title"
  }, "$0 out of pocket"), /*#__PURE__*/React.createElement("div", {
    className: "hero-card-sub"
  }, "Deductible assistance.")))), /*#__PURE__*/React.createElement("style", null, `
        .hero-visual { position: relative; aspect-ratio: 4 / 5; max-width: 560px; margin-left: auto; }
        .hero-visual-frame {
          position: relative; width: 100%; height: 100%;
          border-radius: var(--r-xl);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg), 0 0 80px rgba(207,54,45,.15);
        }
        .hero-visual-svg { width: 100%; height: 100%; display: block; }
        .hero-card {
          position: absolute;
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px 12px 12px;
          background: rgba(20,24,34,.85);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-strong);
          border-radius: var(--r);
          box-shadow: var(--shadow-md);
          animation: floatY 4s ease-in-out infinite;
        }
        .hero-card-1 { left: -16px; top: 12%; }
        .hero-card-2 { right: -16px; bottom: 14%; animation-delay: 1.5s; }
        .hero-card-icon {
          width: 36px; height: 36px; border-radius: 8px;
          display: grid; place-items: center;
        }
        .hero-card-title {
          font-family: var(--f-display); font-weight: 700; font-size: 13.5px;
          color: var(--fg);
        }
        .hero-card-sub {
          font-size: 12px; color: var(--fg-2); margin-top: 2px;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @media (max-width: 900px) {
          .hero-visual { max-width: 100%; aspect-ratio: 4 / 3; }
          .hero-card-1 { left: 8px; top: 8%; }
          .hero-card-2 { right: 8px; bottom: 8%; }
        }
      `));
}

/* ------ Services preview ------ */
const SERVICES = [{
  id: "hail",
  title: "Hail Damage Repair",
  icon: "Droplet",
  img: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=1200&q=85&auto=format&fit=crop",
  blurb: "Paintless dent repair for hail damage of every scale — your panels saved, your factory finish intact.",
  accent: "#e11d48"
}, {
  id: "ding",
  title: "Door Ding Repair",
  icon: "CarFront",
  img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85&auto=format&fit=crop",
  blurb: "Parking lot dings, runaway carts, careless neighbors. Quick fixes that vanish without a trace.",
  accent: "#f97316"
}, {
  id: "pdr",
  title: "Paintless Dent Repair",
  icon: "Wrench",
  img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=85&auto=format&fit=crop",
  blurb: "Factory paint stays put. We sculpt metal back to spec with specialty tools — no filler, no spray booth.",
  accent: "#eab308"
}, {
  id: "ceramic",
  title: "Ceramic Coating",
  icon: "Sparkles",
  img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop",
  blurb: "Multi-year hydrophobic protection. Glossier finish, easier washes, no risk of UV oxidation.",
  accent: "#3b82f6"
}, {
  id: "delivery",
  title: "Pickup & Delivery",
  icon: "Truck",
  img: "https://images.unsplash.com/photo-1568605114849-c4f5b8bff0f3?w=1200&q=85&auto=format&fit=crop",
  blurb: "We come to you. Free pickup and delivery anywhere in the DFW metroplex while we keep your car safe.",
  accent: "#22c55e"
}];
function ServicesGrid({
  setPage
}) {
  const iconMap = {
    Droplet,
    CarFront,
    Wrench,
    Sparkles,
    Truck
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    "data-screen-label": "02 Services"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "What we do")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "Built to make hail damage", /*#__PURE__*/React.createElement("br", null), "look like it never happened.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", null, "Five services. One promise: your car leaves looking factory-new — paint, panels, and finish untouched."))), /*#__PURE__*/React.createElement("div", {
    className: "services-grid"
  }, SERVICES.map((s, i) => {
    const Ic = iconMap[s.icon];
    return /*#__PURE__*/React.createElement(FadeIn, {
      key: s.id,
      delay: i * 60
    }, /*#__PURE__*/React.createElement("div", {
      className: "service-card card",
      onClick: () => setPage("services")
    }, /*#__PURE__*/React.createElement("div", {
      className: "service-card-art"
    }, /*#__PURE__*/React.createElement("img", {
      src: s.img,
      alt: s.title,
      className: "service-card-photo",
      loading: "lazy",
      onError: e => {
        e.currentTarget.style.display = "none";
        e.currentTarget.nextSibling.style.display = "block";
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "service-card-fallback",
      style: {
        display: "none"
      }
    }, /*#__PURE__*/React.createElement(ServiceArt, {
      id: s.id,
      accent: s.accent
    })), /*#__PURE__*/React.createElement("div", {
      className: "service-card-shade"
    }), /*#__PURE__*/React.createElement("div", {
      className: "service-card-icon",
      style: {
        background: s.accent,
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 18
    }))), /*#__PURE__*/React.createElement("div", {
      className: "service-card-body"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "service-card-title"
    }, s.title), /*#__PURE__*/React.createElement("p", {
      className: "service-card-blurb"
    }, s.blurb), /*#__PURE__*/React.createElement("div", {
      className: "service-card-link"
    }, "Learn more ", /*#__PURE__*/React.createElement(ArrowRight, {
      size: 14
    })))));
  }))), /*#__PURE__*/React.createElement("style", null, `
        .services-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .service-card {
          padding: 0;
          height: 100%;
          display: flex; flex-direction: column;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .service-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-strong);
        }
        .service-card-art {
          position: relative;
          aspect-ratio: 16 / 11;
          overflow: hidden;
          background: linear-gradient(135deg, var(--bg-2) 0%, var(--bg-3) 100%);
          border-bottom: 1px solid var(--border);
        }
        .service-card-photo,
        .service-card-fallback {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
        }
        .service-card-photo {
          object-fit: cover; object-position: center;
          transition: transform .5s var(--ease), filter .25s var(--ease);
          filter: saturate(0.85) contrast(1.05);
        }
        .service-card:hover .service-card-photo {
          transform: scale(1.06);
          filter: saturate(1) contrast(1.05);
        }
        .service-card-fallback svg {
          width: 100%; height: 100%;
          display: block;
        }
        .service-card-shade {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,12,17,0) 40%, rgba(10,12,17,.55) 100%);
          pointer-events: none;
        }
        .service-card-icon {
          position: absolute;
          top: 12px; left: 12px;
          width: 36px; height: 36px;
          border-radius: 8px;
          display: grid; place-items: center;
          box-shadow: 0 4px 14px rgba(0,0,0,.4);
          z-index: 2;
        }
        .service-card-body {
          padding: 20px 18px 20px;
          display: flex; flex-direction: column;
          flex: 1;
        }
        .service-card-title {
          font-family: var(--f-display); font-weight: 700;
          font-size: 17px; letter-spacing: -0.01em; margin: 0;
        }
        .service-card-blurb {
          color: var(--fg-2); font-size: 13.5px; line-height: 1.55;
          margin: 8px 0 16px;
          flex: 1;
        }
        .service-card-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--accent-hi); font-family: var(--f-display);
          font-weight: 600; font-size: 12px; letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .service-card:hover .service-card-link {
          color: var(--accent-2);
        }
        @media (max-width: 1100px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `));
}

/* ------ Process preview ------ */
const PROCESS_STEPS = [{
  n: 1,
  title: "Contact us",
  blurb: "Call, text, or submit photos. We respond same-day with an honest, no-pressure assessment.",
  icon: "Phone"
}, {
  n: 2,
  title: "Inspection & approval",
  blurb: "Free in-person inspection. We work with your insurer to handle the claim, deductible included.",
  icon: "ShieldCheck"
}, {
  n: 3,
  title: "Repair process",
  blurb: "PDR specialists restore your vehicle to factory condition — your factory paint is never touched.",
  icon: "Wrench"
}, {
  n: 4,
  title: "Delivery",
  blurb: "We deliver your car back clean, detailed, and looking like new. Lifetime warranty on every repair.",
  icon: "CarFront"
}];
function ProcessPreview({
  setPage
}) {
  const iconMap = {
    Phone,
    ShieldCheck,
    Wrench,
    CarFront
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    "data-screen-label": "03 Process"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "How it works")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "Four steps from quote to keys.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", null, "We take the friction out of insurance claims, scheduling, and repair coordination. Most claims close in under two weeks."))), /*#__PURE__*/React.createElement("div", {
    className: "process-grid"
  }, PROCESS_STEPS.map((s, i) => {
    const Ic = iconMap[s.icon];
    return /*#__PURE__*/React.createElement(FadeIn, {
      key: s.n,
      delay: i * 90
    }, /*#__PURE__*/React.createElement("div", {
      className: "process-step"
    }, /*#__PURE__*/React.createElement("div", {
      className: "process-step-rail"
    }, /*#__PURE__*/React.createElement("div", {
      className: "process-step-num"
    }, /*#__PURE__*/React.createElement("span", null, String(s.n).padStart(2, "0"))), i < PROCESS_STEPS.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: "process-step-line"
    })), /*#__PURE__*/React.createElement("div", {
      className: "process-step-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "process-step-icon"
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 20
    })), /*#__PURE__*/React.createElement("h3", {
      className: "process-step-title"
    }, s.title), /*#__PURE__*/React.createElement("p", {
      className: "process-step-blurb"
    }, s.blurb))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-lg",
    onClick: () => setPage("process")
  }, "Read the full process ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })))), /*#__PURE__*/React.createElement("style", null, `
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .process-step {
          display: flex;
          gap: 18px;
        }
        .process-step-rail {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 4px;
        }
        .process-step-num {
          width: 40px; height: 40px;
          border-radius: 999px;
          display: grid; place-items: center;
          background: var(--accent-soft);
          border: 1px solid rgba(207,54,45,.25);
          color: var(--accent-hi);
          font-family: var(--f-mono);
          font-weight: 700;
          font-size: 13px;
          flex: 0 0 auto;
        }
        .process-step-line {
          flex: 1;
          width: 1px;
          background: linear-gradient(180deg, rgba(207,54,45,.4), transparent);
          margin-top: 8px;
          min-height: 48px;
        }
        .process-step-body { flex: 1; padding-top: 6px; }
        .process-step-icon {
          width: 36px; height: 36px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: grid; place-items: center;
          color: var(--fg);
          margin-bottom: 14px;
        }
        .process-step-title {
          font-family: var(--f-display); font-weight: 700; font-size: 18px;
          margin: 0 0 6px;
        }
        .process-step-blurb {
          color: var(--fg-2); font-size: 14px; line-height: 1.55; margin: 0;
        }
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr 1fr; }
          .process-step-line { display: none; }
        }
        @media (max-width: 560px) {
          .process-grid { grid-template-columns: 1fr; }
        }
      `));
}

/* ------ Insurance bar ------ */
function InsuranceBar() {
  const items = [{
    icon: "ShieldCheck",
    title: "Insurance Approved",
    sub: "Direct billing with every major insurer"
  }, {
    icon: "ThumbsUp",
    title: "100+ Five-Star Reviews",
    sub: "Verified Google reviews across DFW"
  }, {
    icon: "Trophy",
    title: "Lifetime Warranty",
    sub: "On every PDR repair, in writing"
  }, {
    icon: "Building",
    title: "Works With All Carriers",
    sub: "State Farm, Allstate, USAA, Geico & more"
  }];
  const iconMap = {
    ShieldCheck,
    ThumbsUp,
    Trophy,
    Building
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      padding: "32px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ins-grid"
  }, items.map((it, i) => {
    const Ic = iconMap[it.icon];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "ins-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ins-icon"
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 20
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "ins-title"
    }, it.title), /*#__PURE__*/React.createElement("div", {
      className: "ins-sub"
    }, it.sub)));
  })), /*#__PURE__*/React.createElement("style", null, `
          .ins-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
          .ins-item { display: flex; gap: 14px; align-items: center; }
          .ins-icon {
            width: 44px; height: 44px; border-radius: 10px;
            background: var(--accent-soft);
            color: var(--accent-hi);
            display: grid; place-items: center;
            border: 1px solid rgba(207,54,45,.25);
            flex: 0 0 auto;
          }
          .ins-title { font-family: var(--f-display); font-weight: 700; font-size: 14.5px; }
          .ins-sub { color: var(--fg-2); font-size: 12.5px; margin-top: 2px; }
          @media (max-width: 900px) {
            .ins-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          }
          @media (max-width: 560px) {
            .ins-grid { grid-template-columns: 1fr; }
          }
        `)));
}

/* ------ Stats with counters ------ */
function StatsBand() {
  const stats = [{
    num: 2400,
    suffix: "+",
    label: "Vehicles repaired"
  }, {
    num: 100,
    suffix: "%",
    label: "Insurance approved"
  }, {
    num: 12,
    suffix: " yrs",
    label: "DFW experience"
  }, {
    num: 4.9,
    decimals: 1,
    label: "Google rating"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-1) 100%)",
      padding: "80px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stats-grid"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement(FadeIn, {
    key: i,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num mono"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: s.num,
    suffix: s.suffix || "",
    decimals: s.decimals || 0
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, s.label))))), /*#__PURE__*/React.createElement("style", null, `
          .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          .stat-card {
            padding: 32px;
            background: var(--bg-2);
            border: 1px solid var(--border);
            border-radius: var(--r-lg);
            text-align: center;
          }
          .stat-num {
            font-size: clamp(36px, 4vw, 56px);
            font-weight: 700;
            background: linear-gradient(180deg, var(--fg), var(--fg-1));
            -webkit-background-clip: text; background-clip: text; color: transparent;
            letter-spacing: -0.02em;
          }
          .stat-lbl {
            font-family: var(--f-display); font-size: 12px; font-weight: 600;
            letter-spacing: 0.18em; text-transform: uppercase;
            color: var(--fg-2); margin-top: 8px;
          }
          @media (max-width: 700px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
        `)));
}

/* ------ Final CTA strip ------ */
function FinalCTA({
  setPage
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section--tight section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta-strip-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cta-strip-content"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 800,
      fontSize: "clamp(28px, 3.4vw, 44px)",
      margin: 0,
      letterSpacing: "-0.02em",
      lineHeight: 1.1
    }
  }, "Don’t wait for the next storm."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-1)",
      marginTop: 12,
      fontSize: 17,
      maxWidth: 540
    }
  }, "Free inspections, no-pressure quotes, and we work directly with your insurance. Book online in two minutes.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-ghost btn-lg",
    href: "tel:+12148597534"
  }, /*#__PURE__*/React.createElement(Phone, {
    size: 16
  }), " (214) 859-7534"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => setPage("contact")
  }, "Book inspection ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })))))), /*#__PURE__*/React.createElement("style", null, `
        .cta-strip {
          position: relative;
          overflow: hidden;
          border-radius: var(--r-xl);
          border: 1px solid var(--border-strong);
          padding: 56px;
        }
        .cta-strip-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(60% 100% at 100% 50%, rgba(207,54,45,.30) 0%, transparent 50%),
            linear-gradient(120deg, var(--bg-2), var(--bg-1));
          z-index: 0;
        }
        .cta-strip-content {
          position: relative; z-index: 1;
          display: flex; justify-content: space-between; align-items: center;
          gap: 32px; flex-wrap: wrap;
        }
        @media (max-width: 700px) {
          .cta-strip { padding: 36px 28px; }
        }
      `));
}

/* ------ Meet the Team ------ */
const TEAM_MEMBERS = [{
  id: "owner",
  name: "Marcus Delgado",
  role: "Owner & Lead Technician",
  initials: "MD",
  accent: "#cf362d",
  bio: "Eighteen years in paintless dent repair and a Vale-certified master tech. Marcus specializes in large-panel hail and aluminum bodies — the F-150s and Audis most shops won't touch. He still personally inspects every vehicle before it leaves the shop.",
  tags: ["Aluminum certified", "Hail specialist", "18 yrs"]
}, {
  id: "senior",
  name: "Tyler Boswell",
  role: "Senior PDR Technician",
  initials: "TB",
  accent: "#f97316",
  bio: "Eleven years and a reputation for the dents nobody else can reach — roof rails, body lines, and tight double-panel access. Tyler came up through dealership body shops before going all-in on PDR. Off the clock, he's restoring a '72 Bronco.",
  tags: ["Tight-access PDR", "Body lines", "11 yrs"]
}, {
  id: "finish",
  name: "Andre Washington",
  role: "Paint & Finish Specialist",
  initials: "AW",
  accent: "#3b82f6",
  bio: "Fourteen years in conventional repair, color matching, and paint correction for the cracked-paint dents PDR alone can't fix. Andre's blends are invisible in any light. He's the one who taught half the crew how to wet-sand.",
  tags: ["Color match", "Paint correction", "14 yrs"]
}, {
  id: "claims",
  name: "Sofia Reyes",
  role: "Client & Claims Coordinator",
  initials: "SR",
  accent: "#22c55e",
  bio: "Eight years on the insurance side before joining Dent Busters, so she knows exactly how adjusters think. Sofia files your claim, negotiates the scope, and keeps you updated start to finish. If you've talked to us by text, it was probably her.",
  tags: ["Claims & insurance", "Scheduling", "8 yrs"]
}];
function MeetTheTeam({
  setPage
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    "data-screen-label": "09 Team"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-wrap"
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
    className: "team-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "Meet the team"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 800,
      fontSize: "clamp(34px, 4vw, 52px)",
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
      margin: "16px 0 16px"
    }
  }, "The crew behind every repair."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      fontSize: 17,
      lineHeight: 1.55,
      margin: "0 0 32px"
    }
  }, "Texas-based, certified, and obsessed with detail. Our techs each carry a decade-plus of PDR experience and treat every panel like it’s their own."), /*#__PURE__*/React.createElement("div", {
    className: "team-stats"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "team-stat-num mono"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: 12
  }), "+"), /*#__PURE__*/React.createElement("div", {
    className: "team-stat-lbl"
  }, "Years average experience")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "team-stat-num mono"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: 4
  })), /*#__PURE__*/React.createElement("div", {
    className: "team-stat-lbl"
  }, "Certified PDR technicians")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "team-stat-num mono"
  }, "100", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-hi)"
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "team-stat-lbl"
  }, "Texas owned & operated"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 36,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setPage("contact")
  }, "Book with us ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-ghost",
    href: "tel:+12148597534"
  }, /*#__PURE__*/React.createElement(Phone, {
    size: 15
  }), " Call (214) 859-7534")))), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.team || "assets/team.png",
    alt: "The Dent Busters team"
  }), /*#__PURE__*/React.createElement("div", {
    className: "team-photo-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "team-badge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-badge-stars"
  }, [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement(Star, {
    key: i,
    size: 12,
    stroke: "#facc15"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "team-badge-text"
  }, /*#__PURE__*/React.createElement("strong", null, "5.0 from 120 reviews"), /*#__PURE__*/React.createElement("span", null, "Texas Hail Repair Specialists")))))), /*#__PURE__*/React.createElement("div", {
    className: "team-bios"
  }, TEAM_MEMBERS.map((m, i) => /*#__PURE__*/React.createElement(FadeIn, {
    key: m.id,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-bio-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-bio-photo",
    style: {
      "--m-accent": m.accent
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "team-bio-initials"
  }, m.initials), /*#__PURE__*/React.createElement("span", {
    className: "team-bio-photo-note"
  }, "Photo")), /*#__PURE__*/React.createElement("div", {
    className: "team-bio-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-bio-name"
  }, m.name), /*#__PURE__*/React.createElement("div", {
    className: "team-bio-role"
  }, m.role), /*#__PURE__*/React.createElement("p", {
    className: "team-bio-text"
  }, m.bio), /*#__PURE__*/React.createElement("div", {
    className: "team-bio-tags"
  }, m.tags.map((t, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    className: "team-bio-tag"
  }, t))))))))), /*#__PURE__*/React.createElement("style", null, `
        .team-wrap {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        .team-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }
        .team-stat-num {
          font-family: var(--f-mono); font-weight: 700;
          font-size: 32px; letter-spacing: -0.02em;
          color: var(--fg);
        }
        .team-stat-lbl {
          font-family: var(--f-display); font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--fg-2);
          margin-top: 4px;
        }
        .team-photo {
          position: relative;
          aspect-ratio: 5 / 3;
          border-radius: var(--r-xl);
          overflow: hidden;
          border: 1px solid var(--border-strong);
          box-shadow: var(--shadow-lg);
          background: var(--bg-2);
        }
        .team-photo img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
        }
        .team-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(10,12,17,.5) 100%);
        }
        .team-badge {
          position: absolute;
          left: 20px; bottom: 20px;
          display: flex; align-items: center; gap: 14px;
          padding: 12px 16px;
          background: rgba(20,24,34,.85);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-strong);
          border-radius: var(--r);
          box-shadow: var(--shadow-md);
        }
        .team-badge-stars { display: flex; gap: 2px; }
        .team-badge-text {
          display: flex; flex-direction: column;
        }
        .team-badge-text strong {
          font-family: var(--f-display); font-weight: 700; font-size: 13.5px;
          color: var(--fg);
        }
        .team-badge-text span {
          font-size: 11.5px; color: var(--fg-2);
        }
        @media (max-width: 900px) {
          .team-wrap { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 500px) {
          .team-stats { grid-template-columns: 1fr 1fr; }
        }

        .team-bios {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 56px;
        }
        .team-bio-card {
          padding: 0;
          overflow: hidden;
          display: flex; flex-direction: column;
        }
        .team-bio-card:hover { border-color: var(--border-strong); transform: translateY(-2px); }
        .team-bio-photo {
          position: relative;
          aspect-ratio: 4 / 3;
          background:
            radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, var(--m-accent) 28%, var(--bg-3)) 0%, var(--bg-2) 70%);
          display: grid; place-items: center;
          border-bottom: 1px solid var(--border);
        }
        .team-bio-initials {
          font-family: var(--f-display); font-weight: 800;
          font-size: 48px; letter-spacing: -0.02em;
          color: color-mix(in srgb, var(--m-accent) 70%, #fff);
          opacity: 0.55;
        }
        .team-bio-photo-note {
          position: absolute; bottom: 10px; right: 12px;
          font-family: var(--f-display); font-size: 10px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--fg-3);
          border: 1px dashed var(--border-strong);
          padding: 3px 8px; border-radius: 5px;
        }
        .team-bio-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
        .team-bio-name {
          font-family: var(--f-display); font-weight: 800; font-size: 18px;
          letter-spacing: -0.01em;
        }
        .team-bio-role {
          font-family: var(--f-display); font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent-hi); margin-top: 4px;
        }
        .team-bio-text {
          color: var(--fg-1); font-size: 13.5px; line-height: 1.55;
          margin: 12px 0 16px; flex: 1;
        }
        .team-bio-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .team-bio-tag {
          font-family: var(--f-display); font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--fg-2);
          background: var(--bg-3);
          border: 1px solid var(--border);
          padding: 4px 9px; border-radius: 999px;
        }
        @media (max-width: 1000px) {
          .team-bios { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .team-bios { grid-template-columns: 1fr; }
        }
      `));
}
Object.assign(window, {
  Hero,
  HeroVisual,
  ServicesGrid,
  ProcessPreview,
  InsuranceBar,
  StatsBand,
  FinalCTA,
  Counter,
  FadeIn,
  SERVICES,
  PROCESS_STEPS,
  MeetTheTeam
});
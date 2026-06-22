/* global React, FadeIn */

/* =========================================================
   BEFORE / AFTER GALLERY — draggable slider comparing
   damaged panel to repaired panel. Uses inline SVG so it
   works without any external photos. Swap to real <img>
   tags whenever the customer provides photography.
   ========================================================= */

const BA_ITEMS = [{
  id: "hail-roof",
  title: "Hail on hood",
  vehicle: "2022 Ford F-150",
  detail: "Severe hail · 60+ dents · roof, hood, and tailgate",
  timing: "Repaired in 6 business days",
  storm: "April 28, 2026 — Frisco supercell",
  paint: "Color #B5 Magnetic Gray — preserved",
  accent: "#e11d48"
}, {
  id: "door-ding",
  title: "Door panel impact",
  vehicle: "2024 Tesla Model Y",
  detail: "Parking-lot impact · 1 panel · 4 dings + crease",
  timing: "Same-day repair — 4 hours",
  storm: "Single-panel walk-in",
  paint: "Color PPSW Pearl White — preserved",
  accent: "#f97316"
}, {
  id: "fender",
  title: "Hood crease",
  vehicle: "2021 BMW X3",
  detail: "Falling debris · single deep crease + 12 dings",
  timing: "Repaired in 3 business days",
  storm: "Insurance claim · State Farm",
  paint: "Color A89 Phytonic Blue — preserved",
  accent: "#3b82f6"
}];
function BeforeAfterGallery() {
  const [active, setActive] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    "data-screen-label": "06 Before/After"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      alignItems: "center",
      textAlign: "center",
      margin: "0 auto 56px"
    }
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "Before & after")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "Real repairs. Drag to compare.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto"
    }
  }, "Every repair preserves your factory paint. No fillers, no spray booth, no compromises. Slide between damaged and finished to see exactly what changes."))), /*#__PURE__*/React.createElement("div", {
    className: "ba-tabs"
  }, BA_ITEMS.map((it, i) => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: "ba-tab" + (i === active ? " active" : ""),
    onClick: () => setActive(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ba-tab-no mono"
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    className: "ba-tab-title"
  }, it.title), /*#__PURE__*/React.createElement("span", {
    className: "ba-tab-vehicle"
  }, it.vehicle)))), /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement(BeforeAfterCard, {
    item: BA_ITEMS[active],
    key: BA_ITEMS[active].id
  }))), /*#__PURE__*/React.createElement("style", null, `
        .ba-tabs {
          display: grid;
          grid-template-columns: repeat(${BA_ITEMS.length}, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        .ba-tab {
          display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
          padding: 16px 20px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: var(--r);
          color: var(--fg-1);
          text-align: left;
          cursor: pointer;
          transition: all .2s var(--ease);
        }
        .ba-tab:hover { border-color: var(--border-strong); color: var(--fg); }
        .ba-tab.active {
          background: var(--bg-2);
          border-color: var(--accent);
          color: var(--fg);
          box-shadow: 0 0 0 1px var(--accent-soft), 0 8px 24px rgba(0,0,0,.3);
        }
        .ba-tab-no {
          font-family: var(--f-mono); font-size: 11px;
          color: var(--fg-2); letter-spacing: 0.1em;
        }
        .ba-tab.active .ba-tab-no { color: var(--accent-hi); }
        .ba-tab-title {
          font-family: var(--f-display); font-weight: 700; font-size: 16px;
          line-height: 1.2;
        }
        .ba-tab-vehicle {
          font-size: 12px; color: var(--fg-2);
        }
        @media (max-width: 700px) {
          .ba-tabs { grid-template-columns: 1fr; gap: 8px; }
        }
      `));
}
function BeforeAfterCard({
  item
}) {
  const [pos, setPos] = React.useState(50);
  const containerRef = React.useRef(null);
  const draggingRef = React.useRef(false);
  const startDrag = () => {
    draggingRef.current = true;
  };
  const stopDrag = () => {
    draggingRef.current = false;
  };
  const onMove = clientX => {
    if (!draggingRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  // Drag from anywhere on the slider handle
  React.useEffect(() => {
    const mm = e => onMove(e.clientX);
    const tm = e => onMove(e.touches[0].clientX);
    const up = () => stopDrag();
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchmove", tm);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  // Click anywhere on the strip to move the handle
  const onClick = e => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    setPos(x);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "ba-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-frame card",
    ref: containerRef,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-layer"
  }, /*#__PURE__*/React.createElement(CarPanelArt, {
    damaged: false,
    variant: item.id
  }), /*#__PURE__*/React.createElement("div", {
    className: "ba-tag ba-tag-after"
  }, "After")), /*#__PURE__*/React.createElement("div", {
    className: "ba-layer ba-before-clip",
    style: {
      clipPath: `inset(0 ${100 - pos}% 0 0)`
    }
  }, /*#__PURE__*/React.createElement(CarPanelArt, {
    damaged: true,
    variant: item.id
  }), /*#__PURE__*/React.createElement("div", {
    className: "ba-tag ba-tag-before"
  }, "Before")), /*#__PURE__*/React.createElement("div", {
    className: "ba-handle",
    style: {
      left: pos + "%"
    },
    onMouseDown: e => {
      e.stopPropagation();
      startDrag();
    },
    onTouchStart: e => {
      e.stopPropagation();
      startDrag();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-handle-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ba-handle-knob"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 14,
    stroke: "#fff",
    strokeWidth: 2.5
  }), /*#__PURE__*/React.createElement(ChevronRight, {
    size: 14,
    stroke: "#fff",
    strokeWidth: 2.5
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ba-caption card"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ba-cap-eyebrow"
  }, "Repair detail"), /*#__PURE__*/React.createElement("div", {
    className: "ba-cap-title"
  }, item.detail)), /*#__PURE__*/React.createElement("div", {
    className: "ba-cap-rows"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ba-cap-row"
  }, /*#__PURE__*/React.createElement(Clock, {
    size: 14,
    stroke: "var(--accent-hi)"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, item.timing))), /*#__PURE__*/React.createElement("div", {
    className: "ba-cap-row"
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 14,
    stroke: "var(--accent-hi)"
  }), /*#__PURE__*/React.createElement("span", null, item.storm)), /*#__PURE__*/React.createElement("div", {
    className: "ba-cap-row"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 14,
    stroke: "var(--accent-hi)"
  }), /*#__PURE__*/React.createElement("span", null, item.paint)))), /*#__PURE__*/React.createElement("style", null, `
        .ba-wrap {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 20px;
          align-items: stretch;
        }
        .ba-frame {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          cursor: ew-resize;
          background: var(--bg-2);
          padding: 0;
        }
        .ba-layer {
          position: absolute; inset: 0;
          overflow: hidden;
        }
        .ba-before-clip {
          /* clip-path animates smoothly */
          transition: clip-path .05s linear;
        }
        .ba-tag {
          position: absolute;
          top: 16px;
          padding: 6px 12px;
          border-radius: 999px;
          font-family: var(--f-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }
        .ba-tag-before {
          left: 16px;
          background: rgba(0,0,0,.6);
          color: #fff;
          border: 1px solid rgba(255,255,255,.15);
        }
        .ba-tag-after {
          right: 16px;
          background: rgba(34,197,94,.18);
          color: #4ade80;
          border: 1px solid rgba(34,197,94,.4);
        }
        .ba-handle {
          position: absolute;
          top: 0; bottom: 0;
          transform: translateX(-50%);
          width: 4px;
          cursor: ew-resize;
          z-index: 3;
        }
        .ba-handle-line {
          width: 2px; height: 100%;
          background: linear-gradient(180deg,
            rgba(255,255,255,.6) 0%,
            rgba(255,255,255,.9) 50%,
            rgba(255,255,255,.6) 100%);
          margin: 0 auto;
          box-shadow: 0 0 12px rgba(0,0,0,.5);
        }
        .ba-handle-knob {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 44px; height: 44px;
          border-radius: 999px;
          background: var(--accent);
          display: grid; grid-template-columns: 1fr 1fr;
          place-items: center;
          padding: 0 4px;
          box-shadow: 0 4px 16px rgba(0,0,0,.4), 0 0 0 4px rgba(255,255,255,.1);
        }
        .ba-caption {
          padding: 28px;
          display: flex; flex-direction: column;
          gap: 24px;
        }
        .ba-cap-eyebrow {
          font-family: var(--f-display); font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--fg-2);
        }
        .ba-cap-title {
          font-family: var(--f-display); font-weight: 700; font-size: 17px;
          line-height: 1.35; margin-top: 6px;
        }
        .ba-cap-rows { display: flex; flex-direction: column; gap: 12px; }
        .ba-cap-row {
          display: flex; gap: 10px; align-items: center;
          color: var(--fg-1); font-size: 13.5px; line-height: 1.45;
        }
        .ba-cap-row strong { color: var(--fg); font-weight: 600; }
        @media (max-width: 900px) {
          .ba-wrap { grid-template-columns: 1fr; }
        }
      `));
}

/* Inline car panel illustrations — variant determines layout */
function CarPanelArt({
  damaged,
  variant
}) {
  const seed = variant === "hail-roof" ? 1 : variant === "door-ding" ? 2 : 3;
  const dentCount = variant === "hail-roof" ? 60 : variant === "door-ding" ? 5 : 14;

  // Deterministic pseudo-random spots
  const dents = [];
  for (let i = 0; i < dentCount; i++) {
    const u = Math.sin(i * 12.9898 + seed * 3.123) * 43758.5453;
    const v = Math.sin(i * 78.233 + seed * 7.891) * 43758.5453;
    const x = 30 + (u - Math.floor(u)) * 540;
    const y = 80 + (v - Math.floor(v)) * 360;
    const r = 4 + Math.abs(Math.sin(i * seed)) * (variant === "door-ding" ? 8 : 6);
    dents.push({
      x,
      y,
      r
    });
  }

  // Title bar for variant
  const titles = {
    "hail-roof": "Hood / front section",
    "door-ding": "Driver's door",
    "fender": "Hood with crease"
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 600 380",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      width: "100%",
      height: "100%",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `bg-${variant}-${damaged}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#161a23"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0c0f17"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: `panel-${variant}-${damaged}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#2a3142"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#171b27"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: `reflect-${variant}-${damaged}`,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.0)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "40%",
    stopColor: "rgba(255,255,255,0.12)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "rgba(255,255,255,0.12)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0.0)"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: `dent-shade`,
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(0,0,0,0.55)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "70%",
    stopColor: "rgba(0,0,0,0.15)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(0,0,0,0)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "600",
    height: "380",
    fill: `url(#bg-${variant}-${damaged})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30 80 Q300 30 570 80 L570 320 Q300 360 30 320 Z",
    fill: `url(#panel-${variant}-${damaged})`
  }), /*#__PURE__*/React.createElement("rect", {
    x: "30",
    y: "120",
    width: "540",
    height: "80",
    fill: `url(#reflect-${variant}-${damaged})`
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30 80 Q300 30 570 80",
    fill: "none",
    stroke: "rgba(255,255,255,0.14)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30 320 Q300 360 570 320",
    fill: "none",
    stroke: "rgba(0,0,0,0.5)",
    strokeWidth: "1.5"
  }), variant === "door-ding" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "380",
    y: "170",
    width: "80",
    height: "14",
    rx: "6",
    fill: "#0a0c11",
    stroke: "rgba(255,255,255,.18)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "220",
    x2: "570",
    y2: "220",
    stroke: "rgba(0,0,0,0.3)",
    strokeWidth: "1"
  })), variant === "fender" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "200",
    x2: "570",
    y2: "200",
    stroke: "rgba(0,0,0,0.4)",
    strokeWidth: "1.5"
  }), damaged && /*#__PURE__*/React.createElement("path", {
    d: "M120 195 Q200 188 280 200 Q360 212 460 200",
    fill: "none",
    stroke: "rgba(0,0,0,0.6)",
    strokeWidth: "3",
    strokeLinecap: "round"
  })), damaged && dents.map((d, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: d.x,
    cy: d.y,
    rx: d.r,
    ry: d.r * 0.7,
    fill: "url(#dent-shade)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: d.x - d.r * 0.3,
    cy: d.y - d.r * 0.3,
    rx: d.r * 0.3,
    ry: d.r * 0.2,
    fill: "rgba(255,255,255,0.06)"
  }))), /*#__PURE__*/React.createElement("g", {
    transform: "translate(20, 20)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "180",
    height: "28",
    rx: "6",
    fill: "rgba(0,0,0,0.55)",
    stroke: "rgba(255,255,255,0.1)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "18",
    fontFamily: "var(--f-display), sans-serif",
    fontSize: "10",
    letterSpacing: "2",
    fill: "rgba(255,255,255,0.6)"
  }, titles[variant]?.toUpperCase())), damaged && /*#__PURE__*/React.createElement("g", {
    transform: "translate(440, 320)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "140",
    height: "36",
    rx: "6",
    fill: "rgba(207,54,45,0.18)",
    stroke: "rgba(207,54,45,0.5)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "23",
    fontFamily: "var(--f-display), sans-serif",
    fontSize: "14",
    fontWeight: "700",
    fill: "#ff5772"
  }, dentCount, "+ DENTS")));
}

/* =========================================================
   FAQ accordion
   ========================================================= */

const FAQS = [{
  q: "Does my insurance cover hail damage repair?",
  a: "If you carry comprehensive coverage, yes — hail damage is covered as an &lsquo;act of God.&rsquo; You&rsquo;ll pay your deductible only, and we waive deductibles up to $1,000 on qualifying claims. We work directly with every major insurer (State Farm, Allstate, USAA, Geico, Progressive, Farmers, Liberty Mutual and more) so you don&rsquo;t have to make a single phone call."
}, {
  q: "Will filing a hail claim raise my insurance rates?",
  a: "Almost never. Hail is a no-fault, weather-related event — insurance carriers treat it as an &lsquo;act of God&rsquo; and most do not raise premiums for a comprehensive hail claim. We&rsquo;re happy to confirm this with your specific carrier before you file."
}, {
  q: "What is paintless dent repair (PDR), and why does it matter?",
  a: "PDR is a specialty technique where we massage dents out of your panel from behind, using specialty rods and reflection boards — no sanding, no body filler, no spray booth. Your factory paint stays untouched, which is what protects your resale value and avoids the color mismatch that traditional body work always risks."
}, {
  q: "How long will the repair take?",
  a: "Most single-panel jobs are same-day. Full hail repairs typically take 5–10 business days depending on dent count and panel access. Catastrophic storm damage with replacement parts can run longer — we&rsquo;ll give you a firm timeline at inspection and update you with photos every couple of days."
}, {
  q: "Do you offer pickup and delivery?",
  a: "Yes — free, anywhere within 30 miles of our McKinney shop, including Frisco, Plano, Allen, Prosper, Wylie, Richardson, Carrollton, and surrounding areas. We come to your home or office, leave you with a loaner if your claim qualifies, and deliver your vehicle back washed and detailed."
}, {
  q: "Is the repair guaranteed?",
  a: "Every PDR repair we perform is backed by a written lifetime warranty for as long as you own the vehicle. If a repaired dent ever shows again — pop, crease, or memory return — we fix it free. No paperwork hassle, no fine print."
}, {
  q: "What if my paint is cracked or chipped?",
  a: "If a hail strike cracked the paint, PDR alone won&rsquo;t fix it — those panels need conventional bodywork. We&rsquo;ll identify any cracked-paint dents during inspection and coordinate the conventional repairs through our trusted network at no extra hassle to you. You&rsquo;ll still get one bill, one timeline, and one point of contact."
}, {
  q: "Do I need to be present for the inspection?",
  a: "Not necessarily. The inspection itself takes 30–45 minutes. You&rsquo;re welcome to stay and walk every panel with us, or just drop the keys and grab coffee — we&rsquo;ll text you photos and the scope before any work begins. Same goes for delivery: we&rsquo;ll meet you wherever works."
}, {
  q: "What areas do you service?",
  a: "We&rsquo;re based in McKinney, TX and cover the entire DFW metroplex including Frisco, Plano, Allen, Prosper, Wylie, Richardson, Anna, Melissa, Celina, Little Elm, and Carrollton. Outside that radius we&rsquo;ll come to you for catastrophic storm work — just ask."
}, {
  q: "Can you fix a dent without insurance?",
  a: "Absolutely. We offer flat per-panel pricing for door dings, parking-lot dents, and minor hail that doesn&rsquo;t warrant a claim. Single-panel repairs start at $125, with most jobs completed same-day at our shop."
}];
function FAQ() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    "data-screen-label": "07 FAQ"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "faq-wrap"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "FAQ")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 800,
      fontSize: "clamp(34px, 4vw, 52px)",
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
      margin: "16px 0 16px"
    }
  }, "Questions you should ask.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      fontSize: 17,
      lineHeight: 1.55,
      margin: "0 0 24px",
      maxWidth: 380
    }
  }, "Insurance, timelines, warranty, deductibles. If you don’t see your question, text us and we’ll answer the same day.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 240
  }, /*#__PURE__*/React.createElement("div", {
    className: "faq-cta card"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 600,
      fontSize: 14
    }
  }, "Still have questions?"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg-2)",
      fontSize: 13,
      marginTop: 4
    }
  }, "Text or call (214) 859-7534 anytime.")), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-sm",
    href: "sms:+12148597534"
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    size: 14
  }), " Text us")))), /*#__PURE__*/React.createElement("div", {
    className: "faq-list"
  }, FAQS.map((f, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement(FadeIn, {
      key: i,
      delay: i * 30
    }, /*#__PURE__*/React.createElement("div", {
      className: "faq-item card" + (isOpen ? " open" : "")
    }, /*#__PURE__*/React.createElement("button", {
      className: "faq-q",
      onClick: () => setOpen(isOpen ? -1 : i)
    }, /*#__PURE__*/React.createElement("span", {
      className: "faq-q-text"
    }, f.q), /*#__PURE__*/React.createElement("span", {
      className: "faq-q-icon"
    }, isOpen ? /*#__PURE__*/React.createElement(X, {
      size: 16
    }) : /*#__PURE__*/React.createElement(ChevronRight, {
      size: 16
    }))), /*#__PURE__*/React.createElement("div", {
      className: "faq-a-wrap",
      style: {
        maxHeight: isOpen ? 500 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "faq-a",
      dangerouslySetInnerHTML: {
        __html: f.a
      }
    }))));
  })))), /*#__PURE__*/React.createElement("style", null, `
        .faq-wrap {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 56px;
          align-items: flex-start;
        }
        .faq-cta {
          display: flex; gap: 16px; align-items: center; justify-content: space-between;
          padding: 18px;
        }
        .faq-list { display: flex; flex-direction: column; gap: 10px; }
        .faq-item { transition: all .2s var(--ease); }
        .faq-item.open {
          border-color: var(--border-strong);
          background: linear-gradient(180deg, var(--bg-3), var(--bg-2));
        }
        .faq-q {
          width: 100%;
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          padding: 20px 22px;
          background: transparent; border: 0;
          color: var(--fg); text-align: left;
          font-family: var(--f-display); font-weight: 600; font-size: 16px;
          cursor: pointer;
        }
        .faq-q-icon {
          flex: 0 0 auto;
          width: 28px; height: 28px;
          border-radius: 999px;
          background: var(--accent-soft);
          color: var(--accent-hi);
          display: grid; place-items: center;
          transition: transform .25s var(--ease);
        }
        .faq-item.open .faq-q-icon { transform: rotate(90deg); }
        .faq-a-wrap {
          overflow: hidden;
          transition: max-height .35s var(--ease);
        }
        .faq-a {
          padding: 0 22px 22px;
          color: var(--fg-1);
          font-size: 14.5px;
          line-height: 1.65;
        }
        @media (max-width: 900px) {
          .faq-wrap { grid-template-columns: 1fr; gap: 32px; }
        }
      `));
}

/* =========================================================
   SERVICE AREAS (DFW cities)
   ========================================================= */

const CITIES = [{
  name: "McKinney",
  note: "Home shop",
  featured: true
}, {
  name: "Frisco"
}, {
  name: "Plano"
}, {
  name: "Allen"
}, {
  name: "Prosper"
}, {
  name: "Wylie"
}, {
  name: "Richardson"
}, {
  name: "Anna"
}, {
  name: "Melissa"
}, {
  name: "Celina"
}, {
  name: "Little Elm"
}, {
  name: "The Colony"
}, {
  name: "Carrollton"
}, {
  name: "Lewisville"
}, {
  name: "Garland"
}, {
  name: "Dallas"
}];
function ServiceAreas() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    "data-screen-label": "08 Service Areas",
    style: {
      background: "var(--bg-1)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      alignItems: "center",
      textAlign: "center",
      margin: "0 auto 56px"
    }
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "Service area")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "Free pickup across DFW.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto"
    }
  }, "We’re based in McKinney and serve every neighborhood in the DFW metroplex. Free pickup and delivery anywhere within 30 miles. Catastrophic storm response, further out on request."))), /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
    className: "sa-grid"
  }, CITIES.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    className: "sa-tile" + (c.featured ? " featured" : "")
  }, /*#__PURE__*/React.createElement(MapPin, {
    size: 14,
    stroke: c.featured ? "#fff" : "var(--accent-hi)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sa-name"
  }, c.name, ", TX"), c.note && /*#__PURE__*/React.createElement("div", {
    className: "sa-note"
  }, c.note))))))), /*#__PURE__*/React.createElement("style", null, `
        .sa-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .sa-tile {
          display: flex; align-items: center; gap: 10px;
          padding: 16px 18px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: var(--r);
          transition: all .15s;
        }
        .sa-tile:hover {
          border-color: var(--accent);
          background: var(--bg-3);
        }
        .sa-tile.featured {
          background: var(--accent);
          border-color: var(--accent);
        }
        .sa-tile.featured .sa-name,
        .sa-tile.featured .sa-note { color: #fff; }
        .sa-name {
          font-family: var(--f-display); font-weight: 600; font-size: 14px;
        }
        .sa-note {
          font-size: 11px; color: rgba(255,255,255,.8);
          font-family: var(--f-display); font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; margin-top: 2px;
        }
        @media (max-width: 900px) { .sa-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 560px) { .sa-grid { grid-template-columns: repeat(2, 1fr); } }
      `));
}
Object.assign(window, {
  BeforeAfterGallery,
  BeforeAfterCard,
  CarPanelArt,
  FAQ,
  FAQS,
  ServiceAreas,
  CITIES
});
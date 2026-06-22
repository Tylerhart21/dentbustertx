/* global React, FadeIn, PageHeader, FinalCTA, Counter */

const REVIEWS = [{
  name: "Jason M.",
  location: "McKinney, TX",
  rating: 5,
  text: "These guys are the best! They handled everything with the insurance and got my truck fixed perfectly. Highly recommend Dent Busters — the entire process was so smooth I was almost suspicious.",
  vehicle: "2022 Ford F-150",
  initials: "JM",
  color: "#e11d48",
  date: "3 weeks ago"
}, {
  name: "Amanda R.",
  location: "Frisco, TX",
  rating: 5,
  text: "Amazing service from start to finish. They even helped with my rental. You can't even tell my car had hail damage — and the team kept me updated with photos every couple of days during the repair.",
  vehicle: "2021 Honda Pilot",
  initials: "AR",
  color: "#f97316",
  date: "1 month ago"
}, {
  name: "Chris T.",
  location: "Allen, TX",
  rating: 5,
  text: "Professional, fast, and honest. Zero out of pocket like they said. Great communication and awesome results! The free ceramic coat they threw in is a serious upgrade — paint looks better than the day I bought it.",
  vehicle: "2023 Tesla Model Y",
  initials: "CT",
  color: "#3b82f6",
  date: "2 months ago"
}, {
  name: "Sarah P.",
  location: "Plano, TX",
  rating: 5,
  text: "I was dreading the whole hail damage process after the March storm. Dent Busters made it the easiest car repair I've ever dealt with. They even came to my office to pick up the car.",
  vehicle: "2020 Lexus RX",
  initials: "SP",
  color: "#22c55e",
  date: "2 months ago"
}, {
  name: "Marcus L.",
  location: "Richardson, TX",
  rating: 5,
  text: "Honestly the most legit body shop experience I've had in Texas. They explained PDR in a way I actually understood, didn't try to upsell, and got me back on the road fast. Real craftsmen.",
  vehicle: "2019 Audi Q5",
  initials: "ML",
  color: "#eab308",
  date: "3 months ago"
}, {
  name: "Renata C.",
  location: "Prosper, TX",
  rating: 5,
  text: "Had a fender bender plus old hail dents to fix. Quality of work is incredible — couldn't find a single trace. Front desk team is warm and unhurried, which I appreciated. Will use them again.",
  vehicle: "2024 BMW X3",
  initials: "RC",
  color: "#a855f7",
  date: "4 months ago"
}, {
  name: "David K.",
  location: "Wylie, TX",
  rating: 5,
  text: "Texas hail nearly totaled my truck — every panel had damage. They saved the truck and saved my factory paint. Insurance check covered everything. These folks are the real deal.",
  vehicle: "2021 RAM 1500",
  initials: "DK",
  color: "#06b6d4",
  date: "5 months ago"
}];
function ReviewsCarousel() {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const containerRef = React.useRef(null);

  // Autoplay
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % REVIEWS.length), 5500);
    return () => clearInterval(t);
  }, [paused]);
  const visible = React.useMemo(() => {
    const len = REVIEWS.length;
    return [REVIEWS[(idx - 1 + len) % len], REVIEWS[idx], REVIEWS[(idx + 1) % len]];
  }, [idx]);
  const next = () => setIdx(i => (i + 1) % REVIEWS.length);
  const prev = () => setIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    style: {
      position: "relative"
    },
    ref: containerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "reviews-carousel-track"
  }, visible.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: idx + "-" + i,
    className: "review-card card " + ["side", "center", "side"][i]
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-stars"
  }, Array.from({
    length: 5
  }).map((_, j) => /*#__PURE__*/React.createElement(Star, {
    key: j,
    size: 16,
    stroke: "#facc15"
  })), /*#__PURE__*/React.createElement("span", {
    className: "review-platform"
  }, /*#__PURE__*/React.createElement(Google, {
    size: 14
  }), " Google")), /*#__PURE__*/React.createElement("p", {
    className: "review-text"
  }, "“", r.text, "”"), /*#__PURE__*/React.createElement("div", {
    className: "review-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-avatar",
    style: {
      background: r.color + "33",
      color: r.color
    }
  }, r.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-name"
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "review-loc"
  }, r.location, " · ", r.vehicle)), /*#__PURE__*/React.createElement("div", {
    className: "review-date"
  }, r.date))))), /*#__PURE__*/React.createElement("div", {
    className: "reviews-controls"
  }, /*#__PURE__*/React.createElement("button", {
    className: "rc-btn",
    onClick: prev,
    "aria-label": "Previous review"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "rc-dots"
  }, REVIEWS.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "rc-dot" + (i === idx ? " active" : ""),
    onClick: () => setIdx(i),
    "aria-label": "Go to review " + (i + 1)
  }))), /*#__PURE__*/React.createElement("button", {
    className: "rc-btn",
    onClick: next,
    "aria-label": "Next review"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 18
  }))), /*#__PURE__*/React.createElement("style", null, `
        .reviews-carousel-track {
          display: grid;
          grid-template-columns: 1fr 1.6fr 1fr;
          gap: 20px;
          align-items: stretch;
          min-height: 320px;
        }
        .review-card {
          padding: 32px;
          display: flex; flex-direction: column;
          animation: reviewSwap .55s var(--ease) both;
        }
        .review-card.side {
          opacity: 0.45;
          transform: scale(0.96);
          filter: blur(0.5px);
          transition: all .35s var(--ease);
        }
        .review-card.center {
          background: linear-gradient(180deg, var(--bg-3), var(--bg-2));
          border-color: var(--border-strong);
          box-shadow: var(--shadow-lg);
        }
        @keyframes reviewSwap {
          from { opacity: 0; transform: translateX(20px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .review-card.side { animation: none; }
        .review-stars {
          display: flex; align-items: center; gap: 3px;
          margin-bottom: 18px;
        }
        .review-platform {
          margin-left: auto; display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--fg-2); font-weight: 500;
        }
        .review-text {
          color: var(--fg);
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 28px;
          flex: 1;
        }
        .review-meta {
          display: flex; align-items: center; gap: 12px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }
        .review-avatar {
          width: 44px; height: 44px; border-radius: 999px;
          display: grid; place-items: center;
          font-family: var(--f-display); font-weight: 700; font-size: 14px;
        }
        .review-name { font-family: var(--f-display); font-weight: 700; font-size: 14.5px; }
        .review-loc { color: var(--fg-2); font-size: 12.5px; }
        .review-date {
          font-family: var(--f-display); font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-3);
        }
        .reviews-controls {
          display: flex; align-items: center; justify-content: center; gap: 24px;
          margin-top: 36px;
        }
        .rc-btn {
          width: 44px; height: 44px; border-radius: 999px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          color: var(--fg);
          display: grid; place-items: center;
          transition: all .15s;
        }
        .rc-btn:hover {
          border-color: var(--accent);
          color: var(--accent-hi);
        }
        .rc-dots { display: flex; gap: 6px; }
        .rc-dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: var(--border-strong); border: 0;
          padding: 0; cursor: pointer;
          transition: all .2s;
        }
        .rc-dot.active {
          background: var(--accent);
          width: 22px;
        }
        @media (max-width: 900px) {
          .reviews-carousel-track {
            grid-template-columns: 1fr;
          }
          .review-card.side { display: none; }
        }
      `));
}
function ReviewsPage({
  setPage
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-enter"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Customer reviews",
    title: "100+ five-star repairs and counting.",
    sub: "Real reviews from real Texans across the DFW metroplex. Read every one — we don't filter, hide, or buy them."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "60px 0 0",
      background: "var(--bg-1)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rev-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rev-hero-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rev-hero-num mono"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: 5.0,
    decimals: 1
  })), /*#__PURE__*/React.createElement("div", {
    className: "rev-hero-stars"
  }, [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement(Star, {
    key: i,
    size: 20,
    stroke: "#facc15"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rev-hero-lbl"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: 120
  }), "+ verified Google reviews")), /*#__PURE__*/React.createElement("div", {
    className: "rev-bars"
  }, [[5, 120, "#22c55e"], [4, 0, "#84cc16"], [3, 0, "#eab308"], [2, 0, "#f97316"], [1, 0, "#ef4444"]].map(([stars, count, color]) => /*#__PURE__*/React.createElement("div", {
    key: stars,
    className: "rev-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rev-bar-lbl"
  }, stars, " ", /*#__PURE__*/React.createElement(Star, {
    size: 11,
    stroke: "#facc15"
  })), /*#__PURE__*/React.createElement("div", {
    className: "rev-bar-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rev-bar-fill",
    style: {
      width: count / 120 * 100 + "%",
      background: color
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "rev-bar-count mono"
  }, count)))))), /*#__PURE__*/React.createElement("style", null, `
          .rev-hero {
            display: grid;
            grid-template-columns: 1fr 1.4fr;
            gap: 48px;
            align-items: center;
            padding-bottom: 60px;
          }
          .rev-hero-num {
            font-size: clamp(72px, 9vw, 140px);
            font-weight: 700;
            letter-spacing: -0.04em;
            color: transparent;
            background: linear-gradient(135deg, var(--accent-hi), var(--accent));
            -webkit-background-clip: text; background-clip: text;
            line-height: 1;
          }
          .rev-hero-stars { display: flex; gap: 4px; margin-top: 12px; }
          .rev-hero-lbl {
            font-family: var(--f-display); margin-top: 14px;
            color: var(--fg-1); font-size: 16px; font-weight: 600;
          }
          .rev-bars { display: flex; flex-direction: column; gap: 12px; }
          .rev-bar {
            display: grid; grid-template-columns: 60px 1fr 50px;
            gap: 14px; align-items: center;
          }
          .rev-bar-lbl {
            font-family: var(--f-display); font-weight: 600;
            color: var(--fg-1); font-size: 14px;
            display: inline-flex; align-items: center; gap: 4px;
          }
          .rev-bar-track {
            height: 8px; border-radius: 999px;
            background: var(--bg-3); overflow: hidden;
          }
          .rev-bar-fill {
            height: 100%; border-radius: 999px;
            transition: width 1.5s var(--ease);
          }
          .rev-bar-count { color: var(--fg-2); font-size: 13px; text-align: right; }
          @media (max-width: 800px) {
            .rev-hero { grid-template-columns: 1fr; gap: 32px; }
          }
        `)), /*#__PURE__*/React.createElement("section", {
    className: "section"
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
  }, "Featured testimonials")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "What customers say."))), /*#__PURE__*/React.createElement(ReviewsCarousel, null))), /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      background: "var(--bg-1)",
      borderTop: "1px solid var(--border)"
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
  }, "Wall of love")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "Every story matters."))), /*#__PURE__*/React.createElement("div", {
    className: "rev-wall"
  }, REVIEWS.map((r, i) => /*#__PURE__*/React.createElement(FadeIn, {
    key: i,
    delay: i * 40
  }, /*#__PURE__*/React.createElement("div", {
    className: "rev-wall-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-stars"
  }, Array.from({
    length: 5
  }).map((_, j) => /*#__PURE__*/React.createElement(Star, {
    key: j,
    size: 13,
    stroke: "#facc15"
  })), /*#__PURE__*/React.createElement("span", {
    className: "review-platform"
  }, /*#__PURE__*/React.createElement(Google, {
    size: 12
  }))), /*#__PURE__*/React.createElement("p", {
    className: "rev-wall-text"
  }, "“", r.text, "”"), /*#__PURE__*/React.createElement("div", {
    className: "review-meta",
    style: {
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-avatar",
    style: {
      background: r.color + "33",
      color: r.color,
      width: 36,
      height: 36,
      fontSize: 12
    }
  }, r.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "review-name"
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "review-loc"
  }, r.location, " · ", r.vehicle)))))))), /*#__PURE__*/React.createElement("style", null, `
          .rev-wall {
            columns: 3;
            column-gap: 20px;
          }
          .rev-wall > * { break-inside: avoid; margin-bottom: 20px; }
          .rev-wall-card { padding: 24px; }
          .rev-wall-text {
            color: var(--fg-1); font-size: 14.5px; line-height: 1.6;
            margin: 14px 0 18px;
          }
          @media (max-width: 900px) { .rev-wall { columns: 2; } }
          @media (max-width: 560px) { .rev-wall { columns: 1; } }
        `)), /*#__PURE__*/React.createElement(FinalCTA, {
    setPage: setPage
  }));
}
Object.assign(window, {
  ReviewsPage,
  ReviewsCarousel,
  REVIEWS
});
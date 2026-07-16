/* global React, ReactDOM, Nav, Footer, Hero, ServicesGrid, ProcessPreview, InsuranceBar, StatsBand, FinalCTA, ServicesPage, ProcessPage, ReviewsPage, ContactPage, BookingWizard, ReviewsCarousel, FadeIn, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e11b22",
  "heroVariant": "graphic",
  "fontPair": "banner",
  "showMarquee": true,
  "showFloatingChat": false
} /*EDITMODE-END*/;
const ACCENT_PRESETS = {
  "#e11b22": {
    name: "Banner Red",
    hi: "#ff4d4d",
    "2": "#f22a30",
    dim: "#8f1015"
  },
  "#cf362d": {
    name: "Logo Red",
    hi: "#ee5d52",
    "2": "#dc4a41",
    dim: "#9a2820"
  },
  "#e11d48": {
    name: "Crimson",
    hi: "#ff5772",
    "2": "#f43f5e",
    dim: "#9f1239"
  },
  "#ea580c": {
    name: "Ember",
    hi: "#fb923c",
    "2": "#f97316",
    dim: "#9a3412"
  },
  "#eab308": {
    name: "Bolt",
    hi: "#fde047",
    "2": "#facc15",
    dim: "#854d0e"
  },
  "#2563eb": {
    name: "Steel",
    hi: "#60a5fa",
    "2": "#3b82f6",
    dim: "#1d4ed8"
  }
};

// headline = big statements only (h1/h2). display = UI chrome (nav, buttons,
// labels) — a condensed face like Anton is unreadable at those sizes.
// *Weights: some faces ship a single weight (Anton); asking the Google Fonts
// API for the full range makes it reject the whole request.
const FONT_PAIRS = {
  "banner": {
    headline: "Anton",
    headlineWeights: "400",
    display: "Archivo",
    body: "Inter",
    label: "Anton · Archivo · Inter (banner)"
  },
  "archivo-inter": {
    display: "Archivo",
    body: "Inter",
    label: "Archivo · Inter"
  },
  "spacegrotesk-inter": {
    display: "Space Grotesk",
    body: "Inter",
    label: "Space Grotesk · Inter"
  },
  "manrope-manrope": {
    display: "Manrope",
    body: "Manrope",
    label: "Manrope"
  }
};
function App() {
  const [page, setPage] = React.useState("home");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Scroll to top on page change
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [page]);

  // Apply accent tweak
  React.useEffect(() => {
    const preset = ACCENT_PRESETS[t.accent] || ACCENT_PRESETS["#e11d48"];
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent-2", preset["2"]);
    document.documentElement.style.setProperty("--accent-hi", preset.hi);
    document.documentElement.style.setProperty("--accent-dim", preset.dim);
    // alpha versions
    const hex = t.accent.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    document.documentElement.style.setProperty("--accent-glow", `rgba(${r},${g},${b},0.42)`);
    document.documentElement.style.setProperty("--accent-soft", `rgba(${r},${g},${b},0.10)`);
  }, [t.accent]);

  // Apply font tweak
  React.useEffect(() => {
    const pair = FONT_PAIRS[t.fontPair];
    if (!pair) return;
    // Inject Google fonts if needed
    const link = document.getElementById("dynamic-fonts") || (() => {
      const l = document.createElement("link");
      l.id = "dynamic-fonts";
      l.rel = "stylesheet";
      document.head.appendChild(l);
      return l;
    })();
    const DEFAULT_W = "400;500;600;700;800;900";
    const specs = [];
    const add = (fam, w) => {
      if (!fam || specs.some(s => s.fam === fam)) return;
      specs.push({
        fam,
        w: w === undefined ? DEFAULT_W : w
      });
    };
    add(pair.headline, pair.headlineWeights);
    add(pair.display, pair.displayWeights);
    add(pair.body, pair.bodyWeights);
    link.href = "https://fonts.googleapis.com/css2?" + specs.map(s => `family=${encodeURIComponent(s.fam)}${s.w ? `:wght@${s.w}` : ""}`).join("&") + "&display=swap";
    document.documentElement.style.setProperty("--f-display", `"${pair.display}", system-ui, sans-serif`);
    document.documentElement.style.setProperty("--f-body", `"${pair.body}", system-ui, sans-serif`);
    document.documentElement.style.setProperty("--f-headline", `"${pair.headline || pair.display}", "${pair.display}", system-ui, sans-serif`);
  }, [t.fontPair]);
  const pageEl = (() => {
    switch (page) {
      case "services":
        return /*#__PURE__*/React.createElement(ServicesPage, {
          setPage: setPage
        });
      case "detailing":
        return /*#__PURE__*/React.createElement(DetailingPage, {
          setPage: setPage
        });
      case "protection":
        return /*#__PURE__*/React.createElement(PaintProtectionPage, {
          setPage: setPage
        });
      case "process":
        return /*#__PURE__*/React.createElement(ProcessPage, {
          setPage: setPage
        });
      case "reviews":
        return /*#__PURE__*/React.createElement(ReviewsPage, {
          setPage: setPage
        });
      case "contact":
        return /*#__PURE__*/React.createElement(ContactPage, {
          setPage: setPage
        });
      default:
        return /*#__PURE__*/React.createElement(HomePage, {
          setPage: setPage,
          tweaks: t
        });
    }
  })();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        :root {
          --gold: #f5b325;
          --gold-hi: #ffd166;
          --gold-soft: rgba(245,179,37,.12);
        }
        /* The heavy condensed face is for big statements only — the banner uses
           it for the wordmark, not the small print. Nav/buttons/labels keep
           --f-display so they stay readable. font-synthesis:none because Anton
           ships one weight and would otherwise get faux-bolded into mush. */
        h1, h2, .display, .hero-h1, .hero-tagline span, .logo-word {
          font-family: var(--f-headline, var(--f-display));
          font-synthesis: none;
        }
        /* Nav/footer wordmark — same treatment as the banner lettering:
           heavy condensed caps, leaning right, outlined. */
        .logo-word {
          font-weight: 400;
          font-size: 21px;
          line-height: 1;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          white-space: nowrap;
          color: var(--fg);
          transform: skewX(-8deg);
          transform-origin: left center;
          -webkit-text-stroke: 1.2px #080a0f;
          paint-order: stroke fill;
        }
        .logo-sub {
          font-family: var(--f-display);
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          white-space: nowrap;
          color: var(--accent-hi);
          margin-top: 3px;
        }
        /* Gold on the trust row, mirroring the gold badges on the shop banner.
           Declared after those rules ship their own <style>, hence !important. */
        .ins-icon {
          background: var(--gold-soft) !important;
          color: var(--gold-hi) !important;
          border-color: rgba(245,179,37,.28) !important;
        }
      `), /*#__PURE__*/React.createElement(Nav, {
    page: page,
    setPage: setPage
  }), /*#__PURE__*/React.createElement("main", null, pageEl), /*#__PURE__*/React.createElement(Footer, {
    setPage: setPage
  }), /*#__PURE__*/React.createElement(LightningLayer, null), t.showFloatingChat && /*#__PURE__*/React.createElement(FloatingChat, {
    setPage: setPage
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    title: "Brand accent"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    t: t,
    setTweak: setTweak,
    tKey: "accent",
    label: "Accent",
    options: Object.keys(ACCENT_PRESETS)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    title: "Typography"
  }, /*#__PURE__*/React.createElement(TweakSelect, {
    t: t,
    setTweak: setTweak,
    tKey: "fontPair",
    label: "Font pairing",
    options: Object.entries(FONT_PAIRS).map(([k, v]) => ({
      value: k,
      label: v.label
    }))
  })), /*#__PURE__*/React.createElement(TweakSection, {
    title: "Display"
  }, /*#__PURE__*/React.createElement(TweakToggle, {
    t: t,
    setTweak: setTweak,
    tKey: "showMarquee",
    label: "Trust marquee on hero"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    t: t,
    setTweak: setTweak,
    tKey: "showFloatingChat",
    label: "Floating chat widget"
  }))));
}

/* Small custom Select wrapper around our select element since Tweaks starter may not have one with object opts */
function TweakSelect({
  t,
  setTweak,
  tKey,
  label,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--fg-2)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    className: "select",
    value: t[tKey],
    onChange: e => setTweak(tKey, e.target.value),
    style: {
      width: "100%"
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))));
}

/* Home Page assembly */
function HomePage({
  setPage,
  tweaks
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-enter"
  }, /*#__PURE__*/React.createElement(Hero, {
    setPage: setPage
  }), /*#__PURE__*/React.createElement(InsuranceBar, null), /*#__PURE__*/React.createElement(ServicesGrid, {
    setPage: setPage
  }), /*#__PURE__*/React.createElement(StatsBand, null), /*#__PURE__*/React.createElement(ProcessPreview, {
    setPage: setPage
  }), /*#__PURE__*/React.createElement(WhyPDR, {
    setPage: setPage
  }), /*#__PURE__*/React.createElement("section", {
    className: "section",
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
  }, "What customers say")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "Real Texans. Real reviews.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto"
    }
  }, "5.0 stars across 120+ verified Google reviews. Read every single one — we have nothing to hide."))), /*#__PURE__*/React.createElement(ReviewsCarousel, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => setPage("reviews")
  }, "See all reviews ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  }))))), /*#__PURE__*/React.createElement(ServiceAreas, null), /*#__PURE__*/React.createElement(MeetTheTeam, {
    setPage: setPage
  }), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(FinalCTA, {
    setPage: setPage
  }));
}

/* Floating "Text us" chat-like widget */
function FloatingChat({
  setPage
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !open && /*#__PURE__*/React.createElement("button", {
    className: "fc-bubble",
    onClick: () => setOpen(true),
    "aria-label": "Open chat"
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    size: 18,
    stroke: "#fff"
  }), /*#__PURE__*/React.createElement("span", null, "Need help? Text us")), open && /*#__PURE__*/React.createElement("div", {
    className: "fc-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-head"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-dot"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fc-head-title"
  }, "Dent Busters · Online"), /*#__PURE__*/React.createElement("div", {
    className: "fc-head-sub"
  }, "Replies in ~5 minutes"))), /*#__PURE__*/React.createElement("button", {
    className: "fc-close",
    onClick: () => setOpen(false),
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fc-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-msg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-msg-bubble"
  }, /*#__PURE__*/React.createElement("strong", null, "Hey there 👋"), /*#__PURE__*/React.createElement("br", null), "Quickest way to get a quote is to text us a few photos. Or book an inspection — we’ll do the rest."), /*#__PURE__*/React.createElement("div", {
    className: "fc-msg-meta"
  }, "Dent Busters · just now"))), /*#__PURE__*/React.createElement("div", {
    className: "fc-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary",
    href: "sms:+12148597534",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    size: 15
  }), " Text (214) 859-7534"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => {
      setOpen(false);
      setPage("contact");
    },
    style: {
      width: "100%",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 15
  }), " Book inspection instead"))), /*#__PURE__*/React.createElement("style", null, `
        .fc-bubble {
          position: fixed; bottom: 24px; right: 24px; z-index: 40;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 18px;
          background: var(--accent);
          color: #fff;
          border: 0;
          border-radius: 999px;
          font-family: var(--f-display);
          font-weight: 600; font-size: 14px;
          box-shadow: var(--shadow-accent), 0 24px 60px rgba(0,0,0,.4);
          cursor: pointer;
          animation: fcSlide .5s var(--ease) both;
        }
        .fc-bubble:hover { background: var(--accent-2); transform: translateY(-1px); }
        @keyframes fcSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fc-panel {
          position: fixed; bottom: 24px; right: 24px; z-index: 40;
          width: 320px;
          background: var(--bg-1);
          border: 1px solid var(--border-strong);
          border-radius: var(--r-lg);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: fcSlide .35s var(--ease) both;
        }
        .fc-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px;
          background: var(--bg-2);
          border-bottom: 1px solid var(--border);
        }
        .fc-dot {
          width: 10px; height: 10px; border-radius: 999px;
          background: #22c55e; box-shadow: 0 0 0 4px rgba(34,197,94,.25);
        }
        .fc-head-title { font-family: var(--f-display); font-weight: 700; font-size: 13.5px; }
        .fc-head-sub { color: var(--fg-2); font-size: 11.5px; margin-top: 2px; }
        .fc-close {
          background: transparent; border: 0; color: var(--fg-2);
          width: 28px; height: 28px; border-radius: 6px; cursor: pointer;
          display: grid; place-items: center;
        }
        .fc-close:hover { background: var(--bg-3); color: var(--fg); }
        .fc-body { padding: 16px; }
        .fc-msg-bubble {
          padding: 12px 14px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 12px 12px 12px 4px;
          color: var(--fg);
          font-size: 13.5px;
          line-height: 1.5;
        }
        .fc-msg-meta {
          font-size: 11px; color: var(--fg-3);
          margin-top: 4px; padding-left: 4px;
        }
        .fc-actions { padding: 12px 16px 16px; }
        @media (max-width: 480px) {
          .fc-panel { right: 12px; left: 12px; width: auto; }
          .fc-bubble { right: 12px; bottom: 12px; }
        }
      `));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
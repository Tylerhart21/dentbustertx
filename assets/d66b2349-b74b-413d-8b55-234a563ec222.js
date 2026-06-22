/* global React, FadeIn, PageHeader, FinalCTA */

/* =========================================================
   DETAILING PAGE — tiered pricing + add-ons
   ========================================================= */

const DETAIL_TIERS = [{
  id: "wash",
  name: "The Maintenance Wash",
  price: 99,
  tagline: "Keep it clean between visits.",
  icon: "Droplet",
  features: ["Hand wash, foam &amp; rinse", "Wheels &amp; tires cleaned and dressed", "All exterior glass", "Quick interior vacuum", "Interior wipe-down"]
}, {
  id: "interior",
  name: "Interior Detail",
  price: 179,
  tagline: "A reset for the inside.",
  icon: "Sparkles",
  features: ["Full vacuum — seats, carpets, trunk", "Carpet &amp; upholstery shampoo + hot-water extraction", "Steam clean of all surfaces", "Leather clean &amp; condition", "Interior glass &amp; trim dressed"]
}, {
  id: "exterior",
  name: "Exterior Detail",
  price: 179,
  tagline: "Paint that turns heads.",
  icon: "CarFront",
  features: ["Hand wash &amp; foam bath", "Clay-bar decontamination", "Machine-applied paint sealant", "Wheels &amp; tires deep-cleaned", "All exterior glass polished"]
}, {
  id: "full",
  name: "The Full Detail",
  badge: "Showroom",
  price: 299,
  tagline: "Everything. Inside and out.",
  icon: "Trophy",
  featured: true,
  features: ["Everything in the Interior Detail", "Everything in the Exterior Detail", "Clay-bar + paint sealant", "Hot-water extraction + steam", "Leather condition + interior dressing", "Final inspection &amp; hand finish"]
}];
const DETAIL_ADDONS = [{
  name: "Engine Bay Detail",
  price: "$150",
  icon: "Wrench"
}, {
  name: "Pet Hair Removal",
  price: "+$50",
  icon: "ThumbsUp"
}, {
  name: "Odor / Ozone Treatment",
  price: "$129",
  icon: "Droplet"
}, {
  name: "Headlight Restoration",
  price: "$99",
  icon: "Sparkles"
}, {
  name: "Single-Stage Paint Correction",
  price: "from $299",
  icon: "Shield"
}];
function DetailingPage({
  setPage
}) {
  const iconMap = {
    Droplet,
    Sparkles,
    CarFront,
    Trophy,
    Wrench,
    ThumbsUp,
    Shield
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "page-enter"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Auto detailing",
    title: "We made your paint flawless. Now keep it that way.",
    sub: "Detailing is the natural companion to hail repair — once your panels are perfect, regular detailing protects the finish, the resale value, and the way it feels to drive. Pick a package, or build your own with add-ons."
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-grid"
  }, DETAIL_TIERS.map((tier, i) => {
    const Ic = iconMap[tier.icon];
    return /*#__PURE__*/React.createElement(FadeIn, {
      key: tier.id,
      delay: i * 70
    }, /*#__PURE__*/React.createElement("div", {
      className: "detail-card card" + (tier.featured ? " featured" : "")
    }, tier.badge && /*#__PURE__*/React.createElement("div", {
      className: "detail-badge"
    }, tier.badge, " · Best value"), /*#__PURE__*/React.createElement("div", {
      className: "detail-card-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "detail-icon"
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      className: "detail-tagline"
    }, tier.tagline)), /*#__PURE__*/React.createElement("h3", {
      className: "detail-name"
    }, tier.name), /*#__PURE__*/React.createElement("div", {
      className: "detail-price"
    }, /*#__PURE__*/React.createElement("span", {
      className: "detail-price-from"
    }, "Starting at"), /*#__PURE__*/React.createElement("span", {
      className: "detail-price-num"
    }, "$", tier.price)), /*#__PURE__*/React.createElement("ul", {
      className: "detail-features"
    }, tier.features.map((f, j) => /*#__PURE__*/React.createElement("li", {
      key: j
    }, /*#__PURE__*/React.createElement(Check, {
      size: 15,
      stroke: tier.featured ? "var(--accent-hi)" : "#4ade80",
      strokeWidth: 2.4
    }), /*#__PURE__*/React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: f
      }
    })))), /*#__PURE__*/React.createElement("button", {
      className: "btn " + (tier.featured ? "btn-primary" : "btn-ghost"),
      style: {
        width: "100%",
        marginTop: "auto"
      },
      onClick: () => setPage("contact")
    }, "Book ", tier.name.replace("The ", ""), " ", /*#__PURE__*/React.createElement(ArrowRight, {
      size: 14
    }))));
  })), /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
    className: "addons"
  }, /*#__PURE__*/React.createElement("div", {
    className: "addons-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "Add-ons"), /*#__PURE__*/React.createElement("h3", {
    className: "addons-title"
  }, "Make it yours."), /*#__PURE__*/React.createElement("p", {
    className: "addons-sub"
  }, "Stack any of these onto a package or book them on their own.")), /*#__PURE__*/React.createElement("div", {
    className: "addons-grid"
  }, DETAIL_ADDONS.map((a, i) => {
    const Ic = iconMap[a.icon];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "addon-card card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "addon-icon"
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      className: "addon-name"
    }, a.name), /*#__PURE__*/React.createElement("div", {
      className: "addon-price"
    }, a.price));
  })))), /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("p", {
    className: "detail-footnote"
  }, "Pricing varies by vehicle size and condition. SUVs, trucks, and heavily soiled vehicles are priced on inspection. Contact us for an exact quote."))), /*#__PURE__*/React.createElement("style", null, `
          .detail-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            margin-bottom: 80px;
            padding-top: 14px;
          }
          .detail-card {
            padding: 28px;
            display: flex; flex-direction: column;
            position: relative;
          }
          .detail-card.featured {
            background: linear-gradient(180deg, var(--bg-3), var(--bg-2));
            border-color: var(--accent);
            box-shadow: 0 0 0 1px var(--accent-soft), var(--shadow-lg);
            overflow: visible;
            padding-top: 34px;
          }
          .detail-badge {
            position: absolute;
            top: 0; left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent);
            color: #fff;
            font-family: var(--f-display);
            font-size: 10px; font-weight: 700;
            letter-spacing: 0.14em; text-transform: uppercase;
            padding: 6px 14px;
            border-radius: 999px;
            white-space: nowrap;
            box-shadow: var(--shadow-accent);
          }
          .detail-card-head {
            display: flex; align-items: center; gap: 12px;
            margin-bottom: 18px;
          }
          .detail-icon {
            width: 40px; height: 40px;
            border-radius: 10px;
            background: var(--accent-soft);
            color: var(--accent-hi);
            border: 1px solid rgba(207,54,45,.25);
            display: grid; place-items: center;
            flex: 0 0 auto;
          }
          .detail-tagline {
            font-family: var(--f-display); font-size: 13px;
            color: var(--fg-2); font-style: italic;
            line-height: 1.3;
          }
          .detail-name {
            font-family: var(--f-display); font-weight: 800;
            font-size: 20px; letter-spacing: -0.01em;
            margin: 0 0 14px; line-height: 1.15;
          }
          .detail-price {
            display: flex; flex-direction: column;
            padding-bottom: 20px; margin-bottom: 20px;
            border-bottom: 1px solid var(--border);
          }
          .detail-price-from {
            font-family: var(--f-display); font-size: 11px;
            letter-spacing: 0.14em; text-transform: uppercase;
            color: var(--fg-2);
          }
          .detail-price-num {
            font-family: var(--f-display); font-weight: 800;
            font-size: 42px; letter-spacing: -0.03em;
            color: var(--fg); line-height: 1;
            margin-top: 4px;
          }
          .detail-features {
            list-style: none; padding: 0; margin: 0 0 24px;
            display: flex; flex-direction: column; gap: 11px;
          }
          .detail-features li {
            display: flex; gap: 10px; align-items: flex-start;
            color: var(--fg-1); font-size: 13.5px; line-height: 1.4;
          }
          .detail-features li svg { flex: 0 0 auto; margin-top: 2px; }

          .addons {
            padding: 40px;
            background: var(--bg-1);
            border: 1px solid var(--border);
            border-radius: var(--r-xl);
          }
          .addons-head { margin-bottom: 28px; }
          .addons-title {
            font-family: var(--f-display); font-weight: 800;
            font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em;
            margin: 14px 0 8px;
          }
          .addons-sub { color: var(--fg-2); font-size: 15px; margin: 0; }
          .addons-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
          }
          .addon-card {
            padding: 20px;
            display: flex; flex-direction: column; gap: 10px;
          }
          .addon-card:hover { border-color: var(--border-strong); transform: translateY(-2px); }
          .addon-icon {
            width: 36px; height: 36px; border-radius: 8px;
            background: var(--bg-3); color: var(--accent-hi);
            display: grid; place-items: center;
          }
          .addon-name {
            font-family: var(--f-display); font-weight: 600; font-size: 14px;
            line-height: 1.3; flex: 1;
          }
          .addon-price {
            font-family: var(--f-mono); font-weight: 700; font-size: 16px;
            color: var(--accent-hi);
          }
          .detail-footnote {
            margin: 32px auto 0;
            max-width: 720px;
            text-align: center;
            color: var(--fg-2);
            font-size: 13.5px;
            line-height: 1.6;
            font-style: italic;
          }
          @media (max-width: 1000px) {
            .detail-grid { grid-template-columns: 1fr 1fr; }
            .addons-grid { grid-template-columns: repeat(3, 1fr); }
          }
          @media (max-width: 560px) {
            .detail-grid { grid-template-columns: 1fr; }
            .addons-grid { grid-template-columns: 1fr 1fr; }
            .addons { padding: 24px; }
          }
        `)), /*#__PURE__*/React.createElement(FinalCTA, {
    setPage: setPage
  }));
}

/* =========================================================
   PAINT PROTECTION PAGE — PPF + Ceramic education
   ========================================================= */

function PaintProtectionPage({
  setPage
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-enter"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Paint protection",
    title: "Two kinds of armor for your paint.",
    sub: "Paint Protection Film and ceramic coating solve different problems — and they work best together. Here's the plain-English version, so you know exactly what you're paying for."
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
    className: "pp-block card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-art pp-art-ppf"
  }, /*#__PURE__*/React.createElement(PPFArt, null), /*#__PURE__*/React.createElement("div", {
    className: "pp-art-tag"
  }, /*#__PURE__*/React.createElement(Shield, {
    size: 14
  }), " Physical armor")), /*#__PURE__*/React.createElement("div", {
    className: "pp-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-eyebrow"
  }, "Paint Protection Film (PPF)"), /*#__PURE__*/React.createElement("h3", {
    className: "pp-title"
  }, "A clear shield over your paint."), /*#__PURE__*/React.createElement("p", {
    className: "pp-lead"
  }, "A thick, clear urethane film applied over your paint — sometimes called a “clear bra.” It’s physical armor: it absorbs rock chips, road debris, sand, bug splatter, light scratches, and door dings before they ever reach your paint."), /*#__PURE__*/React.createElement("div", {
    className: "pp-points"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-point"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    stroke: "var(--accent-hi)",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Self-healing."), " Minor scratches and swirls disappear with heat from the sun.")), /*#__PURE__*/React.createElement("div", {
    className: "pp-point"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    stroke: "var(--accent-hi)",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Blocks UV yellowing"), " and lasts 5–10 years.")), /*#__PURE__*/React.createElement("div", {
    className: "pp-point"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    stroke: "var(--accent-hi)",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Nearly invisible"), ", or available in a matte “stealth” finish.")), /*#__PURE__*/React.createElement("div", {
    className: "pp-point"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    stroke: "var(--accent-hi)",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Best on the front end"), " — bumper, hood, fenders, mirrors — where 90% of chips happen. Or full-body for total coverage."))), /*#__PURE__*/React.createElement("div", {
    className: "pp-bottomline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-bl-label"
  }, "Bottom line"), "PPF stops physical damage and saves you from repaint bills that run $500–$3,000 per panel.")))), /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
    className: "pp-block card pp-block-rev"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-art pp-art-ceramic"
  }, /*#__PURE__*/React.createElement(CeramicArt, null), /*#__PURE__*/React.createElement("div", {
    className: "pp-art-tag"
  }, /*#__PURE__*/React.createElement(Droplet, {
    size: 14
  }), " Chemical + UV armor")), /*#__PURE__*/React.createElement("div", {
    className: "pp-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-eyebrow"
  }, "Ceramic Coating"), /*#__PURE__*/React.createElement("h3", {
    className: "pp-title"
  }, "A glass-like layer that bonds to your clear coat."), /*#__PURE__*/React.createElement("p", {
    className: "pp-lead"
  }, "A liquid coating (silicon dioxide) that chemically bonds to your clear coat and cures into a hard, glass-like layer. It’s chemical and UV armor — plus serious shine."), /*#__PURE__*/React.createElement("div", {
    className: "pp-points"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-point"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    stroke: "var(--accent-hi)",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Hydrophobic."), " Water beads up and rolls off, taking dirt with it — so washing is faster and the car stays cleaner.")), /*#__PURE__*/React.createElement("div", {
    className: "pp-point"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    stroke: "var(--accent-hi)",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Deep, glossy “wet” look"), " that resists swirl marks.")), /*#__PURE__*/React.createElement("div", {
    className: "pp-point"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    stroke: "var(--accent-hi)",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Resists bird droppings, acid rain, and road salt."), " Replaces waxing entirely.")), /*#__PURE__*/React.createElement("div", {
    className: "pp-point"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    stroke: "var(--accent-hi)",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Lasts 2–9 years"), " depending on grade — versus wax that lasts weeks."))), /*#__PURE__*/React.createElement("div", {
    className: "pp-bottomline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-bl-label"
  }, "Bottom line"), "Ceramic protects against chemicals and UV, makes cleaning effortless, and keeps the gloss.")))))), /*#__PURE__*/React.createElement("section", {
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
      margin: "0 auto 48px"
    }
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "Which do I need?")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "They solve different problems.")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto"
    }
  }, "Ceramic coating ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--fg)"
    }
  }, "will not"), " stop rock chips, deep key scratches, or shopping-cart impacts — that requires PPF. Think of ceramic as chemical and UV armor, and PPF as physical impact armor."))), /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
    className: "compare"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compare-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compare-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compare-icon",
    style: {
      background: "rgba(207,54,45,.14)",
      color: "var(--accent-hi)"
    }
  }, /*#__PURE__*/React.createElement(Shield, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "compare-name"
  }, "Paint Protection Film"), /*#__PURE__*/React.createElement("div", {
    className: "compare-tag"
  }, "Physical impact protection"))), /*#__PURE__*/React.createElement("ul", {
    className: "compare-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Check, {
    size: 14,
    stroke: "#4ade80",
    strokeWidth: 2.4
  }), " Rock chips & road debris"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Check, {
    size: 14,
    stroke: "#4ade80",
    strokeWidth: 2.4
  }), " Light scratches & door dings"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Check, {
    size: 14,
    stroke: "#4ade80",
    strokeWidth: 2.4
  }), " Self-healing with heat"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(X, {
    size: 14,
    stroke: "var(--fg-3)",
    strokeWidth: 2.4
  }), " Not primarily about gloss"))), /*#__PURE__*/React.createElement("div", {
    className: "compare-plus"
  }, "+"), /*#__PURE__*/React.createElement("div", {
    className: "compare-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compare-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compare-icon",
    style: {
      background: "rgba(59,130,246,.14)",
      color: "#60a5fa"
    }
  }, /*#__PURE__*/React.createElement(Droplet, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "compare-name"
  }, "Ceramic Coating"), /*#__PURE__*/React.createElement("div", {
    className: "compare-tag"
  }, "Chemical / UV protection + gloss"))), /*#__PURE__*/React.createElement("ul", {
    className: "compare-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Check, {
    size: 14,
    stroke: "#4ade80",
    strokeWidth: 2.4
  }), " Chemical & UV resistance"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Check, {
    size: 14,
    stroke: "#4ade80",
    strokeWidth: 2.4
  }), " Hydrophobic, easy cleaning"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Check, {
    size: 14,
    stroke: "#4ade80",
    strokeWidth: 2.4
  }), " Deep, lasting gloss"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(X, {
    size: 14,
    stroke: "var(--fg-3)",
    strokeWidth: 2.4
  }), " Won’t stop rock chips"))))), /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
    className: "sweet-spot"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 18,
    stroke: "var(--accent-hi)"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "The common sweet spot:"), " PPF on the high-impact front end, ceramic on the rest — ceramic is often applied right over PPF for the best of both."))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-pricing"
  }, /*#__PURE__*/React.createElement(FadeIn, null, /*#__PURE__*/React.createElement("div", {
    className: "pp-price-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-price-icon",
    style: {
      background: "rgba(59,130,246,.14)",
      color: "#60a5fa"
    }
  }, /*#__PURE__*/React.createElement(Droplet, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-price-name"
  }, "Ceramic Coating"), /*#__PURE__*/React.createElement("div", {
    className: "pp-price-amt"
  }, /*#__PURE__*/React.createElement("span", null, "starting at"), " $799"), /*#__PURE__*/React.createElement("div", {
    className: "pp-price-note"
  }, "Multi-year protection, by grade and vehicle"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      width: "100%",
      marginTop: 18
    },
    onClick: () => setPage("contact")
  }, "Request a quote ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 14
  })))), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-price-card card featured"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-price-icon",
    style: {
      background: "rgba(207,54,45,.14)",
      color: "var(--accent-hi)"
    }
  }, /*#__PURE__*/React.createElement(Shield, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-price-name"
  }, "Paint Protection Film"), /*#__PURE__*/React.createElement("div", {
    className: "pp-price-amt"
  }, /*#__PURE__*/React.createElement("span", null, "starting at"), " $799"), /*#__PURE__*/React.createElement("div", {
    className: "pp-price-note"
  }, "Partial front coverage — bumper, hood edge, mirrors"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      width: "100%",
      marginTop: 18
    },
    onClick: () => setPage("contact")
  }, "Request a quote ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 14
  }))))), /*#__PURE__*/React.createElement("p", {
    className: "detail-footnote"
  }, "Pricing varies by vehicle, coverage area, and condition. Full-front and full-body packages quoted on inspection. Contact us for an exact quote."))), /*#__PURE__*/React.createElement(FinalCTA, {
    setPage: setPage
  }), /*#__PURE__*/React.createElement("style", null, `
        .pp-block {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 0;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .pp-art {
          position: relative;
          min-height: 380px;
          overflow: hidden;
        }
        .pp-art-tag {
          position: absolute;
          top: 16px; left: 16px;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 13px;
          border-radius: 999px;
          background: rgba(10,12,17,.7);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-strong);
          font-family: var(--f-display);
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--fg);
        }
        .pp-body { padding: 48px; }
        .pp-block-rev { grid-template-columns: 1.15fr 1fr; }
        .pp-block-rev .pp-art { order: 2; }
        .pp-eyebrow {
          font-family: var(--f-display); font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent-hi); margin-bottom: 12px;
        }
        .pp-title {
          font-family: var(--f-display); font-weight: 800;
          font-size: clamp(24px, 2.6vw, 36px); letter-spacing: -0.02em;
          line-height: 1.1; margin: 0 0 16px;
        }
        .pp-lead {
          color: var(--fg-1); font-size: 15.5px; line-height: 1.6;
          margin: 0 0 22px;
        }
        .pp-points {
          display: flex; flex-direction: column; gap: 12px;
          margin-bottom: 24px;
        }
        .pp-point {
          display: flex; gap: 11px; align-items: flex-start;
          color: var(--fg-1); font-size: 14px; line-height: 1.5;
        }
        .pp-point svg { flex: 0 0 auto; margin-top: 3px; }
        .pp-point strong { color: var(--fg); font-weight: 600; }
        .pp-bottomline {
          position: relative;
          padding: 18px 18px 18px 20px;
          background: var(--accent-soft);
          border-left: 3px solid var(--accent);
          border-radius: 0 var(--r) var(--r) 0;
          color: var(--fg);
          font-size: 14.5px; line-height: 1.55;
          font-family: var(--f-display); font-weight: 500;
        }
        .pp-bl-label {
          display: block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--accent-hi); margin-bottom: 4px;
        }

        .compare {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 20px;
          align-items: center;
          max-width: 920px; margin: 0 auto;
        }
        .compare-col {
          padding: 28px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
        }
        .compare-head {
          display: flex; gap: 14px; align-items: center;
          padding-bottom: 18px; margin-bottom: 18px;
          border-bottom: 1px solid var(--border);
        }
        .compare-icon {
          width: 48px; height: 48px; border-radius: 10px;
          display: grid; place-items: center; flex: 0 0 auto;
        }
        .compare-name {
          font-family: var(--f-display); font-weight: 800; font-size: 18px;
        }
        .compare-tag {
          font-size: 12.5px; color: var(--fg-2); margin-top: 2px;
        }
        .compare-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .compare-list li {
          display: flex; gap: 10px; align-items: center;
          color: var(--fg-1); font-size: 14px;
        }
        .compare-plus {
          font-family: var(--f-display); font-weight: 800; font-size: 32px;
          color: var(--accent); text-align: center;
        }
        .sweet-spot {
          display: flex; gap: 12px; align-items: flex-start;
          max-width: 720px; margin: 40px auto 0;
          padding: 20px 24px;
          background: var(--bg-2);
          border: 1px solid var(--border-strong);
          border-radius: var(--r-lg);
          color: var(--fg-1); font-size: 15px; line-height: 1.55;
        }
        .sweet-spot svg { flex: 0 0 auto; margin-top: 2px; }
        .sweet-spot strong { color: var(--fg); }

        .pp-pricing {
          display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
          max-width: 760px; margin: 0 auto;
        }
        .pp-price-card {
          padding: 32px;
          display: flex; flex-direction: column;
          text-align: center; align-items: center;
        }
        .pp-price-card.featured {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent-soft), var(--shadow-lg);
        }
        .pp-price-icon {
          width: 52px; height: 52px; border-radius: 12px;
          display: grid; place-items: center; margin-bottom: 18px;
        }
        .pp-price-name {
          font-family: var(--f-display); font-weight: 700; font-size: 18px;
        }
        .pp-price-amt {
          font-family: var(--f-display); font-weight: 800;
          font-size: 40px; letter-spacing: -0.03em;
          margin: 12px 0 6px;
        }
        .pp-price-amt span {
          display: block;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--fg-2);
          margin-bottom: 2px;
        }
        .pp-price-note {
          color: var(--fg-2); font-size: 13px; line-height: 1.45;
        }
        @media (max-width: 900px) {
          .pp-block, .pp-block-rev { grid-template-columns: 1fr; }
          .pp-block-rev .pp-art { order: 0; }
          .pp-body { padding: 32px; }
          .pp-art { min-height: 240px; }
          .compare { grid-template-columns: 1fr; }
          .compare-plus { padding: 4px 0; }
          .pp-pricing { grid-template-columns: 1fr; }
        }
      `));
}

/* Decorative SVG for PPF — layered shield film over panel */
function PPFArt() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 500 400",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      width: "100%",
      height: "100%",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "ppf-bg",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#1a1f2b"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0c0f17"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ppf-film",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.18)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "rgba(255,255,255,0.04)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(255,255,255,0.14)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "500",
    height: "400",
    fill: "url(#ppf-bg)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40 240 Q250 150 460 240 L460 320 Q250 250 40 320 Z",
    fill: "#222a39"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40 240 Q250 150 460 240",
    fill: "none",
    stroke: "rgba(255,255,255,.15)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 120 L440 120 L440 250 Q250 175 60 250 Z",
    fill: "url(#ppf-film)",
    stroke: "rgba(255,255,255,.35)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 120 L120 90 L460 90 L440 120 Z",
    fill: "rgba(255,255,255,.22)",
    stroke: "rgba(255,255,255,.4)",
    strokeWidth: "1"
  }), [[150, 160], [250, 150], [350, 165], [200, 200], [300, 195]].map(([x, y], i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("circle", {
    cx: x,
    cy: y - 40,
    r: "4",
    fill: "var(--accent-hi)",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: x,
    y1: y - 44,
    x2: x + 8,
    y2: y - 58,
    stroke: "var(--accent-hi)",
    strokeWidth: "1.5",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: x,
    y1: y - 44,
    x2: x - 8,
    y2: y - 58,
    stroke: "var(--accent-hi)",
    strokeWidth: "1.5",
    opacity: "0.6"
  }))), /*#__PURE__*/React.createElement("g", {
    transform: "translate(250, 300)",
    opacity: "0.9"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 -28 L24 -18 V4 C24 22 0 32 0 32 C0 32 -24 22 -24 4 V-18 Z",
    fill: "rgba(207,54,45,.18)",
    stroke: "var(--accent-hi)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-10 2 L-3 10 L11 -8",
    fill: "none",
    stroke: "var(--accent-hi)",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}

/* Decorative SVG for Ceramic — water beading on glossy surface */
function CeramicArt() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 500 400",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      width: "100%",
      height: "100%",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "cer-bg",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#16202e"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "#0d1117"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0a0d13"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "cer-gloss",
    cx: "35%",
    cy: "25%",
    r: "70%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(96,165,250,0.30)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(96,165,250,0)"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "cer-drop",
    cx: "38%",
    cy: "32%",
    r: "65%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(255,255,255,0.55)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "40%",
    stopColor: "rgba(190,220,255,0.20)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(120,170,230,0.10)"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "500",
    height: "400",
    fill: "url(#cer-bg)"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "500",
    height: "400",
    fill: "url(#cer-gloss)"
  }), [[110, 120, 26], [200, 90, 18], [300, 130, 32], [390, 100, 20], [150, 210, 22], [260, 220, 30], [360, 200, 16], [430, 250, 24], [90, 290, 18], [200, 300, 26], [310, 300, 20], [400, 330, 14], [250, 160, 12], [170, 150, 10], [330, 260, 12]].map(([x, y, r], i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: x,
    cy: y + r * 0.15,
    rx: r,
    ry: r * 0.92,
    fill: "url(#cer-drop)",
    stroke: "rgba(255,255,255,0.22)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: x - r * 0.3,
    cy: y - r * 0.3,
    rx: r * 0.22,
    ry: r * 0.16,
    fill: "rgba(255,255,255,0.7)"
  }))));
}
Object.assign(window, {
  DetailingPage,
  PaintProtectionPage,
  PPFArt,
  CeramicArt,
  DETAIL_TIERS,
  DETAIL_ADDONS
});
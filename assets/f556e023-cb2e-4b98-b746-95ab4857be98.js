/* global React, FadeIn, PageHeader, FinalCTA, Counter */

// Real customer reviews live on the Google Business Profile. Until the owner
// supplies the specific quotes he wants featured, we point visitors straight
// to Google rather than displaying placeholder testimonials.
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=5144023372298085885";
const REVIEWS = [];
function GoogleReviewsCTA({
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "grev-cta card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grev-badge"
  }, /*#__PURE__*/React.createElement(Google, {
    size: compact ? 26 : 34
  })), /*#__PURE__*/React.createElement("div", {
    className: "grev-stars"
  }, [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement(Star, {
    key: i,
    size: compact ? 18 : 22,
    stroke: "#facc15"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grev-num mono"
  }, "5.0"), /*#__PURE__*/React.createElement("div", {
    className: "grev-lbl"
  }, "Rated 5.0 across 120+ verified Google reviews"), /*#__PURE__*/React.createElement("a", {
    href: GOOGLE_REVIEWS_URL,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-primary",
    style: {
      marginTop: 6
    }
  }, "Read our reviews on Google"), /*#__PURE__*/React.createElement("style", null, `
        .grev-cta {
          max-width: 560px; margin: 0 auto; text-align: center;
          padding: 44px 32px; display: flex; flex-direction: column;
          align-items: center; gap: 14px;
        }
        .grev-badge { line-height: 0; }
        .grev-stars { display: flex; gap: 4px; }
        .grev-num {
          font-size: clamp(48px, 7vw, 72px); font-weight: 700; line-height: 1;
          letter-spacing: -0.03em; color: transparent;
          background: linear-gradient(135deg, var(--accent-hi), var(--accent));
          -webkit-background-clip: text; background-clip: text;
        }
        .grev-lbl {
          font-family: var(--f-display); font-weight: 600; font-size: 15px;
          color: var(--fg-1); max-width: 340px;
        }
      `));
}
function ReviewsCarousel() {
  return /*#__PURE__*/React.createElement(GoogleReviewsCTA, null);
}
function ReviewsPage({
  setPage
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-enter"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Customer reviews",
    title: "120+ five-star reviews.",
    sub: "Real reviews from real Texans across the DFW metroplex. Read every one on Google — we don't filter, hide, or buy them."
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
  }, "Verified on Google")), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", null, "What customers say."))), /*#__PURE__*/React.createElement(FadeIn, {
    delay: 120
  }, /*#__PURE__*/React.createElement(GoogleReviewsCTA, null)))), /*#__PURE__*/React.createElement(FinalCTA, {
    setPage: setPage
  }));
}
Object.assign(window, {
  ReviewsPage,
  ReviewsCarousel,
  REVIEWS
});
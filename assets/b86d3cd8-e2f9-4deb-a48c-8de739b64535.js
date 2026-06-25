/* global React */

const NAV_ITEMS = [{
  id: "home",
  label: "Home"
}, {
  id: "services",
  label: "Services"
}, {
  id: "detailing",
  label: "Detailing"
}, {
  id: "protection",
  label: "Paint Protection"
}, {
  id: "process",
  label: "Process"
}, {
  id: "reviews",
  label: "Reviews"
}, {
  id: "contact",
  label: "Contact"
}];
function Logo({
  compact
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "assets/logo.png",
    alt: "Dent Busters",
    style: {
      width: 48,
      height: 48,
      objectFit: "contain",
      display: "block",
      flex: "0 0 auto"
    }
  }), !compact && /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.05
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 800,
      fontSize: 17,
      letterSpacing: "-0.01em",
      whiteSpace: "nowrap"
    }
  }, "DENT BUSTERS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: "0.24em",
      color: "var(--accent-hi)",
      marginTop: 2,
      whiteSpace: "nowrap"
    }
  }, "AUTO HAIL REPAIR")));
}
function Nav({
  page,
  setPage,
  accentName
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  React.useEffect(() => {
    setMobileOpen(false);
  }, [page]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      height: "var(--nav-h)",
      background: scrolled ? "rgba(10,12,17,.85)" : "rgba(10,12,17,.55)",
      backdropFilter: "blur(16px) saturate(140%)",
      WebkitBackdropFilter: "blur(16px) saturate(140%)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "all .25s var(--ease)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setPage("home");
    },
    className: "nav-logo"
  }, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("div", {
    className: "nav-links",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, NAV_ITEMS.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: "nav-link",
    "data-active": page === it.id,
    onClick: () => setPage(it.id)
  }, it.label))), /*#__PURE__*/React.createElement("a", {
    href: "tel:+12148597534",
    className: "btn btn-primary btn-sm nav-phone"
  }, /*#__PURE__*/React.createElement(Phone, {
    size: 15
  }), "(214) 859-7534"), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    "aria-label": "Open menu",
    onClick: () => setMobileOpen(true)
  }, /*#__PURE__*/React.createElement(Menu, {
    size: 22
  })))), mobileOpen && /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu",
    onClick: () => setMobileOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu-panel",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMobileOpen(false),
    style: {
      background: "transparent",
      border: "1px solid var(--border)",
      borderRadius: 8,
      padding: 8,
      color: "var(--fg)"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, NAV_ITEMS.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    onClick: () => setPage(it.id),
    style: {
      textAlign: "left",
      padding: "16px 12px",
      background: page === it.id ? "var(--bg-2)" : "transparent",
      border: "1px solid " + (page === it.id ? "var(--border)" : "transparent"),
      borderRadius: 10,
      color: "var(--fg)",
      fontFamily: "var(--f-display)",
      fontWeight: 600,
      fontSize: 18
    }
  }, it.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+12148597534",
    className: "btn btn-primary btn-lg",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Phone, {
    size: 16
  }), " (214) 859-7534")))), /*#__PURE__*/React.createElement("style", null, `
        .nav-logo { display: flex; align-items: center; }
        .nav-phone { display: inline-flex; }
        .nav-link {
          background: transparent; border: 0; color: var(--fg-1);
          font-family: var(--f-display); font-weight: 500; font-size: 13.5px;
          letter-spacing: 0.01em; padding: 10px 11px; border-radius: 8px;
          transition: all .15s var(--ease); position: relative;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--fg); background: rgba(255,255,255,.04); }
        .nav-link[data-active="true"] { color: var(--fg); }
        .nav-link[data-active="true"]::after {
          content: ""; position: absolute; left: 11px; right: 11px; bottom: 4px;
          height: 2px; background: var(--accent); border-radius: 2px;
        }
        .nav-burger {
          display: none; background: transparent; border: 1px solid var(--border);
          color: var(--fg); border-radius: 8px; padding: 8px;
        }
        .mobile-menu {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,.6); backdrop-filter: blur(8px);
        }
        .mobile-menu-panel {
          position: absolute; right: 0; top: 0; bottom: 0; width: 320px; max-width: 90vw;
          background: var(--bg-1); border-left: 1px solid var(--border);
          padding: 24px;
        }
        @media (max-width: 1040px) {
          .nav-links, .nav-phone { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
      `));
}
function Footer({
  setPage
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--bg-1)",
      borderTop: "1px solid var(--border)",
      paddingTop: 72,
      paddingBottom: 32,
      marginTop: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
      gap: 48
    },
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      fontSize: 14,
      marginTop: 20,
      maxWidth: 320,
      lineHeight: 1.6
    }
  }, "Texas's trusted hail damage repair team. Paintless, panel-saving work — handled with your insurance company, end to end."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginTop: 16
    }
  }, [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement(Star, {
    key: i,
    size: 14,
    stroke: "#facc15"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontSize: 12,
      color: "var(--fg-2)"
    }
  }, "5.0 · 100+ Google reviews"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "footer-h"
  }, "Site"), NAV_ITEMS.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setPage(it.id);
    },
    className: "footer-link"
  }, it.label))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "footer-h"
  }, "Services"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setPage("services");
    }
  }, "Hail Damage Repair"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setPage("services");
    }
  }, "Door Ding Repair"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setPage("services");
    }
  }, "Paintless Dent Repair"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setPage("services");
    }
  }, "Ceramic Coating"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      setPage("services");
    }
  }, "Pickup & Delivery")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "footer-h"
  }, "Get in touch"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "tel:+12148597534"
  }, /*#__PURE__*/React.createElement(Phone, {
    size: 14
  }), " (214) 859-7534"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "mailto:dentbustersllc@gmail.com"
  }, /*#__PURE__*/React.createElement(Mail, {
    size: 14
  }), " dentbustersllc@gmail.com"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "https://dentbusterstx.com",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Building, {
    size: 14
  }), " dentbusterstx.com"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "https://www.instagram.com/dentbustersautohailrepair/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Instagram, {
    size: 14
  }), " Instagram"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link",
    href: "https://www.facebook.com/profile.php/?id=61556206236698",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Facebook, {
    size: 14
  }), " Facebook"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link"
  }, /*#__PURE__*/React.createElement(MapPin, {
    size: 14
  }), " McKinney · Frisco · Plano, TX"), /*#__PURE__*/React.createElement("a", {
    className: "footer-link"
  }, /*#__PURE__*/React.createElement(Clock, {
    size: 14
  }), " Mon–Sat · 8am – 7pm"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 72,
      paddingTop: 24,
      borderTop: "1px solid var(--border)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 16,
      color: "var(--fg-3)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, "© 2026 Dent Busters Auto Hail Repair · All rights reserved."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "footer-mini"
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    className: "footer-mini"
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    className: "footer-mini"
  }, "Warranty")))), /*#__PURE__*/React.createElement("style", null, `
        .footer-h {
          font-family: var(--f-display); font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--fg-2);
          margin: 0 0 20px;
        }
        .footer-link {
          display: flex; align-items: center; gap: 10px;
          color: var(--fg-1); font-size: 14px; padding: 7px 0;
          transition: color .15s var(--ease); cursor: pointer;
        }
        .footer-link:hover { color: var(--accent-hi); }
        .footer-mini { color: var(--fg-2); cursor: pointer; }
        .footer-mini:hover { color: var(--fg); }
        @media (max-width: 800px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `));
}
Object.assign(window, {
  Nav,
  Footer,
  Logo,
  NAV_ITEMS
});
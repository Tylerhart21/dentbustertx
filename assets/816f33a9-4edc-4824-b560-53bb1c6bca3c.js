/* global React, FadeIn, PageHeader */

/* ============ Booking Wizard ============ */

const DAMAGE_TYPES = [{
  id: "hail",
  label: "Hail damage",
  icon: "Droplet",
  desc: "Multiple small dents, recent storm"
}, {
  id: "ding",
  label: "Door dings",
  icon: "CarFront",
  desc: "Parking lot, single panel"
}, {
  id: "dent",
  label: "Larger dent or crease",
  icon: "Wrench",
  desc: "Single significant impact"
}, {
  id: "ceramic",
  label: "Ceramic coating only",
  icon: "Sparkles",
  desc: "No damage — protection request"
}, {
  id: "other",
  label: "Not sure",
  icon: "MessageSquare",
  desc: "We&rsquo;ll figure it out together"
}];
const SEVERITY = [{
  id: "minor",
  label: "Minor",
  desc: "1–5 small dents, single panel"
}, {
  id: "moderate",
  label: "Moderate",
  desc: "10–30 dents across 2–3 panels"
}, {
  id: "major",
  label: "Major",
  desc: "Many panels, possibly hood and roof"
}, {
  id: "unsure",
  label: "Not sure",
  desc: "We&rsquo;ll assess during inspection"
}];
const TIME_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];
const CAR_MAKES = ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Nissan", "Porsche", "RAM", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo", "Other"];
function useBookingForm() {
  const [data, setData] = React.useState({
    // Step 1
    year: "",
    make: "",
    model: "",
    // Step 2
    damageType: "",
    severity: "",
    photos: [],
    // Step 3
    name: "",
    phone: "",
    email: "",
    zip: "",
    notes: "",
    // Step 4
    date: "",
    time: ""
  });
  const set = (k, v) => setData(d => ({
    ...d,
    [k]: v
  }));
  const merge = obj => setData(d => ({
    ...d,
    ...obj
  }));
  return [data, set, merge];
}
function BookingWizard({
  embedded = false
}) {
  const [step, setStep] = React.useState(0);
  const [data, set, merge] = useBookingForm();
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const steps = ["Vehicle", "Damage", "Contact", "Schedule"];
  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!data.year) e.year = "Required";else if (!/^\d{4}$/.test(data.year) || +data.year < 1980 || +data.year > 2027) e.year = "Enter a valid year";
      if (!data.make) e.make = "Required";
      if (!data.model.trim()) e.model = "Required";
    }
    if (step === 1) {
      if (!data.damageType) e.damageType = "Choose a damage type";
      if (!data.severity) e.severity = "Choose a severity";
    }
    if (step === 2) {
      if (!data.name.trim()) e.name = "Required";
      if (!/^[\d\s\-\+\(\)]{10,}$/.test(data.phone)) e.phone = "Enter a valid phone number";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Enter a valid email";
      if (!/^\d{5}$/.test(data.zip)) e.zip = "Enter a 5-digit ZIP";
    }
    if (step === 3) {
      if (!data.date) e.date = "Pick a date";
      if (!data.time) e.time = "Pick a time";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = async () => {
    setSubmitting(true);
    setSubmitError("");
    const dateStr = data.date ? (() => {
      const [y, m, d] = data.date.split("-").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    })() : "";
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      zip: data.zip,
      vehicle: (data.year + " " + data.make + " " + data.model).trim(),
      damageType: (DAMAGE_TYPES.find(t => t.id === data.damageType) || {}).label || data.damageType,
      severity: (SEVERITY.find(s => s.id === data.severity) || {}).label || data.severity,
      photos: String(data.photos.length),
      date: dateStr,
      time: data.time,
      notes: data.notes || "—"
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success) setSubmitted(true);else setSubmitError("We couldn't send your request just now — please call or text us at (214) 859-7534.");
    } catch (err) {
      setSubmitError("We couldn't send your request just now — please call or text us at (214) 859-7534.");
    } finally {
      setSubmitting(false);
    }
  };
  const next = () => {
    if (!validate()) return;
    if (step < steps.length - 1) setStep(step + 1);else submit();
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
  };
  if (submitted) return /*#__PURE__*/React.createElement(BookingSuccess, {
    data: data,
    onReset: () => {
      setStep(0);
      setSubmitted(false);
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "booking " + (embedded ? "embedded" : "")
  }, /*#__PURE__*/React.createElement(BookingProgress, {
    steps: steps,
    current: step
  }), /*#__PURE__*/React.createElement("div", {
    className: "booking-step-content"
  }, step === 0 && /*#__PURE__*/React.createElement(StepVehicle, {
    data: data,
    set: set,
    errors: errors
  }), step === 1 && /*#__PURE__*/React.createElement(StepDamage, {
    data: data,
    set: set,
    merge: merge,
    errors: errors
  }), step === 2 && /*#__PURE__*/React.createElement(StepContact, {
    data: data,
    set: set,
    errors: errors
  }), step === 3 && /*#__PURE__*/React.createElement(StepSchedule, {
    data: data,
    set: set,
    errors: errors
  })), submitError && /*#__PURE__*/React.createElement("div", {
    className: "booking-error",
    role: "alert"
  }, submitError), /*#__PURE__*/React.createElement("div", {
    className: "booking-nav"
  }, step > 0 ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: back,
    disabled: submitting
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 15
  }), " Back") : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: next,
    disabled: submitting
  }, step === steps.length - 1 ? submitting ? "Sending…" : "Book inspection" : "Continue", !submitting && /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  }))), /*#__PURE__*/React.createElement("style", null, `
        .booking {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          padding: 36px;
          box-shadow: var(--shadow-lg);
        }
        .booking.embedded {
          padding: 28px;
          background: linear-gradient(180deg, var(--bg-2), var(--bg-1));
        }
        .booking-step-content {
          min-height: 320px;
          padding: 32px 0;
          animation: stepIn .4s var(--ease);
        }
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .booking-error {
          margin-bottom: 16px;
          padding: 14px 16px;
          border-radius: var(--r);
          background: rgba(207,54,45,.10);
          border: 1px solid rgba(207,54,45,.35);
          color: var(--accent-hi);
          font-size: 14px; line-height: 1.5;
        }
        .booking-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 24px; border-top: 1px solid var(--border);
        }
        @media (max-width: 600px) {
          .booking { padding: 24px; }
        }
      `));
}
function BookingProgress({
  steps,
  current
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bk-prog"
  }, steps.map((s, i) => {
    const done = i < current;
    const active = i === current;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: s
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-prog-step" + (active ? " active" : "") + (done ? " done" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-prog-num"
    }, done ? /*#__PURE__*/React.createElement(Check, {
      size: 14,
      stroke: "#fff",
      strokeWidth: 3
    }) : /*#__PURE__*/React.createElement("span", null, i + 1)), /*#__PURE__*/React.createElement("div", {
      className: "bk-prog-lbl"
    }, s)), i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: "bk-prog-bar" + (done ? " done" : "")
    }));
  }), /*#__PURE__*/React.createElement("style", null, `
        .bk-prog {
          display: flex; align-items: center; gap: 8px;
        }
        .bk-prog-step {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          flex: 0 0 auto;
        }
        .bk-prog-num {
          width: 32px; height: 32px; border-radius: 999px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          color: var(--fg-2);
          display: grid; place-items: center;
          font-family: var(--f-display); font-weight: 700; font-size: 13px;
          transition: all .25s var(--ease);
        }
        .bk-prog-step.active .bk-prog-num {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          box-shadow: 0 0 0 4px var(--accent-soft);
        }
        .bk-prog-step.done .bk-prog-num {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .bk-prog-lbl {
          font-family: var(--f-display); font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--fg-2);
        }
        .bk-prog-step.active .bk-prog-lbl,
        .bk-prog-step.done .bk-prog-lbl { color: var(--fg); }
        .bk-prog-bar {
          flex: 1; height: 2px; border-radius: 1px;
          background: var(--border);
          margin: 0 4px; margin-bottom: 22px;
          transition: background .25s;
        }
        .bk-prog-bar.done { background: var(--accent); }
        @media (max-width: 500px) {
          .bk-prog-lbl { display: none; }
        }
      `));
}

/* Step 1 — Vehicle */
function StepVehicle({
  data,
  set,
  errors
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    n: "01",
    title: "What are we working on?",
    sub: "Tell us about your vehicle so we can pull up paint codes and the right tools."
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Year"), /*#__PURE__*/React.createElement("input", {
    className: "input" + (errors.year ? " error" : ""),
    placeholder: "2022",
    value: data.year,
    onChange: e => set("year", e.target.value.replace(/\D/g, "").slice(0, 4))
  }), errors.year && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.year)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Make"), /*#__PURE__*/React.createElement("select", {
    className: "select" + (errors.make ? " error" : ""),
    value: data.make,
    onChange: e => set("make", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select make"), CAR_MAKES.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m))), errors.make && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.make)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Model"), /*#__PURE__*/React.createElement("input", {
    className: "input" + (errors.model ? " error" : ""),
    placeholder: "F-150",
    value: data.model,
    onChange: e => set("model", e.target.value)
  }), errors.model && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.model))), data.year && data.make && data.model && /*#__PURE__*/React.createElement("div", {
    className: "vehicle-confirm"
  }, /*#__PURE__*/React.createElement(CarFront, {
    size: 20,
    stroke: "var(--accent-hi)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--fg-2)"
    }
  }, "Vehicle"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 700,
      fontSize: 16
    }
  }, data.year, " ", data.make, " ", data.model))), /*#__PURE__*/React.createElement("style", null, `
        .grid-3 { display: grid; grid-template-columns: 140px 1fr 1fr; gap: 16px; }
        @media (max-width: 600px) { .grid-3 { grid-template-columns: 1fr; } }
        .vehicle-confirm {
          margin-top: 24px;
          display: flex; gap: 14px; align-items: center;
          padding: 16px; border-radius: var(--r);
          background: var(--accent-soft);
          border: 1px solid rgba(207,54,45,.25);
        }
      `));
}

/* Step 2 — Damage */
function StepDamage({
  data,
  set,
  merge,
  errors
}) {
  const iconMap = {
    Droplet,
    CarFront,
    Wrench,
    Sparkles,
    MessageSquare
  };
  const onDrop = files => {
    const list = Array.from(files).slice(0, 6 - data.photos.length).map(f => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: f.size,
      url: URL.createObjectURL(f)
    }));
    set("photos", [...data.photos, ...list]);
  };
  const removePhoto = id => set("photos", data.photos.filter(p => p.id !== id));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    n: "02",
    title: "What kind of damage?",
    sub: "The more we know now, the more accurate our estimate will be. Photos help us a lot."
  }), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("label", null, "Damage type"), errors.damageType && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.damageType), /*#__PURE__*/React.createElement("div", {
    className: "damage-grid"
  }, DAMAGE_TYPES.map(t => {
    const Ic = iconMap[t.icon];
    const active = data.damageType === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: "damage-btn" + (active ? " active" : ""),
      onClick: () => set("damageType", t.id),
      type: "button"
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 20,
      stroke: active ? "var(--accent-hi)" : "var(--fg)"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "damage-btn-title"
    }, t.label), /*#__PURE__*/React.createElement("div", {
      className: "damage-btn-desc",
      dangerouslySetInnerHTML: {
        __html: t.desc
      }
    })), active && /*#__PURE__*/React.createElement(Check, {
      size: 16,
      stroke: "var(--accent-hi)",
      strokeWidth: 2.4
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("label", null, "How extensive is the damage?"), errors.severity && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.severity), /*#__PURE__*/React.createElement("div", {
    className: "severity-grid"
  }, SEVERITY.map(s => {
    const active = data.severity === s.id;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      className: "severity-btn" + (active ? " active" : ""),
      onClick: () => set("severity", s.id),
      type: "button"
    }, /*#__PURE__*/React.createElement("div", {
      className: "severity-btn-title"
    }, s.label), /*#__PURE__*/React.createElement("div", {
      className: "severity-btn-desc",
      dangerouslySetInnerHTML: {
        __html: s.desc
      }
    }));
  }))), /*#__PURE__*/React.createElement(PhotoDropzone, {
    photos: data.photos,
    onDrop: onDrop,
    onRemove: removePhoto
  }), /*#__PURE__*/React.createElement("style", null, `
        .damage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .damage-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: var(--r);
          color: var(--fg);
          text-align: left;
          transition: all .15s;
        }
        .damage-btn:hover { border-color: var(--border-strong); }
        .damage-btn.active {
          background: var(--accent-soft);
          border-color: var(--accent);
        }
        .damage-btn-title { font-family: var(--f-display); font-weight: 600; font-size: 14.5px; }
        .damage-btn-desc { color: var(--fg-2); font-size: 12.5px; margin-top: 2px; }
        .severity-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .severity-btn {
          padding: 14px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: var(--r);
          color: var(--fg);
          text-align: left;
          transition: all .15s;
        }
        .severity-btn:hover { border-color: var(--border-strong); }
        .severity-btn.active {
          background: var(--accent-soft);
          border-color: var(--accent);
        }
        .severity-btn-title { font-family: var(--f-display); font-weight: 600; font-size: 14.5px; }
        .severity-btn-desc { color: var(--fg-2); font-size: 12px; margin-top: 4px; line-height: 1.4; }
        @media (max-width: 700px) {
          .damage-grid { grid-template-columns: 1fr; }
          .severity-grid { grid-template-columns: 1fr 1fr; }
        }
      `));
}
function PhotoDropzone({
  photos,
  onDrop,
  onRemove
}) {
  const inputRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Photos ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg-3)",
      textTransform: "none",
      fontWeight: 400
    }
  }, "· optional, up to 6")), /*#__PURE__*/React.createElement("div", {
    className: "dropzone" + (dragging ? " dragging" : ""),
    onClick: () => inputRef.current?.click(),
    onDragOver: e => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: e => {
      e.preventDefault();
      setDragging(false);
      onDrop(e.dataTransfer.files);
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: "image/*",
    multiple: true,
    style: {
      display: "none"
    },
    onChange: e => onDrop(e.target.files)
  }), /*#__PURE__*/React.createElement(Upload, {
    size: 22,
    stroke: "var(--fg-2)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "dz-text"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 600,
      color: "var(--fg)"
    }
  }, "Drop photos or click to upload"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--fg-2)",
      marginTop: 2
    }
  }, "JPG, PNG, HEIC. Up to 10MB each."))), photos.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "dz-thumbs"
  }, photos.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "dz-thumb"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.url,
    alt: p.name
  }), /*#__PURE__*/React.createElement("button", {
    className: "dz-thumb-x",
    onClick: () => onRemove(p.id),
    "aria-label": "Remove"
  }, /*#__PURE__*/React.createElement(X, {
    size: 12,
    stroke: "#fff",
    strokeWidth: 2.5
  }))))), /*#__PURE__*/React.createElement("style", null, `
        .dropzone {
          padding: 32px;
          border: 1.5px dashed var(--border-strong);
          border-radius: var(--r);
          background: var(--bg-1);
          display: flex; align-items: center; gap: 16px;
          cursor: pointer;
          transition: all .15s;
        }
        .dropzone:hover { border-color: var(--accent); background: var(--bg-2); }
        .dropzone.dragging {
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .dz-thumbs {
          display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;
          margin-top: 12px;
        }
        .dz-thumb {
          position: relative; aspect-ratio: 1;
          border-radius: 8px; overflow: hidden;
          border: 1px solid var(--border);
        }
        .dz-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .dz-thumb-x {
          position: absolute; top: 4px; right: 4px;
          width: 22px; height: 22px; border-radius: 999px;
          background: rgba(0,0,0,.75);
          border: 0; padding: 0;
          display: grid; place-items: center;
          cursor: pointer;
        }
        @media (max-width: 600px) { .dz-thumbs { grid-template-columns: repeat(3, 1fr); } }
      `));
}

/* Step 3 — Contact */
function StepContact({
  data,
  set,
  errors
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    n: "03",
    title: "How can we reach you?",
    sub: "We'll send a confirmation by text and email. We won't share your info, sell it, or send marketing."
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Full name"), /*#__PURE__*/React.createElement("input", {
    className: "input" + (errors.name ? " error" : ""),
    placeholder: "Jordan Smith",
    value: data.name,
    onChange: e => set("name", e.target.value)
  }), errors.name && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.name)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Phone"), /*#__PURE__*/React.createElement("input", {
    className: "input" + (errors.phone ? " error" : ""),
    placeholder: "(469) 555-0123",
    value: data.phone,
    onChange: e => set("phone", e.target.value)
  }), errors.phone && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.phone)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
    className: "input" + (errors.email ? " error" : ""),
    placeholder: "you@example.com",
    type: "email",
    value: data.email,
    onChange: e => set("email", e.target.value)
  }), errors.email && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "ZIP"), /*#__PURE__*/React.createElement("input", {
    className: "input" + (errors.zip ? " error" : ""),
    placeholder: "75070",
    value: data.zip,
    onChange: e => set("zip", e.target.value.replace(/\D/g, "").slice(0, 5))
  }), errors.zip && /*#__PURE__*/React.createElement("div", {
    className: "field-err"
  }, errors.zip))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("label", null, "Anything else? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg-3)",
      textTransform: "none",
      fontWeight: 400
    }
  }, "· optional")), /*#__PURE__*/React.createElement("textarea", {
    className: "textarea",
    placeholder: "Insurance carrier, claim number, special pickup instructions, etc.",
    value: data.notes,
    onChange: e => set("notes", e.target.value)
  })), /*#__PURE__*/React.createElement("style", null, `
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }
      `));
}

/* Step 4 — Schedule */
function StepSchedule({
  data,
  set,
  errors
}) {
  const [month, setMonth] = React.useState(() => {
    const d = new Date();
    return {
      y: d.getFullYear(),
      m: d.getMonth()
    };
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dim = new Date(month.y, month.m + 1, 0).getDate();
  const firstDay = new Date(month.y, month.m, 1).getDay();
  const monthName = new Date(month.y, month.m, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric"
  });
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);
  const isSelected = d => {
    if (!d) return false;
    return data.date === `${month.y}-${month.m + 1}-${d}`;
  };
  const isDisabled = d => {
    if (!d) return true;
    const cell = new Date(month.y, month.m, d);
    if (cell < today) return true;
    if (cell.getDay() === 0) return true; // Sundays closed
    const max = new Date();
    max.setDate(max.getDate() + 60);
    if (cell > max) return true;
    return false;
  };
  const pick = d => {
    if (isDisabled(d)) return;
    set("date", `${month.y}-${month.m + 1}-${d}`);
  };
  const next = () => {
    let {
      y,
      m
    } = month;
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
    setMonth({
      y,
      m
    });
  };
  const prev = () => {
    let {
      y,
      m
    } = month;
    const nowY = today.getFullYear(),
      nowM = today.getMonth();
    if (y === nowY && m === nowM) return;
    m--;
    if (m < 0) {
      m = 11;
      y--;
    }
    setMonth({
      y,
      m
    });
  };
  const selDate = data.date && (() => {
    const [y, m, d] = data.date.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  })();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepHeader, {
    n: "04",
    title: "Pick a time that works.",
    sub: "Free 30–45 minute inspection — we come to you in DFW, or you can drop in at our McKinney shop."
  }), /*#__PURE__*/React.createElement("div", {
    className: "sched-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cal-header"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cal-nav",
    onClick: prev,
    type: "button"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "cal-title"
  }, monthName), /*#__PURE__*/React.createElement("button", {
    className: "cal-nav",
    onClick: next,
    type: "button"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cal-grid cal-days"
  }, ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cal-day-lbl"
  }, d))), /*#__PURE__*/React.createElement("div", {
    className: "cal-grid"
  }, cells.map((d, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    className: "cal-cell" + (d ? "" : " empty") + (isDisabled(d) ? " disabled" : "") + (isSelected(d) ? " selected" : ""),
    disabled: !d || isDisabled(d),
    onClick: () => pick(d)
  }, d || ""))), errors.date && /*#__PURE__*/React.createElement("div", {
    className: "field-err",
    style: {
      marginTop: 6
    }
  }, errors.date)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cal-times-header"
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 16,
    stroke: "var(--accent-hi)"
  }), /*#__PURE__*/React.createElement("span", null, selDate || "Choose a date first")), /*#__PURE__*/React.createElement("div", {
    className: "time-grid"
  }, TIME_SLOTS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    type: "button",
    disabled: !data.date,
    className: "time-btn" + (data.time === t ? " selected" : ""),
    onClick: () => set("time", t)
  }, t))), errors.time && /*#__PURE__*/React.createElement("div", {
    className: "field-err",
    style: {
      marginTop: 6
    }
  }, errors.time))), /*#__PURE__*/React.createElement("style", null, `
        .sched-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: flex-start; }
        .cal-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 16px;
        }
        .cal-title {
          font-family: var(--f-display); font-weight: 700; font-size: 17px;
        }
        .cal-nav {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--bg-2); border: 1px solid var(--border);
          color: var(--fg); cursor: pointer;
          display: grid; place-items: center;
        }
        .cal-nav:hover { border-color: var(--accent); color: var(--accent-hi); }
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
        .cal-days { margin-bottom: 8px; }
        .cal-day-lbl {
          text-align: center;
          font-family: var(--f-display); font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; color: var(--fg-2);
          text-transform: uppercase;
        }
        .cal-cell {
          aspect-ratio: 1;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--fg);
          font-family: var(--f-display); font-weight: 500; font-size: 14px;
          cursor: pointer;
          transition: all .15s;
        }
        .cal-cell:hover:not(:disabled) {
          border-color: var(--accent);
          color: var(--accent-hi);
        }
        .cal-cell.empty { background: transparent; border-color: transparent; cursor: default; }
        .cal-cell.disabled { color: var(--fg-3); background: transparent; border-color: transparent; cursor: not-allowed; }
        .cal-cell.selected {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .cal-times-header {
          display: flex; gap: 8px; align-items: center;
          font-family: var(--f-display); font-weight: 600; font-size: 14.5px;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .time-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .time-btn {
          padding: 12px;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--fg);
          font-family: var(--f-display); font-weight: 500; font-size: 13.5px;
          cursor: pointer;
          transition: all .15s;
        }
        .time-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent-hi); }
        .time-btn:disabled { color: var(--fg-3); cursor: not-allowed; opacity: 0.5; }
        .time-btn.selected {
          background: var(--accent); border-color: var(--accent); color: #fff;
        }
        @media (max-width: 700px) {
          .sched-grid { grid-template-columns: 1fr; }
        }
      `));
}
function StepHeader({
  n,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--f-display)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--accent-hi)",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: "var(--accent)"
    }
  }), "Step"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 800,
      fontSize: "clamp(22px, 2.4vw, 30px)",
      letterSpacing: "-0.02em",
      margin: "0 0 8px"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      margin: 0,
      fontSize: 14.5,
      lineHeight: 1.55
    }
  }, sub));
}

/* Success screen */
function BookingSuccess({
  data,
  onReset
}) {
  const dateStr = (() => {
    if (!data.date) return "";
    const [y, m, d] = data.date.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  })();
  const confirmId = "DB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    className: "booking-success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-success-icon"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 32,
    stroke: "#fff",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("h2", {
    className: "bk-success-title"
  }, "You’re booked."), /*#__PURE__*/React.createElement("p", {
    className: "bk-success-sub"
  }, "Your request is in. We’ll reach out at ", /*#__PURE__*/React.createElement("strong", null, data.phone), " within one business hour to confirm the details — or by email at ", /*#__PURE__*/React.createElement("strong", null, data.email), " if that’s easier."), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-success-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bk-success-eyebrow"
  }, "Confirmation"), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-id mono"
  }, confirmId)), /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      background: "rgba(34,197,94,.12)",
      color: "#4ade80",
      borderColor: "rgba(34,197,94,.25)"
    }
  }, "Confirmed")), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-rows"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row-lbl"
  }, "Vehicle"), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row-val"
  }, data.year, " ", data.make, " ", data.model)), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row-lbl"
  }, "Damage"), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row-val"
  }, DAMAGE_TYPES.find(t => t.id === data.damageType)?.label, " ·", " ", SEVERITY.find(s => s.id === data.severity)?.label, data.photos.length > 0 && ` · ${data.photos.length} photo${data.photos.length === 1 ? "" : "s"}`)), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row-lbl"
  }, "Customer"), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row-val"
  }, data.name, " · ", data.zip)), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row-lbl"
  }, "Inspection"), /*#__PURE__*/React.createElement("div", {
    className: "bk-success-row-val",
    style: {
      color: "var(--accent-hi)"
    }
  }, dateStr, " at ", data.time)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginTop: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary",
    href: "tel:+12148597534"
  }, /*#__PURE__*/React.createElement(Phone, {
    size: 15
  }), " Call (214) 859-7534"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onReset
  }, "Book another vehicle")), /*#__PURE__*/React.createElement("style", null, `
        .booking-success {
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          padding: 56px 40px;
          text-align: center;
          box-shadow: var(--shadow-lg);
          animation: stepIn .5s var(--ease);
        }
        .bk-success-icon {
          width: 72px; height: 72px;
          border-radius: 999px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          display: grid; place-items: center;
          margin: 0 auto 24px;
          box-shadow: 0 0 0 8px rgba(34,197,94,.15);
          animation: pop .6s var(--ease);
        }
        @keyframes pop {
          0% { transform: scale(0); }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .bk-success-title {
          font-family: var(--f-display); font-weight: 800;
          font-size: clamp(32px, 4vw, 44px);
          letter-spacing: -0.02em; margin: 0 0 12px;
        }
        .bk-success-sub {
          color: var(--fg-1); font-size: 16px; max-width: 480px;
          margin: 0 auto 32px; line-height: 1.55;
        }
        .bk-success-card { padding: 24px; text-align: left; max-width: 540px; margin: 0 auto; }
        .bk-success-card-header {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .bk-success-eyebrow {
          font-family: var(--f-display); font-size: 10px;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--fg-2);
        }
        .bk-success-id {
          font-family: var(--f-mono); font-weight: 700; font-size: 18px;
          color: var(--fg); margin-top: 2px;
        }
        .bk-success-rows { display: flex; flex-direction: column; gap: 12px; }
        .bk-success-row {
          display: grid; grid-template-columns: 110px 1fr; gap: 16px;
        }
        .bk-success-row-lbl {
          font-family: var(--f-display); font-size: 11px;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-2);
          padding-top: 3px;
        }
        .bk-success-row-val {
          font-family: var(--f-display); font-weight: 500; font-size: 15px; color: var(--fg);
        }
      `));
}

/* ============ Contact Page ============ */
function ContactPage() {
  return /*#__PURE__*/React.createElement("div", {
    className: "page-enter"
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Book your inspection",
    title: "Let’s see what we’re working with.",
    sub: "Free, no-pressure inspection. We come to your home or office, or you can drop in at our McKinney shop. Either way, you'll have an answer the same day."
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-side"
  }, /*#__PURE__*/React.createElement(ContactQuickCard, {
    icon: "Phone",
    title: "Call or text",
    value: "(214) 859-7534",
    sub: "Mon – Sat · 8am – 7pm",
    cta: {
      label: "Call now",
      href: "tel:+12148597534"
    }
  }), /*#__PURE__*/React.createElement(ContactQuickCard, {
    icon: "Mail",
    title: "Email",
    value: "dentbustersllc@gmail.com",
    sub: "Replies within 1 business hour",
    cta: {
      label: "Send email",
      href: "mailto:dentbustersllc@gmail.com"
    }
  }), /*#__PURE__*/React.createElement(ContactQuickCard, {
    icon: "MapPin",
    title: "Our shop",
    value: "McKinney, TX",
    sub: "Serving McKinney, Frisco, Plano, Allen, Prosper, Wylie, Richardson & surrounding"
  }), /*#__PURE__*/React.createElement("div", {
    className: "contact-trust card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginBottom: 10
    }
  }, [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement(Star, {
    key: i,
    size: 15,
    stroke: "#facc15"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--f-display)",
      fontWeight: 700,
      fontSize: 16
    }
  }, "5.0 from 120 Google reviews"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg-2)",
      fontSize: 13,
      marginTop: 6
    }
  }, "Lifetime warranty · Insurance approved · $0 out of pocket"))), /*#__PURE__*/React.createElement("div", {
    className: "contact-main"
  }, /*#__PURE__*/React.createElement(BookingWizard, null)))), /*#__PURE__*/React.createElement("style", null, `
          .contact-grid {
            display: grid;
            grid-template-columns: 340px 1fr;
            gap: 32px;
            align-items: flex-start;
          }
          .contact-side { display: flex; flex-direction: column; gap: 14px; position: sticky; top: 100px; }
          .contact-trust { padding: 22px; }
          @media (max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr; }
            .contact-side { position: static; }
          }
        `)));
}
function ContactQuickCard({
  icon,
  title,
  value,
  sub,
  cta
}) {
  const iconMap = {
    Phone,
    Mail,
    MapPin
  };
  const Ic = iconMap[icon];
  return /*#__PURE__*/React.createElement("div", {
    className: "cq-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cq-icon"
  }, /*#__PURE__*/React.createElement(Ic, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cq-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "cq-value"
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "cq-sub"
  }, sub), cta && /*#__PURE__*/React.createElement("a", {
    className: "cq-cta",
    href: cta.href
  }, cta.label, " ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 13
  }))), /*#__PURE__*/React.createElement("style", null, `
        .cq-card { padding: 20px; display: flex; gap: 14px; align-items: flex-start; }
        .cq-icon {
          width: 40px; height: 40px;
          background: var(--accent-soft);
          color: var(--accent-hi);
          border: 1px solid rgba(207,54,45,.25);
          border-radius: 10px;
          display: grid; place-items: center;
          flex: 0 0 auto;
        }
        .cq-title { font-family: var(--f-display); font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg-2); }
        .cq-value { font-family: var(--f-display); font-weight: 700; font-size: 18px; margin-top: 4px; }
        .cq-sub { color: var(--fg-2); font-size: 13px; margin-top: 4px; line-height: 1.45; }
        .cq-cta {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--accent-hi);
          font-family: var(--f-display); font-weight: 600; font-size: 12px;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-top: 10px;
        }
        .cq-cta:hover { color: var(--accent-2); }
      `));
}
Object.assign(window, {
  ContactPage,
  BookingWizard
});
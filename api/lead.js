// Vercel serverless function: receives a booking submission and emails it to
// the shop via Resend (sending from the verified dentbusterstx.com domain).
// The Resend API key is read from the RESEND_API_KEY environment variable
// (set in the Vercel project settings) and is never exposed to the browser.

const TO = "dentbustersllc@gmail.com";
const FROM = "Dent Busters Website <leads@dentbusterstx.com>";

const esc = (s) =>
  String(s == null ? "" : s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    res.status(500).json({ success: false, error: "Email is not configured (missing RESEND_API_KEY)." });
    return;
  }

  let data = req.body;
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch { data = {}; }
  }
  data = data || {};

  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["ZIP", data.zip],
    ["Vehicle", data.vehicle],
    ["Damage type", data.damageType],
    ["Severity", data.severity],
    ["Photos selected", data.photos],
    ["Requested date", data.date],
    ["Requested time", data.time],
    ["Notes", data.notes],
  ];

  const html =
    `<h2 style="font-family:Arial,sans-serif">New inspection request</h2>` +
    `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:bold;border-bottom:1px solid #eee;white-space:nowrap">${esc(k)}</td>` +
          `<td style="border-bottom:1px solid #eee">${esc(v) || "—"}</td></tr>`
      )
      .join("") +
    `</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: data.email || undefined,
        subject: `New inspection request — ${data.name || "Website"}`,
        html,
        text,
      }),
    });
    const result = await r.json().catch(() => ({}));
    if (r.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(502).json({ success: false, error: result });
    }
  } catch (e) {
    res.status(502).json({ success: false, error: String(e) });
  }
};

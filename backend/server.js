import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Trust the first proxy (Render / Ingress) so rate-limit sees real client IPs.
app.set("trust proxy", 1);

// CORS — restrict to the deployed frontends (comma-separated in ALLOWED_ORIGINS).
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / curl (no Origin header) and any whitelisted origin.
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
  })
);

app.use(express.json({ limit: "10kb" }));

// Basic abuse protection: max 5 contact submissions per IP per 10 minutes.
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages — please try again later." },
});

// Health endpoint for Render / Kubernetes liveness probes.
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/", (_req, res) =>
  res.json({ service: "anant-portfolio-api", status: "running" })
);

// Build the SMTP transport lazily so the server still boots without creds
// (useful in CI / local dev where mail isn't configured).
function createTransport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required" });
  }
  if (typeof name !== "string" || name.length > 120) {
    return res.status(400).json({ error: "Invalid name" });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  if (typeof message !== "string" || message.length > 5000) {
    return res.status(400).json({ error: "Invalid message" });
  }

  const transport = createTransport();

  // Without SMTP configured, log and accept so local/dev still works.
  if (!transport) {
    console.log("[contact] (no SMTP configured) message received:", {
      name,
      email,
      message,
    });
    return res.json({ ok: true, delivered: false });
  }

  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return res.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] mail send failed:", err.message);
    return res.status(502).json({ error: "Failed to send message" });
  }
});

app.listen(PORT, () => {
  console.log(`anant-portfolio-api listening on :${PORT}`);
  console.log(`allowed origins: ${allowedOrigins.join(", ")}`);
});

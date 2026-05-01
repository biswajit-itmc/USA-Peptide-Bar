import express from "express";
import cors from "cors";
import path from "path"; // 👈 path import karein
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export const app = express();

// CORS configuration
const allowedOrigins = [
  "https://usapeptidebar.com",
  "https://www.usapeptidebar.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow server-to-server tools and same-origin requests with no Origin header.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 1. YEH LINE ADD KAREIN (Images dikhane ke liye)
// Iska matlab: Agar koi browser mein "/uploads" par jaye, toh use "uploads" folder ki files dikhao
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Welcome Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the USA Peptide Bar API"
  });
});

// API Routes
app.get("/api/check", (req, res) => res.send("System OK"));
app.use("/api", apiRouter);

// 404 handler
app.use(notFoundHandler);

// Error handler (hamesha last mein)
app.use(errorHandler);
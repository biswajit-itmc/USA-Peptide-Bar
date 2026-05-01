import express from "express";
import cors from "cors";
import path from "path"; // 👈 path import karein
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export const app = express();

// CORS configuration
app.use(cors({
  origin: ["https://usapeptidebar.com/"], 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

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
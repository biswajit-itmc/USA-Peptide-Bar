import express from "express";
import cors from "cors"; // 1. CORS import karein
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export const app = express();

// 2. CORS ko routes aur express.json() se PEHLE lagayein
// Ye browser ki block karne wali policy ko disable kar dega
app.use(cors({
  origin: "http://localhost:5173", // Aapke frontend ka address
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the USA Peptide Bar API"
  });
});

// API Routes
app.use("/api", apiRouter);

// 404 handler
app.use(notFoundHandler);

// Error handler (hamesha last mein)
app.use(errorHandler);
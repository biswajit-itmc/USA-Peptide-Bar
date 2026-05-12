import express from "express";
import cors from "cors";
import path from "path";
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export const app = express();

// CORS configuration
const allowedOrigins = [
  "https://usapeptidebar.com"
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
app.options("/*any", cors(corsOptions));
/* ✅ BODY SIZE FIX (413 ERROR SOLVE) */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* ✅ STATIC FILES */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* Routes */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the USA Peptide Bar API"
  });
});

app.get("/api/check", (req, res) => res.send("System OK"));
app.use("/api", apiRouter);

/* Error handlers */
app.use(notFoundHandler);
app.use(errorHandler);
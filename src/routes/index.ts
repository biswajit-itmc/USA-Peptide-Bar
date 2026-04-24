import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";

export const apiRouter = Router();

// API Health Check
apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString()
  });
});

// Auth Routes (Login, Logout, etc.)
// Path: /api/auth/...
apiRouter.use("/auth", authRouter);

// Yahan aap future mein aur routes add kar sakte hain, jaise:
// apiRouter.use("/products", productRouter);
// apiRouter.use("/orders", orderRouter);

export default apiRouter;
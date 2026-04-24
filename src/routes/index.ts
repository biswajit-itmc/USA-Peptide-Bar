import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import productRouter from "../modules/product/product.routes.js"; // 👈 add this

export const apiRouter = Router();

// ✅ Health Check
apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString()
  });
});

// ✅ Auth Routes
apiRouter.use("/auth", authRouter);

// ✅ Product Routes 👇
apiRouter.use("/products", productRouter);

export default apiRouter;
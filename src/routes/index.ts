import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running"
  });
});

apiRouter.use("/auth", authRouter);

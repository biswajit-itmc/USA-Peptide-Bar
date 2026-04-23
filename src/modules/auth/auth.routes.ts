import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authMiddleware, roleMiddleware, approvedWholesaleMiddleware } from "../../middlewares/auth.js";

export const authRouter = Router();

// Public routes
authRouter.post("/signup", authController.signupRetail);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refreshAccessToken);
authRouter.post("/wholesale/apply", authController.submitWholesaleApplication);

// Protected routes - Authenticated users
authRouter.get("/me", authMiddleware, authController.getCurrentUser);

// Protected routes - Approved wholesale only
authRouter.get(
  "/wholesale/verify",
  authMiddleware,
  roleMiddleware("wholesale"),
  approvedWholesaleMiddleware,
  (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Wholesale user verified",
      data: _req.user
    });
  }
);

// Admin routes - Wholesale management (in a real app, you'd have an admin role check)
authRouter.get("/admin/applications", authMiddleware, authController.getAllWholesaleApplications);
authRouter.get("/admin/applications/:id", authMiddleware, authController.getWholesaleApplicationById);
authRouter.post("/admin/applications/:id/approve", authMiddleware, authController.approveWholesaleApplication);
authRouter.post("/admin/applications/:id/reject", authMiddleware, authController.rejectWholesaleApplication);

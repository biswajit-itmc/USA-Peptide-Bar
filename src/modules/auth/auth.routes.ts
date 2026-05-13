import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authMiddleware, adminAuthMiddleware, roleMiddleware, approvedWholesaleMiddleware } from "../../middlewares/auth.js";

export const authRouter = Router();

// Public routes
authRouter.post("/signup", authController.signupRetail);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refreshAccessToken);
authRouter.post("/admin/login", authController.adminLogin);
authRouter.post("/admin/refresh", authController.refreshAdminAccessToken);
authRouter.post("/rep/login", authController.repLogin);
authRouter.post("/rep/refresh", authController.repRefreshAccessToken);
authRouter.post("/wholesale/apply", authController.submitWholesaleApplication);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);


// Protected routes - Authenticated users
authRouter.get("/me", authMiddleware, authController.getCurrentUser);
authRouter.patch("/me", authMiddleware, authController.updateProfile);
authRouter.get("/admin/me", adminAuthMiddleware, authController.getCurrentAdmin);

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

// Admin routes - Wholesale management
authRouter.get("/admin/users", authController.getAllUsers);
authRouter.get("/admin/applications", adminAuthMiddleware, authController.getAllWholesaleApplications);
authRouter.get("/admin/applications/:id", adminAuthMiddleware, authController.getWholesaleApplicationById);
authRouter.post("/admin/applications/:id/approve", adminAuthMiddleware, authController.approveWholesaleApplication);
authRouter.post("/admin/applications/:id/reject", adminAuthMiddleware, authController.rejectWholesaleApplication);
authRouter.post("/admin/login-as/:userId", adminAuthMiddleware, authController.loginAsUser);


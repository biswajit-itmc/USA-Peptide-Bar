import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { authValidation, type SignupRetailRequest, type LoginRequest, type AdminLoginRequest, type WholesaleApplicationRequest } from "./auth.validation.js";
import { responseHandler } from "../../utils/response.js";

export const authController = {
  // Retail signup
  async signupRetail(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as SignupRetailRequest;

      // Validate input
      const validation = authValidation.validateSignupRetail(data);
      if (!validation.valid) {
        responseHandler.badRequest(res, "Validation failed", JSON.stringify(validation.errors));
        return;
      }

      // Create user
      const result = await authService.signupRetail(data);

      responseHandler.created(res, "Account created successfully", {
        user: result.user
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Signup failed";

      if (message === "Email already registered") {
        responseHandler.conflict(res, message);
        return;
      }

      responseHandler.serverError(res, message);
    }
  },

  // Login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as LoginRequest;

      // Validate input
      const validation = authValidation.validateLogin(data);
      if (!validation.valid) {
        responseHandler.badRequest(res, "Validation failed", JSON.stringify(validation.errors));
        return;
      }

      // Login user
      const result = await authService.login(data);

      responseHandler.ok(res, "Login successful", {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";

      if (message.includes("pending approval")) {
        responseHandler.forbidden(res, message);
        return;
      }

      responseHandler.unauthorized(res, message);
    }
  },

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as AdminLoginRequest;

      const validation = authValidation.validateAdminLogin(data);
      if (!validation.valid) {
        responseHandler.badRequest(res, "Validation failed", JSON.stringify(validation.errors));
        return;
      }

      const result = await authService.adminLogin(data);

      responseHandler.ok(res, "Admin login successful", {
        admin: result.admin,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Admin login failed";
      responseHandler.unauthorized(res, message);
    }
  },

  async repLogin(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as { repId: string; password: string };

      const validation = authValidation.validateSalesRepLogin(data);
      if (!validation.valid) {
        responseHandler.badRequest(res, "Validation failed", JSON.stringify(validation.errors));
        return;
      }

      const result = await authService.repLogin(data);

      responseHandler.ok(res, "Sales rep login successful", {
        rep: result.rep,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sales rep login failed";
      console.error("Sales rep login error:", message);
      responseHandler.unauthorized(res, message);
    }
  },

  // Refresh access token
  async refreshAccessToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body as { refreshToken: string };

      if (!refreshToken) {
        responseHandler.badRequest(res, "Refresh token is required");
        return;
      }

      const result = await authService.refreshAccessToken(refreshToken);

      responseHandler.ok(res, "Token refreshed successfully", {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Token refresh failed";

      if (message.includes("Invalid") || message.includes("expired")) {
        responseHandler.unauthorized(res, message);
        return;
      }

      responseHandler.serverError(res, message);
    }
  },

  async refreshAdminAccessToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body as { refreshToken: string };

      if (!refreshToken) {
        responseHandler.badRequest(res, "Refresh token is required");
        return;
      }

      const result = await authService.refreshAdminAccessToken(refreshToken);

      responseHandler.ok(res, "Admin token refreshed successfully", {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Admin token refresh failed";

      if (message.includes("Invalid") || message.includes("expired")) {
        responseHandler.unauthorized(res, message);
        return;
      }

      responseHandler.serverError(res, message);
    }
  },

  async repRefreshAccessToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body as { refreshToken: string };

      if (!refreshToken) {
        responseHandler.badRequest(res, "Refresh token is required");
        return;
      }

      const result = await authService.refreshRepAccessToken(refreshToken);

      responseHandler.ok(res, "Sales rep token refreshed successfully", {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sales rep token refresh failed";

      if (message.includes("Invalid") || message.includes("expired")) {
        responseHandler.unauthorized(res, message);
        return;
      }

      responseHandler.serverError(res, message);
    }
  },

  // Submit wholesale application
  async submitWholesaleApplication(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as WholesaleApplicationRequest;

      // Validate input
      const validation = authValidation.validateWholesaleApplication(data);
      if (!validation.valid) {
        responseHandler.badRequest(res, "Validation failed", JSON.stringify(validation.errors));
        return;
      }

      // Submit application
      const application = await authService.submitWholesaleApplication(data);

      responseHandler.created(res, "Wholesale application submitted successfully", application);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Application submission failed";

      if (message.includes("already have")) {
        responseHandler.conflict(res, message);
        return;
      }

      responseHandler.serverError(res, message);
    }
  },

  // Get current user profile
  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        responseHandler.unauthorized(res, "User not authenticated");
        return;
      }

      const user = await authService.getUserById(req.user.userId);

      if (!user) {
        responseHandler.notFound(res, "User not found");
        return;
      }

      responseHandler.ok(res, "User profile retrieved", user);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to get user profile";
      responseHandler.serverError(res, message);
    }
  },

  async getCurrentAdmin(req: Request, res: Response): Promise<void> {
    try {
      if (!req.admin) {
        responseHandler.unauthorized(res, "Admin not authenticated");
        return;
      }

      const admin = await authService.getAdminById(req.admin.userId);

      if (!admin) {
        responseHandler.notFound(res, "Admin not found");
        return;
      }

      responseHandler.ok(res, "Admin profile retrieved", admin);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to get admin profile";
      responseHandler.serverError(res, message);
    }
  },

  // Get all wholesale applications (admin)
  async getAllWholesaleApplications(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.query;

      const applications = await authService.getAllWholesaleApplications(status as string | undefined);

      responseHandler.ok(res, "Wholesale applications retrieved", {
        total: applications.length,
        applications
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to retrieve applications";
      responseHandler.serverError(res, message);
    }
  },

  // Get wholesale application by ID (admin)
  async getWholesaleApplicationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const application = await authService.getWholesaleApplicationById(Number(id));

      if (!application) {
        responseHandler.notFound(res, "Application not found");
        return;
      }

      responseHandler.ok(res, "Application retrieved", application);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to retrieve application";
      responseHandler.serverError(res, message);
    }
  },

  // Approve wholesale application (admin)
  async approveWholesaleApplication(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        responseHandler.badRequest(res, "Password is required to create account for user");
        return;
      }

      const user = await authService.approveWholesaleApplication(Number(id), password);

      responseHandler.ok(res, "Wholesale application approved and user account created", {
        user,
        message: "User can now log in with their email"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to approve application";

      if (message === "Application not found") {
        responseHandler.notFound(res, message);
        return;
      }

      if (message.includes("Only pending") || message.includes("already exists")) {
        responseHandler.badRequest(res, message);
        return;
      }

      responseHandler.serverError(res, message);
    }
  },

  // Reject wholesale application (admin)
  async rejectWholesaleApplication(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { rejectionReason } = req.body;

      if (!rejectionReason) {
        responseHandler.badRequest(res, "Rejection reason is required");
        return;
      }

      const application = await authService.rejectWholesaleApplication(Number(id), rejectionReason);

      responseHandler.ok(res, "Wholesale application rejected", application);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to reject application";

      if (message === "Application not found") {
        responseHandler.notFound(res, message);
        return;
      }

      if (message.includes("Only pending")) {
        responseHandler.badRequest(res, message);
        return;
      }

      responseHandler.serverError(res, message);
    }
  },
async getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    console.log("Fetching users..."); // Yeh check karne ke liye ki request yahan tak pahuchi
    const users = await authService.getAllUsers();
    console.log("Users found:", users.length);
    
    responseHandler.ok(res, "All users retrieved successfully", {
      total: users.length,
      users
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    const message = error instanceof Error ? error.message : "Failed to retrieve users";
    responseHandler.serverError(res, message);
  }
},

async updateProfile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      responseHandler.unauthorized(res, "User not authenticated");
      return;
    }

    const { fullName, phone } = req.body;
    
    // Simple split for first and last name
    const nameParts = fullName.trim().split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" ") || "";

    const user = await authService.updateProfile(req.user.userId, {
      first_name,
      last_name,
      phone
    });

    responseHandler.ok(res, "Profile updated successfully", user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    responseHandler.serverError(res, message);
  }
},
};

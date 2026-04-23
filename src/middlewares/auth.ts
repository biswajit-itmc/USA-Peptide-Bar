import type { Request, Response, NextFunction } from "express";
import { jwtUtils, type JwtPayload } from "../utils/jwt.js";
import { responseHandler } from "../utils/response.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      responseHandler.unauthorized(res, "Missing or invalid authorization header");
      return;
    }

    const token = authHeader.slice(7);

    const payload = jwtUtils.verifyToken(token);
    req.user = payload;

    next();
  } catch (error) {
    responseHandler.unauthorized(res, "Invalid or expired token");
  }
};

export const roleMiddleware = (...allowedRoles: ("retail" | "wholesale")[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      responseHandler.unauthorized(res, "User not authenticated");
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      responseHandler.forbidden(res, `Access denied. Only ${allowedRoles.join(", ")} users can access this resource`);
      return;
    }

    next();
  };
};

export const approvedWholesaleMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    responseHandler.unauthorized(res, "User not authenticated");
    return;
  }

  if (req.user.role === "wholesale" && !req.user.isApproved) {
    responseHandler.forbidden(res, "Your wholesale account is pending approval");
    return;
  }

  next();
};

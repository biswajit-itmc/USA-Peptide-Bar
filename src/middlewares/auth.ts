import type { Request, Response, NextFunction } from "express";
import { jwtUtils, type JwtPayload } from "../utils/jwt.js";
import { responseHandler } from "../utils/response.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      admin?: JwtPayload;
      salesRep?: JwtPayload;
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

    if (payload.role !== "retail" && payload.role !== "wholesale") {
      responseHandler.forbidden(res, `Access denied. Only customers can access this resource.`);
      return;
    }

    req.user = payload;

    next();
  } catch (error) {
    responseHandler.unauthorized(res, "Invalid or expired token");
  }
};

export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.slice(7);
    const payload = jwtUtils.verifyToken(token);

    if (payload.role === "retail" || payload.role === "wholesale") {
      req.user = payload;
    }

    next();
  } catch (error) {
    // If token is invalid, we still allow them as a guest but don't set req.user
    next();
  }
};

export const roleMiddleware = (...allowedRoles: ("retail" | "wholesale")[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      responseHandler.unauthorized(res, "User not authenticated");
      return;
    }

    if (req.user.role === "admin" || !allowedRoles.includes(req.user.role as any)) {
      responseHandler.forbidden(res, `Access denied. Only ${allowedRoles.join(", ")} users can access this resource`);
      return;
    }

    next();
  };
};

export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      responseHandler.unauthorized(res, "Missing or invalid authorization header");
      return;
    }

    const token = authHeader.slice(7);
    const payload = jwtUtils.verifyToken(token);

    if (payload.role !== "admin") {
      responseHandler.forbidden(res, "Only admin users can access this resource");
      return;
    }

    req.admin = payload;
    next();
  } catch (error) {
    responseHandler.unauthorized(res, "Invalid or expired token");
  }
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

export const salesRepAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      responseHandler.unauthorized(res, "Missing or invalid authorization header");
      return;
    }

    const token = authHeader.slice(7);
    const payload = jwtUtils.verifyToken(token);

    if (payload.role !== "sales_rep") {
      responseHandler.forbidden(res, "Only sales representatives can access this resource");
      return;
    }

    // Check if rep is still active in database
    const { db } = await import("../db/knex.js");
    const rep = await db("sales_reps").where("id", payload.userId).select("is_active").first();
    
    if (!rep || !rep.is_active) {
      responseHandler.unauthorized(res, "Your account has been deactivated or not found");
      return;
    }

    req.salesRep = payload;
    // Map to req.user as well for generic controllers if needed
    (req as any).user = payload;
    next();
  } catch (error) {
    responseHandler.unauthorized(res, "Invalid or expired token");
  }
};

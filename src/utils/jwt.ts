import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtPayload {
  userId: number;
  email: string;
  role: "retail" | "wholesale" | "admin" | "sales_rep";
  isApproved: boolean;
  type?: "access" | "refresh";
}

export const jwtUtils = {
  // Generate access token (short-lived)
  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(
      { ...payload, type: "access" },
      env.auth.jwtSecret,
      { expiresIn: env.auth.jwtExpiration as any }
    );
  },

  // Generate refresh token (long-lived - 7 days)
  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(
      { ...payload, type: "refresh" },
      env.auth.jwtSecret,
      { expiresIn: "7d" }
    );
  },

  // Legacy method for backward compatibility
  generateToken(payload: JwtPayload): string {
    return this.generateAccessToken(payload);
  },

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, env.auth.jwtSecret) as JwtPayload;
  },

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, env.auth.jwtSecret) as JwtPayload;
  },

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, env.auth.jwtSecret) as JwtPayload;
  },

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
};

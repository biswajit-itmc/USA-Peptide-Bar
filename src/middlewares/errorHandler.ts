import type { Request, Response, NextFunction } from "express";
import { responseHandler } from "../utils/response.js";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Error:", err);

  const isDevelopment = process.env.NODE_ENV === "development";
  const message = isDevelopment ? err.message : "Internal server error";

  responseHandler.serverError(res, message, isDevelopment ? err.stack : undefined);
};

export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction): void => {
  responseHandler.notFound(res, "Route not found");
};

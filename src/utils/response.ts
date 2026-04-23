import type { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}

export const responseHandler = {
  success<T>(res: Response, statusCode: number, message: string, data?: T): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data: data ?? null,
      statusCode
    });
  },

  error(res: Response, statusCode: number, message: string, error?: string): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      error: error ?? null,
      statusCode
    });
  },

  created<T>(res: Response, message: string, data?: T): Response {
    return this.success(res, 201, message, data);
  },

  ok<T>(res: Response, message: string, data?: T): Response {
    return this.success(res, 200, message, data);
  },

  badRequest(res: Response, message: string = "Bad Request", error?: string): Response {
    return this.error(res, 400, message, error);
  },

  unauthorized(res: Response, message: string = "Unauthorized", error?: string): Response {
    return this.error(res, 401, message, error);
  },

  forbidden(res: Response, message: string = "Forbidden", error?: string): Response {
    return this.error(res, 403, message, error);
  },

  notFound(res: Response, message: string = "Not Found", error?: string): Response {
    return this.error(res, 404, message, error);
  },

  conflict(res: Response, message: string = "Conflict", error?: string): Response {
    return this.error(res, 409, message, error);
  },

  serverError(res: Response, message: string = "Internal Server Error", error?: string): Response {
    return this.error(res, 500, message, error);
  }
};

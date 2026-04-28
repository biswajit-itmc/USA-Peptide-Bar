import type { Request, Response } from "express";
import { userService } from "./user.service.js";
import { responseHandler } from "../../utils/response.js";

export const userController = {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      console.log("==> Get All Users Route Hit!");
      responseHandler.ok(res, "All users retrieved successfully", {
        total: users.length,
        users
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to retrieve users";
      responseHandler.serverError(res, message);
    }
  },

  async getWholesaleUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getWholesaleUsers();
      console.log("==> Get Wholesale Users Route Hit!");
      responseHandler.ok(res, "Wholesale users retrieved successfully", {
        total: users.length,
        users
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to retrieve wholesale users";
      responseHandler.serverError(res, message);
    }
  },

  async getOneUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      
      if (!user) {
        responseHandler.notFound(res, "User not found");
        return;
      }
      
      responseHandler.ok(res, "User retrieved successfully", user);
    } catch (error) {
      responseHandler.serverError(res, "Error fetching user");
    }
  }
};
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
  },

  async getAddresses(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        responseHandler.unauthorized(res, "Not authenticated");
        return;
      }
      const addresses = await userService.getAddresses(req.user.userId);
      responseHandler.ok(res, "Addresses retrieved", addresses);
    } catch (error) {
      responseHandler.serverError(res, "Failed to get addresses");
    }
  },

  async addAddress(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        responseHandler.unauthorized(res, "Not authenticated");
        return;
      }
      const address = await userService.addAddress(req.user.userId, req.body);
      responseHandler.created(res, "Address added", address);
    } catch (error) {
      responseHandler.serverError(res, "Failed to add address");
    }
  },

  async deleteAddress(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        responseHandler.unauthorized(res, "Not authenticated");
        return;
      }
      const { id } = req.params;
      await userService.deleteAddress(req.user.userId, Number(id));
      responseHandler.ok(res, "Address deleted");
    } catch (error) {
      responseHandler.serverError(res, "Failed to delete address");
    }
  }
};
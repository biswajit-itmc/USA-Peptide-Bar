import type { Request, Response } from "express";
import { orderService } from "./order.service.js";
import { responseHandler } from "../../utils/response.js";

export const orderController = {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user ? req.user.userId : null;
      
      // Since we use FormData, order data is in req.body.data as a JSON string
      const orderData = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
      const { formData, items, totalAmount } = orderData;
      
      const screenshot = req.file ? req.file.filename : null;

      const result = await orderService.createOrder(
        userId, 
        { ...formData, totalAmount, payment_screenshot: screenshot }, 
        items
      );
      
      responseHandler.created(res, "Order placed successfully", result);
    } catch (error) {
      console.error("Order error:", error);
      responseHandler.serverError(res, "Failed to place order");
    }
  },

  async getOrderHistory(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        responseHandler.unauthorized(res, "Not authenticated");
        return;
      }
      const orders = await orderService.getOrderHistory(req.user.userId);
      responseHandler.ok(res, "Order history retrieved", orders);
    } catch (error) {
      responseHandler.serverError(res, "Failed to get order history");
    }
  },

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      // Typically we'd check if user is admin here, assuming authMiddleware does some checks
      // Or we just allow if they reach this route in this setup
      const orders = await orderService.getAllOrders();
      responseHandler.ok(res, "All orders retrieved", orders);
    } catch (error) {
      console.error("Get all orders error:", error);
      responseHandler.serverError(res, "Failed to get all orders");
    }
  },

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !['pending', 'completed', 'cancelled'].includes(status)) {
        responseHandler.badRequest(res, "Invalid status provided");
        return;
      }

      const updatedOrder = await orderService.updateOrderStatus(Number(id), status);
      
      if (!updatedOrder) {
        responseHandler.notFound(res, "Order not found");
        return;
      }

      responseHandler.ok(res, "Order status updated", updatedOrder);
    } catch (error) {
      console.error("Update order status error:", error);
      responseHandler.serverError(res, "Failed to update order status");
    }
  },

  async updateOrderAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await orderService.updateOrder(Number(id), req.body);
      responseHandler.ok(res, "Order updated successfully");
    } catch (error) {
      console.error("Update order admin error:", error);
      responseHandler.serverError(res, "Failed to update order");
    }
  },

  async deleteOrderAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await orderService.deleteOrder(Number(id));
      responseHandler.ok(res, "Order deleted successfully");
    } catch (error) {
      console.error("Delete order admin error:", error);
      responseHandler.serverError(res, "Failed to delete order");
    }
  }
};


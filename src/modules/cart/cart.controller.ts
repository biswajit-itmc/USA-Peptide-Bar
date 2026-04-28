import type { Request, Response } from "express";
import { cartService } from "./cart.service.js";
import { responseHandler } from "../../utils/response.js";

export const cartController = {
  // GET /api/cart — user ka cart dikhao
  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const result = await cartService.getCartSummary(userId);
      responseHandler.ok(res, "Cart retrieved successfully", result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to get cart";
      responseHandler.serverError(res, message);
    }
  },

  // POST /api/cart — item add karo
  async addToCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { product_id, quantity = 1 } = req.body;

      if (!product_id) {
        responseHandler.badRequest(res, "product_id is required");
        return;
      }

      const items = await cartService.addToCart(userId, Number(product_id), Number(quantity));
      responseHandler.ok(res, "Item added to cart", items);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add to cart";
      if (message === "Product not found") {
        responseHandler.notFound(res, message);
        return;
      }
      responseHandler.serverError(res, message);
    }
  },

  // PUT /api/cart/:itemId — quantity update karo
  async updateQuantity(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { itemId } = req.params;
      const { quantity } = req.body;

      if (quantity === undefined) {
        responseHandler.badRequest(res, "quantity is required");
        return;
      }

      const items = await cartService.updateQuantity(userId, Number(itemId), Number(quantity));
      responseHandler.ok(res, "Cart updated", items);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update cart";
      responseHandler.serverError(res, message);
    }
  },

  // DELETE /api/cart/:itemId — ek item remove karo
  async removeItem(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { itemId } = req.params;
      const items = await cartService.removeFromCart(userId, Number(itemId));
      responseHandler.ok(res, "Item removed from cart", items);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to remove item";
      responseHandler.serverError(res, message);
    }
  },

  // DELETE /api/cart — poora cart clear karo
  async clearCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.userId;
      await cartService.clearCart(userId);
      responseHandler.ok(res, "Cart cleared", []);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to clear cart";
      responseHandler.serverError(res, message);
    }
  },
};

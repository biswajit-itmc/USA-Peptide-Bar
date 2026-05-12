import type { Request, Response } from "express";
import { couponService } from "./coupon.service.js";
import { responseHandler } from "../../utils/response.js";

export const couponController = {
  async validateCoupon(req: Request, res: Response): Promise<void> {
    try {
      const { code, orderAmount } = req.body;
      
      if (!code) {
        responseHandler.badRequest(res, "Coupon code is required");
        return;
      }

      const coupon = await couponService.validateCoupon(code, Number(orderAmount));
      
      responseHandler.ok(res, "Promo code applied successfully", coupon);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to validate promo code";
      responseHandler.badRequest(res, message);
    }
  }
};

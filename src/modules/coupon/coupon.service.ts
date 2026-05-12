import { db } from "../../db/knex.js";

export interface Coupon {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  min_order_amount: number;
  usage_limit: number | null;
  usage_count: number;
  expires_at: string | null;
  is_active: boolean;
}

export const couponService = {
  async validateCoupon(code: string, orderAmount: number): Promise<Coupon> {
    const coupon = await db("coupons")
      .where("code", code.toUpperCase())
      .where("is_active", true)
      .first() as Coupon | undefined;

    if (!coupon) {
      throw new Error("Invalid or expired promo code");
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      throw new Error("Promo code has expired");
    }

    if (coupon.usage_limit !== null && coupon.usage_count >= coupon.usage_limit) {
      throw new Error("Promo code usage limit reached");
    }

    if (orderAmount < coupon.min_order_amount) {
      throw new Error(`Minimum order amount for this code is $${coupon.min_order_amount}`);
    }

    return coupon;
  },

  async incrementUsage(id: number): Promise<void> {
    await db("coupons").where("id", id).increment("usage_count", 1);
  }
};

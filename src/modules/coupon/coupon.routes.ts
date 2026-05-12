import { Router } from "express";
import { couponController } from "./coupon.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const couponRouter = Router();

couponRouter.post("/validate", authMiddleware, couponController.validateCoupon);

export default couponRouter;

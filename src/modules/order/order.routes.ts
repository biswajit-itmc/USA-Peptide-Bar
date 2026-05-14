import { Router } from "express";
import { orderController } from "./order.controller.js";
import { authMiddleware, adminAuthMiddleware, optionalAuthMiddleware } from "../../middlewares/auth.js";
import { upload } from "../../utils/upload.js";

const orderRouter = Router();

orderRouter.post("/", optionalAuthMiddleware, upload.single('screenshot'), orderController.createOrder);
orderRouter.get("/history", authMiddleware, orderController.getOrderHistory);
orderRouter.get("/admin/all", adminAuthMiddleware, orderController.getAllOrders);
orderRouter.patch("/:id/status", adminAuthMiddleware, orderController.updateOrderStatus);
orderRouter.patch("/:id", adminAuthMiddleware, orderController.updateOrderAdmin);
orderRouter.delete("/:id", adminAuthMiddleware, orderController.deleteOrderAdmin);


export default orderRouter;

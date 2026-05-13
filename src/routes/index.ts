import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import eliteProductsRoutes from "../modules/eliteproducts/eliteproducts.routes.js";
import productRouter from "../modules/product/product.routes.js";
import wholesaleRoutes from "../modules/wholesale/wholesale.routes.js";
import contactRoutes from "../modules/contact/contact.route.js";
import userRouter from "../modules/user/user.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import orderRouter from "../modules/order/order.routes.js";
import salesRepRoutes from "../modules/sales-rep/sales-rep.routes.js";
import couponRouter from "../modules/coupon/coupon.routes.js";


export const apiRouter = Router();

// ✅ Health Checkk
apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString()
  });
});

// ✅ Auth Routes
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter)
apiRouter.use("/eliteproducts", eliteProductsRoutes);
apiRouter.use("/wholesale", wholesaleRoutes);

// ✅ Future: Product Routes can be added here
 apiRouter.use("/products", productRouter);

 apiRouter.use("/message", contactRoutes);
 apiRouter.use("/cart", cartRouter);
 apiRouter.use("/orders", orderRouter);
 apiRouter.use("/sales-rep", salesRepRoutes);
 apiRouter.use("/coupons", couponRouter);


export default apiRouter;
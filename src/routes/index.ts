import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import eliteProductsRoutes from "../modules/eliteproducts/eliteproducts.routes.js";
import productRouter from "../modules/product/product.routes.js";
import wholesaleRoutes from "../modules/wholesale/wholesale.routes.js";
import contactRoutes from "../modules/contact/contact.route.js";



export const apiRouter = Router();

// ✅ Health Check
apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString()
  });
});

// ✅ Auth Routes
apiRouter.use("/auth", authRouter);
apiRouter.use("/eliteproducts", eliteProductsRoutes);
apiRouter.use("/wholesale", wholesaleRoutes);

// ✅ Future: Product Routes can be added here
 apiRouter.use("/products", productRouter);

 apiRouter.use("/message", contactRoutes);

export default apiRouter;
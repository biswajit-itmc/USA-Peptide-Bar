import { Router } from "express";
import { cartController } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const cartRouter = Router();

// Sab routes ke liye login zaroori hai
cartRouter.use(authMiddleware);

cartRouter.get("/", cartController.getCart);
cartRouter.post("/", cartController.addToCart);
cartRouter.put("/:itemId", cartController.updateQuantity);
cartRouter.delete("/:itemId", cartController.removeItem);
cartRouter.delete("/", cartController.clearCart);

export default cartRouter;

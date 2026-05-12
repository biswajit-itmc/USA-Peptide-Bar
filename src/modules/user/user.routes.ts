import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware, adminAuthMiddleware } from "../../middlewares/auth.js";

const userRouter = Router();

// Sirf admin hi users ki list dekh sakta hai
userRouter.get("/",  userController.getAllUsers);
userRouter.get("/wholesale", userController.getWholesaleUsers);

// ✅ Address Routes (Current User)
userRouter.get("/addresses", authMiddleware, userController.getAddresses);
userRouter.post("/addresses", authMiddleware, userController.addAddress);
userRouter.delete("/addresses/:id", authMiddleware, userController.deleteAddress);

userRouter.get("/:id", adminAuthMiddleware, userController.getOneUser);
userRouter.patch("/:id/status", adminAuthMiddleware, userController.toggleUserStatus);

export default userRouter;
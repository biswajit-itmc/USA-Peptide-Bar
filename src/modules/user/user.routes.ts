import { Router } from "express";
import { userController } from "./user.controller.js";
import { adminAuthMiddleware } from "../../middlewares/auth.js";

const userRouter = Router();

// Sirf admin hi users ki list dekh sakta hai
userRouter.get("/",  userController.getAllUsers);
userRouter.get("/wholesale", userController.getWholesaleUsers);
userRouter.get("/:id", adminAuthMiddleware, userController.getOneUser);

export default userRouter;
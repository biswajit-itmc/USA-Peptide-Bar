import { Router } from "express";
import * as contactController from "./contact.controller.js";
import { verifyAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

// User sends message
router.post("/send", contactController.createMessage);

// Admin fetch messages
router.get("/get", verifyAdmin ,contactController.getMessages);

export default router;
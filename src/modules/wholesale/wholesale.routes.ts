import { Router } from "express";
import {
  addWholesalePricing,
  deleteWholesalePricing,
  getWholesalePricing,
  updateWholesalePricing,
} from "./wholesale.controller.js";
import { verifyAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

// 🔒 Admin only
router.post("/add-pricing", verifyAdmin, addWholesalePricing);

// 🔓 Public (ya later secure kar sakte ho)
router.get("/:productId", getWholesalePricing);

router.put("/update-pricing", verifyAdmin, updateWholesalePricing);

router.delete("/:productId", verifyAdmin, deleteWholesalePricing);

export default router;
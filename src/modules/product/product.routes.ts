import { Router } from "express";
import * as productController from "./product.controller.js";
import { upload } from "../../utils/upload.js";
import { verifyAdmin } from "../../middlewares/auth.middleware.js"; // 👈 Middleware import

const router = Router();

// 🔓 PUBLIC ROUTES (Customers ke liye)
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// 🔒 PROTECTED ROUTES (Sirf Admin ke liye)
// verifyAdmin middleware Controller se pehle chalega
router.post(
  "/create",
  verifyAdmin, 
  upload.single("image"),
  productController.createProduct
);

router.put(
  "/:id",
  verifyAdmin,
  upload.single("image"),
  productController.updateProduct
);

router.delete(
  "/:id",
  verifyAdmin,
  productController.deleteProduct
);

export default router;
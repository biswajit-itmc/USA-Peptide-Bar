import { Router } from "express";
import { salesRepController } from "./sales-rep.controller.js";
import { salesRepAuthMiddleware, adminAuthMiddleware } from "../../middlewares/auth.js";

const router = Router();

// Sales Rep Portal Routes (Protected for Reps)
router.get("/stats", salesRepAuthMiddleware, salesRepController.getStats);
router.get("/orders", salesRepAuthMiddleware, salesRepController.getOrders);
router.get("/clients", salesRepAuthMiddleware, salesRepController.getClients);

// Admin Routes (Protected for Admins)
router.get("/admin/reps", adminAuthMiddleware, salesRepController.getAllRepsAdmin);
router.post("/admin/reps", adminAuthMiddleware, salesRepController.createRep);
router.put("/admin/reps/:id", adminAuthMiddleware, salesRepController.updateRep);
router.delete("/admin/reps/:id", adminAuthMiddleware, salesRepController.deleteRep);

router.get("/admin/commissions", adminAuthMiddleware, salesRepController.getAllCommissions);
router.put("/admin/commissions/:orderId/status", adminAuthMiddleware, salesRepController.updateCommissionStatus);

export default router;

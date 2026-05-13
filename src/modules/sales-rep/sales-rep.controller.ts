import { Request, Response } from "express";
import { salesRepService } from "./sales-rep.service.js";

export const salesRepController = {
  async getStats(req: Request, res: Response) {
    try {
      const repId = (req as any).user.userId;
      const stats = await salesRepService.getRepStats(repId);
      res.json({ success: true, data: stats });
    } catch (error: any) {
      console.error("getStats error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getOrders(req: Request, res: Response) {
    try {
      const repId = (req as any).user.userId;
      const orders = await salesRepService.getRepOrders(repId);
      res.json({ success: true, data: orders });
    } catch (error: any) {
      console.error("getOrders error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getClients(req: Request, res: Response) {
    try {
      const repId = (req as any).user.userId;
      const clients = await salesRepService.getRepClients(repId);
      res.json({ success: true, data: clients });
    } catch (error: any) {
      console.error("getClients error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Admin Controllers
  async getAllRepsAdmin(req: Request, res: Response) {
    try {
      const reps = await salesRepService.getAllRepsAdmin();
      res.json({ success: true, data: reps });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async createRep(req: Request, res: Response) {
    try {
      const id = await salesRepService.createRepAdmin(req.body);
      res.status(201).json({ success: true, data: { id } });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateRep(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await salesRepService.updateRepAdmin(parseInt(id as any), req.body);
      res.json({ success: true, message: "Rep updated successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteRep(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await salesRepService.deleteRepAdmin(parseInt(id as any));
      res.json({ success: true, message: "Rep deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getRepDetailsAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const details = await salesRepService.getRepDetailsAdmin(parseInt(id as any));
      res.json({ success: true, data: details });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },


  async getAllCommissions(req: Request, res: Response) {
    try {
      const commissions = await salesRepService.getAllCommissionsAdmin();
      res.json({ success: true, data: commissions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getCommissionDetails(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const details = await salesRepService.getCommissionDetailsAdmin(parseInt(orderId as any));
      res.json({ success: true, data: details });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },


  async updateCommissionStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      await salesRepService.updateCommissionStatus(parseInt(orderId as any), status);
      res.json({ success: true, message: `Commission marked as ${status}` });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

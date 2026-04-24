import { Request, Response } from "express";
import * as wholesaleService from "./wholesale.service.js";

// ✅ Add wholesale pricing
export const addWholesalePricing = async (req: Request, res: Response) => {
  try {
    const { product_id, prices } = req.body;

    if (!product_id || !Array.isArray(prices)) {
      return res.status(400).json({
        message: "product_id and prices array are required",
      });
    }

    await wholesaleService.addWholesalePrices(product_id, prices);

    res.status(201).json({
      success: true,
      message: "Wholesale pricing added successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error adding wholesale pricing",
      error: error.message,
    });
  }
};

// ✅ Get wholesale pricing by product
export const getWholesalePricing = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId);

    const data = await wholesaleService.getWholesalePrices(productId);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching wholesale pricing",
    });
  }
};


export const updateWholesalePricing = async (req: Request, res: Response) => {
  try {
    const { product_id, prices } = req.body;

    if (!product_id || !Array.isArray(prices)) {
      return res.status(400).json({
        message: "product_id and prices array are required",
      });
    }

    await wholesaleService.updateWholesalePrices(product_id, prices);

    res.json({
      success: true,
      message: "Wholesale pricing updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error updating wholesale pricing",
      error: error.message,
    });
  }
};


export const deleteWholesalePricing = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId);

    await wholesaleService.deleteWholesalePrices(productId);

    res.json({
      success: true,
      message: "Wholesale pricing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting wholesale pricing",
    });
  }
};
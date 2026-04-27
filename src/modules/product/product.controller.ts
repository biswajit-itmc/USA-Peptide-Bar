import { Request, Response } from "express";
import * as productService from "./product.service.js";
import { productValidation } from "./product.validation.js";

const getImageUrl = (req: Request, filename?: string) => {
  if (!filename) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { valid, errors } = productValidation.validateCreateProduct(body);
    if (!valid) return res.status(400).json({ errors });

    if (req.file) {
      body.image = req.file.filename;
    }

    const product = await productService.createProduct(body);
    product.image_url = getImageUrl(req, product.image);

    res.status(201).json({
      success: true,
      message: "Product created with wholesale info",
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await productService.getAllProducts();
    const products = data.map((item: any) => ({
      ...item,
      image_url: getImageUrl(req, item.image),
    }));
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    // FIX: [0] hataya gaya hai taaki puri ID pass ho
    const product = await productService.getProductById(req.params.id); 
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.image_url = getImageUrl(req, product.image);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (req.file) body.image = req.file.filename;

    // FIX: [0] hataya gaya hai
    const product = await productService.updateProduct(req.params.id, body);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.image_url = getImageUrl(req, product.image);
    res.json({ success: true, message: "Product updated", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // FIX: [0] hataya gaya hai
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, message: "Deleted successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
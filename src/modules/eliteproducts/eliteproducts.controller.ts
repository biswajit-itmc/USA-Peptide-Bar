import { Request, Response } from "express";
import { getEliteProducts } from "./eliteproducts.service.js";

export const fetchEliteProducts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = parseInt(req.query.offset as string) || 0;

    const { products, total } = await getEliteProducts(limit, offset);

    const hasMore = offset + limit < total;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const nextOffset = hasMore ? offset + limit : null;
    const prevOffset = offset > 0 ? Math.max(0, offset - limit) : null;

    return res.json({
      success: true,
      data: products,
      pagination: {
        total,
        limit,
        offset,
        currentPage,
        totalPages,
        hasMore,
        nextOffset,
        prevOffset,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
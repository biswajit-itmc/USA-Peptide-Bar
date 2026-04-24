import { db } from "../../db/knex.js";

// ✅ Add wholesale pricing (multiple tiers)
export const addWholesalePrices = async (productId: number, prices: any[]) => {
  const formatted = prices.map((p) => ({
    product_id: productId,
    min_qty: Number(p.min_qty),
    price: Number(p.price),
  }));

  return await db("wholesale_prices").insert(formatted);
};

// ✅ Get wholesale prices for a product
export const getWholesalePrices = async (productId: number) => {
  return await db("wholesale_prices")
    .where({ product_id: productId })
    .orderBy("min_qty", "asc");
};


export const updateWholesalePrices = async (productId: number, prices: any[]) => {
  // Purane delete karo
  await db("wholesale_prices").where({ product_id: productId }).del();

  // Naye insert karo
  const formatted = prices.map((p) => ({
    product_id: productId,
    min_qty: Number(p.min_qty),
    price: Number(p.price),
  }));

  return await db("wholesale_prices").insert(formatted);
};

export const deleteWholesalePrices = async (productId: number) => {
  return await db("wholesale_prices")
    .where({ product_id: productId })
    .del();
};
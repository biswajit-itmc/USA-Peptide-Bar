import { db } from "../../db/knex.js";

export const getEliteProducts = async (limit: number, offset: number) => {
  const [products, totalCountResult] = await Promise.all([
    db("eliteselection_products")
      .select("*")
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", "desc"),

    db("eliteselection_products").count("* as count").first(),
  ]);

  const total = Number(totalCountResult?.count || 0);

  return {
    products,
    total,
  };
};
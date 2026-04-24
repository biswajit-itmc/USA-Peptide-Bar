import { db } from "../../db/knex.js";

// ✅ Create Product
export const createProduct = async (body: any) => {
  // Database mein bhejte waqt ensure karein ki values correct types mein ho
  const insertData = {
    category: body.category,
    name: body.name,
    quantity: body.quantity,
    purity: body.purity,
    price: parseFloat(body.price),
    old_price: parseFloat(body.old_price),
    image: body.image || null
  };

  /**
   * CRITICAL FIX FOR POSTGRES:
   * PostgreSQL mein .returning("id") use karna padta hai 
   * warna ye pura result object return kar deta hai jo agle query mein crash karta hai.
   */
  const result = await db("products")
    .insert(insertData)
    .returning("id");

  // PostgreSQL returns: [{ id: 1 }]
  const insertedId = result[0]?.id || result[0];

  if (!insertedId) {
    throw new Error("Failed to insert product or retrieve ID");
  }

  // Inserted data fetch karein (Return the fresh object)
  return await db("products").where({ id: insertedId }).first();
};

// ✅ Get All Products
export const getAllProducts = async () => {
  return await db("products").select("*").orderBy("id", "desc");
};

// ✅ Get Product By ID
export const getProductById = async (id: string | number) => {
  // Ensure ID is passed as integer
  return await db("products").where({ id: Number(id) }).first();
};

// ✅ Update Product
export const updateProduct = async (id: string | number, body: any) => {
  const productId = Number(id);
  
  const exists = await db("products").where({ id: productId }).first();
  if (!exists) return null;

  // Sirf wohi data update karein jo body mein hai
  const updateData: any = {};
  if (body.category) updateData.category = body.category;
  if (body.name) updateData.name = body.name;
  if (body.quantity) updateData.quantity = body.quantity;
  if (body.purity) updateData.purity = body.purity;
  if (body.price) updateData.price = parseFloat(body.price);
  if (body.old_price) updateData.old_price = parseFloat(body.old_price);
  if (body.image) updateData.image = body.image;

  await db("products")
    .where({ id: productId })
    .update(updateData);

  return await db("products").where({ id: productId }).first();
};

// ✅ Delete Product
export const deleteProduct = async (id: string | number) => {
  const productId = Number(id);
  
  const product = await db("products").where({ id: productId }).first();
  if (!product) return null;

  await db("products").where({ id: productId }).del();
  return product;
};
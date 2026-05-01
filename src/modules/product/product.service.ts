import { db } from "../../db/knex.js";

// ✅ Create Product
export const createProduct = async (body: any) => {
  const insertData = {
    category: body.category,
    name: body.name,
    quantity: body.quantity,
    purity: body.purity,
    price: parseFloat(String(body.price)),
    old_price: body.old_price ? parseFloat(String(body.old_price)) : null,
    image: body.image || null,
    // Ek hi table mein wholesale fields 👇
    wholesale_min_qty: body.wholesale_min_qty ? parseInt(body.wholesale_min_qty) : null,
    wholesale_price: body.wholesale_price ? parseFloat(body.wholesale_price) : null
  };

  const [insertedId] = await db("products").insert(insertData);

  if (!insertedId) {
    throw new Error("Failed to insert product");
  }

  return await db("products").where({ id: insertedId }).first();
};

// ✅ Get All Products
export const getAllProducts = async () => {
  return await db("products").select("*").orderBy("id", "desc");
};

// ✅ Get Product By ID
export const getProductById = async (id: string | number) => {
  return await db("products").where({ id: Number(id) }).first();
};

// ✅ Update Product
export const updateProduct = async (id: string | number, body: any) => {
  const productId = Number(id);
  
  const exists = await db("products").where({ id: productId }).first();
  if (!exists) return null;

  const updateData: any = {};
  if (body.category) updateData.category = body.category;
  if (body.name) updateData.name = body.name;
  if (body.quantity) updateData.quantity = body.quantity;
  if (body.purity) updateData.purity = body.purity;
  if (body.price) updateData.price = parseFloat(body.price);
  if (body.old_price) updateData.old_price = parseFloat(body.old_price);
  if (body.image) updateData.image = body.image;
  
  // Wholesale fields update logic 👇
  if (body.wholesale_min_qty !== undefined) updateData.wholesale_min_qty = parseInt(body.wholesale_min_qty);
  if (body.wholesale_price !== undefined) updateData.wholesale_price = parseFloat(body.wholesale_price);

  await db("products").where({ id: productId }).update(updateData);

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
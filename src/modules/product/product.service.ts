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
    position: body.position ? parseInt(body.position) : null,
    description: body.description || null,
    intended_use: body.intended_use || null,
    storage: body.storage || null,
    solubility: body.solubility || null,
    vial_size: body.vial_size || null,
    shelf_life: body.shelf_life || null,
    handling: body.handling || null,
    research_point_1: body.research_point_1 || null,
    research_point_2: body.research_point_2 || null,
    research_point_3: body.research_point_3 || null,
    research_point_4: body.research_point_4 || null,
    research_point_5: body.research_point_5 || null,
    mechanism_of_action: body.mechanism_of_action || null,
    batch_number: body.batch_number || null,
    test_date: body.test_date || null,
    test_key: body.test_key || null,
    lab_name: body.lab_name || null,
    // Ek hi table mein wholesale fields 👇
    wholesale_min_qty: body.wholesale_min_qty ? parseInt(body.wholesale_min_qty) : null,
    wholesale_price: body.wholesale_price ? parseFloat(body.wholesale_price) : null,
    size: body.size || null
  };

  const [insertedId] = await db("products").insert(insertData);

  if (!insertedId) {
    throw new Error("Failed to insert product");
  }

  return await db("products").where({ id: insertedId }).first();
};

// ✅ Get All Products
export const getAllProducts = async () => {
  return await db("products")
    .select("*")
    .orderByRaw("position IS NULL, position ASC")
    .orderBy("id", "desc");
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
  if (body.position !== undefined) updateData.position = body.position ? parseInt(body.position) : null;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.intended_use !== undefined) updateData.intended_use = body.intended_use;
  if (body.storage !== undefined) updateData.storage = body.storage;
  if (body.solubility !== undefined) updateData.solubility = body.solubility;
  if (body.vial_size !== undefined) updateData.vial_size = body.vial_size;
  if (body.shelf_life !== undefined) updateData.shelf_life = body.shelf_life;
  if (body.handling !== undefined) updateData.handling = body.handling;
  if (body.research_point_1 !== undefined) updateData.research_point_1 = body.research_point_1;
  if (body.research_point_2 !== undefined) updateData.research_point_2 = body.research_point_2;
  if (body.research_point_3 !== undefined) updateData.research_point_3 = body.research_point_3;
  if (body.research_point_4 !== undefined) updateData.research_point_4 = body.research_point_4;
  if (body.research_point_5 !== undefined) updateData.research_point_5 = body.research_point_5;
  if (body.mechanism_of_action !== undefined) updateData.mechanism_of_action = body.mechanism_of_action;
  if (body.batch_number !== undefined) updateData.batch_number = body.batch_number;
  if (body.test_date !== undefined) updateData.test_date = body.test_date;
  if (body.test_key !== undefined) updateData.test_key = body.test_key;
  if (body.lab_name !== undefined) updateData.lab_name = body.lab_name;
  if (body.size !== undefined) updateData.size = body.size;
  
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
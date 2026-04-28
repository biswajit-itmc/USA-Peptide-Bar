import { db } from "../../db/knex.js";

export const cartService = {
  // User ka full cart nikalna with product details
  async getCart(userId: number) {
    const items = await db("cart_items")
      .join("products", "cart_items.product_id", "products.id")
      .where("cart_items.user_id", userId)
      .select(
        "cart_items.id as cart_item_id",
        "cart_items.quantity",
        "products.id as product_id",
        "products.name",
        "products.price",
        "products.old_price",
        "products.image",
        "products.category",
        "products.purity",
        "products.quantity as product_quantity"
      )
      .orderBy("cart_items.created_at", "desc");

    return items;
  },

  // Item add karna ya quantity update karna
  async addToCart(userId: number, productId: number, quantity: number) {
    // Product exist karta hai?
    const product = await db("products").where({ id: productId }).first();
    if (!product) throw new Error("Product not found");

    // Already cart mein hai?
    const existing = await db("cart_items")
      .where({ user_id: userId, product_id: productId })
      .first();

    if (existing) {
      // Quantity update karo
      await db("cart_items")
        .where({ user_id: userId, product_id: productId })
        .update({ quantity: existing.quantity + quantity, updated_at: db.fn.now() });
    } else {
      // Naya item add karo
      await db("cart_items").insert({
        user_id: userId,
        product_id: productId,
        quantity,
      });
    }

    return await this.getCart(userId);
  },

  // Quantity update karna
  async updateQuantity(userId: number, cartItemId: number, quantity: number) {
    if (quantity <= 0) {
      return await this.removeFromCart(userId, cartItemId);
    }
    await db("cart_items")
      .where({ id: cartItemId, user_id: userId })
      .update({ quantity, updated_at: db.fn.now() });

    return await this.getCart(userId);
  },

  // Ek item remove karna
  async removeFromCart(userId: number, cartItemId: number) {
    await db("cart_items").where({ id: cartItemId, user_id: userId }).del();
    return await this.getCart(userId);
  },

  // Poora cart clear karna
  async clearCart(userId: number) {
    await db("cart_items").where({ user_id: userId }).del();
    return [];
  },

  // Cart summary (total items + total price)
  async getCartSummary(userId: number) {
    const items = await this.getCart(userId);
    const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum: number, item: any) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    return { totalItems, totalPrice: totalPrice.toFixed(2), items };
  },
};

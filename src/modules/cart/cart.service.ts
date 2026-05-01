import { db } from "../../db/knex.js";

export const cartService = {
  // User ka full cart nikalna with product details
  async getCart(userId: number) {
    try {
      // User ka role check karo
      const user = await db("users").where({ id: userId }).first();
      const isWholesale = user?.role === "wholesale";

      // Cart items nikalna
      const cartItems = await db("cart_items")
        .where("user_id", userId)
        .orderBy("created_at", "desc");

      // Har item ke liye details nikalna based on product_table
      const items = await Promise.all(cartItems.map(async (item) => {
        try {
          const table = item.product_table === "eliteselection_products" ? "eliteselection_products" : "products";
          
          let query = db(table);
          if (table === "products") {
            const numericId = Number(item.product_id);
            if (isNaN(numericId)) return null; // Skip invalid IDs
            query = query.where({ id: numericId });
          } else {
            query = query.where({ id: String(item.product_id) });
          }

          const product = await query.first();

          if (!product) return null;

          const price = (isWholesale && product.wholesale_price) ? product.wholesale_price : product.price;

          return {
            cart_item_id: item.id,
            quantity: item.quantity,
            product_id: item.product_id,
            product_table: item.product_table,
            name: product.name,
            price: price || 0,
            wholesale_price: product.wholesale_price || null,
            old_price: product.old_price || null,
            image: product.image || null,
            image_url: product.image_url || null, 
            category: product.category || "General",
            purity: product.purity || "99%",
            product_quantity: product.quantity || "1"
          };
        } catch (e) {
          console.error(`Error mapping cart item ${item.id}:`, e);
          return null;
        }
      }));

      return items.filter(i => i !== null);
    } catch (error) {
      console.error("getCart Error:", error);
      throw error;
    }
  },

  // Item add karna ya quantity update karna
  async addToCart(userId: number, productId: string | number, quantity: number, productTable: string = "products") {
    console.log(`Adding to cart: User=${userId}, Product=${productId}, Table=${productTable}, Qty=${quantity}`);
    
    // Product exist karta hai? Check in specified table
    const table = productTable === "eliteselection_products" ? "eliteselection_products" : "products";
    
    try {
      // Safely check for product based on ID type
      let query = db(table);
      if (table === "products") {
        const numericId = Number(productId);
        if (isNaN(numericId)) {
          throw new Error(`Invalid ID format for products table: ${productId}`);
        }
        query = query.where({ id: numericId });
      } else {
        query = query.where({ id: String(productId) });
      }

      const product = await query.first();
      if (!product) {
        console.error(`Product not found: ${productId} in ${table}`);
        throw new Error("Product not found");
      }

      // Already cart mein hai?
      const existing = await db("cart_items")
        .where({ user_id: userId, product_id: String(productId), product_table: table })
        .first();

      if (existing) {
        console.log(`Updating existing item: ${existing.id}`);
        await db("cart_items")
          .where({ id: existing.id })
          .update({ quantity: existing.quantity + quantity, updated_at: db.fn.now() });
      } else {
        console.log(`Inserting new item`);
        await db("cart_items").insert({
          user_id: userId,
          product_id: String(productId),
          product_table: table,
          quantity,
        });
      }

      return await this.getCart(userId);
    } catch (err) {
      console.error("addToCart Error:", err);
      throw err;
    }
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
    const totalPriceNum = items.reduce(
      (sum: number, item: any) => {
        const itemPrice = parseFloat(String(item.price)) || 0;
        return sum + itemPrice * item.quantity;
      },
      0
    );
    
    console.log(`Cart Summary for ${userId}: Items=${totalItems}, Price=${totalPriceNum}`);
    
    return { totalItems, totalPrice: totalPriceNum.toFixed(2), items };
  },
};

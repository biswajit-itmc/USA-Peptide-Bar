import { db } from "../../db/knex.js";

export const orderService = {
  async createOrder(userId: number, data: any, items: any[]): Promise<any> {
    return await db.transaction(async (trx) => {
      // Get user's sales rep if any
      const user = await trx("users").where("id", userId).select("sales_rep_id").first();

      const [insertedId] = await trx("orders")
        .insert({
          user_id: userId,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          notes: data.notes,
          payment_method: data.paymentMethod,
          payment_screenshot: data.payment_screenshot,
          payment_id: data.paymentId,
          total_amount: data.totalAmount,
          status: "pending",
          sales_rep_id: user?.sales_rep_id || null,
          commission_status: "pending",
          created_at: db.fn.now(),
          updated_at: db.fn.now()
        });

      const orderItems = items.map(item => ({
        order_id: insertedId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        name: item.name
      }));

      await trx("order_items").insert(orderItems);

      return { id: insertedId };
    });
  },

  async getOrderHistory(userId: number): Promise<any[]> {
    const orders = await db("orders")
      .where("user_id", userId)
      .orderBy("created_at", "desc");

    // Fetch items for each order
    for (const order of orders) {
      order.items = await db("order_items").where("order_id", order.id);
    }

    return orders;
  },

  async getAllOrders(): Promise<any[]> {
    const orders = await db("orders").orderBy("created_at", "desc");
    
    // Fetch items for each order
    for (const order of orders) {
      order.items = await db("order_items").where("order_id", order.id);
    }
    
    return orders;
  },

  async updateOrderStatus(orderId: number, status: string): Promise<any> {
    await db("orders")
      .where("id", orderId)
      .update({
        status,
        updated_at: db.fn.now()
      });

    const updatedOrder = await db("orders").where("id", orderId).first();
      
    return updatedOrder;
  }
};

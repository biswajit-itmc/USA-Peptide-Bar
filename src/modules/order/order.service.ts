import { db } from "../../db/knex.js";
import { sendOrderCompletionEmail, sendOrderCancellationEmail, sendOrderConfirmationEmail, sendAdminOrderNotificationEmail } from "../../utils/mailer.js";


export const orderService = {
  async createOrder(userId: number | null, data: any, items: any[]): Promise<any> {
    const result = await db.transaction(async (trx) => {
      // Get user's sales rep if any (only if user is logged in)
      let finalSalesRepId = null;
      if (userId) {
        const user = await trx("users").where("id", userId).select("sales_rep_id").first();
        finalSalesRepId = user?.sales_rep_id || null;
      }
      
      // If no rep assigned yet, check if a manual rep code was provided
      if (!finalSalesRepId && data.repId) {
        const manualRep = await trx("sales_reps")
          .where("rep_id", data.repId.trim().toUpperCase())
          .where("is_active", true)
          .first();

        if (manualRep) {
          finalSalesRepId = manualRep.id;
          // Optionally assign this rep to the user for future orders (only if logged in)
          if (userId) {
            await trx("users").where("id", userId).update({ sales_rep_id: finalSalesRepId });
          }
        }
      }

      let currentCommissionRate = null;
      if (finalSalesRepId) {
        const rep = await trx("sales_reps").where("id", finalSalesRepId).select("commission_rate").first();
        currentCommissionRate = rep?.commission_rate || 0;
      }

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
          sales_rep_id: finalSalesRepId,
          commission_rate: currentCommissionRate,
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

    // Send confirmation email after transaction commit
    try {
      await sendOrderConfirmationEmail(
        data.email,
        result.id,
        data.fullName,
        items,
        data.totalAmount
      );
    } catch (emailError) {
      console.error("Order confirmation email failed:", emailError);
    }

    // Send admin notification email after transaction commit
    try {
      await sendAdminOrderNotificationEmail(
        result.id,
        data.fullName,
        data.email,
        items,
        data.totalAmount
      );
    } catch (adminEmailError) {
      console.error("Admin order notification email failed:", adminEmailError);
    }

    return result;
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
    const orders = await db("orders")
      .leftJoin("sales_reps", "orders.sales_rep_id", "sales_reps.id")
      .select(
        "orders.*",
        "sales_reps.name as rep_name",
        "sales_reps.rep_id as rep_identity_number"
      )
      .orderBy("orders.created_at", "desc");
    
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
    const items = await db("order_items").where("order_id", orderId);

    if (updatedOrder) {
      if (status === 'completed') {
        await sendOrderCompletionEmail(
          updatedOrder.email, 
          updatedOrder.id, 
          updatedOrder.full_name,
          items,
          updatedOrder.total_amount
        );
      } else if (status === 'cancelled' || status === 'rejected') {
        await sendOrderCancellationEmail(
          updatedOrder.email, 
          updatedOrder.id, 
          updatedOrder.full_name,
          items,
          updatedOrder.total_amount
        );
      }
    }

      
    return updatedOrder;
  },

  async updateOrder(orderId: number, data: any): Promise<void> {
    await db("orders")
      .where("id", orderId)
      .update({
        ...data,
        updated_at: db.fn.now()
      });
  },

  async deleteOrder(orderId: number): Promise<void> {
    await db.transaction(async (trx) => {
      await trx("order_items").where("order_id", orderId).del();
      await trx("orders").where("id", orderId).del();
    });
  }
};



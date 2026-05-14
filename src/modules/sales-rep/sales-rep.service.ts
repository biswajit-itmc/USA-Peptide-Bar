import { db } from "../../db/knex.js";
import bcrypt from "bcryptjs";
import { sendSalesRepWelcomeEmail } from "../../utils/mailer.js";


export const salesRepService = {
  async getRepByRepId(repId: string) {
    return await db("sales_reps").where("rep_id", repId).first();
  },

  async getRepStats(repId: number) {
    const orders = await db("orders")
      .where("sales_rep_id", repId)
      .andWhere("status", "completed");

    const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || "0"), 0);
    
    // Get rep's commission rate
    const rep = await db("sales_reps").where("id", repId).first();
    const commissionRate = rep ? parseFloat(rep.commission_rate) : 0;
    
    const totalCommission = totalSales * commissionRate;

    const activeClients = await db("users")
      .where("sales_rep_id", repId)
      .count("id as count")
      .first();

    return {
      totalSales,
      totalCommission,
      activeClients: parseInt(activeClients?.count as string || "0"),
      commissionRate
    };
  },

  async getRepOrders(repId: number) {
    const orders = await db("orders")
      .where("sales_rep_id", repId)
      .orderBy("created_at", "desc");

    // Get rep's commission rate once
    const rep = await db("sales_reps").where("id", repId).select("commission_rate").first();
    const commissionRate = rep ? parseFloat(rep.commission_rate) : 0;

    // Fetch items for each order
    for (const order of orders) {
      order.items = await db("order_items").where("order_id", order.id);
      
      // Calculate commission for this specific order
      order.commission = parseFloat(order.total_amount || "0") * commissionRate;
    }

    return orders;
  },

  async getRepClients(repId: number) {
    return await db("users")
      .where("sales_rep_id", repId)
      .select("id", "first_name", "last_name", "email", "company", "created_at")
      .orderBy("created_at", "desc");
  },

  // Admin Methods
  async getAllRepsAdmin() {
    return await db("sales_reps")
      .select("id", "rep_id", "name", "email", "commission_rate", "is_active", "created_at")
      .orderBy("created_at", "desc");
  },

  async createRepAdmin(data: any) {
    const { password, ...repData } = data;
    const passwordHash = await bcrypt.hash(password, 10);

    
    const [id] = await db("sales_reps")
      .insert({
        ...repData,
        password_hash: passwordHash,
        role: "sales_rep"
      });

    // Send welcome email with credentials
    await sendSalesRepWelcomeEmail(repData.email, repData.name, repData.rep_id, password);

      
    return id;
  },


  async updateRepAdmin(id: number, data: any) {
    const { password, ...updateData } = data;
    
    if (password) {
      updateData.password_hash = await bcrypt.hash(password, 10);

    }
    
    return await db("sales_reps").where("id", id).update(updateData);
  },

  async deleteRepAdmin(id: number) {
    return await db("sales_reps").where("id", id).del();
  },

  async getRepDetailsAdmin(id: number) {
    const stats = await this.getRepStats(id);
    const clients = await this.getRepClients(id);
    const orders = await this.getRepOrders(id);
    const rep = await db("sales_reps").where("id", id).first();

    return {
      rep,
      stats,
      clients,
      orders
    };
  },


  async getAllCommissionsAdmin() {
    const orders = await db("orders")
      .whereNotNull("sales_rep_id")
      .join("sales_reps", "orders.sales_rep_id", "=", "sales_reps.id")
      .select(
        "orders.*",
        "sales_reps.name as rep_name",
        "sales_reps.rep_id as rep_identity_number",
        "sales_reps.commission_rate as rep_rate"
      )
      .orderBy("orders.created_at", "desc");

    return orders.map(order => ({
      ...order,
      calculated_commission: parseFloat(order.total_amount) * parseFloat(order.rep_rate)
    }));
  },

  async getCommissionDetailsAdmin(orderId: number) {
    const order = await db("orders")
      .where("orders.id", orderId)
      .join("sales_reps", "orders.sales_rep_id", "=", "sales_reps.id")
      .select(
        "orders.*",
        "sales_reps.name as rep_name",
        "sales_reps.rep_id as rep_identity_number",
        "sales_reps.commission_rate as rep_rate"
      )
      .first();

    if (!order) throw new Error("Order not found");

    const items = await db("order_items").where("order_id", orderId);
    
    return {
      ...order,
      items,
      calculated_commission: parseFloat(order.total_amount) * parseFloat(order.rep_rate)
    };
  },


  async updateCommissionStatus(orderId: number, status: string) {
    const updateData: any = { commission_status: status };
    if (status === "paid") {
      updateData.commission_paid_at = db.fn.now();
    }
    
    return await db("orders").where("id", orderId).update(updateData);
  }
};

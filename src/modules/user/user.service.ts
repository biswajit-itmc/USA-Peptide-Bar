import { db } from "../../db/knex.js";
import { User } from "../auth/auth.service.js"; // Type import karein

export const userService = {
  getUserPublicColumns() {
    return [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "company",
      "role",
      "is_approved",
      "is_active",
      "created_at",
      "updated_at"
    ];
  },

  async toggleUserStatus(id: number, isActive: boolean): Promise<void> {
    await db("users").where("id", id).update({ is_active: isActive });
  },

  async getAllUsers(): Promise<User[]> {
    return await db("users")
      .leftJoin("sales_reps", "users.sales_rep_id", "sales_reps.id")
      .select([
        ...this.getUserPublicColumns().map(col => `users.${col}`),
        "sales_reps.name as rep_name",
        "sales_reps.rep_id as rep_identity_number"
      ])
      .orderBy("users.created_at", "desc") as User[];
  },

  async getWholesaleUsers(): Promise<User[]> {
    return await db("users")
      .leftJoin("sales_reps", "users.sales_rep_id", "sales_reps.id")
      .select([
        ...this.getUserPublicColumns().map(col => `users.${col}`),
        "sales_reps.name as rep_name",
        "sales_reps.rep_id as rep_identity_number"
      ])
      .where("users.role", "wholesale")
      .orderBy("users.created_at", "desc") as User[];
  },

  async getUserById(id: number): Promise<User | undefined> {
    return await db("users")
      .select(this.getUserPublicColumns())
      .where("id", id)
      .first() as User | undefined;
  },

  async deleteUser(id: number): Promise<void> {
    await db("users").where("id", id).del();
  },

  // ✅ Address Management
  async getAddresses(userId: number): Promise<any[]> {
    return await db("user_addresses")
      .where("user_id", userId)
      .orderBy("created_at", "desc");
  },

  async addAddress(userId: number, data: any): Promise<any> {
    const [insertedId] = await db("user_addresses")
      .insert({
        user_id: userId,
        ...data,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      });
    
    return await db("user_addresses").where("id", insertedId).first();
  },

  async deleteAddress(userId: number, addressId: number): Promise<void> {
    await db("user_addresses")
      .where({ id: addressId, user_id: userId })
      .del();
  }
};
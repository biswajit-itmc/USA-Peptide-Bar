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
      "created_at",
      "updated_at"
    ];
  },

  async getAllUsers(): Promise<User[]> {
    return await db("users")
      .select(this.getUserPublicColumns())
      .orderBy("created_at", "desc") as User[];
  },

  async getWholesaleUsers(): Promise<User[]> {
    return await db("users")
      .select(this.getUserPublicColumns())
      .where("role", "wholesale")
      .orderBy("created_at", "desc") as User[];
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
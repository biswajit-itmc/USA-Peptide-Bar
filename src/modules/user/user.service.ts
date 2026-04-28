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
  }
};
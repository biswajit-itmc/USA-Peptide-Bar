import type { Knex } from "knex";
import { passwordUtils } from "../../utils/password.js";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("wholesale_applications").del();
  await knex("users").del();

  // Hash passwords for demo users
  const retailPassword = await passwordUtils.hashPassword("RetailPass123!");
  const wholesalePassword = await passwordUtils.hashPassword("WholesalePass123!");

  // Inserts seed entries for retail user
  await knex("users").insert([
    {
      first_name: "John",
      last_name: "Retail",
      email: "retail@example.com",
      phone: "555-0001",
      company: "Local Retail Store",
      password_hash: retailPassword,
      role: "retail",
      is_approved: true
    },
    {
      first_name: "Jane",
      last_name: "Wholesale",
      email: "wholesale@example.com",
      phone: "555-0002",
      company: "ABC Wholesale Corp",
      password_hash: wholesalePassword,
      role: "wholesale",
      is_approved: true
    }
  ]);

  // Inserts seed entries for wholesale applications
  await knex("wholesale_applications").insert([
    {
      business_name: "XYZ Distributors",
      contact_name: "Bob Johnson",
      email: "bob@xyzdist.com",
      phone: "555-0003",
      business_type: "Distributor",
      monthly_volume: 10000,
      source: "Trade Show",
      status: "pending",
      rejection_reason: null,
      user_id: null
    },
    {
      business_name: "Global Supplies Inc",
      contact_name: "Alice Williams",
      email: "alice@globalsupplies.com",
      phone: "555-0004",
      business_type: "Reseller",
      monthly_volume: 5000,
      source: "Google Search",
      status: "pending",
      rejection_reason: null,
      user_id: null
    }
  ]);
}

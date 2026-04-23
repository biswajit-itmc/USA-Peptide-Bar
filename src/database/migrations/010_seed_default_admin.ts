import type { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function up(knex: Knex): Promise<void> {
  const existingAdmin = await knex("admins")
    .where("email", "admin@example.com")
    .first();

  if (existingAdmin) {
    return;
  }

  await knex("admins").insert({
    first_name: "System",
    last_name: "Admin",
    email: "admin@example.com",
    password_hash: bcrypt.hashSync("AdminPass123!", 10)
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex("admins")
    .where("email", "admin@example.com")
    .del();
}

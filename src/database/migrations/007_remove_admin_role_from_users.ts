import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Delete any admin users (if migration 006 ran and added some)
  await knex("users").where("role", "admin").del();

  // In MySQL, Knex's enum() creates the CHECK constraint automatically.
  // Since migration 006 is now a no-op, there's no constraint to drop/re-add.
  // The original 001_create_users_table already has role enum as ['retail', 'wholesale'].
  // No further action needed.
}

export async function down(_knex: Knex): Promise<void> {
  // No-op
}

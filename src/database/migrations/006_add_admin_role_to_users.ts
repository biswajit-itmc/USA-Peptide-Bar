import type { Knex } from "knex";

export async function up(_knex: Knex): Promise<void> {
  // Original migration used PL/pgSQL to alter the role enum to include 'admin'.
  // This is no longer needed since migration 007 reverts it and migration 008 
  // creates a separate admins table instead.
  // No-op for MySQL compatibility.
}

export async function down(_knex: Knex): Promise<void> {
  // No-op
}

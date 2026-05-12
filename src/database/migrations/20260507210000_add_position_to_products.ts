import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // empty migration to avoid duplicate column error since we restored the original
}

export async function down(knex: Knex): Promise<void> {
  // empty
}

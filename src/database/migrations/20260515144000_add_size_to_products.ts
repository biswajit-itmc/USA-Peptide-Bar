import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("products", (table) => {
    table.string("size").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("products", (table) => {
    table.dropColumn("size");
  });
}

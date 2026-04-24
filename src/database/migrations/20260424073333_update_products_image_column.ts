import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("eliteselection_products", (table) => {
    table.string("image"); // 👈 add only
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("eliteselection_products", (table) => {
    table.dropColumn("image");
  });
}
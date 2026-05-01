import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("cart_items", (table) => {
    table.string("product_table").notNullable().defaultTo("products");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("cart_items", (table) => {
    table.dropColumn("product_table");
  });
}


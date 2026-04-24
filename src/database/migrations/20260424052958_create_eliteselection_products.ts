import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("eliteselection_products", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.string("image_url").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("eliteselection_products");
}

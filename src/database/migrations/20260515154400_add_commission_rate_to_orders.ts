import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("orders", (table) => {
    table.decimal("commission_rate", 5, 4).nullable().comment("Stored commission rate at the time of order");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("orders", (table) => {
    table.dropColumn("commission_rate");
  });
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("coupons", (table) => {
    table.increments("id").primary();
    table.string("code").unique().notNullable();
    table.enum("type", ["percentage", "fixed"]).notNullable().defaultTo("percentage");
    table.decimal("value", 10, 2).notNullable();
    table.decimal("min_order_amount", 10, 2).defaultTo(0);
    table.integer("usage_limit").nullable();
    table.integer("usage_count").defaultTo(0);
    table.timestamp("expires_at").nullable();
    table.boolean("is_active").defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("coupons");
}

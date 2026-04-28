import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("cart_items", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("product_id").unsigned().notNullable().references("id").inTable("products").onDelete("CASCADE");
    table.integer("quantity").notNullable().defaultTo(1);
    table.timestamps(true, true);
    // Ek user ek product ek baar hi cart mein rakh sakta hai
    table.unique(["user_id", "product_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("cart_items");
}

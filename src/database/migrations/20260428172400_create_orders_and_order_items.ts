import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasOrders = await knex.schema.hasTable("orders");
  if (!hasOrders) {
    await knex.schema.createTable("orders", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("full_name").notNullable();
      table.string("email").notNullable();
      table.string("phone").nullable();
      table.string("address").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("zip").notNullable();
      table.text("notes").nullable();
      table.string("payment_method").nullable();
      table.decimal("total_amount", 10, 2).notNullable().defaultTo(0);
      table.enum("status", ["pending", "completed", "cancelled"]).notNullable().defaultTo("pending");
      table.timestamps(true, true);

      table.index("user_id");
      table.index("status");
      table.index("created_at");
    });
  }

  const hasOrderItems = await knex.schema.hasTable("order_items");
  if (!hasOrderItems) {
    await knex.schema.createTable("order_items", (table) => {
      table.increments("id").primary();
      table.integer("order_id").unsigned().notNullable().references("id").inTable("orders").onDelete("CASCADE");
      table.string("product_id").notNullable();
      table.integer("quantity").notNullable().defaultTo(1);
      table.decimal("price", 10, 2).notNullable().defaultTo(0);
      table.string("name").notNullable();
      table.timestamps(true, true);

      table.index("order_id");
      table.index("product_id");
      table.index("created_at");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasOrderItems = await knex.schema.hasTable("order_items");
  if (hasOrderItems) {
    await knex.schema.dropTable("order_items");
  }

  const hasOrders = await knex.schema.hasTable("orders");
  if (hasOrders) {
    await knex.schema.dropTable("orders");
  }
}

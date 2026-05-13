import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("password_reset_tokens", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("token").notNullable().unique();
    table.string("role").notNullable(); // retail, wholesale, sales_rep
    table.timestamp("expires_at").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    
    table.index(["token"]);
    table.index(["email"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("password_reset_tokens");
}

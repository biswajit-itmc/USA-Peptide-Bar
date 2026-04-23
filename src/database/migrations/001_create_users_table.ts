import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").unique().notNullable();
    table.string("phone").nullable();
    table.string("company").nullable();
    table.string("password_hash").notNullable();
    table.enum("role", ["retail", "wholesale"]).notNullable().defaultTo("retail");
    table.boolean("is_approved").notNullable().defaultTo(false);
    table.timestamps(true, true);

    // Indexes for performance
    table.index("email");
    table.index("role");
    table.index("created_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("refresh_tokens", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users");
    table.text("token").notNullable();
    table.timestamp("expires_at").notNullable();
    table.boolean("is_revoked").notNullable().defaultTo(false);
    table.timestamps(true, true);

    // Indexes
    table.index("user_id");
    table.index("expires_at");
    
    // Foreign key constraint
    // table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("refresh_tokens");
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("admin_refresh_tokens", (table) => {
    table.increments("id").primary();
    table.integer("admin_id").unsigned().notNullable().references("id").inTable("admins");
    table.text("token").notNullable();
    table.timestamp("expires_at").notNullable();
    table.boolean("is_revoked").notNullable().defaultTo(false);
    table.timestamps(true, true);

    table.index("admin_id");
    table.index("expires_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("admin_refresh_tokens");
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("sales_rep_refresh_tokens", (table) => {
    table.increments("id").primary();
    table.integer("rep_id").unsigned().notNullable().references("id").inTable("sales_reps").onDelete("CASCADE");
    table.text("token").notNullable();
    table.timestamp("expires_at").notNullable();
    table.boolean("is_revoked").notNullable().defaultTo(false);
    table.timestamps(true, true);

    table.index("rep_id");
    table.index("expires_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("sales_rep_refresh_tokens");
}

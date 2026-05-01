import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("sales_reps", (table) => {
    table.increments("id").primary();
    table.string("rep_id").unique().notNullable(); // The unique identity number
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password_hash").notNullable();
    table.decimal("commission_rate", 5, 2).notNullable().defaultTo(0.10); // Default 10%
    table.enum("role", ["sales_rep"]).notNullable().defaultTo("sales_rep");
    table.timestamps(true, true);

    table.index("rep_id");
    table.index("email");
    table.index("created_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("sales_reps");
}

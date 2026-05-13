import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("sales_reps", (table) => {
    table.boolean("is_active").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("sales_reps", (table) => {
    table.dropColumn("is_active");
  });
}

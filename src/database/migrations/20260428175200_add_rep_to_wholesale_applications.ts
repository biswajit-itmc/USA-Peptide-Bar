import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("wholesale_applications", (table) => {
    table.integer("sales_rep_id").unsigned().nullable().references("id").inTable("sales_reps").onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("wholesale_applications", (table) => {
    table.dropColumn("sales_rep_id");
  });
}

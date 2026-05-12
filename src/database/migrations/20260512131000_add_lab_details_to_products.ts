import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("products", (table) => {
    table.string("batch_number").nullable();
    table.string("test_date").nullable();
    table.string("test_key").nullable();
    table.string("lab_name").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("products", (table) => {
    table.dropColumns("batch_number", "test_date", "test_key", "lab_name");
  });
}

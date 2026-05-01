import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("orders", (table) => {
    table.string("payment_id").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("orders", (table) => {
    table.dropColumn("payment_id");
  });
}

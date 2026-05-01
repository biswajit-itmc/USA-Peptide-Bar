import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Update sales_reps table
  const hasIsActive = await knex.schema.hasColumn("sales_reps", "is_active");
  if (!hasIsActive) {
    await knex.schema.table("sales_reps", (table) => {
      table.boolean("is_active").notNullable().defaultTo(true);
    });
  }

  // Update orders table
  const hasCommissionStatus = await knex.schema.hasColumn("orders", "commission_status");
  if (!hasCommissionStatus) {
    await knex.schema.table("orders", (table) => {
      table.string("commission_status").notNullable().defaultTo("pending");
    });
  }

  const hasCommissionPaidAt = await knex.schema.hasColumn("orders", "commission_paid_at");
  if (!hasCommissionPaidAt) {
    await knex.schema.table("orders", (table) => {
      table.timestamp("commission_paid_at").nullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("orders", (table) => {
    table.dropColumn("commission_paid_at");
    table.dropColumn("commission_status");
  });
  await knex.schema.table("sales_reps", (table) => {
    table.dropColumn("is_active");
  });
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Add sales_rep_id to users to assign a wholesale user to a rep
  const hasUserRepId = await knex.schema.hasColumn("users", "sales_rep_id");
  if (!hasUserRepId) {
    await knex.schema.table("users", (table) => {
      table.integer("sales_rep_id").unsigned().nullable().references("id").inTable("sales_reps").onDelete("SET NULL");
    });
  }

  // Add sales_rep_id to orders to track commission
  const hasOrderRepId = await knex.schema.hasColumn("orders", "sales_rep_id");
  if (!hasOrderRepId) {
    await knex.schema.table("orders", (table) => {
      table.integer("sales_rep_id").unsigned().nullable().references("id").inTable("sales_reps").onDelete("SET NULL");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasOrderRepId = await knex.schema.hasColumn("orders", "sales_rep_id");
  if (hasOrderRepId) {
    await knex.schema.table("orders", (table) => {
      table.dropColumn("sales_rep_id");
    });
  }
  
  const hasUserRepId = await knex.schema.hasColumn("users", "sales_rep_id");
  if (hasUserRepId) {
    await knex.schema.table("users", (table) => {
      table.dropColumn("sales_rep_id");
    });
  }
}

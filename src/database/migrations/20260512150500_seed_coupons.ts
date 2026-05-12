import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex("coupons").insert([
    {
      code: "WELCOME10",
      type: "percentage",
      value: 10.00,
      min_order_amount: 0,
      is_active: true
    },
    {
      code: "SAVE50",
      type: "fixed",
      value: 50.00,
      min_order_amount: 500,
      is_active: true
    }
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex("coupons").whereIn("code", ["WELCOME10", "SAVE50"]).del();
}

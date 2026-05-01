import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasUserAddresses = await knex.schema.hasTable("user_addresses");
  if (!hasUserAddresses) {
    await knex.schema.createTable("user_addresses", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("full_name").nullable();
      table.string("phone").nullable();
      table.string("address").nullable();
      table.string("city").nullable();
      table.string("state").nullable();
      table.string("zip").nullable();
      table.timestamps(true, true);

      table.index("user_id");
      table.index("created_at");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasUserAddresses = await knex.schema.hasTable("user_addresses");
  if (hasUserAddresses) {
    await knex.schema.dropTable("user_addresses");
  }
}

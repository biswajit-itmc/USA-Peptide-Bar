import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("wholesale_applications", (table) => {
    table.increments("id").primary();
    table.string("business_name").notNullable();
    table.string("contact_name").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("business_type").notNullable();
    table.integer("monthly_volume").notNullable();
    table.string("source").nullable();
    table.enum("status", ["pending", "approved", "rejected"]).notNullable().defaultTo("pending");
    table.text("rejection_reason").nullable();
    table.integer("user_id").unsigned().nullable().references("id").inTable("users");
    table.timestamps(true, true);

    // Indexes for performance
    table.index("email");
    table.index("status");
    table.index("user_id");
    table.index("created_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("wholesale_applications");
}

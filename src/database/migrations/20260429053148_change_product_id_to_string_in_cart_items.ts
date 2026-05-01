import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // Drop foreign key constraint if it exists before altering column type
  const hasFk = await knex.raw(`
    SELECT CONSTRAINT_NAME FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'cart_items'
      AND COLUMN_NAME = 'product_id'
      AND REFERENCED_TABLE_NAME IS NOT NULL
    LIMIT 1
  `);

  const rows = hasFk[0] || hasFk;
  if (rows.length > 0) {
    const constraintName = rows[0].CONSTRAINT_NAME;
    await knex.raw(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`${constraintName}\``);
  }

  await knex.schema.alterTable("cart_items", (table) => {
    table.string("product_id").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cart_items", (table) => {
    table.integer("product_id").unsigned().alter();
    table.foreign("product_id").references("id").inTable("products").onDelete("CASCADE");
  });
}


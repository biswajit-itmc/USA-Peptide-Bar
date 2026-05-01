import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // MySQL doesn't support DROP COLUMN IF EXISTS, so check each column first
  const columns = ['address', 'city', 'state', 'pincode', 'gst_number', 'monthly_volume_estimate'];
  
  for (const col of columns) {
    const hasColumn = await knex.schema.hasColumn('wholesale_applications', col);
    if (hasColumn) {
      await knex.schema.alterTable('wholesale_applications', (table) => {
        table.dropColumn(col);
      });
    }
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wholesale_applications', (table) => {
    table.string('address', 255).nullable();
    table.string('city', 255).nullable();
    table.string('state', 255).nullable();
    table.string('pincode', 255).nullable();
    table.string('gst_number', 255).nullable();
    table.string('monthly_volume_estimate', 255).nullable();
  });
}

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // This migration was missing from the physical directory but exists in the database.
  // Creating this dummy file to satisfy Knex's consistency check.
  const hasColumn = await knex.schema.hasColumn('wholesale_applications', 'password');
  if (!hasColumn) {
    // If the column is missing for some reason, we can add it here, 
    // but usually, 'corrupt' means the file was deleted after being run.
    return knex.schema.table('wholesale_applications', (table) => {
      table.string('password').nullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('wholesale_applications', (table) => {
    table.dropColumn('password');
  });
}

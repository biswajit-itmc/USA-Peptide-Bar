import pkg from "knex";
type Knex = pkg.Knex;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("category");
    table.string("name");
    table.string("quantity");
    table.string("purity");
    table.decimal("price", 10, 2);
    table.decimal("old_price", 10, 2);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("products");
}
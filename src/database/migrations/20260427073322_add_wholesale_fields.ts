import type { Knex } from "knex";


export const up = function(knex) {
  return knex.schema.table('products', (table) => {
    table.integer('wholesale_min_qty').nullable();
    table.decimal('wholesale_price', 10, 2).nullable();
  });
};

export const down = function(knex) {
  return knex.schema.table('products', (table) => {
    table.dropColumn('wholesale_min_qty');
    table.dropColumn('wholesale_price');
  });
};


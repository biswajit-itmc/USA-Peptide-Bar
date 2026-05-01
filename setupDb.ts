import { db } from "./src/db/knex.js";

async function setup() {
  try {
    const hasUserAddresses = await db.schema.hasTable('user_addresses');
    if (!hasUserAddresses) {
      console.log('Creating user_addresses table...');
      await db.schema.createTable('user_addresses', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('full_name');
        table.string('phone');
        table.string('address');
        table.string('city');
        table.string('state');
        table.string('zip');
        table.timestamp('created_at').defaultTo(db.fn.now());
        table.timestamp('updated_at').defaultTo(db.fn.now());
      });
      console.log('user_addresses table created.');
    } else {
      console.log('user_addresses table already exists.');
    }

    const hasOrders = await db.schema.hasTable('orders');
    if (!hasOrders) {
      console.log('Creating orders table...');
      await db.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('full_name');
        table.string('email');
        table.string('phone');
        table.string('address');
        table.string('city');
        table.string('state');
        table.string('zip');
        table.text('notes');
        table.string('payment_method');
        table.decimal('total_amount', 10, 2);
        table.string('status').defaultTo('pending');
        table.timestamp('created_at').defaultTo(db.fn.now());
        table.timestamp('updated_at').defaultTo(db.fn.now());
      });
      console.log('orders table created.');
    } else {
      console.log('orders table already exists.');
    }

    const hasOrderItems = await db.schema.hasTable('order_items');
    if (!hasOrderItems) {
      console.log('Creating order_items table...');
      await db.schema.createTable('order_items', (table) => {
        table.increments('id').primary();
        table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
        table.integer('product_id').unsigned();
        table.integer('quantity');
        table.decimal('price', 10, 2);
        table.string('name');
      });
      console.log('order_items table created.');
    } else {
      console.log('order_items table already exists.');
    }

    console.log('Database setup complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setup();

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

async function check() {
  try {
    console.log('Connected');
    
    console.log('\n📋 products Table Schema:');
    const [res] = await connection.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = ? AND table_name = 'products'
    `, [process.env.DB_NAME]);
    res.forEach(row => console.log(`   ${row.COLUMN_NAME}: ${row.DATA_TYPE}`));

    console.log('\n📋 cart_items Table Schema:');
    const [res2] = await connection.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = ? AND table_name = 'cart_items'
    `, [process.env.DB_NAME]);
    res2.forEach(row => console.log(`   ${row.COLUMN_NAME}: ${row.DATA_TYPE}`));

    console.log('\n📋 eliteselection_products Table Schema:');
    const [res3] = await connection.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = ? AND table_name = 'eliteselection_products'
    `, [process.env.DB_NAME]);
    res3.forEach(row => console.log(`   ${row.COLUMN_NAME}: ${row.DATA_TYPE}`));

    const [products] = await connection.query("SELECT * FROM products");
    console.log('\nProducts:', products);

  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

check();

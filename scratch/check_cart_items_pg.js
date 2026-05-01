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
    const [rows] = await connection.query('SELECT * FROM cart_items');
    console.log('Cart Items:', rows);
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

check();

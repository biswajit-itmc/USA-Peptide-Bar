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
    const [tables] = await connection.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = ?",
      [process.env.DB_NAME]
    );
    console.log('Tables:', tables.map(r => r.TABLE_NAME));
    
    for (const table of tables.map(r => r.TABLE_NAME)) {
      const [countRes] = await connection.query(`SELECT COUNT(*) as count FROM \`${table}\``);
      console.log(`${table}: ${countRes[0].count}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

check();

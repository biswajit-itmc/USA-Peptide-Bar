import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function createDatabase() {
  let connection;
  try {
    // Use credentials from .env
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    console.log('Connected to MySQL');
    
    const dbName = process.env.DB_NAME || 'USAPEPTIDE';
    
    // Check if database exists
    const [rows] = await connection.query(
      "SHOW DATABASES LIKE ?",
      [dbName]
    );
    
    if (rows.length > 0) {
      console.log(`Database "${dbName}" already exists`);
    } else {
      await connection.query(`CREATE DATABASE \`${dbName}\``);
      console.log(`✅ Database "${dbName}" created successfully`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

createDatabase();

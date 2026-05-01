import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function checkTable() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'USAPEPTIDE'
    });

    const dbName = process.env.DB_NAME || 'USAPEPTIDE';

    const [rows] = await connection.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_schema = ? AND table_name = 'eliteselection_products'
      ORDER BY ordinal_position;
    `, [dbName]);
    
    if (rows.length === 0) {
      console.log('❌ Table does not exist');
    } else {
      console.log('📋 eliteselection_products columns:');
      rows.forEach(row => {
        console.log(`   ${row.COLUMN_NAME}: ${row.DATA_TYPE} ${row.IS_NULLABLE === 'NO' ? 'NOT NULL' : ''}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

checkTable();

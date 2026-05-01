import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function verifyTables() {
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
    console.log(`Connected to ${dbName} database\n`);
    
    // Get all tables
    const [tables] = await connection.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
      ORDER BY table_name;
    `, [dbName]);
    
    console.log('📊 Tables in database:');
    tables.forEach(row => {
      console.log(`   ✅ ${row.TABLE_NAME}`);
    });
    
    console.log('\n📋 Users Table Schema:');
    const [usersSchema] = await connection.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = ? AND table_name = 'users'
      ORDER BY ordinal_position;
    `, [dbName]);
    usersSchema.forEach(row => {
      console.log(`   ${row.COLUMN_NAME}: ${row.DATA_TYPE} ${row.IS_NULLABLE === 'NO' ? 'NOT NULL' : ''}`);
    });
    
    console.log('\n📋 Wholesale Applications Table Schema:');
    const [wholesaleSchema] = await connection.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = ? AND table_name = 'wholesale_applications'
      ORDER BY ordinal_position;
    `, [dbName]);
    wholesaleSchema.forEach(row => {
      console.log(`   ${row.COLUMN_NAME}: ${row.DATA_TYPE} ${row.IS_NULLABLE === 'NO' ? 'NOT NULL' : ''}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

verifyTables();

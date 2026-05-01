import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'USAPEPTIDE'
});

async function verifySetup() {
  try {
    console.log('🔍 Verifying token system setup:\n');
    
    // Check refresh_tokens table
    const [tableSchema] = await connection.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_schema = 'USAPEPTIDE' AND table_name = 'refresh_tokens'
      ORDER BY ordinal_position;
    `);
    
    console.log('✅ refresh_tokens Table Schema:');
    tableSchema.forEach(row => {
      console.log(`   ${row.COLUMN_NAME}: ${row.DATA_TYPE} ${row.IS_NULLABLE === 'NO' ? 'NOT NULL' : ''}`);
    });
    
    // Check if any refresh tokens exist
    const [tokenCount] = await connection.query('SELECT COUNT(*) as count FROM refresh_tokens;');
    console.log(`\n✅ Current refresh tokens: ${tokenCount[0].count}`);
    
    // List users for testing
    const [users] = await connection.query('SELECT id, email, role FROM users;');
    console.log('\n👥 Test Users:');
    users.forEach(user => {
      console.log(`   ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`);
    });
    
    console.log('\n🎉 Ready for token testing!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

verifySetup();

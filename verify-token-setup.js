import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'qwerty@5432#',
  database: 'usapeptide'
});

async function verifySetup() {
  try {
    await client.connect();
    console.log('🔍 Verifying token system setup:\n');
    
    // Check refresh_tokens table
    const tableResult = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'refresh_tokens'
      ORDER BY ordinal_position;
    `);
    
    console.log('✅ refresh_tokens Table Schema:');
    tableResult.rows.forEach(row => {
      console.log(`   ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? 'NOT NULL' : ''}`);
    });
    
    // Check if any refresh tokens exist
    const tokenCount = await client.query('SELECT COUNT(*) as count FROM refresh_tokens;');
    console.log(`\n✅ Current refresh tokens: ${tokenCount.rows[0].count}`);
    
    // List users for testing
    const usersResult = await client.query('SELECT id, email, role FROM users;');
    console.log('\n👥 Test Users:');
    usersResult.rows.forEach(user => {
      console.log(`   ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`);
    });
    
    console.log('\n🎉 Ready for token testing!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

verifySetup();

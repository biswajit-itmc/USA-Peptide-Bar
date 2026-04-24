import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'USAPEPTIDE'
});

async function checkTable() {
  try {
    await client.connect();
    
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'eliteselection_products'
      ORDER BY ordinal_position;
    `);
    
    if (result.rows.length === 0) {
      console.log('❌ Table does not exist');
    } else {
      console.log('📋 eliteselection_products columns:');
      result.rows.forEach(row => {
        console.log(`   ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? 'NOT NULL' : ''}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkTable();

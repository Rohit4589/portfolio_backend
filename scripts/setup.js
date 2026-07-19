const db = require('../src/config/db');

async function createTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Contacts table created successfully!');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    process.exit();
  }
}

createTables();

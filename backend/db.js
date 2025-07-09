// backend/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'restaurant_db',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to DB:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

module.exports = db;

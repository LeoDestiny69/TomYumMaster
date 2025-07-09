
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); 
const app = express();

app.use(cors());
app.use(express.json());


// createPool สร้างการเชื่อมต่อกับ Database
const pool = mysql.createPool({ 
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000, 
  ssl: {
    rejectUnauthorized: true, 
  },
  
  waitForConnections: true,     
  connectionLimit: 10,          
  queueLimit: 0,                
  idleTimeout: 600000,          
  enableKeepAlive: true,        
  keepAliveInitialDelay: 0,     
});


pool.getConnection(err => { 
  if (err) {
   
    console.error('❌ Error getting connection from MySQL pool:', err.stack); 
    console.error('Check your DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT environment variables, and SSL configuration.');

    process.exit(1);
  }
  console.log('✅ MySQL connection pool established.'); 
});


// POST: บันทึกข้อมูลจอง
app.post('/api/bookings', (req, res) => {
  const { name, phone, datetime, people, note } = req.body;
  const sql = 'INSERT INTO bookings (name, phone, datetime, people, note) VALUES (?, ?, ?, ?, ?)';
  pool.query(sql, [name, phone, datetime, people, note], (err, result) => { 
    if (err) {
      console.error('❌ Database insert error:', err);
      return res.status(500).json({ error: 'Database insert error' });
    }
    res.status(201).json({ message: '✅ Booking saved successfully' });
  });
});


// ************************* Admin ***************************

// GET: ดึงรายการจองทั้งหมด
app.get('/api/bookings', (req, res) => {
  const sql = 'SELECT * FROM bookings ORDER BY datetime DESC';
  pool.query(sql, (err, results) => { 
    if (err) {
      console.error('❌ Database read error:', err);
      return res.status(500).json({ error: 'Database read error' });
    }
    res.json(results);
  });
});

// DELETE: ลบรายการจองตาม ID
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM bookings WHERE id = ?';
  pool.query(sql, [id], (err, result) => { 
    if (err) {
      console.error('❌ Database delete error:', err);
      return res.status(500).json({ error: 'Database delete error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: '✅ Booking deleted successfully' });
  });
});

// PUT: แก้ไขรายการจองตาม ID
app.put('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone, datetime, people, note } = req.body;
  const sql = 'UPDATE bookings SET name = ?, phone = ?, datetime = ?, people = ?, note = ? WHERE id = ?';
  pool.query(sql, [name, phone, datetime, people, note, id], (err, result) => { 
    if (err) {
      console.error('❌ Database update error:', err);
      return res.status(500).json({ error: 'Database update error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: '✅ Booking updated successfully' });
  });
});

// POST: เข้าสู่ระบบแอดมิน 
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  console.log('🛂 Admin Login Attempt:', username); 

  // Query เพื่อค้นหา admin user ด้วย username และ password โดยตรง
  const sql = 'SELECT id, username FROM admins WHERE username = ? AND password = ?';
  pool.query(sql, [username, password], (err, results) => { 
    if (err) {
      console.error('❌ Database query error during admin login:', err);
      return res.status(500).json({ success: false, message: 'Database error during login' });
    }

    
    if (results.length === 0) {
      console.log('🚫 Admin Login Failed: Invalid credentials for', username);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('✅ Admin Login Success:', username);
    
    res.json({ success: true, token: 'mock-admin-token' });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
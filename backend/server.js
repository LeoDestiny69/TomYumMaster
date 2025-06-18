// 1. เพิ่ม require('dotenv').config(); ไว้บนสุด
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // ใช้ mysql2 ดีแล้วครับ
const app = express();

app.use(cors());
app.use(express.json());

// **ลบข้อมูลล็อกอินแอดมิน (mock) แบบ hardcode ออกไป**
// const adminUser = {
//   username: 'admin',
//   password: '1234'
// };

// 2. ปรับการเชื่อมต่อฐานข้อมูล MySQL ให้ดึงค่าจาก Environment Variables
// **เปลี่ยนจาก mysql.createConnection เป็น mysql.createPool**
const pool = mysql.createPool({ // <--- เปลี่ยนตรงนี้
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000, // <--- เปลี่ยนค่า Default PORT เป็น 4000 (สำหรับ TiDB Cloud)
  ssl: {
    rejectUnauthorized: true, // ควรเป็น true เพื่อความปลอดภัย แต่ถ้ามีปัญหา ให้ลองเป็น false ชั่วคราว
  },
  // **เพิ่มการตั้งค่าสำหรับ Connection Pool เพื่อจัดการ Idle Timeout**
  waitForConnections: true,     // ถ้าไม่มี connection ว่าง ให้รอ
  connectionLimit: 10,          // จำนวน connection สูงสุดใน pool (ปรับได้ตามความเหมาะสม)
  queueLimit: 0,                // จำนวน request ที่สามารถเข้าคิวได้ (0 คือไม่จำกัด)
  idleTimeout: 600000,          // 10 นาที (600,000 มิลลิวินาที) - ถ้าไม่มี Activity จะปิด Connection
  enableKeepAlive: true,        // เปิดใช้งาน Keep-Alive เพื่อป้องกัน Connection ถูกตัด
  keepAliveInitialDelay: 0,     // เริ่มส่งสัญญาณ Keep-Alive ทันที
});

// ตรวจสอบการเชื่อมต่อ Pool (ไม่ใช่ Connection เดี่ยวๆ)
pool.getConnection(err => { // <--- เปลี่ยนเป็น pool.getConnection
  if (err) {
    // เพิ่มรายละเอียด error เพื่อช่วย debug
    console.error('❌ Error getting connection from MySQL pool:', err.stack); // <--- แก้ข้อความ Log
    console.error('Check your DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT environment variables, and SSL configuration.');
    // อาจจะ exit process ถ้าเชื่อมต่อ DB ไม่ได้เลย
    process.exit(1);
  }
  console.log('✅ MySQL connection pool established.'); // <--- แก้ไข Log message
});


// **สำคัญ: เปลี่ยน db.query ทั้งหมดเป็น pool.query**

// ✅ POST: บันทึกข้อมูลจอง
app.post('/api/bookings', (req, res) => {
  const { name, phone, datetime, people, note } = req.body;
  const sql = 'INSERT INTO bookings (name, phone, datetime, people, note) VALUES (?, ?, ?, ?, ?)';
  pool.query(sql, [name, phone, datetime, people, note], (err, result) => { // <--- เปลี่ยนตรงนี้
    if (err) {
      console.error('❌ Database insert error:', err);
      return res.status(500).json({ error: 'Database insert error' });
    }
    res.status(201).json({ message: '✅ Booking saved successfully' });
  });
});

// ✅ GET: ดึงรายการจองทั้งหมด
app.get('/api/bookings', (req, res) => {
  const sql = 'SELECT * FROM bookings ORDER BY datetime DESC';
  pool.query(sql, (err, results) => { // <--- เปลี่ยนตรงนี้
    if (err) {
      console.error('❌ Database read error:', err);
      return res.status(500).json({ error: 'Database read error' });
    }
    res.json(results);
  });
});

// ✅ DELETE: ลบรายการจองตาม ID
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM bookings WHERE id = ?';
  pool.query(sql, [id], (err, result) => { // <--- เปลี่ยนตรงนี้
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

// ✅ PUT: แก้ไขรายการจองตาม ID
app.put('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone, datetime, people, note } = req.body;
  const sql = 'UPDATE bookings SET name = ?, phone = ?, datetime = ?, people = ?, note = ? WHERE id = ?';
  pool.query(sql, [name, phone, datetime, people, note, id], (err, result) => { // <--- เปลี่ยนตรงนี้
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

// ✅ POST: เข้าสู่ระบบแอดมิน (ดึงจาก DB - Plain Text Password)
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  console.log('🛂 Admin Login Attempt:', username); // ไม่ควร Log password

  // Query เพื่อค้นหา admin user ด้วย username และ password โดยตรง
  const sql = 'SELECT id, username FROM admins WHERE username = ? AND password = ?';
  pool.query(sql, [username, password], (err, results) => { // ส่ง username และ password เป็น parameter
    if (err) {
      console.error('❌ Database query error during admin login:', err);
      return res.status(500).json({ success: false, message: 'Database error during login' });
    }

    // ถ้าไม่พบ user หรือ username/password ไม่ตรงกัน
    if (results.length === 0) {
      console.log('🚫 Admin Login Failed: Invalid credentials for', username);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // ถ้า Login สำเร็จ
    console.log('✅ Admin Login Success:', username);
    // ใน Production ควรสร้าง JWT Token จริงๆ แทน mock-admin-token
    res.json({ success: true, token: 'mock-admin-token' });
  });
});

// 3. กำหนด Port ให้ดึงจาก Environment Variable ด้วย (สำคัญสำหรับ Hosting)
// Render จะกำหนด PORT ให้คุณเองใน Production
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
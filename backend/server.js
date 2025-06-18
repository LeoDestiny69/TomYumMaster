// 1. เพิ่ม require('dotenv').config(); ไว้บนสุด
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // ใช้ mysql2 ดีแล้วครับ
const app = express();

app.use(cors());
app.use(express.json());

// ข้อมูลล็อกอินแอดมิน (mock) - แนะนำให้ใช้ ENV VARS สำหรับ Production ด้วย
// ตอนนี้ยังคง hardcode ไว้ตามเดิม แต่ใน Production จริง ควรใช้ ENV VARS สำหรับ username/password
const adminUser = {
  username: 'admin',
  password: '1234'
};

// 2. ปรับการเชื่อมต่อฐานข้อมูล MySQL ให้ดึงค่าจาก Environment Variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000, // <--- เปลี่ยนค่า Default PORT เป็น 4000 (สำหรับ TiDB Cloud)
  ssl: {                             // <--- เพิ่มส่วนนี้เข้ามา
    rejectUnauthorized: true,        // ควรเป็น true เพื่อความปลอดภัย แต่ถ้ามีปัญหา ให้ลองเป็น false ชั่วคราว
  }
});

// ตรวจสอบการเชื่อมต่อ
db.connect(err => {
  if (err) {
    // เพิ่มรายละเอียด error เพื่อช่วย debug
    console.error('❌ Error connecting to MySQL database:', err.stack);
    console.error('Check your DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT environment variables, and SSL configuration.'); // เพิ่ม SSL ในข้อความเตือน
    // อาจจะ exit process ถ้าเชื่อมต่อ DB ไม่ได้เลย
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database as id ' + db.threadId);
});

// ✅ POST: บันทึกข้อมูลจอง
app.post('/api/bookings', (req, res) => {
  const { name, phone, datetime, people, note } = req.body;
  const sql = 'INSERT INTO bookings (name, phone, datetime, people, note) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, phone, datetime, people, note], (err, result) => {
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
  db.query(sql, (err, results) => {
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
  db.query(sql, [id], (err, result) => {
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
  db.query(sql, [name, phone, datetime, people, note, id], (err, result) => {
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

// ✅ POST: เข้าสู่ระบบแอดมิน
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  console.log('🛂 Admin Login Attempt:', username, password);

  if (username === adminUser.username && password === adminUser.password) {
    res.json({ success: true, token: 'mock-admin-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// 3. กำหนด Port ให้ดึงจาก Environment Variable ด้วย (สำคัญสำหรับ Hosting)
// Render จะกำหนด PORT ให้คุณเองใน Production
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Access backend at http://localhost:${PORT}`);
});
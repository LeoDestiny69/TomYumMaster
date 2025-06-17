const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

// ข้อมูลล็อกอินแอดมิน (mock)
const adminUser = {
  username: 'admin',
  password: '1234'
};

// เชื่อมต่อฐานข้อมูล MySQL (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restaurant_db',
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

// ✅ Start Server
app.listen(3001, () => {
  console.log('🚀 Server running at http://localhost:3001');
});

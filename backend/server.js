const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

// เชื่อมต่อ MySQL ที่ XAMPP เปิดไว้
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // ถ้าคุณไม่ตั้ง password
  database: 'restaurant_db',
});

// POST /api/bookings สำหรับรับข้อมูลจาก React
app.post('/api/bookings', (req, res) => {
  const { name, phone, datetime, people, note } = req.body;

  const sql = 'INSERT INTO bookings (name, phone, datetime, people, note) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, phone, datetime, people, note], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database insert error' });
    }
    res.status(201).json({ message: 'Booking saved successfully' });
  });
});

app.listen(3001, () => {
  console.log('✅ Server running on http://localhost:3001');
});

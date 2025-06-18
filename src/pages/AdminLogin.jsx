import { useState } from 'react';
import axios from 'axios';

function AdminLogin({ onLoginSuccess, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 1. เปลี่ยนชื่อฟังก์ชันเป็น handleLoginSubmit เพื่อบ่งบอกว่าใช้กับ form submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อกด Submit form

    try {
      const res = await axios.post('https://tomyummaster.onrender.com/admin/login', {
        username,
        password,
      });
      localStorage.setItem('admin-token', res.data.token);
      onLoginSuccess();
    } catch (error) { // 2. รับ object error มาตรวจสอบ
      console.error("Login Error:", error); // Log error เพื่อ debug
      // 3. แสดง alert ที่มีข้อความเฉพาะเจาะจงมากขึ้น
      if (error.response && error.response.data && error.response.data.message) {
        alert(`เข้าสู่ระบบไม่สำเร็จ: ${error.response.data.message}`);
      } else {
        alert('เข้าสู่ระบบไม่สำเร็จ: กรุณาตรวจสอบ Username และ Password อีกครั้ง');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF0E1]">
      <div className="bg-[#FFFAF5] p-6 rounded-2xl shadow-lg w-80 border border-[#FF6F3C]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#E4572E]">
          Admin Login
        </h2>
        {/* 1. ครอบ input และ button ด้วย <form> */}
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-[#FF6F3C] rounded px-3 py-2 w-full mb-3 text-[#4D2C1D] placeholder-[#B46935] focus:outline-none focus:ring-2 focus:ring-[#FF6F3C]"
            required // เพิ่ม required เพื่อให้เบราว์เซอร์ช่วยตรวจสอบเบื้องต้น
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#FF6F3C] rounded px-3 py-2 w-full mb-3 text-[#4D2C1D] placeholder-[#B46935] focus:outline-none focus:ring-2 focus:ring-[#FF6F3C]"
            required // เพิ่ม required
          />
          <button
            type="submit" // 1. กำหนด type เป็น "submit"
            className="w-full bg-[#E4572E] text-white py-2 rounded hover:bg-[#cc3e1a] transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </form>
        <button
          onClick={onBack}
          className="mt-3 w-full text-sm text-[#7A4E2D] hover:underline"
        >
          ⬅️ กลับหน้าแรก
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
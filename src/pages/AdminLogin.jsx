import { useState } from 'react';
import axios from 'axios';

function AdminLogin({ onLoginSuccess, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3001/admin/login', {
        username,
        password,
      });
      localStorage.setItem('admin-token', res.data.token);
      onLoginSuccess();
    } catch {
      alert('เข้าสู่ระบบไม่สำเร็จ');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF0E1]">
      <div className="bg-[#FFFAF5] p-6 rounded-2xl shadow-lg w-80 border border-[#FF6F3C]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#E4572E]">
        Admin Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-[#FF6F3C] rounded px-3 py-2 w-full mb-3 text-[#4D2C1D] placeholder-[#B46935] focus:outline-none focus:ring-2 focus:ring-[#FF6F3C]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-[#FF6F3C] rounded px-3 py-2 w-full mb-3 text-[#4D2C1D] placeholder-[#B46935] focus:outline-none focus:ring-2 focus:ring-[#FF6F3C]"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#E4572E] text-white py-2 rounded hover:bg-[#cc3e1a] transition-colors"
        >
        เข้าสู่ระบบ
        </button>
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

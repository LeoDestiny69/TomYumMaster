import { useState } from 'react';
import { LogOut, BookOpen, Utensils } from 'lucide-react';

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF3E0] to-[#FFEBD6] p-6 text-[#3C2A1E] font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#E4572E] flex items-center gap-2">
          🍲 ระบบหลังบ้านแอดมิน
        </h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-[#E4572E] hover:bg-[#cc3e1a] text-white px-4 py-2 rounded-lg shadow"
        >
          <LogOut size={18} />
          ออกจากระบบ
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition shadow ${
            activeTab === 'menu'
              ? 'bg-[#FF6F3C] text-white'
              : 'bg-white text-[#3C2A1E] border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Utensils size={16} />
          จัดการเมนู
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition shadow ${
            activeTab === 'bookings'
              ? 'bg-[#FF6F3C] text-white'
              : 'bg-white text-[#3C2A1E] border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <BookOpen size={16} />
          รายการจอง
        </button>
      </nav>

      {/* Content Card */}
      <section className="bg-white rounded-2xl p-6 shadow-xl transition-all duration-300">
        {activeTab === 'menu' && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#4D2C1D]">🍜 เมนูอาหาร</h2>
            <p className="text-gray-600">* ฟีเจอร์จัดการเมนูจะถูกเพิ่มเร็ว ๆ นี้ *</p>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#4D2C1D]">📅 รายการจองโต๊ะ</h2>
            <p className="text-gray-600">* ข้อมูลการจองจะดึงจากระบบฐานข้อมูลภายหลัง *</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;

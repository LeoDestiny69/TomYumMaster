import { useState } from 'react';
import axios from 'axios';
import { CalendarDays, User, Phone, StickyNote } from 'lucide-react';

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    datetime: '',
    people: 1,
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const selected = new Date(form.datetime);

    if (selected < now) {
      alert('⛔️ กรุณาเลือกวันและเวลาให้ถูกต้อง');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/bookings', form);
      alert('🎉 จองเรียบร้อยแล้ว ขอบคุณค่ะ!');
      setForm({ name: '', phone: '', datetime: '', people: 1, note: '' });
    } catch (err) {
      console.error('❌ Error:', err);
      alert('❌ เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง');
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
  };

  return (
    <div className="min-h-screen bg-amber-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-[#842000] mb-6">
          จองโต๊ะล่วงหน้า
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ชื่อ */}
          <div className="flex items-center gap-2">
            <User className="text-[#b24c1a]" size={20} />
            <input
              type="text"
              name="name"
              placeholder="ชื่อของคุณ"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 bg-[#fff4ec] text-gray-800 border border-[#ffb088]"
              required
            />
          </div>

          {/* เบอร์โทร */}
          <div className="flex items-center gap-2">
            <Phone className="text-[#b24c1a]" size={20} />
            <input
              type="tel"
              name="phone"
              placeholder="เบอร์ติดต่อ"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 bg-[#fff4ec] text-gray-800 border border-[#ffb088]"
              required
            />
          </div>

          {/* วันเวลา */}
          <div className="flex items-center gap-2">
            <CalendarDays className="text-[#b24c1a]" size={20} />
            <input
              type="datetime-local"
              name="datetime"
              value={form.datetime}
              min={getMinDateTime()}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 bg-[#ff6b35] text-white border border-[#ffb088]"
              required
            />
          </div>

          {/* จำนวนคน */}
          <div className="flex items-center gap-2">
            <User className="text-[#b24c1a]" size={20} />
            <input
              type="number"
              name="people"
              value={form.people}
              min={1}
              max={20}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-2 bg-[#fff4ec] text-gray-800 border border-[#ffb088]"
              placeholder="จำนวนคน"
              required
            />
          </div>

          {/* หมายเหตุ */}
          <div className="flex items-start gap-2">
            <StickyNote className="text-[#b24c1a] mt-2" size={20} />
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
              className="w-full rounded-xl px-4 py-2 bg-[#fff4ec] text-gray-800 border border-[#ffb088]"
            />
          </div>

          {/* ปุ่ม submit */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-sm bg-[#ff6b35] hover:bg-[#e85c28] text-white rounded-xl px-6 py-2 shadow-md"
            >
              ยืนยันการจอง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

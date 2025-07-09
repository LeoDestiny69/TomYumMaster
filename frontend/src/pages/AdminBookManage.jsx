import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    datetime: '',
    people: '',
    note: '',
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // แก้ไขตรงนี้
      const res = await axios.get('https://tomyummaster.onrender.com/api/bookings');
      setBookings(res.data);
    } catch (error) {
      alert('ไม่สามารถโหลดข้อมูลการจองได้');
    }
  };

  const startEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      name: booking.name,
      phone: booking.phone,
      datetime: booking.datetime.slice(0, 16), // ปรับ datetime ให้เหมาะกับ input[type=datetime-local]
      people: booking.people,
      note: booking.note,
    });
  };

  const cancelEdit = () => {
    setEditingBooking(null);
    setFormData({
      name: '',
      phone: '',
      datetime: '',
      people: '',
      note: '',
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // แก้ไขตรงนี้
      await axios.put(`https://tomyummaster.onrender.com/api/bookings/${editingBooking.id}`, formData);
      alert('อัปเดตข้อมูลสำเร็จ');
      cancelEdit();
      fetchBookings();
    } catch (error) {
      alert('อัปเดตข้อมูลไม่สำเร็จ');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('ยืนยันการลบรายการจองนี้?')) return;
    try {
      // แก้ไขตรงนี้
      await axios.delete(`https://tomyummaster.onrender.com/api/bookings/${id}`);
      alert('ลบรายการจองสำเร็จ');
      fetchBookings();
    } catch (error) {
      alert('ลบรายการจองไม่สำเร็จ');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#F97316]">จัดการรายการจอง</h1>

      {!editingBooking ? (
        <table className="min-w-full border border-[#F97316] rounded-md">
          <thead className="bg-[#FDE68A]">
            <tr>
              <th className="border border-[#F97316] px-3 py-2">ชื่อ</th>
              <th className="border border-[#F97316] px-3 py-2">เบอร์โทร</th>
              <th className="border border-[#F97316] px-3 py-2">วันที่-เวลา</th>
              <th className="border border-[#F97316] px-3 py-2">จำนวนคน</th>
              <th className="border border-[#F97316] px-3 py-2">หมายเหตุ</th>
              <th className="border border-[#F97316] px-3 py-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="border border-[#F97316] px-3 py-1">{b.name}</td>
                <td className="border border-[#F97316] px-3 py-1">{b.phone}</td>
                <td className="border border-[#F97316] px-3 py-1">{new Date(b.datetime).toLocaleString()}</td>
                <td className="border border-[#F97316] px-3 py-1">{b.people}</td>
                <td className="border border-[#F97316] px-3 py-1">{b.note}</td>
                <td className="border border-[#F97316] px-3 py-1">
                  <button
                    onClick={() => startEdit(b)}
                    className="mr-2 px-2 py-1 bg-[#F97316] text-white rounded hover:bg-[#ea580c]"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-[#FFF7ED] p-4 rounded border border-[#F97316] max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-[#F97316]">แก้ไขรายการจอง</h2>
          <label className="block mb-2">
            ชื่อ
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-[#F97316] rounded px-2 py-1"
            />
          </label>
          <label className="block mb-2">
            เบอร์โทร
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-[#F97316] rounded px-2 py-1"
            />
          </label>
          <label className="block mb-2">
            วันที่-เวลา
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              className="w-full border border-[#F97316] rounded px-2 py-1"
            />
          </label>
          <label className="block mb-2">
            จำนวนคน
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleChange}
              className="w-full border border-[#F97316] rounded px-2 py-1"
            />
          </label>
          <label className="block mb-4">
            หมายเหตุ
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full border border-[#F97316] rounded px-2 py-1"
            />
          </label>
          <div className="flex justify-between">
            <button
              onClick={handleUpdate}
              className="bg-[#F97316] text-white px-4 py-2 rounded hover:bg-[#ea580c]"
            >
              บันทึก
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
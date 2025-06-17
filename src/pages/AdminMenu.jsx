import { useEffect, useState } from "react";
import axios from "axios";

function AdminMenu({ onLogout }) {
  const [tab, setTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [editBooking, setEditBooking] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const loadBookings = () => {
    setLoading(true);
    axios.get('http://localhost:3001/api/bookings')
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error(err);
        alert("ไม่สามารถโหลดข้อมูลการจองได้");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (tab === 'bookings') loadBookings();
  }, [tab]);

  const handleDelete = (id) => {
    if (window.confirm('คุณแน่ใจจะลบการจองนี้?')) {
      axios.delete(`http://localhost:3001/api/bookings/${id}`)
        .then(() => {
          alert('ลบรายการสำเร็จ');
          loadBookings();
        })
        .catch(() => alert('ลบไม่สำเร็จ'));
    }
  };

  const handleSaveEdit = (updatedBooking) => {
    axios.put(`http://localhost:3001/api/bookings/${updatedBooking.id}`, updatedBooking)
      .then(() => {
        alert('แก้ไขข้อมูลสำเร็จ');
        setEditBooking(null);
        loadBookings();
      })
      .catch(() => alert('แก้ไขไม่สำเร็จ'));
  };

  const filteredBookings = bookings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E1] to-[#FFEDE1] text-[#4D2C1D] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#E4572E] flex items-center gap-2">
            🍲 <span>ระบบแอดมิน</span>
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin-token');
              onLogout();
            }}
            className="bg-[#E4572E] text-white px-5 py-2 rounded-lg hover:bg-[#cc3e1a] transition"
          >
            ออกจากระบบ
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-5 py-2 rounded-lg font-medium transition shadow-sm ${
              tab === 'bookings'
                ? 'bg-[#FF6F3C] text-white'
                : 'bg-white text-[#4D2C1D] border border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => setTab('bookings')}
          >
            📋 รายการจอง
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-medium transition shadow-sm ${
              tab === 'menu'
                ? 'bg-[#FF6F3C] text-white'
                : 'bg-white text-[#4D2C1D] border border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => setTab('menu')}
          >
            🍛 จัดการเมนู
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          {tab === 'bookings' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#E4572E]">📅 รายการจอง</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  ➕ เพิ่มการจอง
                </button>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="🔍 ค้นหาชื่อหรือเบอร์โทร"
                  className="w-full border px-4 py-2 rounded-lg"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {loading ? (
                <p className="text-gray-600">⏳ กำลังโหลดข้อมูล...</p>
              ) : filteredBookings.length === 0 ? (
                <p className="text-gray-600">ไม่มีข้อมูลการจอง</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-[#FFE1D6] text-[#4D2C1D] text-left">
                      <tr>
                        <th className="px-4 py-3 border">ชื่อ</th>
                        <th className="px-4 py-3 border">เบอร์</th>
                        <th className="px-4 py-3 border">วันเวลา</th>
                        <th className="px-4 py-3 border">จำนวนคน</th>
                        <th className="px-4 py-3 border">หมายเหตุ</th>
                        <th className="px-4 py-3 border">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#FFF8F2] transition">
                          <td className="px-4 py-2 border">{b.name}</td>
                          <td className="px-4 py-2 border">{b.phone}</td>
                          <td className="px-4 py-2 border">{new Date(b.datetime).toLocaleString()}</td>
                          <td className="px-4 py-2 border">{b.people}</td>
                          <td className="px-4 py-2 border">{b.note || '-'}</td>
                          <td className="px-4 py-2 border">
                            <div className="flex gap-2 flex-wrap">
                              <button
                                onClick={() => setEditBooking(b)}
                                className="bg-yellow-400 text-[#4D2C1D] px-3 py-1 rounded hover:bg-yellow-500"
                              >
                                แก้ไข
                              </button>
                              <button
                                onClick={() => handleDelete(b.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                              >
                                ลบ
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {tab === 'menu' && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-[#E4572E]">🍜 เมนูอาหาร</h2>
              <div className="text-gray-500">🚧 ระบบจัดการเมนูกำลังพัฒนา...</div>
            </div>
          )}
        </div>
      </div>

      {editBooking && (
        <EditBookingModal
          booking={editBooking}
          onClose={() => setEditBooking(null)}
          onSave={handleSaveEdit}
        />
      )}

      {showAddModal && (
        <AddBookingModal
          onClose={() => setShowAddModal(false)}
          onSave={(newBooking) => {
            axios.post('http://localhost:3001/api/bookings', {
              ...newBooking,
              datetime: new Date(newBooking.datetime).toISOString()
            })
              .then(() => {
                alert('เพิ่มการจองสำเร็จ');
                setShowAddModal(false);
                loadBookings();
              })
              .catch(() => alert('เพิ่มการจองไม่สำเร็จ'));
          }}
        />
      )}
    </div>
  );
}

// ================= MODALS =================

function EditBookingModal({ booking, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: booking.name,
    phone: booking.phone,
    datetime: booking.datetime.slice(0, 16),
    people: booking.people,
    note: booking.note || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: booking.id,
      ...formData,
      datetime: new Date(formData.datetime).toISOString()
    });
  };

  return (
    <Modal onClose={onClose} title="แก้ไขการจอง" onSubmit={handleSubmit}>
      <BookingForm formData={formData} handleChange={handleChange} />
    </Modal>
  );
}

function AddBookingModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    datetime: '',
    people: 1,
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      datetime: new Date(formData.datetime).toISOString()
    });
  };

  return (
    <Modal onClose={onClose} title="เพิ่มการจอง" onSubmit={handleSubmit} primaryColor="green">
      <BookingForm formData={formData} handleChange={handleChange} />
    </Modal>
  );
}

function Modal({ onClose, title, onSubmit, children, primaryColor = 'orange' }) {
  const colorClass = primaryColor === 'green' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700';
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {children}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${colorClass}`}
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
}

function BookingForm({ formData, handleChange }) {
  return (
    <>
      <label className="block mb-2">
        ชื่อ:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        เบอร์โทร:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        วันเวลา:
        <input
          type="datetime-local"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        จำนวนคน:
        <input
          type="number"
          name="people"
          min="1"
          value={formData.people}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        หมายเหตุ:
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>
    </>
  );
}

export default AdminMenu;

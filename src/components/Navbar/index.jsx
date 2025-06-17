export default function Navbar({ onAdminLoginClick }) {
  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 bg-[#F4EAE0] text-[#4D4D4D]">
      <div className="flex-1">
        <a href="#home" className="btn btn-ghost text-xl">Tom Yum Master</a>
      </div>

      <div className="flex-none gap-4 items-center">
        <ul className="menu menu-horizontal px-1">
          <li><a href="#home">Welcome</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#book">Book a Table</a></li>
        </ul>

        {/* ✅ ปุ่มที่เรียกฟังก์ชันจาก App */}
        <button
          className="btn btn-outline btn-sm"
          onClick={() => {
          console.log('🔐 Admin Login Clicked'); // ✅ ลองดูว่าขึ้นไหม
          onAdminLoginClick();
          }}
>
  Admin Login
</button>

      </div>
    </div>
  );
}

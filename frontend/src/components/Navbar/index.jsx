import { useState } from 'react';

export default function Navbar({ onAdminLoginClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 bg-[#F4EAE0] text-[#4D4D4D] px-4 md:px-10">
      <div className="flex-1">
        <a href="#home" className="btn btn-ghost text-xl">Tom Yum Master</a>
      </div>

      <div className="flex-none md:flex md:items-center gap-4 hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="#home">Welcome</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#book">Book a Table</a></li>
        </ul>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => {
            console.log('🔐 Admin Login Clicked');
            onAdminLoginClick();
          }}
        >
          Admin Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-ghost p-2 rounded-md"
          style={{ fontSize: '1.75rem', padding: '0.5rem 1rem' }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 w-40 bg-[#F4EAE0] shadow-lg rounded-md flex flex-col items-start p-4 gap-2 md:hidden">
          <a href="#home" className="w-full">Welcome</a>
          <a href="#about" className="w-full">About</a>
          <a href="#menu" className="w-full">Menu</a>
          <a href="#book" className="w-full">Book a Table</a>
          <button
            className="btn btn-outline btn-sm w-full"
            onClick={() => {
              console.log('🔐 Admin Login Clicked');
              onAdminLoginClick();
              setIsMenuOpen(false);
            }}
          >
            Admin Login
          </button>
        </div>
      )}
    </div>
  );
}

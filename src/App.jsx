import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import About from "./components/About";
import Card from "./components/Menu";
import Booking from "./components/Booking";
import AdminLogin from './pages/AdminLogin';
import AdminMenu from './pages/AdminMenu';

export default function App() {
  const [page, setPage] = useState('main');

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (token === 'mock-admin-token') {
      setPage('menu');
    }
  }, []);

  if (page === 'login') {
    return <AdminLogin onLoginSuccess={() => setPage('menu')} onBack={() => setPage('main')} />;
  }

  if (page === 'menu') {
    return <AdminMenu onLogout={() => setPage('main')} />;
  }

  return (
    <>
      <Navbar onAdminLoginClick={() => setPage('login')} />
      <div className="pt-20 scroll-smooth">
        <section id="home">
          <Main />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="menu">
          <Card />
        </section>
        <section id="book">
          <Booking />
        </section>
      </div>
    </>
  );
}

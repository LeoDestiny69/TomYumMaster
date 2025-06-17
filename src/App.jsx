import Navbar from "./components/Navbar";
import Main from "./components/Main";
import About from "./components/About";
import Card from "./components/Menu";
import Booking from "./components/Booking";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20 scroll-smooth"> {/* เว้นเนื้อหาจาก Navbar และให้ scroll ลื่น */}
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

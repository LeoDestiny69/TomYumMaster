import TomYum from '../../assets/TomYum.jpg';
import { motion } from 'framer-motion';

export default function Main() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="container mx-auto max-w-[1344px] px-6 py-20"
      >
        <div className="flex flex-col gap-12 justify-center items-center lg:flex-row lg:justify-between">

          {/* Left: Text Content */}
          <div className="text-left lg:w-1/2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-orange-600 mb-6 leading-tight drop-shadow-md">
              Bold Flavors.<br />Thai Spirit. Taste the Mastery.
            </h1>
            <p className="text-lg md:text-2xl text-orange-800 leading-relaxed">
              สัมผัสรสชาติจัดจ้านแบบไทยแท้ ที่ร้าน <span className="font-semibold text-orange-700">Tom Yum Master</span><br />
              ใช้วัตถุดิบสดใหม่จากทะเล ผสานกลิ่นหอมของสมุนไพรไทยในน้ำซุปเข้มข้น  
              เปรี้ยว เผ็ด หอมกลมกล่อม ลงตัวในทุกคำ พร้อมบริการอบอุ่นในบรรยากาศสบาย ๆ
              <br /><br />
              🍽️ เปิดบริการทุกวัน 10:00 - 21:00 น.<br />
              📍 สาขาใกล้คุณทั่วกรุงเทพฯ
            </p>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={TomYum}
              alt="Tom Yum Goong"
              className="w-full max-w-2xl h-auto rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

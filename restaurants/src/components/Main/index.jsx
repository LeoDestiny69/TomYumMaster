import TomYum from '../../assets/TomYum.jpg';

export default function Main() {
    return (
        <div className="container mx-auto max-w-[1344px] px-6">
            <div className="flex flex-col gap-12 py-16 min-h-screen justify-center items-center lg:flex-row lg:justify-between lg:items-center">
                
                {/* Left: Text Content */}
                <div className="text-left lg:w-1/2">
                    <h1 className="text-7xl font-extrabold text-orange-600 mb-6 leading-tight">
                        Bold Flavors.<br />Thai Spirit. Taste the Mastery.
                    </h1>
                    <p className="text-2xl text-orange-800 leading-relaxed">
                        สัมผัสรสชาติจัดจ้านแบบไทยแท้ ที่ร้าน <span className="font-semibold text-orange-700">Tom Yum Master </span>  
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
                        className="w-full max-w-5xl h-auto rounded-2xl shadow-2xl object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

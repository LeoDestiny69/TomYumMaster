import restaurant from '../../assets/restaurant.jpg';

export default function AboutRestaurant() {
    return (
        <div className="bg-orange-100"> 
            <div className="container mx-auto max-w-[1344px] px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left: Image */}
                    <div className="lg:w-1/2">
                        <img
                            src={restaurant}
                            alt="ร้านอาหาร"
                            className="w-full max-w-2xl h-auto rounded-2xl shadow-xl object-cover"
                        />
                    </div>

                    {/* Right: Text */}
                    <div className="lg:w-1/2 text-left">
                        <h2 className="text-5xl font-bold text-orange-700 mb-4">
                            เกี่ยวกับร้านของเรา
                        </h2>
                        <p className="text-2xl text-gray-700 leading-relaxed">
                            ร้าน <span className="text-orange-600 font-semibold">Tom Yum Master </span>
                            คือจุดหมายของคนรักอาหารไทย เราตั้งใจสร้างบรรยากาศอบอุ่น  
                            พร้อมเสิร์ฟอาหารคุณภาพจากวัตถุดิบสดใหม่ทุกวัน  
                            ทุกจานปรุงด้วยใจ เพื่อมอบประสบการณ์ที่ดีที่สุดให้กับคุณ
                            <br /><br />
                            ไม่ว่าจะเป็นมื้อกลางวันแสนอร่อย หรือมื้อค่ำสุดพิเศษ  
                            เรายินดีต้อนรับคุณเสมอ 🍲
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


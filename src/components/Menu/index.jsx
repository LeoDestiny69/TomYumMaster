import TomYumRice from '../../assets/menu/TomYumRice.jpg';
import Kapao from '../../assets/menu/Kapao.jpg';
import Chicken from '../../assets/menu/Chicken.jpg';

const menuItems = [
  {
    name: 'ข้าวต้มยำ',
    description: 'ข้าวผัดต้มยำรสแซ่บ อร่อยจัดจ้าน',
    image: TomYumRice,
  },
  {
    name: 'ข้าวกะเพรา',
    description: 'ข้าวกะเพราหมูสับ ไข่ดาวเยิ้มๆ',
    image: Kapao,
  },
  {
    name: 'ไก่ทอดกรอบ',
    description: 'ไก่ทอดสูตรพิเศษ กรอบนอกนุ่มใน',
    image: Chicken,
  },
];

export default function Card() {
  return (
    <div className="bg-orange-200 p-6">
      <h1 className="text-4xl font-bold text-[#842000] text-center mb-8">Menu</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105 max-w-sm w-full mx-auto"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center text-[#842000]">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-sm text-[#b24c1a] mt-1">{item.description}</p>
              <button className="mt-3 bg-[#ff6b35] hover:bg-[#e85c28] text-white text-sm py-2 px-6 rounded-full transition">
                สั่งเลย
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

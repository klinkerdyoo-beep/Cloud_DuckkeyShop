import { useEffect, useState } from "react";
import Path from "../components/Path";
import Narbar from "../components/Narbar";
import Profile from "../components/Profile";
import bg1 from "../assets/img/bg1.png";
import noImg from "../assets/img/no-img-rec.png";

interface OrderItem {
  id: number;
  productName: string;
  quantities: number;
  eachTotalPrice: number;
  imgURL: string;
}

interface Order {
  id: number;
  orderDate: string;
  orderStatus: string;
  totalPrice: number;
  items: OrderItem[];
}

const API_URL = import.meta.env.VITE_API_URL;

// function Tap() {
//   return (
//     <div className="flex gap-5 text-gray-600">
//       {["All", "รอตรวจสอบ", "ที่ต้องได้รับ", "สำเร็จเเล้ว", "ยกเลิก"].map((t) => (
//         <h2
//           key={t}
//           className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 hover:text-red-600 relative pb-1.5
//             before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-red-600
//             before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300"
//         >
//           {t}
//         </h2>
//       ))}
//     </div>
//   );
// }

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/orderhistory`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then(setOrders)
      .catch((err) => console.error(err));
  }, []);

  console.log("Orders data:", orders);

  return (
    <div className="text-black">
      <div
        style={{ backgroundImage: `url(${bg1})` }}
        className="bg-cover bg-fixed bg-center min-h-screen"
      >
        <Narbar />
        <Path />

        <div className="flex flex-row bg-white/90">
          <Profile />
          <div className="flex flex-1 flex-col items-center gap-4 justify-center mb-10">
            {/* <Tap /> */}

            <div className="p-10 w-full max-w-3xl">
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="bg-white border p-5 mb-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-red-700">
                        Order #{order.id} — {order.orderStatus}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>

                    {Array.isArray(order.items) && order.items.length > 0 ? (
                        order.items.map((item) => (
                            <div
                            key={item.id}
                            className="flex items-center gap-4 border-b pb-3 mb-3 last:border-none"
                            >
                            <img
                                src={item.imgURL ? `${API_URL}${item.imgURL}` : noImg}
                                className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <div className="flex-1">
                                <h2 className="text-red-700">{item.productName}</h2>
                                <p className="text-gray-700">จำนวน: {item.quantities}</p>
                            </div>
                            <p className="text-gray-800 font-semibold">
                                ฿{item.eachTotalPrice}
                            </p>
                            </div>
                        ))
                        ) : (<p className="text-gray-500 italic text-sm">ไม่มีสินค้าในคำสั่งซื้อนี้</p>)
                    }
                    <div className="text-right text-lg font-bold text-red-700">
                      รวมทั้งหมด: ฿{order.totalPrice}
                    </div>
                  </div>
                ))
            ) : (
            <p className="text-gray-600 text-center">ยังไม่มีคำสั่งซื้อ</p>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

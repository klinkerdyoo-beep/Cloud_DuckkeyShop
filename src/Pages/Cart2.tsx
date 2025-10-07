import { useState } from "react";
import Strawberry from "../assets/img/Strawberry_Hug_Toast.jpg";

export default function Cart() {
  // ตัวอย่างสินค้าในตะกร้า
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Strawberry Hug Toast",
      price: 250,
      qty: 1,
      image: Strawberry,
    },
    {
      id: 2,
      name: "Blueberry Mug",
      price: 180,
      qty: 2,
      image: Strawberry,
    },
    {
      id: 3,
      name: "Blueberry Mug",
      price: 180,
      qty: 2,
      image: Strawberry,
    },
    {
      id: 3,
      name: "Blueberry Mug",
      price: 180,
      qty: 2,
      image: Strawberry,
    },
    {
      id: 4,
      name: "Blueberry Mug",
      price: 180,
      qty: 2,
      image: Strawberry,
    },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      <div className="bg-white rounded-xl shadow p-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            {/* checkbox */}
            <input type="checkbox" className="mr-3" />

            {/* รูปสินค้า */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg border"
            />

            {/* ชื่อและราคา */}
            <div className="flex-1 px-4">
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-gray-500">฿{item.price}</p>
            </div>

            {/* จำนวน */}
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border rounded">-</button>
              <span>{item.qty}</span>
              <button className="px-2 py-1 border rounded">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* สรุปราคา */}
      <div className="bg-white rounded-xl shadow p-4 mt-6 flex justify-between items-center">
        <div>
          <p className="text-gray-600">Total</p>
          <h2 className="text-xl font-bold text-red-500">
            ฿
            {cart.reduce(
              (sum, item) => sum + item.price * item.qty,
              0
            )}
          </h2>
        </div>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600">
          Checkout
        </button>
      </div>
    </div>
  );
}

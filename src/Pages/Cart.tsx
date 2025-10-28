import { useEffect } from "react";
import Navbar from "../components/Narbar";
import Path from "../components/Path";
import bg1 from "../assets/img/bg1.png";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";


export default function CartPage() {
  const { cart, total, updatequantities, removeFromCart } = useCart();

  return (
    <div
      style={{ backgroundImage: `url(${bg1})` }}
      className="bg-cover bg-fixed bg-center min-h-screen"
    >
      <Navbar />
      <Path />

      <div className="p-10 text-center bg-white/90">
        <h1 className="text-3xl font-semibold text-red-700">Your Cart</h1>
        <p>Review your selected products before checkout.</p>
      </div>

      <div className="p-10 space-y-5">
        {cart.length === 0 ? (
          <p className="text-center text-gray-700">
            Your cart is empty.{" "}
            <Link to="/Shop" className="text-red-600 underline">
              Go Shopping
            </Link>
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={`${item.custom_product_id ?? item.product_id}-${item.customValue ?? ""}`}
              className="flex items-center bg-white/90 p-4 rounded-2xl shadow"
            >
              <img
                src={`http://localhost:3001${item.imgURL || ""}`}
                alt={item.productName}
                className="w-24 h-24 object-cover rounded border"
              />
              <div className="flex-1 ml-4 text-left">
                <Link to={`/product/${item.product_id}`}><h2 className="text-red-700 font-semibold">{item.productName}</h2></Link>
                <p className="text-gray-700">
                  Price: ฿{item.price.toLocaleString("en-US")}
                </p>
                <p className="text-gray-600">
                  quantities: <span className="font-semibold">{item.quantities}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updatequantities(item.custom_product_id ?? item.product_id, item.quantities - 1, item.customValue)
                  }
                  className="text-black text-xl border px-2 rounded"
                >
                  -
                </button>
                <span>{item.quantities}</span>
                <button
                  onClick={() =>
                    updatequantities(item.custom_product_id ?? item.product_id, item.quantities + 1, item.customValue)
                  }
                  className="text-black text-xl border px-2 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.custom_product_id ?? item.product_id, item.customValue)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-10 bg-white/90 flex justify-between items-center">
          <div>
            <p className="text-gray-700">Total</p>
            <h2 className="text-red-500 text-2xl">
              ฿{total.toLocaleString("en-US")}
            </h2>
          </div>
          <Link
            to="/Checkout"
            className="bg-red-700 text-white px-6 py-3 rounded-2xl hover:bg-red-800"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

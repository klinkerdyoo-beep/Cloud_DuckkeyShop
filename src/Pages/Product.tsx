import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Narbar";
import Path from "../components/Path";
import bg1 from "../assets/img/bg1.png";

import Loading from "./loading";
import RandomProds from "../components/randomProds";
import type { Product } from "../types";
import { useUser } from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantities, setquantities] = useState(1);
  const { user } = useUser();
  const isLoggedIn = !!user;

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) return <Loading />;

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const body = {
      email: user.email,
      productID: product.productID,
      quantities: quantities,
      customValue: "",
    };

    const res = await fetch(`${API_URL}/api/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      alert(`Added ${quantities} of ${product.productName} to cart`);
    } else {
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg1})` }}
      className="bg-cover bg-fixed bg-center min-h-screen text-black"
    >
      <Navbar />
      <Path />

      <div className="flex justify-center h-full text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/90 p-10 rounded-xl">
          <div className="w-90">
            <img
              src={`${API_URL}${product.imgURL || ""}`}
              alt={product.productName}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h2 className="m-5 text-2xl text-center">{product.productName}</h2>
            <h2 className="text-red-800 text-xl mb-3">{product.price} ฿</h2>

            {/* Only show if logged in */}
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={() => setquantities((q) => Math.max(1, q - 1))}
                    className="bg-gray-300 hover:bg-amber-500 px-3 rounded"
                  >
                    -
                  </button>
                  <span>{quantities}</span>
                  <button
                    onClick={() => setquantities((q) => q + 1)}
                    className="bg-gray-300 hover:bg-amber-500 px-3 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="mt-3 p-3 rounded-xl bg-red-800 hover:bg-red-500 text-sm text-white"
                >
                  Add to cart
                </button>
              </>
            ) : (
              <p className="text-gray-600 italic mt-3">
                Please log in to purchase or add to cart.
              </p>
            )}

            <p className="mt-3 text-black max-w-sm">{product.description}</p>
            <h3 className="mt-2 font-bold text-red-800">
              Approximate size: {product.size || "-"}
            </h3>
            <h3 className="mt-2 font-bold text-red-800">
              Material: {product.material || "-"}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-10 py-10 justify-center bg-white/90 items-center w-full text-center">
        <h1>Art Shop</h1>
        <p>
          Explore original paintings, sculptures, and handcrafted art pieces for your collection.
        </p>
      </div>

      <RandomProds />
    </div>
  );
}

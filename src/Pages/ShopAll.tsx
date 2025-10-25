import { useState, useEffect } from "react";
import Narbar from "../components/Narbar";
import Filter from "../components/Filter";
import Path from "../components/Path";
import bg1 from "../assets/img/bg1.png";
import product1 from "../assets/img/Strawberry_Hug_Toast.jpg";

type Product = {
  productID: number;
  productName: string;
  price: number;
  description: string;
  imgURL?: string;
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/products/");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading products...</p>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${bg1})` }}
      className="bg-cover bg-fixed bg-center min-h-screen"
    >
      <Narbar />
      <Path />

      <div className="p-10 py-10 justify-center bg-white/90 items-center w-full text-center">
        <h1>Art Shop</h1>
        <p>
          Explore original paintings, sculptures, and handcrafted art pieces for your collection.
        </p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {/* <Filter open={filterOpen} setOpen={setFilterOpen} /> */}
        <Filter />

        {/* เนื้อหาหลัก */}
        <div className="transition-all duration-500 flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Shop</h1>
          <p className="mb-6">Explore unique artworks and handcrafted pieces.</p>

          <div className="grid grid-cols-3 gap-3 px-10">
            {products.map((product) => (
              <div
                key={product.productID}
                className="box items-center shadow-4xl bg-white p-5 rounded-3xl max-w-sm max-h-max group"
              >
                <img
                  className="mx-auto w-60 object-cover"
                  src={`http://localhost:3001${product.imgURL}` || product1}
                  alt={product.productName}
                />
                <h2 className="text-black m-5 text-xl text-center">{product.productName}</h2>

                <div className="max-h-0 overflow-hidden transition-all duration-1000 group-hover:max-h-96 w-full">
                  <div className="border-2 mt-2 mb-2"></div>
                  <p className="text-black text-sm">{product.description}</p>
                </div>

                <div className="max-h-0 overflow-hidden transition-all duration-1100 group-hover:max-h-96 w-full">
                  <div className="border-2 mt-2 mb-2 border-gray-500"></div>
                  <p className="text-black text-sm">price {product.price} bath</p>
                </div>

                <div className="max-h-0 overflow-hidden transition-all duration-1200 group-hover:max-h-96 w-full text-right">
                  <div className="border-2 mt-2 mb-2 border-gray-500"></div>
                  <p className="text-black text-sm">see more details</p>
                </div>
              </div>
            ))}
          </div>

          {/* no products */}
          {products.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No products available right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

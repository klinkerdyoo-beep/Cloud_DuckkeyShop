import { useState, useEffect } from "react";
import Narbar from "../components/Narbar";
import Filter from "../components/Filter";
import Path from "../components/Path";
import bg1 from "../assets/img/bg1.png";
import noIMG from "../assets/img/no-img-rec.png";

import { Link, useLocation } from "react-router-dom";

import type { Product, Category } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
// fetch(`${API_URL}/api/products/`)

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null); 

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");

  // fetch from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        if (selectedCategory) {
          const filtered = data.filter(
            (p: Product) => p.category_id === selectedCategory
          );
          setProducts(filtered);

        const catRes = await fetch(`${API_URL}/api/categories/${selectedCategory}`);
          if (catRes.ok) {
            const catDataArray = await catRes.json();
            setCategoryInfo(catDataArray[0]);
            console.log(`catData`, catDataArray[0]);
          }
        } else {
            setProducts(data);
            setCategoryInfo(null);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

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
        <h1 className="text-3xl font-bold text-black">{categoryInfo ? categoryInfo.categoryName : "Art Shop"}</h1>
        <p>{categoryInfo ? categoryInfo.description : "Explore original paintings, sculptures, and handcrafted art pieces for your collection."}</p>
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
                  src={`${API_URL}${product.imgURL}` || noIMG}
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
                  <Link
                    to={`/product/${product.productID}`}
                    className="text-black text-sm hover:text-amber-500 transition"
                  >
                    see more detail
                  </Link>
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

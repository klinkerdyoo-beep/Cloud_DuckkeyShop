import { useState, useEffect } from "react";
import Narbar from "../../components/Narbar";
import Filter from "../../components/Filter";
import Path from "../../components/Path";

import { Link } from "react-router-dom";
import "./admin.css";

import noIMG from "../../assets/img/no-img-rec.png";
import AdminSidebar from "./admin_sidebar";
import AdminHeader from "./admin_header";
import Loading from "../loading";

type Product = {
  productID: number;
  productName: string;
  price: number;
  description: string;
  imgURL?: string;
  size: string;
  material: string;
  addedDate: string;
  updatedDate: string;
};

export default function AdminProductList() {
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
      <Loading />
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <AdminHeader activePage="products" />

        {/* Main */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background-light dark:bg-background-dark grid-bg">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">
              รายการสินค้าทั้งหมด
            </h1>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="material-icons text-gray-400">search</span>
                </span>
                <input
                  className="w-full md:w-1/3 py-2 pl-10 pr-4 text-text-light bg-card-light border border-gray-300 rounded-md dark:bg-card-dark dark:text-text-dark dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search"
                  type="text"
                />
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.productID}
                  className="bg-white bg-card-dark text-text-dark rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6 flex">
                    <img className="w-32 h-32 object-cover rounded-md" 
                      src={`http://localhost:3001${product.imgURL}` || noIMG}
                      alt={product.productName}/>
                    <div className="ml-6 flex-1">
                      <h2 className="text-lg font-bold">{product.productName}</h2>
                      <p className="mt-2 text-sm text-subtext-dark">
                        ราคา: <span className="text-text-dark">{product.price}</span>
                      </p>
                      <p className="mt-1 text-sm text-subtext-dark">
                        รายละเอียด: <span className="text-text-dark">{product.description}</span>
                      </p>
                      <p className="mt-1 text-sm text-subtext-dark">
                        Size: <span className="text-text-dark">{product.size}</span>
                      </p>
                      <p className="mt-1 text-sm text-subtext-dark">
                        Material: <span className="text-text-dark">{product.material}</span>
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-4 flex justify-between items-center">
                    <p className="text-xs text-subtext-dark">วันที่ล่าสุดที่แก้ไข: {new Date(product.updatedDate).toLocaleString()}</p>
                    <button className="bg-gray-200 text-gray-800 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-300">
                      แก้ไข
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


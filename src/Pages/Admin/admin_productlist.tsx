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

import type { ProductFull } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;
// fetch(`${API_URL}/api/products/`)

export default function AdminProductList() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductFull[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/`);
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

  const searchedItems = products.filter(products =>
    (products.productName?.toLowerCase() ?? "").includes(search.toLowerCase())
  );
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
              <div className="relative w-full md:w-1/3">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="material-icons text-gray-400">search</span>
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 text-text-light bg-card-light border border-gray-300 rounded-md dark:bg-card-dark dark:text-text-dark dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search"
                  type="text"
                />
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedItems.length > 0 ? (
                    searchedItems.map((product) => (
                <div
                  key={product.productID}
                  className="bg-white bg-card-dark text-text-dark rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6 flex">
                    <img className="w-32 h-32 object-cover rounded-md" 
                      src={`${API_URL}${product.imgURL}` || noIMG}
                      alt={product.productName}/>
                    <div className="ml-6 flex-1">
                      <h2 className="text-lg font-bold">{product.productName}</h2>
                      <p className="mt-2 text-sm text-subtext-dark">
                        stock: <span className="text-text-dark text-bold">{+product.stock}</span>
                      </p>
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

                  {/* edit del section */}
                  <div className="px-6 pb-4 flex justify-between items-center">
                    <p className="text-xs text-subtext-dark">
                      วันที่ล่าสุดที่แก้ไข: {new Date(product.updatedDate).toLocaleString()}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/productEdit/${product.productID}`}
                        className="bg-gray-200 text-gray-800 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-300"
                      >
                        แก้ไข
                      </Link>
                      <button
                        onClick={async () => {
                          const confirmDelete = window.confirm(
                            `❗ คุณกำลังจะลบข้อมูลสินค้า\n` +
                            `ชื่อสินค้า: ${product.productName}\n` +
                            `รหัส: ${product.productID}\n` +
                            `หลังจากลบแล้ว ไม่สามารถกู้คืนได้`
                          );
                          if (!confirmDelete) return;

                          try {
                            const res = await fetch(`${API_URL}/api/products/${product.productID}`, {
                              method: "DELETE",
                            });
                            if (!res.ok) throw new Error("Failed to delete product");
                            setProducts(products.filter((p) => p.productID !== product.productID));
                            alert("ลบสินค้าสำเร็จแล้ว!");
                          } catch (err) {
                            console.error("Error deleting product:", err);
                            alert("ลบสินค้าล้มเหลว");
                          }
                        }}
                        className="bg-red-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-red-600"
                      >
                        ลบ
                      </button>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  ไม่พบรายการที่ค้นหา
                </td>
              </tr>
            )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


import { useState, useEffect } from "react";
import Narbar from "../../components/Narbar";
import Filter from "../../components/Filter";
import Path from "../../components/Path";

import { Link } from "react-router-dom";
import "./admin.css";

import AdminSidebar from "./admin_sidebar";
import AdminHeader from "./admin_header";


export default function AdminProductDelete() {
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
              ลบรายการสินค้า
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
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card-dark text-text-dark rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6 flex">
                    <img alt="Product Image" className="w-32 h-32 object-cover rounded-md" 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bucephala-albeola-010.jpg/500px-Bucephala-albeola-010.jpg"/>
                    <div className="ml-6 flex-1">
                      <h2 className="text-lg font-bold">ชื่อสินค้า</h2>
                      <p className="mt-2 text-sm text-subtext-dark">
                        ราคา: <span className="text-text-dark">ราคา</span>
                      </p>
                      <p className="mt-1 text-sm text-subtext-dark">
                        รายละเอียด: <span className="text-text-dark">รายละเอียด</span>
                      </p>
                      <p className="mt-1 text-sm text-subtext-dark">
                        Size: <span className="text-text-dark">Size</span>
                      </p>
                      <p className="mt-1 text-sm text-subtext-dark">
                        Material: <span className="text-text-dark">Material</span>
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-4 flex justify-between items-center">
                    <p className="text-xs text-subtext-dark">วันที่ล่าสุดที่แก้ไข</p>
                    <button className="bg-gray-200 text-gray-800 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-300">
                      ลบ
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


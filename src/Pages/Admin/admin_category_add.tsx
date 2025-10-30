import { useState, useEffect } from "react";
import AdminSidebar from "./admin_sidebar";
import AdminHeader from "./admin_header";
import "./admin.css";

import type { Category } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminCategoryAdd() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories/`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/categories/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName, description }),
      });
      if (!res.ok) throw new Error("Failed to add category");
      setCategoryName("");
      setDescription("");
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถเพิ่มหมวดหมู่ได้");
    }
  };
  const handleDelete = async (id: number) => {
    if (!confirm("❗ คุณกำลังจะลบหมวดหมู่นี้\nหลังจากลบแล้ว ไม่สามารถกู้คืนได้")) return;

    try {
        const res = await fetch(`${API_URL}/api/categories/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (res.ok) {
        alert("ลบหมวดหมู่เรียบร้อยแล้ว");
        setCategories(categories.filter((c) => c.id !== id));
        } else {
        alert(data.error || "ลบหมวดหมู่ไม่สำเร็จ");
        }
    } catch (err) {
        console.error("Delete category failed:", err);
        alert("เกิดข้อผิดพลาดขณะลบหมวดหมู่");
    }
    };


  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader activePage="products" />

        <main className="flex-1 flex justify-center overflow-x-hidden overflow-y-auto bg-background-light dark:bg-background-dark">
          <div className="container max-w-lg px-6 py-8">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">
              เพิ่มหมวดหมู่สินค้า
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-1 font-medium">ชื่อหมวดหมู่</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="ชื่อหมวดหมู่"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">รายละเอียด</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="รายละเอียดหมวดหมู่ (ไม่บังคับ)"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-800 text-white py-3 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                เพิ่มหมวดหมู่
              </button>
            </form>

            {/* Table of categories */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">หมวดหมู่ทั้งหมด</h2>
              <div className="bg-card-light dark:bg-card-dark rounded-lg shadow overflow-hidden">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <th className="p-3">ID</th>
                      <th className="p-3">ชื่อหมวดหมู่</th>
                      <th className="p-3">รายละเอียด</th>
                    </tr>
                  </thead>
                  <tbody>
                        {categories.map((category) => (
                        <tr key={category.id} className="border-t">
                            <td className="px-4 py-2">{category.id}</td>
                            <td className="px-4 py-2">{category.categoryName}</td>
                            <td className="px-4 py-2">{category.description || "-"}</td>
                            <td className="px-4 py-2 text-right">
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="text-red-500 hover:text-red-700 font-bold text-lg"
                                title="Delete"
                            >
                                X
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

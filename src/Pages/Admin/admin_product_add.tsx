import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./admin_sidebar";
import AdminHeader from "./admin_header";
import "./admin.css";

// เดี๋ยวมาแก้ชื่อให้ตรง db
export default function AdminProductAdd() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewSrc(URL.createObjectURL(file));
    } else {
      setPreviewSrc(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // send to backend
    console.log({ productName, price, description, size, material, imageFile });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader activePage="products" />
        {/* Main */}
        <main className="flex-1 flex justify-center overflow-x-hidden overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="container max-w-lg px-6 py-8">
                <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">
                เพิ่มรายการสินค้า
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                {/* ชื่อสินค้า */}
                <div>
                    <label className="block mb-1 font-medium">ชื่อสินค้า</label>
                    <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="ชื่อสินค้า"
                    required
                    />
                </div>

                {/* ราคา */}
                <div>
                    <label className="block mb-1 font-medium">ราคา</label>
                    <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="ราคา"
                    required
                    />
                </div>

                {/* รายละเอียด */}
                <div>
                    <label className="block mb-1 font-medium">รายละเอียด</label>
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="รายละเอียดสินค้า"
                    rows={3}
                    />
                </div>

                {/* Size */}
                <div>
                    <label className="block mb-1 font-medium">Size</label>
                    <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Size"
                    />
                </div>

                {/* Material */}
                <div>
                    <label className="block mb-1 font-medium">Material</label>
                    <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Material"
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block mb-1 font-medium">Image Preview</label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 
                    file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-primary file:text-white 
                    file:bg-sky-800 hover:file:bg-sky-600 cursor-pointer"
                    />
                    {previewSrc && (
                    <img
                        src={previewSrc}
                        alt="Preview"
                        className="mt-3 max-h-64 object-contain rounded-md border"
                    />
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-sky-800 text-white py-3 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    เพิ่มสินค้า
                </button>
                </form>
          </div>
        </main>
      </div>
    </div>
  );
}

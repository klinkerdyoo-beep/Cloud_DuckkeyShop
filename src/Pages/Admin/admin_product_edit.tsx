import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "./admin_sidebar";
import AdminHeader from "./admin_header";
import "./admin.css";

interface Category {
  id: number;
  categoryName: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminProductEdit() {

  // productID
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [stock, setStock] = useState("1");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [is_available, setAvailable] = useState(true);
  const [isLocalFile, setIsLocalFile] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductName(data.productName || "");
        setPrice(data.price?.toString() || "");
        setDescription(data.description || "");
        setSize(data.size || "");
        setMaterial(data.material || "");
        setCategory(data.category_id?.toString() || "");
        setStock(data.stock?.toString() || "1");
        setAvailable(data.is_available ?? true);
        setPreviewSrc(data.imgURL || null);
      })
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setPreviewSrc(URL.createObjectURL(file));
      setIsLocalFile(true);
    } else {
      setPreviewSrc(null);
      setIsLocalFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("size", size);
    formData.append("material", material);
    formData.append("category_id", category);
    formData.append("stock", stock);
    formData.append("is_available", is_available ? "true" : "false");
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update product");
      alert("อัปเดตรายการสินค้าเรียบร้อยแล้ว!");
      navigate("/admin/ProductList");
    } catch (error) {
      console.error("Error updating product:", error);
    }
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
              แก้ไขข้อมูลสินค้า
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

              {/* หมวดหมู่สินค้า */}
              <div>
                <label className="block mb-1 font-medium">หมวดหมู่สินค้า</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">-- เลือกหมวดหมู่สินค้า --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock */}
              <div>
                <label className="block mb-1 font-medium">จำนวนสต็อกสินค้า</label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="จำนวนสินค้าคงเหลือ"
                  required
                />
              </div>

              {/* is_available */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={is_available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="font-medium">พร้อมจำหน่าย</label>
              </div>

              {/* Image */}
              <div>
                <label className="block mb-1 font-medium">เปลี่ยนภาพตัวอย่างสินค้า</label>
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
                    src={isLocalFile ? previewSrc : `${API_URL}${previewSrc}`}
                    alt="Preview"
                    className="mt-3 max-h-64 object-contain rounded-md border"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-sky-800 text-white py-3 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                บันทึกการแก้ไข
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

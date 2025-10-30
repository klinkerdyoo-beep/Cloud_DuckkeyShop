import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  categoryName: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const CollapsibleFilter = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`bg-amber-400 transition-all duration-500 cursor-pointer overflow-hidden
        ${open ? "w-64 p-4 max-h-max" : "py-10 w-10 h-40 p-2"} rounded-r-2xl shadow-lg flex flex-col items-center`}
    >
      {/* หัวข้อ Filter */}
      <h2
        className={`font-medium inline-block transition-all duration-500 origin-left
          ${open ? "text-lg rotate-0 mb-2" : "text-sm ml-10 mt-10  rotate-90"}`}
      >
        Category
      </h2>

      {/* เนื้อหาตอนเปิด */}
      {open && (
        <div className="mt-2 w-full">
          <h3 className="text-lg font-medium mb-2">Style</h3>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/Product" className="p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm">
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/Product?category=${encodeURIComponent(cat.id)}`}
                className="p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm"
              >
                {cat.categoryName}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleFilter;
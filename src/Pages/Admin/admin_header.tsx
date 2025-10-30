import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"

interface AdminHeaderProps {
  activePage: "orders" | "products";
}

export default function AdminHeader({ activePage }: AdminHeaderProps) {
  return (
    <header className="bg-card-light dark:bg-card-dark shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-8">
          <Link
            to="/admin/OrderList"
            className={`${
              activePage === "orders"
                ? "font-bold text-text-light dark:text-text-dark border-b-2 border-primary"
                : "text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark"
            }`}
          >
            จัดการรายการคำสั่งซื้อ
          </Link>

          <Link
            to="/admin/ProductList"
            className={`${
              activePage === "products"
                ? "font-bold text-text-light dark:text-text-dark border-b-2 border-primary"
                : "text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark"
            }`}
          >
            จัดการรายการสินค้า
          </Link>
        </div>

        <div className="flex items-center">
          {/* Home Icon */}
          <li className="relative group cursor-pointer">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-amber-500 transition"
            >
              <FaHome className="w-6 h-6" />
            </Link>
            {/* Dropdown */}
            <ul className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-96">

              <li className="p-2 hover:bg-amber-100 rounded">
                <Link to="/">
                  Homepage
                </Link>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </header>
  );
}

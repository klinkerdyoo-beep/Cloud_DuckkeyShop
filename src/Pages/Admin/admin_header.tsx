import { Link } from "react-router-dom";

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
          <img
            alt="Admin Icon"
            className="h-12 w-12 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bucephala-albeola-010.jpg/500px-Bucephala-albeola-010.jpg"
          />
        </div>
      </div>
    </header>
  );
}

import { Link } from "react-router-dom";

export default function AdminOrderSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold text-white">
        Admin Panel
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        <div
          className="flex items-center px-4 py-2 text-white bg-sky-800 rounded-md"
        >
          <span className="material-icons mr-3">inventory_2</span>
          <span>จัดการรายการคำสั่งซื้อ</span>
          <span className="material-icons ml-auto">expand_less</span>
        </div>

        <div className="pl-4">
          <Link
            to="/admin/OrderList"
            className="block px-4 py-2 mt-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            รายการคำสั่งซื้อหมด
          </Link>
        </div>
      </nav>
    </aside>
  );
}
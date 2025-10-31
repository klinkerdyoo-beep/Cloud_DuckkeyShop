import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import AdminOrderSidebar from "./admin_sidebar_order";
import AdminHeader from "./admin_header";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminOrderList() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ Group orders by order.id
        const grouped = Object.values(
          data.reduce((acc: any, curr: any) => {
            if (!acc[curr.id]) {
              acc[curr.id] = {
                ...curr,
                products: [],
              };
            }
            acc[curr.id].products.push({
              name: curr.productName,
              qty: curr.quantities,
            });
            return acc;
          }, {})
        );
        setOrders(grouped);
      })
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  // ✅ search
  const searchedItems = orders.filter(order =>
    (order.name?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
    (order.email_id?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
    order.products.some((p: any) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    )
  );

  // ✅ status counters
  const pendingCount = orders.filter(order => order.orderStatus === "รอตรวจสอบ").length;
  const approvedCount = orders.filter(order => order.orderStatus === "ตรวจสอบแล้ว").length;
  const rejectedCount = orders.filter(order => order.orderStatus === "ไม่อนุมัติ").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "รอตรวจสอบ":
        return "bg-yellow-400 text-black";
      case "ตรวจสอบแล้ว":
        return "bg-green-500 text-white";
      case "ไม่อนุมัติ":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="flex h-screen">
      <AdminOrderSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader activePage="orders" />

        {/* Main */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background-light dark:bg-background-dark grid-bg">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">
              รายการการโอน
            </h1>

            {/* Summary boxes */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex-1 min-w-[200px] bg-yellow-400 p-4 rounded-lg shadow text-black">
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="flex items-center gap-1">
                  การโอนที่รอตรวจสอบ <span className="material-icons">schedule</span>
                </p>
              </div>
              <div className="flex-1 min-w-[200px] bg-green-500 p-4 rounded-lg shadow text-white">
                <p className="text-2xl font-bold">{approvedCount}</p>
                <p className="flex items-center gap-1">
                  การโอนที่ตรวจสอบแล้ว <span className="material-icons">check_circle</span>
                </p>
              </div>
              <div className="flex-1 min-w-[200px] bg-red-500 p-4 rounded-lg shadow text-white">
                <p className="text-2xl font-bold">{rejectedCount}</p>
                <p className="flex items-center gap-1">
                  การโอนที่ไม่อนุมัติ <span className="material-icons">cancel</span>
                </p>
              </div>
            </div>

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

            {/* Table */}
            <div className="bg-card-light dark:bg-card-dark rounded-lg shadow overflow-hidden">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <th className="p-3">ชื่อบัญชี</th>
                    <th className="p-3">รายการสั่งซื้อ</th>
                    <th className="p-3">สถานะ</th>
                    <th className="p-3">วันที่ทำรายการ</th>
                    <th className="p-3 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {searchedItems.length > 0 ? (
                    searchedItems.map((order: any) => (
                      <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-3">
                          <div className="font-semibold">{order.name}</div>
                          <div className="text-xs text-gray-500">{order.email_id}</div>
                        </td>

                        <td className="p-3">
                          {order.products.map((p: any, index: number) => (
                            <div key={index}>
                              {p.name} ({p.qty})
                            </div>
                          ))}
                        </td>

                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>

                        <td className="p-3 text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleString()}
                        </td>

                        <td className="p-3 text-right">
                          <Link
                            to={`/admin/order/${order.id}`}
                            className="bg-gray-200 text-gray-800 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-300"
                          >
                            จัดการ
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-4 text-gray-500">
                        ไม่พบรายการที่ค้นหา
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

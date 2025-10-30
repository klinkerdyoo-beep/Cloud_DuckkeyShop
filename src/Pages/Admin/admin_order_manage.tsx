import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminOrderSidebar from "./admin_sidebar_order";
import AdminHeader from "./admin_header";
import "./admin.css";

const API_URL = import.meta.env.VITE_API_URL;
import type { OrderFull } from "../../types";

export default function AdminOrderManage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderFull | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/${id}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);
        setStatus(data.status);
      } catch (err) {
        console.error("Error fetching order:", err);
        alert("ไม่สามารถดึงข้อมูลการโอนนี้ได้");
        navigate(-1);
      }
    };
    fetchOrder();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    try {
      const res = await fetch(`${API_URL}/api/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      alert("สถานะถูกอัปเดตเรียบร้อยแล้ว");
    } catch (err) {
      console.error("Error updating order:", err);
      alert("ไม่สามารถอัปเดตสถานะได้");
    }
    navigate("/admin/OrderList");
  };

  if (!order) return <p className="text-center mt-20">กำลังโหลดข้อมูลการโอน...</p>;

  return (
    <div className="flex h-screen">
      <AdminOrderSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader activePage="orders" />

        <main className="flex-1 flex justify-center overflow-x-hidden overflow-y-auto bg-background-light dark:bg-background-dark">
          <div className="container max-w-2xl px-6 py-8">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">
              จัดการข้อมูลการโอน
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div>
                <label className="block mb-1 font-medium">ชื่อผู้สั่งซื้อ</label>
                <input
                  type="text"
                  value={order.name}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">อีเมล</label>
                <input
                  type="text"
                  value={order.email_id}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>

              {/* Order Info */}
              <div>
                <label className="block mb-1 font-medium">รายการสินค้า</label>
                <input
                  type="text"
                  value={`${order.productName} (${order.quantities})`}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">ราคารวม</label>
                <input
                  type="text"
                  value={order.totalPrice}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">วันที่ทำรายการ</label>
                <input
                  type="text"
                  value={new Date(order.orderDate).toLocaleString()}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>

              {/* Editable Status */}
              <div>
                <label className="block mb-1 font-medium">สถานะ</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md dark:bg-card-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="รอตรวจสอบ">รอตรวจสอบ</option>
                  <option value="ตรวจสอบแล้ว">ตรวจสอบแล้ว</option>
                  <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                </select>
              </div>

              {/* Transfer Slip */}
              <div>
                <label className="block mb-1 font-medium">หลักฐานการโอน (transferSlip)</label>
                {order.transferSlip ? (
                  <img
                    src={`${API_URL}${order.transferSlip}`}
                    alt="Transfer Slip"
                    className="mt-3 max-h-80 object-contain rounded-md border"
                  />
                ) : (
                  <p className="text-sm text-gray-500 italic">ไม่มีหลักฐานการโอน</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-sky-800 text-white py-2 px-4 rounded-md hover:bg-sky-600"
                >
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

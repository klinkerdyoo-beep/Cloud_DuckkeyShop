import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminOrderSidebarr from "./admin_sidebar_order";
import AdminHeader from "./admin_header";
import "./admin.css";

// mock
const mockOrder = {
  id: "1",
  customerName: "เพลงจ้า",
  email: "66070059@kmitl.ac.th",
  productName: "Strawberry Hug Toast",
  quantity: "2 ชิ้น",
  totalPrice: "120 บาท",
  transferSlip:
    "https://thunder.in.th/wp-content/uploads/2024/06/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99.webp",
  status: "รอตรวจสอบ",
  orderDate: "2025-05-14 15:34:44",
};

export default function AdminOrderManage() {
  const { id } = useParams(); // /admin/order/:id
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // fetch from backend here
    // fetch(`/api/orders/${id}`).then(res => res.json()).then(data => { ... })
    setOrder(mockOrder);
    setStatus(mockOrder.status);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // send update to backend
    console.log("Updated status:", status);
    alert("สถานะถูกอัปเดตเรียบร้อยแล้ว");
  };

  if (!order) return null;

  return (
    <div className="flex h-screen">
      <AdminOrderSidebarr />

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
                  value={order.customerName}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">อีเมล</label>
                <input
                  type="text"
                  value={order.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                />
              </div>

              {/* Order Info */}
              <div>
                <label className="block mb-1 font-medium">รายการสินค้า</label>
                <input
                  type="text"
                  value={`${order.productName} (${order.quantity})`}
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
                  value={order.orderDate}
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
                    src={order.transferSlip}
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

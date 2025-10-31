import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Narbar from '../components/Narbar';
import Path from '../components/Path';
import bg1 from '../assets/img/bg1.png';
import noImg from "../assets/img/no-img-rec.png";
import type { CartItem } from "../types";

import { useUser } from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

interface Address {
  id: number;
  name: string;
  phone: string;
  province: string;
  district: string;
  subdistrict: string;
  postal_code: string;
  address: string;
  is_default: boolean;
}

export default function Checkout() {
    const { user } = useUser();
    const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [manualAddress, setManualAddress] = useState<Address>({
    id: 0,
    name: "",
    phone: "",
    province: "",
    district: "",
    subdistrict: "",
    postal_code: "",
    address: "",
    is_default: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");

  const location = useLocation();
  const selectedItems: CartItem[] = location.state?.items ?? [];

  // Calculate total
  useEffect(() => {
    const sum = selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantities,
      0
    );
    setTotal(sum);
  }, [selectedItems]);

  // Fetch user addresses
  useEffect(() => {
    fetch(`${API_URL}/api/user/addresses`, { credentials: "include" })
      .then((res) => res.json())
      .then((data: Address[]) => {
        setAddresses(data);
        const defaultAddr = data.find((a) => a.is_default);
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      })
      .catch((err) => console.error("Error fetching addresses:", err));
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddressId(Number(e.target.value));
  };

  const handleManualChange = (field: keyof Address, value: string) => {
    setManualAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmOrder = async () => {
    const addressToUse = selectedAddressId
        ? addresses.find((a) => a.id === selectedAddressId)
        : manualAddress;

    if (!addressToUse) {
        alert("Please fill in or select an address before confirming.");
        return;
    }

    if (!selectedFile) {
        alert("Please upload payment evidence.");
        return;
    }

    try {
        const orderRes = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            orderDate: new Date().toISOString(),
            orderStatus: "รอตรวจสอบ",
            totalPrice: total,
            name: addressToUse.name,
            phone: addressToUse.phone,
            address: `${addressToUse.address}, ${addressToUse.subdistrict}, ${addressToUse.district}, ${addressToUse.province} ${addressToUse.postal_code}`,
            email_id: user?.email,
            parcelStatus: "รอตรวจสอบ",
            items: selectedItems,
        }),
        });

        const orderData = await orderRes.json();

        if (!orderRes.ok) {
        console.error("Order creation failed:", orderData);
        alert(orderData.error || "Failed to create order.");
        return;
        }

        const orderId = orderData.id;
        if (!orderId) {
        console.error("Order ID missing:", orderData);
        alert("Server didn’t return an order ID.");
        return;
        }

        // 2. Upload payment slip
        const formData = new FormData();
        formData.append("transferSlip", selectedFile);
        formData.append("totalPrice", total.toString());
        formData.append("paymentDate", new Date().toISOString());
        formData.append("order_id", orderId.toString());

        const payRes = await fetch(`${API_URL}/api/payment-details`, {
        method: "POST",
        body: formData,
        credentials: "include",
        });

        const payData = await payRes.json();

        if (!payRes.ok) {
        console.error("Payment failed:", payData);
        alert(payData.error || "Failed to upload payment evidence.");
        return;
        }

        alert("Order and payment submitted successfully!");
        navigate("/Cart");
    } catch (err) {
        console.error("Error submitting order:", err);
        alert("Unexpected error submitting order. Please try again.");
    }
    };


  return (
    <div style={{ backgroundImage: `url(${bg1})` }} className="bg-cover bg-fixed bg-center min-h-screen">
      <Path />
      <Narbar />
      <div className="flex w-full p-20 gap-12">
        <div className="bg-white/90 flex-1 ml-5 p-5 rounded-xl shadow-lg">
          {/* Delivery Section */}
          <p className="text-gray-700 text-xl border-b-2 p-2">Delivery</p>
          {addresses.length > 0 && (
            <div className="p-3 border-b-2">
              <h2 className="text-lg font-semibold mb-2">Select Delivery Address</h2>
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`flex items-start gap-3 p-2 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100 ${
                    selectedAddressId === addr.id ? "border-red-600" : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">{addr.name}</p>
                    <p className="text-gray-500 text-sm">(+66) {addr.phone}</p>
                    <p className="text-gray-500 text-sm">
                      {addr.address}, {addr.subdistrict}, {addr.district}, {addr.province} {addr.postal_code}
                    </p>
                  </div>
                </label>
              ))}
              <label className="flex items-center gap-2 mt-3">
                <input
                  type="radio"
                  name="address"
                  value="manual"
                  checked={selectedAddressId === null}
                  onChange={() => setSelectedAddressId(null)}
                />
                <span className="text-sm text-gray-700">Use new address</span>
              </label>
            </div>
          )}

          {selectedAddressId === null && (
            <div className="p-3 mt-4 border-t-2">
              <h2 className="text-lg font-semibold mb-4">Enter New Address</h2>
              {/* Manual Address Inputs */}
              {["name", "phone", "province", "district", "subdistrict", "postal_code", "address"].map((field) => (
                <div key={field} className="p-2">
                  <h2 className="text-sm mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</h2>
                  {field === "address" ? (
                    <textarea
                      rows={3}
                      value={(manualAddress as any)[field]}
                      onChange={(e) => handleManualChange(field as keyof Address, e.target.value)}
                      className="border-2 p-2 rounded text-sm resize-none max-w-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={(manualAddress as any)[field]}
                      onChange={(e) => handleManualChange(field as keyof Address, e.target.value)}
                      className="w-full outline-none px-2 border-2 max-w-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Payment Section */}
          <div className="p-2">
            <h2 className="text-2xl mb-2">Payment</h2>
            <p>เมื่อชำระเงินเสร็จสิ้น โปรดเเนบหลักฐานการชำระเงิน</p>
            <div className="flex flex-row items-center gap-3 mt-2">
              <h2>หลักฐานการชำระเงิน</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-primary file:text-white 
                file:bg-sky-800 hover:file:bg-sky-600 cursor-pointer"
              />
            </div>
            {previewSrc && (
              <img src={previewSrc} alt="Preview" className="mt-3 max-h-64 object-contain rounded-md border" />
            )}
          </div>

          {/* Confirm Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleConfirmOrder}
              className="bg-red-700 text-white px-6 py-2 rounded-xl hover:bg-red-800 transition"
            >
              Confirm Order
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white/90 w-[400px] max-h-max p-5 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold border-b-2 pb-2 mb-4">Your Order</h2>
          {selectedItems.length === 0 ? (
            <p>No items selected.</p>
          ) : (
            selectedItems.map((item) => (
              <div key={item.product_id} className="flex items-center justify-between border-b pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    className="w-16 h-16 object-cover rounded-md"
                    src={item.imgURL ? `${API_URL}${item.imgURL}` : noImg}
                    alt={item.productName}
                  />
                  <div>
                    <p className="font-semibold text-red-700">{item.productName}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantities}</p>
                  </div>
                </div>
                <p className="font-semibold">฿{(item.price * item.quantities).toLocaleString("en-US")}</p>
              </div>
            ))
          )}
          <div className="pt-3 space-y-2">
            <div className="flex justify-between font-semibold text-lg pt-2">
              <p>Total</p>
              <p>฿{total.toLocaleString("en-US")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

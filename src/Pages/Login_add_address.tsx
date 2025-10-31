import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";

import Narbar from '../components/Narbar'
import Path from '../components/Path'
import bg1 from '../assets/img/bg1.png'
import noImg from "../assets/img/no-img-rec.png";
import type { CartItem } from "../types";

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

export default function Shop() {
  const [total, setTotal] = useState(0);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | "new">();
  const [newAddress, setNewAddress] = useState<Address>({
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

  const location = useLocation();
  const selectedItems: CartItem[] = location.state?.items ?? [];

  // Calculate total
  useEffect(() => {
    const sum = selectedItems.reduce((acc, item) => acc + item.price * item.quantities, 0);
    setTotal(sum);
  }, [selectedItems]);

  // Fetch addresses
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

  const selectedAddress =
    selectedAddressId && selectedAddressId !== "new"
      ? addresses.find((a) => a.id === selectedAddressId)
      : null;

  const handleConfirmOrder = () => {
    if (selectedAddressId === "new") {
      console.log("Submitting new address:", newAddress);
      // here you could POST to /api/user/addresses before confirming order
    } else {
      console.log("Using address:", selectedAddress);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg1})` }}
      className="bg-cover bg-fixed bg-center min-h-screen"
    >
      <Path />
      <Narbar />

      <div className="flex w-full p-20 gap-12">
        {/* LEFT SIDE */}
        <div className="bg-white/90 flex-1 ml-5 p-5 rounded-xl shadow-lg">
          <p className="text-gray-700 text-xl border-b-2 p-2 mb-4">Delivery</p>

          {/* Address selection */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">Select Address</label>
            <select
              value={selectedAddressId ?? ""}
              onChange={(e) =>
                setSelectedAddressId(
                  e.target.value === "new" ? "new" : Number(e.target.value)
                )
              }
              className="border p-2 rounded w-full max-w-sm"
            >
              <option value="">-- Select an address --</option>
              {addresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.name} ({addr.phone})
                </option>
              ))}
              <option value="new">+ Enter new address</option>
            </select>
          </div>

          {/* Show existing address if selected */}
          {selectedAddress && (
            <div className="flex border-b-2 p-3 mb-5">
              <div className="flex-1">
                <h2 className="font-semibold">{selectedAddress.name}</h2>
                <p className="text-gray-500">(+66) {selectedAddress.phone}</p>
                <p className="text-gray-500">
                  {selectedAddress.address}, {selectedAddress.subdistrict},{" "}
                  {selectedAddress.district}, {selectedAddress.province}{" "}
                  {selectedAddress.postal_code}
                </p>
              </div>
            </div>
          )}

          {/* New address form */}
          {selectedAddressId === "new" && (
            <div>
              <div className="p-2 mt-5">
                <h2 className="text-sm mb-2">Name</h2>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  className="w-full outline-none px-2 border-2 max-w-sm"
                />
              </div>

              <div className="p-2 mt-5">
                <h2 className="text-sm mb-2">Phone Number</h2>
                <input
                  type="text"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className="w-full outline-none px-2 border-2 max-w-sm"
                />
              </div>

              <div className="mt-5 ml-5 mb-5">
                <h2>Province, District, Subdistrict, Postal Code</h2>
                <div className="flex flex-col gap-4 w-64">
                  {["province", "district", "subdistrict", "postal_code"].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="text-sm text-gray-500">
                        {field.replace("_", " ").toUpperCase()}
                      </label>
                      <input
                        type="text"
                        value={(newAddress as any)[field]}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, [field]: e.target.value })
                        }
                        className="border p-2 rounded text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-5">
                  <label className="text-sm text-black">
                    House Number, Alley, Village, Street
                  </label>
                  <textarea
                    rows={3}
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                    className="border-2 p-2 rounded text-sm resize-none max-w-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact + Payment + Confirm */}
          <div className="p-2">
            <h2 className="text-2xl">Contact</h2>
            <div className="flex flex-col px-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <input id="email" type="text" name="email" className="border-2 max-w-sm" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleConfirmOrder}
              className="bg-red-700 text-white px-6 py-2 rounded-xl hover:bg-red-800 transition"
            >
              Confirm Order
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="bg-white/90 w-[400px] max-h-max p-5 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold border-b-2 pb-2 mb-4">Your Order</h2>
          {selectedItems.length === 0 ? (
            <p>No items selected.</p>
          ) : (
            selectedItems.map((item: any) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between border-b pb-3 mb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-16 h-16 object-cover rounded-md"
                    src={item.imgURL ? `${API_URL}${item.imgURL}` : noImg}
                    alt={item.productName}
                  />
                  <div>
                    <h2 className="text-red-700 font-semibold">
                      {item.productName}
                      {item.customValue && `: ${item.customValue}`}
                    </h2>
                    <p className="text-gray-500 text-sm">Qty: {item.quantities}</p>
                  </div>
                </div>
                <p className="font-semibold">
                  ฿{(item.price * item.quantities).toLocaleString("en-US")}
                </p>
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

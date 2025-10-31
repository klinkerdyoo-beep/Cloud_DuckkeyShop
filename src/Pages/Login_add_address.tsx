import Path from '../components/Path_userAddress';
import Narbar from '../components/Narbar';
import Profile from '../components/Profile';
import bg1 from '../assets/img/bg1.png';
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

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

export default function LoginAddAddress() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>({
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

  useEffect(() => {
    if (!id) return; // no id → add mode, skip fetch

    // Edit mode → fetch existing address
    fetch(`${API_URL}/api/user/addresses/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data: Address) => setAddress(data))
      .catch((err) => console.error("Error fetching address:", err));
  }, [id]);

  const handleSave = async () => {
    try {
      if (id) {
        // EDIT existing address
        const res = await fetch(`${API_URL}/api/user/addresses/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(address),
        });
        if (!res.ok) throw new Error("Failed to update address");
      } else {
        // ADD new address
        const res = await fetch(`${API_URL}/api/user/addresses`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(address),
        });
        if (!res.ok) throw new Error("Failed to create address");
      }

      navigate("/LoginAddress"); // back to address list
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetDefault = async () => {
    if (!id) return; // only for existing addresses
    try {
      const res = await fetch(`${API_URL}/api/user/addresses/${id}/default`, {
        method: "PUT",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to set default");
      setAddress({ ...address, is_default: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='text-black'>
      <div
        style={{ backgroundImage: `url(${bg1})` }}
        className="bg-cover bg-fixed bg-center min-h-screen"
      >
        <Narbar />
        <Path />

        <div className='flex flex-row bg-white/90 '>
          <Profile />
          <div className='flex flex-1 gap-4 justify-center mb-10'>

            <div>
              <div className='p-2 mt-5'>
                <h2 className='text-sm mb-2'>Name</h2>
                <input
                  type="text"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  className='w-full outline-none px-2 border-2 max-w-sm'
                />
              </div>
              <div className='p-2 mt-5'>
                <h2 className='text-sm mb-2'>Phone Number</h2>
                <input
                  type="text"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className='w-full outline-none px-2 border-2 max-w-sm'
                />
              </div>
            </div>

            <div className='p-2 mt-5'>
              <h2>Province, District, Subdistrict, Postal Code</h2>
              <p className='text-gray-500 text-sm'>จังหวัด, เขต/อำเภอ, แขวง/ตำบล, รหัสไปรษณีย์</p>

              <div className="flex flex-col gap-4 w-64">
                {["province", "district", "subdistrict", "postal_code"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-sm text-gray-500">{field.replace("_", " ").toUpperCase()}</label>
                    <input
                      type="text"
                      value={(address as any)[field]}
                      onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                      className="border p-2 rounded text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-5">
                <label className="text-sm text-black">House Number, Alley, Village, Street</label>
                <textarea
                  rows={3}
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  className="border-2 p-2 rounded text-sm resize-none max-w-sm"
                />

                <div className='flex flex-row gap-2 text-sm mt-2'>
                  <button
                    onClick={() => setAddress({ ...address, name: "", phone: "", province: "", district: "", subdistrict: "", postal_code: "", address: "" })}
                    className='rounded-xl border-3 border-red-700 hover:border-red-500 text-red-700 p-2'
                  >
                    Clear Address
                  </button>

                  <button
                    onClick={handleSave}
                    className='rounded-xl text-white bg-green-600 hover:bg-green-700 p-2'
                  >
                    {id ? "Update" : "Add"} Address
                  </button>

                  {id && !address.is_default && (
                    <button
                      onClick={handleSetDefault}
                      className='rounded-xl border-2 border-red-400 text-red-400 p-2'
                    >
                      Set as Default
                    </button>
                  )}

                  <Link to="/LoginAddress"
                    className='rounded-xl border-2 border-gray-400 hover:border-gray-600 text-gray-400 p-2'
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
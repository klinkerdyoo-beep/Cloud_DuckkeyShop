import Path from '../components/Path';
import Narbar from '../components/Narbar';
import Profile from '../components/Profile';
import bg1 from '../assets/img/bg1.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

export default function Login() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const navigate = useNavigate();

  const fetchAddresses = () => {
    fetch(`${API_URL}/api/user/addresses`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data: Address[]) => setAddresses(data))
      .catch((err) => console.error('Error fetching addresses:', err));
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      const res = await fetch(`${API_URL}/api/user/addresses/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete address');

      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="text-black">
      <div
        style={{ backgroundImage: `url(${bg1})` }}
        className="bg-cover bg-fixed bg-center min-h-screen"
      >
        <Narbar />
        <Path />

        <div className="flex flex-row bg-white/90">
          <Profile />

          <div className="flex flex-1 flex-col items-center justify-center mb-10 gap-4 w-full max-w-3xl">

            {/* Add Address Button */}
            <div className="w-full flex justify-center p-4">
              <button
                onClick={() => navigate('/LoginAddAddress')}
                className="px-4 py-2 bg-red-700 text-white rounded-xl hover:bg-red-600 transition"
              >
                + Add Address
              </button>
            </div>

            {addresses.length === 0 && (
              <p className="text-gray-600 text-center mt-10">No addresses found</p>
            )}

            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex flex-col border-b-2 p-4 gap-3 w-full relative"
              >
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="absolute top-2 right-2 text-red-600 font-bold hover:text-red-800"
                >
                  ✕
                </button>

                {/* Info Section */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{addr.name}</h2>
                  <p className="text-gray-500">{addr.phone}</p>
                  <p className="text-gray-500">
                    {addr.address}, {addr.subdistrict}, {addr.district}, {addr.province} {addr.postal_code}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-2">
                  {addr.is_default ? (
                    <span className="px-3 py-1 border-2 border-red-600 text-red-600 rounded-full text-sm font-medium">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch(`${API_URL}/api/user/addresses/${addr.id}/default`, {
                            method: "PUT",
                            credentials: "include",
                          });
                          if (!res.ok) throw new Error("Failed to set default");

                          setAddresses((prev) =>
                            prev.map((a) => ({ ...a, is_default: a.id === addr.id }))
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="px-3 py-1 border-2 border-red-400 text-red-400 rounded-full text-sm font-medium hover:bg-red-50 transition"
                    >
                      Set as Default
                    </button>
                  )}

                  <button className="px-3 py-1 border-2 border-gray-400 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                    <Link to={`/LoginChangeAddress/${addr.id}`}>Edit</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

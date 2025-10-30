import Narbar from '../components/Narbar'
import bg1 from '../assets/img/bg1.png'
import logo from "../assets/img/logo-duckkey.png";
import DuckBig from "../assets/img/duck-big.png";
import { useState } from "react"; 
import axios from "axios";

import { useUser } from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/login`, { email, password }, { withCredentials: true });
      setUser(response.data.user); // update context
      window.location.href = "/"; // redirect
    } catch (err: any) {
      alert("Login failed: " + (err.response?.data?.message ?? err.message));
    }
  };
  
    return (
        <div className='text-black login-font'>
            <div
                style={{ backgroundImage: `url(${bg1})` }}
                className="bg-cover bg-fixed bg-center min-h-screen"
            >
                <Narbar />
                
                {/* *** ปรับปรุง: ใช้ flex-col และ justify-center/items-center เพื่อให้ Log-in Modal อยู่ตรงกลาง *** */}
                <div className='flex flex-col items-center justify-center pt-5 pb-2 mt-20 min-h-[calc(100vh-150px)]'>
                    
                    {/* 1. มาสคอตเป็ดขนาดใหญ่ด้านบน (ต้องอยู่ก่อน Modal เพื่อให้ซ้อนทับได้สวยงาม) */}
                    <div className="mascot-header relative w-[400px] h-[400px] mb-[-11rem] "> 
                        <img 
                            src={DuckBig} 
                            alt="Duckkey Mascot" 
                            className="absolute w-full h-full object-contain drop-shadow-lg" 
                        />
                    </div>

                    {/* 2. กรอบ Log-in หลัก (Modal) */}
                    <div className="login-modal bg-white  sm:p-10 rounded-xl shadow-2xl w-full max-w-sm z-10">
                        
                        {/* โลโก้ Duckkey */}
                        <div className="logo-container text-center mb-6 pt-1">
                            <img src={logo} alt="Duckkey Logo" className="w-[100px] h-auto mx-auto" />
                        </div>
                        
                        {/* ข้อความต้อนรับ */}
                        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
                            Welcome to Duckkey shop
                        </h2>
                        
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="w-full p-3 border-2 border-gray-300  focus:border-red-400 focus:ring-1 focus:ring-red-400 text-lg" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-full p-3 border-2 border-gray-300  focus:border-red-400 focus:ring-1 focus:ring-red-400 text-lg" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            
                            {/* ปุ่ม Log-in สีดำ */}
                            <button 
                                type="submit" 
                                className="w-full py-3 bg-black text-white text-xl font-bold rounded-lg hover:bg-gray-800 transition duration-200 shadow-md"
                            >
                                Log-in
                            </button>
                        </form>
                        
                        {/* ลิงก์ Sign up */}
                        <p className="text-center text-gray-600 text-lg mt-6">
                            Don't have an account? 
                            <a href="/signup" className="text-black font-bold hover:text-red-500">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

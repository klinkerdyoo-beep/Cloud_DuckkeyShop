import Path from '../components/Path'
import Narbar from '../components/Narbar'
import bg1 from '../assets/img/bg1.png'
import logo from "../assets/img/logo-duckkey.png";
import DuckBig from "../assets/img/duck-big.png";
import { useState } from "react"; 

export default function Signup(){
    // 1. จัดการ State สำหรับช่องกรอกข้อมูล (ตามรูปภาพ Sign Up)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [agreed, setAgreed] = useState(false); // สำหรับ Checkbox

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Signup attempt with:', { firstName, lastName, email, password });
        // *** เพิ่ม logic การสมัครสมาชิกที่นี่ ***
    };

    return (
        <div className='text-black login-font'>
            
            <div
                style={{ backgroundImage: `url(${bg1})` }}
                className="bg-cover bg-fixed bg-center min-h-screen"
            >
                <Narbar />
                
                {/* Container หลักสำหรับการจัด Sign Up Modal ให้อยู่กึ่งกลาง */}
                {/* min-h-[calc(100vh-150px)] ถูกปรับใช้เพื่อให้พอดีกับพื้นที่ว่าง */}
                <div className='flex flex-col items-center justify-center pt-5 pb-2 mt-20 min-h-[calc(100vh-150px)]'>
                    
                    {/* 1. มาสคอตเป็ดขนาดใหญ่ด้านบน (ใช้ขนาด w-[400px] h-[400px] ตามที่คุณปรับล่าสุด) */}
                    <div className="mascot-header relative w-[400px] h-[400px] mb-[-11rem] "> 
                        <img 
                            src={DuckBig} 
                            alt="Duckkey Mascot" 
                            className="absolute w-full h-full object-contain drop-shadow-lg" 
                        />
                    </div>

                    {/* 2. กรอบ Sign Up หลัก (Modal) */}
                    <div className="login-modal bg-white  sm:p-10 rounded-xl shadow-2xl w-full max-w-sm z-10">
                        
                        {/* โลโก้ Duckkey */}
                        <div className="logo-container text-center mb-6 pt-1"> {/* เพิ่ม pt-10 เพื่อให้ Log-in Modal ถูกเลื่อนลง */}
                            <img src={logo} alt="Duckkey Logo" className="w-[100px] h-auto mx-auto" />
                        </div>
                        
                        
                        {/* ข้อความต้อนรับ */}
                        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
                            Welcome to Duckkey shop
                        </h2>
                        
                        <form className="space-y-4" onSubmit={handleSubmit}> {/* ปรับ space-y-4 เล็กน้อยให้ช่องกรอกเยอะขึ้น */}
                            
                            {/* ช่องกรอก First Name */}
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="First Name" 
                                    className="w-full p-3 border-2 border-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400 text-lg " 
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            
                            {/* ช่องกรอก Last Name */}
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    className="w-full p-3 border-2 border-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400 text-lg " 
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            
                            {/* ช่องกรอก Email */}
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="w-full p-3 border-2 border-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400 text-lg " 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            {/* ช่องกรอก Password */}
                            <div>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-full p-3 border-2 border-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400 text-lg " 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* <div className="flex items-center pt-2">
                                <input 
                                    id="condition-checkbox"
                                    type="checkbox" 
                                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-red-400" 
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <label htmlFor="condition-checkbox" className="ml-2 text-base text-gray-700">
                                    some condition
                                </label>
                            </div> */}
                            
                            {/* ปุ่ม Sign up สีดำ */}
                            <button 
                                type="submit" 
                                className="w-full py-3 bg-black text-white text-xl font-bold rounded-lg hover:bg-gray-800 transition duration-200 shadow-md mt-6" // เพิ่ม mt-6 ให้ห่างจาก checkbox
                            >
                                Sign up
                            </button>
                        </form>
                        
                        {/* ลิงก์ Log-in */}
                        <p className="text-center text-gray-600 text-lg mt-6">
                            Already have an account? 
                            <a href="/login" className="text-black font-bold hover:text-red-500">
                                Log-in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
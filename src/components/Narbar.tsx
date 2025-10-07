import logo from "../assets/img/logo-duckkey.png"
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <>
    <nav className="flex items-center justify-between flex-row w-full p-4 bg-gradient-to-t from-white to-white/90 fixed top-0 left-0 z-50 rounded-b-2xl" >
        <div className="flex items-center ml-5 gap-2">
            <img src={logo} alt="DuckKey Logo" className="w-23 h-auto" />
            <div className="font-bold">
                <h2 className="text-2xl">Duckkey</h2>
                <h2 className="text-2xl">Shop</h2>                
            </div>

        </div>
        <div className="flex items-center ">
            <div className="flex max-w-md items-center rounded-2xl bg-amber-200 px-4 py-2 shadow-md">
                <input 
                    type="text" 
                    placeholder="Search....."
                    className="w-full outline-none px-2 text-gray-950"
                    name=" " id="" />
                <button className="ml-2 rounded-2xl bg-amber-950 px-4 py-2 text-white hover:bg-blue-400"></button>
            </div>
            <ul className="flex flex-row max-w-lg gap-6">
                <li className="p-4"><Link to='/'>Home</Link></li>
                <li className="p-4"><Link to='/Shop'>Shop all</Link></li>
                <li className="p-4 relative cursor-pointer group">Contact
                      <ul className="absolute left-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-96">
                        <li className="p-2 hover:bg-amber-100 rounded">Email</li>
                        <li className="p-2 hover:bg-amber-100 rounded">Phone</li>
                        <li className="p-2 hover:bg-amber-100 rounded">Address</li>
                    </ul>
                </li>
            </ul>
            <div>
                <Link to='/Cart' className="text-gray-600 hover:text-amber-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                </Link>
            </div>
            <div>
                <Link to='/LoginAddress' className="text-gray-600 hover:text-amber-500 transition-colors">
                    {/* SVG Icon: User */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </Link>                
            </div>

        </div>
    </nav>
    </>
  );
}
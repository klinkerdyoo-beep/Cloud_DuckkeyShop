import { useState } from "react";
import { Link } from 'react-router-dom'


export default function Profile(){
    const [open, setOpen] = useState(false);

    return (
        <div 
        onClick={() => setOpen(!open)}
        className={` bg-amber-400 transition-all duration-500 cursor-pointer overflow-hidden
        ${open ?"w-64 p-4 max-h-max " : "py-10 w-10 h-40 p-2"} rounded-r-2xl shadow-lg flex flex-col items-center`}>
            <h2
                className={`font-medium inline-block transition-all duration-500 origin-left
                     ${open ? "text-lg rotate-0 mb-2": "text-sm ml-12 mt-9 rotate-90"}`
                }>Profile</h2>

            {open  && (
<div className="mt-2 w-full flex flex-col gap-2">

  <h3 className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 border-b-1 hover:text-gray-600 relative pb-1.5 
    before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-gray-600 before:w-0 
    hover:before:w-full before:transition-all before:duration-300">
        <Link to='/LoginAccount'> Account & Security</Link>
  </h3>

  <h3 className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 border-b-1 hover:text-gray-600 relative pb-1.5 
    before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-gray-600 before:w-0 
    hover:before:w-full before:transition-all before:duration-300">
        <Link to='/LoginAddress'>My Addresses</Link>
  </h3>

  <h3 className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 border-b-1 hover:text-gray-600 relative pb-1.5 
    before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-gray-600 before:w-0 
    hover:before:w-full before:transition-all before:duration-300">
     <Link to='/LoginOrderHistory'>Order History</Link>
  </h3>

</div>
            )}

        </div>
    );
}
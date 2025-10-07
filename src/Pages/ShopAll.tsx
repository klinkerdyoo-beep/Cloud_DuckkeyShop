import { useState } from "react";
import {Link} from 'react-router-dom'
import Narbar from '../components/Narbar';
import Filter from '../components/Filter';
import Path from '../components/Path';
import bg1 from '../assets/img/bg1.png';
import product1  from '../assets/img/Strawberry_Hug_Toast.jpg'

export default function Shop() {
//   const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div
      style={{ backgroundImage: `url(${bg1})` }}
      className="bg-cover bg-fixed bg-center min-h-screen"
    >
      <Narbar />
      <Path />

      <div className="p-10 py-10 justify-center bg-white/90 items-center w-full text-center">
        <h1>Art Shop</h1>
        <p>
          Explore original paintings, sculptures, and handcrafted art pieces for your collection.
        </p>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {/* <Filter open={filterOpen} setOpen={setFilterOpen} /> */}
            <Filter/>            


        {/* เนื้อหาหลัก */}
        <div
          className="transition-all duration-500 flex-1 p-4"
        >
          <h1 className="text-2xl font-bold mb-4">Shop</h1>
          <p className="mb-6">Explore unique artworks and handcrafted pieces.</p>

          <div className="grid grid-cols-3 gap-3 px-10">
            {/* product */}
            <div className='box items-center shadow-4xl bg-white p-5 rounded-3xl max-w-sm  max-h-max group'>
                <img className='mx-auto w-60 object-cover' src={product1 } alt="" />
                <h2 className='text-black m-5 text-xl text-center '>Strawberry Hug Toast</h2>
                <div className="max-h-0 overflow-hidden transition-all duration-1000 group-hover:max-h-96 w-full">
                    <div className="border-2 mt-2 mb-2"></div>
                    <p className='text-black text-sm'>Build a little sweetness into your day with the Strawberry Jam Toast Coaster!
                                                This adorable ที่รองแก้วน้ำ brings a slice of happiness to your desk, dining table, or cozy coffee corner. Designed as a cute ขนมปังทาแยมสตรอว์เบอร์รี </p>
                </div>
                <div className="max-h-0 overflow-hidden transition-all duration-1100 group-hover:max-h-96 w-full">
                    <div className="border-2 mt-2 mb-2 border-gray-500"></div>
                    <p className='text-black text-sm'>price 50 bath</p>
                </div>
                <div className="max-h-0 overflow-hidden transition-all duration-1200 group-hover:max-h-96 w-full text-right">
                    <div className="border-2 mt-2 mb-2 border-gray-500"></div>
                    <p className='text-black text-sm'>see more details</p>
                </div>
            </div>
            {/* product */}
                        <div className='box items-center shadow-4xl bg-white p-5 rounded-3xl max-w-sm max-h-max group'>
                <img className='mx-auto w-60 object-cover' src={product1 } alt="" />
                <h2 className='text-black m-5 text-xl text-center '>Strawberry Hug Toast</h2>
                <div className="max-h-0 overflow-hidden transition-all duration-1000 group-hover:max-h-96 w-full">
                    <div className="border-2 mt-2 mb-2"></div>
                    <p className='text-black text-sm'>Build a little sweetness into your day with the Strawberry Jam Toast Coaster!
                                                This adorable ที่รองแก้วน้ำ brings a slice of happiness to your desk, dining table, or cozy coffee corner. Designed as a cute ขนมปังทาแยมสตรอว์เบอร์รี </p>
                </div>
                <div className="max-h-0 overflow-hidden transition-all duration-1100 group-hover:max-h-96 w-full">
                    <div className="border-2 mt-2 mb-2 border-gray-500"></div>
                    <p className='text-black text-sm'>price 50 bath</p>
                </div>
                <div className="max-h-0 overflow-hidden transition-all duration-1200 group-hover:max-h-96 w-full text-right">
                    <div className="border-2 mt-2 mb-2 border-gray-500"></div>
                    <p className='text-black text-sm'>see more details</p>
                </div>
            </div>

            <div className="bg-amber-100 p-4 rounded-lg shadow">Artwork 2</div>
            <div className="bg-amber-100 p-4 rounded-lg sha dow">Artwork 3</div>
            <div className="bg-amber-100 p-4 rounded-lg shadow">Artwork 4</div>
            <div className="bg-amber-100 p-4 rounded-lg shadow">Artwork 5</div>
            <div className="bg-amber-100 p-4 rounded-lg shadow">Artwork 6</div>
          </div>
        </div>
      </div>
    </div>
  );
}

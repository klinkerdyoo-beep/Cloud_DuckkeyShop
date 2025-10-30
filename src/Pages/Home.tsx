
import { useEffect, useState } from "react";
import Narbar from '../components/Narbar'
import img1 from '../assets/img/img1-2.png'
import bg1 from '../assets/img/bg1.png'
import Strawberry from '../assets/img/Strawberry_Hug_Toast.jpg'
import Path from '../components/Path'


import '../App.css'
import { Link } from 'react-router-dom'

interface Category {
  id: number;
  categoryName: string;
}

import type { Product } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
// fetch(`${API_URL}/api/products/`)

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    fetch(`${API_URL}/api/products/`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

    return (
        <div
            style={{ backgroundImage: `url(${bg1})` }}
            className="bg-cover bg-fixed bg-center min-h-screen"
          >
          <Path/>
      
          <Narbar/>
          
          <div className='relative flex justify-center items-center h-auto bg-gray-100'>
            <img className='w-full h-full object-cover' src={img1} alt="" />
            
            <div className='absolute text-center mb-100'>
              <h2 className=' mb-2 text-5xl font-bold border-8  p-2 bg-red-700/80 text-white'> Welcome to</h2>
              <h2 className=' mb-30 text-9xl font-bold text-white' > Duckkey</h2>
              <button  className=' mb-2 text-5xl font-bold p-2 rounded-2xl shadow-2xl bg-white text-red-700'>Shop Now!!</button>
            </div>
          </div>

      {/* Categories */}
      <div className="p-10 mt-11 mb-6 bg-white">
        <h2 className="ml-5 text-2xl font-bold">Categories of my work</h2>
        <div className="mt-3 mb-6 border border-dashed border-gray-700 rounded-2xl"></div>
        <div className="flex flex-wrap justify-center w-full gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/Product?category=${encodeURIComponent(cat.id)}`}
              className="p-5 bg-amber-200 border-2 rounded-2xl shadow hover:bg-amber-300 transition"
            >
              {cat.categoryName}
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="flex items-center bg-white p-10">
        <h2 className="text-3xl font-bold text-black">Recommended Product</h2>
        <div className="m-7 h-40 border-l-4 border-gray-500"></div>
        <div className="flex">
          <Link to="/Product" className="hover:text-amber-500 transition">
            See all products
          </Link>
        </div>
      </div>

      {/* Card ต่อจากรูป */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/90">
        {products.map((prod) => (
          <div
            key={prod.productID}
            className="relative w-full h-[500px] max-w-sm mx-auto card"
          >
            <div className="card-side front shadow-lg bg-white border-blue-500 border-20 rounded-3xl overflow-hidden">
              <div className="h-auto">
                <img
                  src={`${API_URL}${prod.imgURL || ""}`}
                  alt={prod.productName}
                  className="object-cover w-full h-60"
                />
              </div>
              <h2 className="text-black m-5 text-xl text-center">
                {prod.productName}
              </h2>
              <p className="text-center text-gray-700">{prod.price} ฿</p>
            </div>
            <div className='card-side back box shadow-4xl bg-white border-blue-500 border-20  rounded-3xl max-w-sm'>
              <h2 className='text-black m-5 text-xl text-center '>
                {prod.productName}
              </h2>
              <p className='text-black'>
                {prod.description}
              </p>
              <br></br>
              <div className='button bg-amber-200 border-2 rounded-2xl p-1 max-w-max'>
                <Link
                  to={`/product/${prod.productID}`}
                >
                  Detail
                </Link>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
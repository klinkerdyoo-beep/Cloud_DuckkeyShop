
import { useEffect, useState } from "react";
import Narbar from './Narbar'
import img1 from '../assets/img/img1-2.png'
import bg1 from '../assets/img/bg1.png'
import Path from './Path'


import '../App.css'
import { Link } from 'react-router-dom'

import type { Product } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
// fetch(`${API_URL}/api/products/`)

export default function RandomProds() {
//   const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    fetch(`${API_URL}/api/products/`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

    return (
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
              <div className="text-center mt-3">
                <Link
                  to={`/product/${prod.productID}`}
                  className="bg-amber-300 px-4 py-2 rounded-lg"
                >
                  Detail
                </Link>
              </div>
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
  );
}
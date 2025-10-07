import Path from '../components/Path'
import Narbar from '../components/Narbar'
import bg1 from '../assets/img/bg1.png'
import Strawberry from '../assets/img/Strawberry_Hug_Toast.jpg'
import {Link} from 'react-router-dom'
export default function Login(){

    return (
        <div className='text-black'>
            <div
            style={{ backgroundImage: `url(${bg1})` }}
            className="bg-cover bg-fixed bg-center min-h-screen"
            >
                <Narbar />
                <Path />
                <div className='flex justify-center h-full text-black'>
                    <div className='grid grid-cols-2 gap-4 bg-white/90 px-10'>
                        <div className='w-90'>
                            <img src={Strawberry} alt="" />
                        </div>  
                        <div>
                            <h2 className=' m-5 text-2xl text-center'>Strawberry Hug Toast</h2>
                            <h2 className='text-red-800 text-xl'>444 bath</h2>
                            <h3 className='mt-2'>Quantity</h3>
                            <div>
                                <div className='p-5 border-1'></div>
                            </div>
                            <button className=' mt-3 p-3 rounded-xl bg-red-800 text-sm text-white'>Add to cart</button>
                            <p className='mt-3 text-black max-w-sm'>Build a little sweetness into your day with the Strawberry Jam Toast Coaster!
                                This adorable ที่รองแก้วน้ำ brings a slice of happiness to your desk, dining table, or cozy coffee corner. Designed as a cute ขนมปังทาแยมสตรอว์เบอร์รี </p>
                            <h3 className='mt-2 font-bold text-red-800'>Approximate size: </h3>
                            <h3 className='mt-2 font-bold text-red-800'>Material: </h3>

                        </div>                  
                    </div>

                </div>

                <div className="p-10 py-10 justify-center bg-white/90 items-center w-full text-center">
                    <h1>Art Shop</h1>
                    <p>
                    Explore original paintings, sculptures, and handcrafted art pieces for your collection.
                    </p>

                </div>
                <div className=" p-5 py-5 grid grid-cols-3 justify-center bg-white">
                    <div className='card relative w-full h-[400px] max-w-sm mx-auto'>
                        <div className='card-side front box shadow-4xl bg-white border-blue-500 border-20  rounded-3xl overflow-hidden'>
                        <div className='h-auto'><img src={Strawberry} alt="" /></div>
                        </div>
                            
                        <div className='card-side back box shadow-4xl bg-white border-blue-500 border-20  rounded-3xl max-w-sm overflow-scroll'>
                        <h2 className='text-black m-5 text-xl text-center '>Strawberry Hug Toast</h2>
                        <p className='text-black'>Build a little sweetness into your day with the Strawberry Jam Toast Coaster!
                                                    This adorable ที่รองแก้วน้ำ brings a slice of happiness to your desk, dining table, or cozy coffee corner. Designed as a cute ขนมปังทาแยมสตรอว์เบอร์รี </p>
                        <div className='button bg-amber-200 border-2 rounded-2xl p-1 max-w-max'><Link to='/Product'>detail</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );

} 
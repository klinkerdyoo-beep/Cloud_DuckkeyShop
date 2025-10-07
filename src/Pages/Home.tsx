
import Narbar from '../components/Narbar'
import img1 from '../assets/img/img1-2.png'
import bg1 from '../assets/img/bg1.png'
import Strawberry from '../assets/img/Strawberry_Hug_Toast.jpg'
import Path from '../components/Path'


import '../App.css'
import { Link } from 'react-router-dom'



  function App() {

    return (
      <>
        <div
            style={{ backgroundImage: `url(${bg1})` }}
            className="bg-cover bg-fixed bg-center min-h-screen"
          >
          <Path/>
      
          <Narbar/>
          
          <div className='relative flex justify-center items-center h-auto bg-gray-100'>
            <img className='w-full h-full object-cover' src={img1} alt="" />
            
            <div className='absolute text-center mb-100'>
              <h2 className=' mb-2 text-5xl font-bold border-8  p-2 bg-red-700/80 text-white'> Wecome to</h2>
              <h2 className=' mb-30 text-9xl font-bold text-white' > Duckkey</h2>
              <button  className=' mb-2 text-5xl font-bold p-2 rounded-2xl shadow-2xl bg-white text-red-700'>Shop Now!!</button>
            </div>
          </div>

    {/* Card ต่อจากรูป */}
        <div className='p-10 mt-11 mb-6 bg-white'>
          <h2 className='ml-5'>Category of my work</h2>
          <div className='mt-3 mb-15 border-1 border-dashed border-gray-700 rounded-2xl'></div>
          <div className='flex justify-center w-full gap-6'>
            <div className='p-5 bg-amber-200 border-2 rounded-2xl'>Sculpture</div>
            <div className='p-5 bg-amber-200 border-2 rounded-2xl'>Drawing</div>
            <div className='p-5 bg-amber-200 border-2 rounded-2xl'>Keycap</div>
          </div>
        </div>
            <div className='flex items-center bg-white p-10'>
              <h2 className="text-3xl font-bold text-black">Welcome to Duckkey</h2>
              <div className="m-7 h-40 border-l-4 border-gray-500"></div>
              <div className='flex'>
                <p className='text-black'>asdfjajefoijefojjfpka fkekfka kfkewfkokf</p>
              </div>
            </div>
            
        <div className=" p-10 py-10 grid grid-cols-3 justify-center bg-white/90">
          <div className='card relative w-full h-[500px] max-w-sm mx-auto'>
            <div className='card-side front box shadow-4xl bg-white border-blue-500 border-20  rounded-3xl overflow-hidden'>
              <div className='h-auto'><img src={Strawberry} alt="" /></div>
              <h2 className='text-black m-5 text-xl text-center '>Strawberry Hug Toast</h2>
            </div>
                  
            <div className='card-side back box shadow-4xl bg-white border-blue-500 border-20  rounded-3xl max-w-sm'>
              <h2 className='text-black m-5 text-xl text-center '>Strawberry Hug Toast</h2>
              <p className='text-black'>Build a little sweetness into your day with the Strawberry Jam Toast Coaster!
                                          This adorable ที่รองแก้วน้ำ brings a slice of happiness to your desk, dining table, or cozy coffee corner. Designed as a cute ขนมปังทาแยมสตรอว์เบอร์รี </p>
              <div className='button bg-amber-200 border-2 rounded-2xl p-1 max-w-max'><Link to='/Product'>detail</Link></div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }

export default App

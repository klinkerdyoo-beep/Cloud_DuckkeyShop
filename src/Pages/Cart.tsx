
import Narbar from '../components/Narbar'
import Path from '../components/Path'
import bg1 from '../assets/img/bg1.png'
import Strawberry from '../assets/img/Strawberry_Hug_Toast.jpg'
import { Link } from 'react-router-dom'

export default function Shop(){

    return (
      <>
        <div
            style={{ backgroundImage: `url(${bg1})` }}
            className="bg-cover bg-fixed bg-center min-h-screen"
          >
          <Path/>   
          <Narbar/>
        <div className="p-10 py-10 justify-center bg-white/90 items-center w-full text-center">
            <h1>Your Car</h1>
            <p>Explore original paintings, sculptures, and handcrafted art pieces for your collection.</p>
        </div>
          <div className='p-20 '> 
            <div className='flex bg-white/90  border-b p-5 items-center justify-center gap-5 rounded-2xl'>
              <input type="checkbox" className='mr-3' />
              <img  className="w-30 object-cover border" src={Strawberry} alt="" /> 
              <div className='flex-1'>
                <h2 className='text-red-700'>Strawberry_Hug_Toast</h2>
                <p className='text-gray-700'>฿250</p>

              </div>
              
              <div className='flex gap-2 items-center'>
                <button className='text-black text-2xl rounded-xl border-2 px-2 border-gray-700'>-</button>
                <p className='text-black'>2</p>
                <button className='text-black text-2xl rounded-xl border-2 px-2 border-gray-700'>+</button>
              </div>

            </div>
          </div>
          <div className='p-20 flex bg-white/90'>
            <div className='flex-1'>
              <p className='text-gray-700'>Total</p>
              <h2 className='text-red-500'>฿250</h2>
            </div>
            <div className='button flex p-2  bg-red-700 items-center  rounded-2xl text-white'><Link to='/Checkout'>Checkout</Link></div>
          </div>
          <div className='bg-white/90 '>
            <div className='button p-5 text-xl text-red-600'><Link to='/Shop'>Update Cart</Link></div>
          </div>
          

      </div>
      </>
    )

} 
import Path from '../components/Path'
import Narbar from '../components/Narbar'
import Profile from '../components/Profile';
import bg1 from '../assets/img/bg1.png'

export default function Account(){

    return (
        <div className='text-black'>
            <div
            style={{ backgroundImage: `url(${bg1})` }}
            className="bg-cover bg-fixed bg-center min-h-screen"
            >
            <Narbar />
            <Path />
            

            <div className='flex flex-row bg-white/90 '>
                <Profile/>
                <div className='flex flex-1 flex-col  items-center gap-4 justify-center mb-10'>
                    <div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Name for accout</h2>
                            <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Name</h2>
                            <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Phon Number</h2>
                            <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Email</h2>
                            <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Chage Password</h2>
                            <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>                                
                    </div>
                    <div className='flex justify-end'>
                        <button className="  px-3 py-1 border-2 border-gray-400 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                            Edit
                        </button>
                    </div>
                </div>
                
            </div>


            </div>
        </div>
  );

} 
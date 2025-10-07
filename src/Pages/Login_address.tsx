import Path from '../components/Path'
import Narbar from '../components/Narbar'
import Profile from '../components/Profile';
import bg1 from '../assets/img/bg1.png'
import { Link } from 'react-router-dom';
export default function Login(){

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
                <div className='flex flex-1 flex-col items-center justify-center mb-10'>

                    <div className="flex flex-col border-b-2 p-4 gap-3">
                    {/* Info Section */}
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Klin Kerdyoo</h2>
                            <p className="text-gray-500">(+66) 065-504-7562</p>
                            <p className="text-gray-500">
                            12/5 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand
                            </p>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-2">
                            <span className="px-3 py-1 border-2 border-red-600 text-red-600 rounded-full text-sm font-medium">
                            Default
                            </span>
                            <button className="px-3 py-1 border-2 border-gray-400 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                            <Link to='/LoginChageAddress'>Edit</Link>
                            </button>
                        </div>
                    </div>

                    
                    <div className="flex flex-col border-b-2 p-4 gap-3">
                    {/* Info Section */}
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Klin Kerdyoo</h2>
                            <p className="text-gray-500">(+66) 065-504-7562</p>
                            <p className="text-gray-500">
                            12/5 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand
                            </p>
                        </div>
                    {/* Actions */}
                        <div className="flex items-center gap-3 mt-2">
                            <span className="px-3 py-1 border-2 border-red-400 text-red-4   00 rounded-full text-sm font-medium">
                            Set as Default
                            </span>
                            <button className="px-3 py-1 border-2 border-gray-400 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                            <Link to='/LoginChageAddress'>Edit</Link>
                            </button>
                        </div>
                    </div>

                </div>
                
            </div>


            </div>
        </div>
  );

} 
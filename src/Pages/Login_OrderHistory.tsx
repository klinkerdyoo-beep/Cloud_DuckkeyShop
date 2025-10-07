import Path from '../components/Path'
import Narbar from '../components/Narbar'
import Profile from '../components/Profile';
import bg1 from '../assets/img/bg1.png'
import Strawberry from '../assets/img/Strawberry_Hug_Toast.jpg'


function Tap(){
    return (
        <div className='flex gap-5 text-gray-600'>
            <h2 className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 hover:text-red-600 relative pb-1.5
                before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-red-600
                before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300">
                All</h2>
            <h2 className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 hover:text-red-600 relative pb-1.5
                before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-red-600
                before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300">
                    รอตรวจสอบ</h2>
            <h2 className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 hover:text-red-600 relative pb-1.5
                before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-red-600
                before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300">
                    ที่ต้องได้รับ</h2>
            <h2 className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 hover:text-red-600 relative pb-1.5
                before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-red-600
                before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300">
                    สำเร็จเเล้ว</h2>
            <h2 className="text-lg font-medium mb-2 cursor-pointer transition-all duration-200 hover:text-red-600 relative pb-1.5
                before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-red-600
                before:scale-x-0 hover:before:scale-x-100 before:origin-center before:transition-transform before:duration-300">
                    ยกเลิก</h2>

        </div>
    )

}

export default function OrderHistory(){

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
                    <Tap/>
                    <div className='p-20 '> 
                        <div className='flex bg-white/90  border-b p-5 items-center justify-center gap-5 rounded-2xl'>
                            <img  className="w-30 object-cover border" src={Strawberry} alt="" /> 
                            <div className='flex-1'>
                                <h2 className='text-red-700'>Strawberry_Hug_Toast</h2>
                                <p className='text-gray-700'>฿250</p>

                            </div>
                        

                        </div>
                    </div>
                </div>
                
            </div>

            </div>
        </div>
  );

} 
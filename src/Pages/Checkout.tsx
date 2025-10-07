
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
        <div className='flex w-full p-20'>
            <div className='bg-white/90 ml-5'>
                <p className='text-gray-700 text-xl border-b-2 p-2'>Delivery</p>
                <div className='flex border-b-2 p-3'>
                    <div className='flex-1'>
                        <h2 className=''>klin kerdyoo</h2>
                        <p className='text-gray-500'>|(+66) 065-504-7562</p>
                                            <p className='text-gray-500'>12/5 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand</p>
                    </div>
                    <div>
                        <p>&gt;</p>
                    </div>
                </div>
                <div>
                    <div className='p-2 mt-5'>
                        <h2 className='text-sm mb-2'>Name</h2>
                        <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                    </div>
                    <div className='p-2 mt-5'>
                        <h2 className='text-sm mb-2'>Phone Number</h2>
                        <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                    </div>
                    <div className='mt-5 ml-5 mb-5'>
                        <h2>Province, District, Subdistrict, Postal Code</h2>
                        <p className='text-gray-500 text-sm'>จังหวัด, เขต/อำเภอ, เเขวง/ตำบล, รหัสไปรษณีย์</p>
                        <div className="flex flex-col gap-4 w-64">
                            {/* Province */}
                            <div className="flex flex-col">
                                <label htmlFor="province" className="text-sm text-gray-500">Province</label>
                                <select id="province" name="province" className="border p-2 rounded text-sm">
                                <option value="">-- Select Province --</option>
                                <option value="bangkok">Bangkok</option>
                                <option value="chiangmai">Chiang Mai</option>
                                <option value="chonburi">Chonburi</option>
                                <option value="phuket">Phuket</option>
                                </select>
                            </div>

                            {/* District */}
                            <div className="flex flex-col">
                                <label htmlFor="district" className="text-sm text-gray-500">District</label>
                                <select id="district" name="district" className="border p-2 rounded text-sm">
                                <option value="">-- Select District --</option>
                                <option value="latphrao">Lat Phrao</option>
                                <option value="huaykwang">Huai Khwang</option>
                                <option value="banglamung">Bang Lamung</option>
                                <option value="mueangphuket">Mueang Phuket</option>
                                </select>
                            </div>

                            {/* Subdistrict */}
                            <div className="flex flex-col">
                                <label htmlFor="subdistrict" className="text-sm text-gray-500">Subdistrict</label>
                                <select id="subdistrict" name="subdistrict" className="border p-2 rounded text-sm">
                                <option value="">-- Select Subdistrict --</option>
                                <option value="sub1">Subdistrict 1</option>
                                <option value="sub2">Subdistrict 2</option>
                                <option value="sub3">Subdistrict 3</option>
                                <option value="sub4">Subdistrict 4</option>
                                </select>
                            </div>

                            {/* Postal Code */}
                            <div className="flex flex-col">
                                <label htmlFor="postal" className="text-sm text-gray-500">Postal Code</label>
                                <input
                                id="postal"
                                name="postal"
                                type="text"
                                placeholder="Enter Postal Code"
                                className="border p-2 rounded text-sm"
                                />
                            </div>            
                        </div>
                        <div className="flex flex-col gap-2 mt-5">
                            <label htmlFor="address" className="text-sm text-black">
                                House Number, Alley, Village, Street
                            </label>
                            <textarea
                                id="address" name="address" rows={3}
                                placeholder="Enter house number, alley, village, street"
                                className="border-2 p-2 rounded text-sm resize-none max-w-sm"
                            />
                            <div className='flex flex-row gap-2 text-sm mt-2'>
                                <div className='button rounded-xl border-3 border-red-700 text-red-700 p-2'>Cler Address</div>
                                <div className='button rounded-xl text-white bg-red-700 p-2'>Comfirm</div>                                
                            </div>

                        </div>
                    </div>
                    <div className='p-2'>
                        <h2 className='text-2xl'>Contact</h2>
                        <div className='flex flex-col  px-2'>
                            <label htmlFor='email' className='text-sm'>Email</label>
                            <input id='email' type="text" name="email" className='border-2 max-w-sm' />
                        </div>
                    </div>
                    <div className='p-2'>
                        <h2 className='text-2xl'>Payment</h2>
                        <div className='flex flex-col px-2 justify-center'>
                            <div>
                                <img src="" alt="" />
                                <p>069-5-54354-5</p>
                            </div>
                            <img src="" alt="" />
                            <p>เมื่อชำระเงินเสร็จสิ้น โปรดเเนบหลักฐานการชำระเงิน ภายในเวลา</p>
                            <h2>20:00</h2>
                            <div className='flex flex-row'>
                                <h2>หลักฐานการชำระเงิน</h2>
                                <input type="text" />
                                {/* input เอาไว้เเนบ file */}

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h2>Remember me</h2>
                        <div className='flex flex-row p-2'>
                            <input type="checkbox" className='mr-3' />
                            <p className='text-sm text-gray-500'>Save my information for a faster checkout with a Shop accout</p>                            
                        </div>

                    </div>
                    <div className=''>Confirm</div>
                </div>
            </div>

        </div> 
          

      </div>
      </>
    )

} 
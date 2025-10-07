import Path from '../components/Path'
import Narbar from '../components/Narbar'
import Profile from '../components/Profile';
import bg1 from '../assets/img/bg1.png'
import { useEffect, useState } from "react";

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
                <div className='flex flex-1  gap-4 justify-center mb-10'>
                    <div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Name</h2>
                            <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Phon Number</h2>
                            <input type="text" className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>                        
                    </div>

                    <div className='p-2 mt-5'>
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

                </div>
                
            </div>


            </div>
        </div>
  );

} 
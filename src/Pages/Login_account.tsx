import Path from '../components/Path'
import Narbar from '../components/Narbar'
import Profile from '../components/Profile';
import bg1 from '../assets/img/bg1.png'
import React, { useState } from 'react';

export default function Account(){
  const [editMode, setEditMode] = useState(false);
  const [showChange, setShowChange] = useState(false);

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
                            <input type="text" disabled={!editMode} className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Name</h2>
                            <input type="text" disabled={!editMode} className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Phon Number</h2>
                            <input type="text" disabled={!editMode} className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>
                        <div className='p-2 mt-5'>
                            <h2 className='text-sm mb-2'>Email</h2>
                            <input type="text" disabled={!editMode} className='w-full outline-none px-2 border-2 max-w-sm' />
                        </div>

              {/* Password Section */}
              <div className="">
                <div className='p-2 mt-5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-sm mb-2'>Current Password</h2>   
                        {editMode && (
                            <button
                            onClick={() => setShowChange(!showChange)}
                            className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition whitespace-nowrap"
                            >
                            Change?
                            </button>
                        )}                     
                    </div>

                    <input type="text" disabled={!editMode} className='w-full outline-none px-2 border-2 max-w-sm' />
                </div>  

                {/* Button show only in edit mode */}
                {/* {editMode && (
                    <button
                    onClick={() => setShowChange(!showChange)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition whitespace-nowrap"
                    >
                    Change?
                    </button>
                )} */}
              </div>

              {/* New Password & Confirm Password */}
              {showChange && editMode && (
                <>
                <div className='p-2 mt-5'>
                    <h2 className='text-sm mb-2'>New Password</h2>
                    <input type="text" disabled={!editMode} className='w-full outline-none px-2 border-2 max-w-sm' />
                </div>  
                <div className='p-2 mt-5'>
                    <h2 className='text-sm mb-2'>Confirm New Password</h2>
                    <input type="text" disabled={!editMode} className='w-full outline-none px-2 border-2 max-w-sm' />
                </div>  
                </>
              )}
            </div>

   
{/* Edit / Save / Cancel Buttons */}
<div className="flex justify-end space-x-2">
  {editMode ? (
    <>
      <button
        onClick={() => {
          setEditMode(false);
          setShowChange(false);
          // ถ้ามีฟังก์ชัน save ให้ใส่ไว้ตรงนี้ เช่น saveData();
        }}
        className="px-4 py-2 border-2 rounded-full text-sm font-medium border-green-500 text-green-600 hover:bg-green-50 transition"
      >
        Save
      </button>

      <button
        onClick={() => {
          setEditMode(false);
          setShowChange(false);
          // ถ้ามีค่าที่ต้องรีเซ็ตกลับ ให้เพิ่มฟังก์ชัน resetData() ตรงนี้
        }}
        className="px-4 py-2 border-2 rounded-full text-sm font-medium border-red-500 text-red-600 hover:bg-red-50 transition"
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      onClick={() => setEditMode(true)}
      className="px-4 py-2 border-2 rounded-full text-sm font-medium border-gray-400 text-gray-600 hover:bg-gray-100 transition"
    >
      Edit
    </button>
  )}
</div>

                </div>
                
            </div>


            </div>
        </div>
  );

} 
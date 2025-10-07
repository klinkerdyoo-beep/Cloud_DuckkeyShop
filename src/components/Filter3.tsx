import React, { useState } from 'react';

const CollapsibleFilter = () => {
  // ตั้งค่าเริ่มต้นให้ปิดอยู่
  const [isOpen, setIsOpen] = useState(false); 

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  
  // 1. กำหนดความกว้างหลัก (Main Container Width)
  // ตอนปิด: 'w-12' (ประมาณ 48px) พอดีสำหรับข้อความแนวตั้งและไอคอน
  // ตอนเปิด: 'max-w-xs' (320px) สำหรับเนื้อหา
  const mainWidthClass = isOpen ? 'max-w-xs' : 'w-12'; 
  
  // 2. ควบคุมการแสดงผลเนื้อหา (Content Visibility)
  // 'w-full' เมื่อเปิด เพื่อให้เนื้อหาสไลด์ออกมาเต็มความกว้างของ max-w-xs
  const contentVisibilityClass = isOpen ? 'w-full' : 'w-0';

  return (
    // Main Container: ใช้ transition-all เพื่อให้การเปลี่ยนความกว้างโดยรวมดูนุ่มนวล
    <div 
        className={`text-black bg-amber-400 mt-5 ml-2 fixed z-50 rounded-2xl shadow-xl 
                   transition-all duration-400 ease-in-out ${mainWidthClass} py-2`}
    >
      
      {/* ---------------------------------------------------- */}
      {/* 1. CLOSED State Header (แนวตั้ง: Visible เมื่อ !isOpen) */}
      {/* ---------------------------------------------------- */}
      <div 
        className={`cursor-pointer ${!isOpen ? 'flex flex-col items-center h-full px-1' : 'hidden'}`}
        onClick={toggleFilter}
      >
        {/* Arrow (ชี้ไปทางขวา: กดเพื่อขยาย) */}
        <svg 
          className="w-5 h-5 transition-transform duration-300 mb-1"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chevron Right */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path> 
        </svg>

        {/* Vertical Text: ใช้ flex-col เพื่อเรียงตัวอักษรเป็นแนวตั้ง */}
        <div className="text-xl font-semibold flex flex-col items-center space-y-1">
            <span>F</span>
            <span>i</span>
            <span>l</span>
            <span>t</span>
            <span>e</span>
            <span>r</span>
        </div>
      </div>
      
      {/* ---------------------------------------------------- */}
      {/* 2. OPEN State Header (แนวนอน: Visible เมื่อ isOpen) */}
      {/* ---------------------------------------------------- */}
      <div 
        className={`${isOpen ? 'block' : 'hidden'}`}
      >
          {/* Header แนวนอน (Filter + Arrow) */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={toggleFilter}
          >
            <h2 className="text-xl font-semibold whitespace-nowrap">Filter</h2>
            
            {/* Arrow (ชี้ไปทางซ้าย: กดเพื่อหุบ) */}
            <svg 
              className="w-5 h-5 ml-auto transition-transform duration-300 rotate-180"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Chevron Left */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
          
          {/* 3. Sliding Content (ส่วนเนื้อหา) */}
          {/* ใช้ overflow-hidden และ w-0/w-full เพื่อให้เกิด Animation สไลด์แนวนอน */}
          <div 
            className={`overflow-hidden transition-all duration-400 ease-in-out ${contentVisibilityClass}`}
          >
              <div className="pt-2"> 
                <div className="border-t border-gray-700 my-3"></div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 whitespace-nowrap">Style</h3>
                  
                  <div className="grid grid-cols-3 gap-2 min-w-max">
                    <div className='p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm whitespace-nowrap'>Sculpture</div>
                    <div className='p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm whitespace-nowrap'>Painting</div>
                    <div className='p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm whitespace-nowrap'>Abstract</div>
                  </div>
                </div>
                
                <div className="mb-3 mt-3 border-t border-dashed border-gray-700"></div>
                
                {/* ส่วน Filter อื่นๆ */}
                <div>
                  <h3 className="text-lg font-medium mb-2 whitespace-nowrap">Color</h3>
                   <div className="grid grid-cols-3 gap-2 min-w-max">
                    <div className='p-1 bg-red-400 border-2 rounded-2xl text-sm text-center shadow-sm'>Red</div>
                    <div className='p-1 bg-blue-400 border-2 rounded-2xl text-sm text-center shadow-sm'>Blue</div>
                  </div>
                </div>
              </div>
          </div>
      </div>
      
    </div>
  );
};

export default CollapsibleFilter;
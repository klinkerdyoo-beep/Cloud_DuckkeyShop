import { useState } from "react";

const CollapsibleFilter = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="filter relative  ml-2 mt-5">
      {/* ตัว Filter sidebar */}
      <div
        onClick={() => setOpen(!open)}
        className={`bg-amber-300 fixed top-5 left-2 z-50 rounded-2xl shadow-xl cursor-pointer 
        transition-all duration-500 ease-in-out overflow-hidden
        flex flex-col items-center mt-50
        ${open ? "w-64 h-auto p-4" : "py-10 w-10 h-40 p-2"}`}
      >
        {/* หัวข้อ Filter */}
        <h2
          className={`font-medium inline-block  transition-all duration-300 ${
            open ? "text-lg  rotate-0" : "text-sm rotate-90"
          }`}
        >
          Filter
        </h2>

        {/* เนื้อหาที่แสดงตอนเปิด */}
        {open && (
          <div className="mt-2">
            <div className="border-t border-gray-700 my-3"></div>
            <h3 className="text-lg font-medium mb-2">Style</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm">
                Sculpture
              </div>
              <div className="p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm">
                Painting
              </div>
              <div className="p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm">
                Abstract
              </div>
              <div className="p-1 bg-amber-200 border-2 rounded-2xl text-sm text-center shadow-sm">
                Modern
              </div>
            </div>
            <div className="mb-3 mt-3 border-t border-dashed border-gray-700"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleFilter;


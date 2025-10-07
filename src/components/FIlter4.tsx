interface FilterProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Filter({ open, setOpen }: FilterProps) {
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`bg-amber-400 transition-all duration-500 cursor-pointer overflow-hidden
        ${open ? "w-64 p-4" : "py-10 w-10 h-40 p-2"} rounded-r-2xl shadow-lg flex flex-col items-center`}
    >
      {/* หัวข้อ Filter */}
      <h2
        className={`font-medium inline-block transition-all duration-500 origin-left
          ${open ? "text-lg rotate-0 mb-2" : "text-sm ml-10 mt-10  rotate-90"}`}
      >
        Filter
      </h2>

      {/* เนื้อหาตอนเปิด */}
      {open && (
        <div className="mt-2 w-full">
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
        </div>
      )}
    </div>
  );
}

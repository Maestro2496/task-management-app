import React from "react";
import VerticalEllipsis from "../../assets/VerticalEllipsis";

export default function Header() {
  return (
    <div className="border-b md:max-w-[81%] bg-white z-50 relative md:ml-[22%] h-[6.1rem] px-8 py-2 flex items-center justify-between">
      <div className="font-bold text-2xl ">Platform Lauch</div>
      <div className="flex space-x-6 items-center justify-center ">
        <button className="rounded-full py-3 px-6 bg-[#635FC7] hover:opacity-50 opacity-25 text-white">
          {" "}
          + Add New Task
        </button>
        <div>
          <VerticalEllipsis />
        </div>
      </div>
    </div>
  );
}

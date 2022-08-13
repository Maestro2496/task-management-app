import clsx from "clsx";
import React from "react";
import {useSelector} from "react-redux";
import "./Main.scss";

export default function Main() {
  const sidebar = useSelector((state) => state.sidebar);
  return (
    <main
      className={clsx(
        "relative z-30 transition-all duration-700 h-[41.2rem] bg-[#E4EBFA] flex items-center justify-center",
        sidebar === "show" ? "main" : "main-no-margin"
      )}
    >
      <div className="flex flex-col space-y-4">
        <p className="text-gray-500 font-bold">
          This board is empty. Create a new column to get started.
        </p>
        <div className="flex justify-center items-center">
          <button className="bg-primary  hover:bg-primary-hover py-2 px-6 rounded-full text-[15px] h-12 text-white">
            + Add New Column
          </button>
        </div>
      </div>
    </main>
  );
}

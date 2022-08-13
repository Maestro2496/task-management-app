import clsx from "clsx";
import React from "react";
import {useSelector} from "react-redux";
import LogoDark from "../../../assets/LogoDark";
import VerticalEllipsis from "../../../assets/VerticalEllipsis";

import "./Header.scss";

//Update the left margin
export default function Header() {
  const sidebar = useSelector((state) => state.sidebar);

  return (
    <div
      className={clsx(
        "transition-all duration-700 border-b border-3 bg-white z-40 relative h-[6.1rem] px-8  flex items-center justify-between",
        sidebar === "show" ? "header" : "header-no-margin "
      )}
    >
      <div
        className={clsx(
          sidebar === "show"
            ? "hidden"
            : "font-bold text-2xl space-x-12 flex h-full justify-center items-center"
        )}
      >
        <LogoDark />
        <span className="border-l-gray-300 border-l h-full flex items-center justify-center pl-6">
          Platform Lauch
        </span>
      </div>
      <div className={clsx(sidebar === "show" ? "font-bold text-2xl " : "hidden")}>
        Platform Lauch
      </div>
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

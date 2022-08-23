import clsx from "clsx";
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import ShowSidebar from "../../../assets/ShowSidebar";
import {show} from "../../../store/features/sidebar";
export default function SidebarShowBtn() {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(show());
      }}
      className={clsx(
        sidebar === "show"
          ? "hidden"
          : "bg-primary rounded-r-full px-4 py-2 w-14 h-14 hover:bg-indigo-800 z-50 absolute bottom-12 flex justify-center items-center"
      )}
    >
      <ShowSidebar />
    </button>
  );
}

import clsx from "clsx";
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import LogoDark from "../../../assets/LogoDark";
import {showAddTask} from "../../../store/features/modals";
import BoardDropDown from "../../dropdown/Board";
import AddTask from "../../modals/task/AddTask";

//Update the left margin
export default function Header() {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);

  const location = useLocation();
  return (
    <>
      <AddTask />

      <div
        className={clsx(
          "transition-all duration-700 border-b border-3 bg-white z-40 fixed right-0 left-0 h-[6.1rem] px-8  flex items-center justify-between",
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
            {location.pathname.split("/")[2]}
          </span>
        </div>

        <div
          className={clsx(
            sidebar === "show"
              ? " font-bold text-2xl space-x-12 flex h-full justify-center items-center ml-[22%]"
              : "hidden"
          )}
        >
          <span className="  h-full flex items-center justify-center">
            {location.pathname.split("/")[2]}
          </span>
        </div>
        <div className="flex space-x-6 items-center justify-center ">
          <button
            onClick={() => void dispatch(showAddTask())}
            className="rounded-full py-3 px-6 bg-[#635FC7] hover:opacity-50  text-white"
          >
            + Add New Task
          </button>
          <div>
            <BoardDropDown />
          </div>
        </div>
      </div>
    </>
  );
}

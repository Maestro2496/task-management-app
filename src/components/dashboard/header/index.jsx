import {ChevronDownIcon, PlusCircleIcon, PlusIcon} from "@heroicons/react/solid";
import clsx from "clsx";
import React, {useContext} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {BoardContext} from "../../../App";
import LogoDark from "../../../assets/LogoDark";
import LogoLight from "../../../assets/LogoLight";
import LogoMobile from "../../../assets/LogoMobile";
import {showAddTask} from "../../../store/features/modals";
import BoardDropDown from "../../dropdown/Board";
import MobileBoardButton from "../../dropdown/MobileBoardButton";
import DeleteBoard from "../../modals/board/DeleteBoard";

import EditBoard from "../../modals/board/EditBoard";
import MobileBoard from "../../modals/board/MobileBoard";
import AddTask from "../../modals/task/AddTask";

const Logo = () => {
  return (
    <>
      {" "}
      <div className="dark:hidden flex-shrink-0  flex items-center py-8">
        <LogoDark />
      </div>
      <div className="hidden dark:flex flex-shrink-0 items-center py-8">
        <LogoLight />
      </div>
    </>
  );
};
//Update the left margin
export default function Header() {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);

  const location = useLocation();
  const board = useContext(BoardContext);

  return (
    <>
      <AddTask />
      <EditBoard />
      <DeleteBoard />
      <div
        className={clsx(
          "hidden pr-4  transition-all duration-500 border-b border-3 dark:border-b-[#2b2c35] bg-white dark:bg-[#2B2C37] z-40 fixed right-0 left-0 h-[6.1rem]   md:flex items-center justify-between"
        )}
      >
        <div
          className={clsx(
            sidebar === "show"
              ? "hidden"
              : "font-bold text-2xl space-x-12 flex h-full justify-start items-center px-4 pr-6"
          )}
        >
          <Logo />
          <span className="border-l-gray-300 dark:border-l-gray-700 dark:text-white border-l h-full flex items-center justify-center pl-6">
            {board?.name}
          </span>
        </div>

        <div
          className={clsx(
            sidebar === "show"
              ? " font-bold text-2xl space-x-12 flex h-full justify-start items-center lg:ml-[22%] ml-[32%]"
              : "hidden"
          )}
        >
          <span className="dark:text-white pl-3  h-full flex items-center justify-center">
            {board?.name}
          </span>
        </div>
        <div className="flex space-x-6 items-center justify-center ">
          <button
            onClick={() => {
              if (!board) return;
              dispatch(showAddTask());
            }}
            disabled={!board || board.columns.length === 0}
            className="disabled:opacity-20 rounded-full py-3 px-6 bg-[#635FC7] hover:opacity-50  text-white"
          >
            + Add New Task
          </button>
          <div>
            <BoardDropDown />
          </div>
        </div>
      </div>
      <div className=" h-14 z-[62] dark:bg-dark-grey dark:text-white  bg-white px-2 py-3 flex md:hidden justify-between items-center fixed right-0 left-0 ">
        <div className="flex space-x-4 justify-center items-center">
          <LogoMobile />
          <MobileBoardButton />
          <MobileBoard />
        </div>
        <div className="flex justify-center items-center space-x-2">
          <PlusIcon
            className={clsx("w-10 h-6 bg-primary fill-white rounded-full", !board && "opacity-20")}
            onClick={() => {
              if (!board) return;
              dispatch(showAddTask());
            }}
          />
          <BoardDropDown />
        </div>
      </div>
    </>
  );
}

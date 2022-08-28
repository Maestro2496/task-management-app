import React, {useContext, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import "./Sidebar.scss";
import AddBoard from "../../modals/board/AddBoard";
import {useDispatch} from "react-redux/";
import Iconboard from "../../../assets/IconBoard";
import LightTheme from "../../../assets/Light-Theme";
import DarkTheme from "../../../assets/DarkTheme";
import clsx from "clsx";
import {useSelector} from "react-redux";
import Toggle from "./Toggle";
import HideSidebar from "../../../assets/HideSidebar";
import LogoDark from "../../../assets/LogoDark";
import {hide} from "../../../store/features/sidebar";
import LogoLight from "../../../assets/LogoLight";
import {BoardContext} from "../../../App";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Logo = () => {
  return (
    <>
      {" "}
      <div className="dark:hidden flex-shrink-0 px-4 flex items-center py-8">
        <LogoDark />
      </div>
      <div className="hidden dark:flex flex-shrink-0 px-4 items-center py-8">
        <LogoLight />
      </div>
    </>
  );
};
const HideSidebarButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(hide());
      }}
      className="space-x-4 flex items-center justify-start "
    >
      <HideSidebar />
      <span className="text-gray-500 dark:text-[#828FA3] font-semibold text-[15px]">
        Hide sidebar
      </span>
    </button>
  );
};
export default function Sidebar() {
  const [openModal, setOpenModal] = useState(false);
  const sidebar = useSelector((state) => state.sidebar);
  let boards = useSelector((state) => state.boards);
  const board = useContext(BoardContext);
  const boardId = board ? board.id : undefined;

  return (
    <>
      <AddBoard open={openModal} setOpen={setOpenModal} />
      <div
        className={clsx(
          "hidden md:flex z-[100] transition-all duration-500 fixed inset-y-0 h-full  flex-col lg:w-[22%] w-[32%]",
          sidebar === "show"
            ? "z-40 translate-x-0 opacity-100"
            : "-translate-x-[100%] -z-10 opacity-0"
        )}
      >
        <div className="pb-12 border-r dark:border-r-[#272832] pt-0 flex flex-col flex-grow dark:bg-[#2B2C37] bg-white overflow-y-auto">
          <Logo />
          <div className="flex-grow mt-5 flex flex-col ">
            <nav className="flex-1 pr-2 pb-4">
              <div className="ml-4 py-4 text-[0.9375rem] text-medium-grey dark:text-[#828FA3] tracking-wide font-semibold opacity-50">
                All BOARDS ({boards.length})
              </div>
              <ul className=" max-h-72 overflow-y-scroll">
                {boards.map((board) => (
                  <NavLink
                    to={`/boards/${board.id}`}
                    key={board?.name}
                    href={board?.name}
                    className={({isActive}) => {
                      return (
                        " group rounded-r-full py-5 px-4 flex items-center text-sm font-medium space-x-3 text-black hover:text-gray-900 " +
                        (isActive ? "bg-primary" : "")
                      );
                    }}
                  >
                    <Iconboard fill={board.id === boardId ? "white" : "gray"} aria-hidden="true" />
                    <p
                      className={clsx(
                        "text-[0.9375rem]",
                        board.id === boardId ? "text-white" : "text-gray-900 dark:text-[#828FA3]"
                      )}
                    >
                      {board?.name}
                    </p>
                  </NavLink>
                ))}
              </ul>

              <button
                onClick={() => setOpenModal(true)}
                className="cursor-pointer group rounded-r-full py-5 px-4 flex items-center text-sm font-medium space-x-3 "
              >
                <Iconboard fill={"#635FC7"} aria-hidden="true" />
                <p className={classNames("text-[0.9375rem] text-[#635FC7] font-bold")}>
                  +Create New Board
                </p>
              </button>
            </nav>
          </div>
          <div className=" px-4 flex flex-col space-y-4">
            <div className="flex space-x-8 bg-indigo-100/90 dark:bg-[#20212C] rounded-md h-12 justify-center items-center">
              <LightTheme />
              <Toggle />
              <DarkTheme />
            </div>
            <HideSidebarButton />
          </div>
        </div>
      </div>
    </>
  );
}

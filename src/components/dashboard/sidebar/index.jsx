import React, {useContext, useMemo} from "react";
import {NavLink, useLocation} from "react-router-dom";
import "./Sidebar.scss";
import {useDispatch} from "react-redux/";
import Iconboard from "../../../assets/IconBoard";
import LightTheme from "../../../assets/Light-Theme";
import DarkTheme from "../../../assets/DarkTheme";
import clsx from "clsx";
import {useSelector} from "react-redux";
import Toggle from "./Toggle";
import HideSidebar from "../../../assets/HideSidebar";
import LogoDark from "../../../assets/LogoDark";
import {hide} from "../../../features/sidebar";
import {BoardContext} from "../../../App";
const navigation = [
  {name: "Platform Launch", href: "#", icon: Iconboard, current: true},
  {name: "Marketing Plan", href: "#", icon: Iconboard, current: false},
  {name: "Roadmap", href: "#", icon: Iconboard, current: false},
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Logo = () => {
  return (
    <div className="flex-shrink-0 px-4 flex items-center py-8">
      <LogoDark />
    </div>
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
      <span className="text-gray-500 font-semibold text-[15px]">Hide sidebar</span>
    </button>
  );
};
export default function Sidebar() {
  const sidebar = useSelector((state) => state.sidebar);
  let boards = useContext(BoardContext);
  const location = useLocation();

  return (
    <div
      className={clsx(
        " z-[100] transition-all duration-700 fixed inset-y-0 h-full flex flex-col w-[22%] ",
        sidebar === "show"
          ? "z-40 translate-x-0 opacity-100"
          : "-translate-x-[100%] -z-10 opacity-0"
      )}
    >
      <div className="pb-12 border-r border-gray-200 pt-0 flex flex-col flex-grow bg-white overflow-y-auto">
        <Logo />
        <div className="flex-grow mt-5 flex flex-col ">
          <nav className="flex-1 pr-2 pb-4">
            <div className="ml-4 py-4 text-[0.9375rem] text-gray-700 tracking-wide font-semibold opacity-50">
              All BOARDS ({boards.length})
            </div>
            <ul className="">
              {boards.map((board) => (
                <NavLink
                  to={`/boards/${board.href}`}
                  key={board.name}
                  href={board.name}
                  /*  style={({isActive}) => ({
                    backgroundColor: isActive ? "lightblue" : "teal",
                  })} */
                  className={({isActive}) => {
                    return (
                      " group rounded-r-full py-5 px-4 flex items-center text-sm font-medium space-x-3 text-black hover:text-gray-900 " +
                      (isActive ? "bg-primary" : "bg-white")
                    );
                  }}
                >
                  <Iconboard
                    fill={board.href === location.pathname.split("/")[2] ? "white" : "gray"}
                    aria-hidden="true"
                  />
                  <p
                    className={clsx(
                      "text-[0.9375rem]",
                      board.href === location.pathname.split("/")[2]
                        ? "text-white"
                        : "text-gray-900"
                    )}
                  >
                    {board.name}
                  </p>
                </NavLink>
              ))}
            </ul>

            <div className=" group rounded-r-full py-5 px-4 flex items-center text-sm font-medium space-x-3 ">
              <Iconboard fill={"#635FC7"} aria-hidden="true" />
              <p className={classNames("text-[0.9375rem] text-[#635FC7] font-bold")}>
                +Create New Board
              </p>
            </div>
          </nav>
        </div>
        <div className=" px-4 flex flex-col space-y-4">
          <div className="flex space-x-8 bg-indigo-100/90 rounded-md h-12 justify-center items-center">
            <LightTheme />
            <Toggle />
            <DarkTheme />
          </div>
          <HideSidebarButton />
        </div>
      </div>
    </div>
  );
}

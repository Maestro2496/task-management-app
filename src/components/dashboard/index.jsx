import Header from "./header";
import Sidebar from "./sidebar";
import {Outlet} from "react-router-dom";

import SidebarShowBtn from "./sidebarShowBtn";
import {useSelector} from "react-redux";
import clsx from "clsx";
import {useContext} from "react";
import {BoardContext} from "../../App";
//import TaskDescription from "../modals/TaskDescription";

export default function Dashboard() {
  const sidebar = useSelector((state) => state.sidebar);
  const board = useContext(BoardContext);
  return (
    <div className="overflow-y-hidden h-screen ">
      <SidebarShowBtn />
      <div>
        <Sidebar />

        <Header />
        <main
          className={clsx(
            "relative top-[3.5rem] md:top-[6.1rem] z-30 w-full transition-all duration-500 h-[40.8rem] dark:bg-[#20212C] bg-[#E4EBFA] ",
            sidebar === "show" ? "main" : "main-no-margin"
          )}
        >
          <Outlet />
          {!board && (
            <div
              className={clsx(
                "transition-all ml-4 py-12 duration-500 dark:bg-[#20212C] bg-[#E4EBFA] flex w-fit  space-x-4 relative z-40  h-screen pt-8 pb-8 pr-8",
                sidebar === "show" ? "lg:ml-[22%] md:ml-[32%] md:pl-8" : " md:pl-12"
              )}
            >
              <p className="dark:text-white">Choose a board to get started</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

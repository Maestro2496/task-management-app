import Header from "./header";
import Sidebar from "./sidebar";
import {Outlet} from "react-router-dom";

import SidebarShowBtn from "./sidebarShowBtn";
import {useSelector} from "react-redux";
import clsx from "clsx";
//import TaskDescription from "../modals/TaskDescription";

export default function Dashboard() {
  const sidebar = useSelector((state) => state.sidebar);
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
        </main>
      </div>
    </div>
  );
}

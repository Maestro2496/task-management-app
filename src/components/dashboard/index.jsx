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
    <div className="overflow-y-hidden h-screen parent">
      <SidebarShowBtn />
      <div>
        <Sidebar />

        <Header />
        <main
          className={clsx(
            "relative top-[6.1rem] z-30 w-full transition-all duration-700 h-[40.8rem] bg-[#E4EBFA] ",
            sidebar === "show" ? "main" : "main-no-margin"
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

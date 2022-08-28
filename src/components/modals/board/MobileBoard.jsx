/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useMemo} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import {useSelector, useDispatch} from "react-redux/";

import {NavLink, useLocation} from "react-router-dom";

import {hideMobile} from "../../../store/features/modals";

import Iconboard from "../../../assets/IconBoard";
import clsx from "clsx";
import LightTheme from "../../../assets/Light-Theme";
import Toggle from "../../dashboard/sidebar/Toggle";
import DarkTheme from "../../../assets/DarkTheme";

export default function MobileBoard() {
  const dispatch = useDispatch();
  const location = useLocation();

  const open = useSelector((state) => state.modals.board.mobile);
  const boards = useSelector((state) => state.boards);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[60] " onClose={() => void dispatch(hideMobile())}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed top-[3.5rem] z-10 inset-0 ">
          <div className="flex items-start sm:items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-60 flex flex-col  relative dark:bg-dark-grey bg-white rounded-lg  text-left  transform transition-all ">
                <div className="pb-1 pt-0 flex flex-col flex-grow  rounded-lg overflow-y-auto">
                  <div className=" flex flex-col py-4">
                    <nav className=" pr-2 pb-4 ">
                      <div className="ml-4 py-1 mb-2 text-sm font-semibold tracking-wider text-[#828FA3]">
                        ALL BOARDS ({boards.length})
                      </div>
                      <ul className=" max-h-32 overflow-y-scroll">
                        {boards.map((board) => (
                          <NavLink
                            to={`/boards/${board.href}`}
                            key={board?.name}
                            href={board?.name}
                            className={({isActive}) => {
                              return (
                                " group rounded-r-full py-3 px-4 flex items-center text-sm font-medium space-x-3 text-black hover:text-gray-900 " +
                                (isActive && "bg-primary")
                              );
                            }}
                          >
                            <Iconboard
                              fill={
                                board.href === location.pathname.split("/")[2] ? "white" : "gray"
                              }
                              aria-hidden="true"
                            />
                            <p
                              className={clsx(
                                "text-sm font- tracking-wider",
                                board.href === location.pathname.split("/")[2]
                                  ? "text-white"
                                  : "text-[#828FA3]"
                              )}
                            >
                              {board?.name}
                            </p>
                          </NavLink>
                        ))}
                      </ul>

                      <button className="cursor-pointer group rounded-r-full py-3 px-4 flex items-center text-sm font-medium space-x-3 ">
                        <Iconboard fill={"#635FC7"} aria-hidden="true" />
                        <p className={clsx("text-sm text-[#635FC7] font-bold")}>
                          +Create New Board
                        </p>
                      </button>
                    </nav>
                  </div>
                  <div className=" px-4 flex flex-col space-y-4 mb-2">
                    <div className="flex space-x-8 bg-[#F4F7FD] dark:bg-very-dark-grey rounded-md h-12 justify-center items-center">
                      <LightTheme />
                      <Toggle />
                      <DarkTheme />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

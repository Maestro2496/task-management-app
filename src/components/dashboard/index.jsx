import {Fragment, useState} from "react";
import {Dialog, Menu, Transition} from "@headlessui/react";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import Button from "../buttons";
import Header from "./Header";
import Sidebar from "./Sidebar";

const navigation = [
  {name: "Dashboard", href: "#", icon: HomeIcon, current: true},
  {name: "Team", href: "#", icon: UsersIcon, current: false},
  {name: "Projects", href: "#", icon: FolderIcon, current: false},
  {name: "Calendar", href: "#", icon: CalendarIcon, current: false},
  {name: "Documents", href: "#", icon: InboxIcon, current: false},
  {name: "Reports", href: "#", icon: ChartBarIcon, current: false},
];
const userNavigation = [
  {name: "Your Profile", href: "#"},
  {name: "Settings", href: "#"},
  {name: "Sign out", href: "#"},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 px-4 flex items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group rounded-md py-2 px-2 flex items-center text-base font-medium"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-[22%] md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <Sidebar />
        </div>
        <Header />

        <main className=" md:ml-[22%] my-auto h-[41.2rem] bg-[#E4EBFA] flex items-center justify-center ">
          <div className="flex flex-col space-y-4">
            <p className="text-gray-500 font-bold">
              This board is empty. Create a new column to get started.
            </p>
            <div className="flex justify-center items-center">
              <button className="bg-primary  hover:bg-primary-hover py-2 px-6 rounded-full text-[15px] h-12 text-white">
                + Add New Column
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TaskDropDown({setOpenEditTask, setOpenDeleteTask, setOpenTaskDesc}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" rounded-full flex items-center text-gray-400 hover:text-gray-600 ">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute -left-24 mt-2 w-56 rounded-md shadow-lg dark:bg-very-dark-grey bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => {
                    setOpenEditTask(true);
                    setOpenTaskDesc(false);
                  }}
                  className={classNames(
                    active
                      ? " text-gray-900 dark:text-gray-400"
                      : "text-medium-grey dark:text-medium-grey",
                    "w-full text-left block px-4 py-2 text-sm"
                  )}
                >
                  Edit Task
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => {
                    setOpenDeleteTask(true);
                    setOpenTaskDesc(false);
                  }}
                  className={classNames(
                    active ? " text-[#EA5555]" : "text-[#EA5555]",
                    "w-full text-left block px-4 py-2 text-sm"
                  )}
                >
                  Delete task
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

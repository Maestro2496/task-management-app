/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext} from "react";
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon} from "@heroicons/react/solid";
import {useDispatch, useSelector} from "react-redux";
import {showDeleteBoard, showEditBoard} from "../../store/features/modals";
import {useLocation} from "react-router-dom";
import {BoardContext} from "../../App";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BoardDropDown() {
  const dispatch = useDispatch();

  const board = useContext(BoardContext);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          disabled={!board}
          className="disabled:opacity-20 rounded-full flex items-center text-gray-400 hover:text-gray-600 "
        >
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
        <Menu.Items className="origin-top-right absolute right-0 mt-6 w-56 rounded-md shadow-lg dark:bg-[#20212C] bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => void dispatch(showEditBoard())}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-inherit text-[#b1b1c7]" : "text-[#828FA3]",
                    "w-full text-left block px-4 py-2 text-sm "
                  )}
                >
                  Edit Board
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={() => {
                    dispatch(showDeleteBoard());
                  }}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-inherit text-red-900" : "text-red-700",
                    "w-full text-left block px-4 py-2 text-sm"
                  )}
                >
                  Delete Board
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useRef} from "react";
import {Dialog, Transition} from "@headlessui/react";

import {useDispatch} from "react-redux";
import {deleteTask} from "../../../store/features/boards";
import {BoardContext} from "../../../App";

export default function DeleteTask({open, setOpen, setOpenTaskDesc, task}) {
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();
  const board = useContext(BoardContext);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[120]"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          setOpenTaskDesc(true);
        }}
      >
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

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative dark:bg-dark-grey bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-[#EA5555] text-left text-lg leading-6 font-medium "
                    >
                      Delete Task ?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-medium-grey text-left">
                        {`Are you sure you want to delete the ${task.title}'task? This action can remove
                        all columns and task and cannot be reversed.`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full bg-[#635FC71A]/10 inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 text-base font-medium text-[#635FC7] hover:bg-indigo-700 dark:bg-white sm:col-start-2 sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                      setOpenTaskDesc(true);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="text-white mt-3 w-full inline-flex justify-center rounded-full shadow-sm px-4 py-2 bg-[#EA5555] text-base font-medium  hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      dispatch(
                        deleteTask({
                          boardId: board.id,
                          columnName: task.status,
                          taskId: task.id,
                        })
                      );
                      setOpen(false);
                      setOpenTaskDesc(true);
                    }}
                    ref={cancelButtonRef}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from "react";
import clsx from "clsx";
import {Dialog, Transition} from "@headlessui/react";

import SelectMenu from "../SelectMenu";

import TaskDropDown from "../../dropdown/Task";


export default function TaskDescription({
  open,
  setOpen,
  task,
  taskCompleted,
  setOpenEditTask,
  setOpenDeleteTask,
}) {
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[120]" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 ">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="flex flex-col space-y-4 relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                  <div className="pr-2 flex justify-between items-center ">
                    <h2 className="font-bold w-2/3 ">{task.title}</h2>
                    <TaskDropDown
                      setOpenDeleteTask={setOpenDeleteTask}
                      setOpenEditTask={setOpenEditTask}
                      setOpenTaskDesc={setOpen}
                    />
                  </div>

                  <p className="text-sm text-[#828FA3]">{task.description}</p>
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-[#828FA3] text-sm font-semibold">{`Subtasks (${taskCompleted} of ${task.subtasks.length} )`}</h3>
                    <div className="space-y-2 flex flex-col items-center justify-center">
                      {task.subtasks.map((subtask) => (
                        <div
                          key={subtask.title}
                          className="w-full p-2 bg-[#F4F7FD] flex items-center justify-start space-x-2 rounded-md hover:bg-[#635FC7]/25 cursor-pointer"
                        >
                          <div className="flex items-center justify-center">
                            <input
                              id={subtask.title}
                              name={subtask.title}
                              defaultChecked={subtask.isCompleted}
                              type="checkbox"
                              className="appearance-none  flex items-center justify-center focus:ring-indigo-500 h-5 w-5 text-[#635FC7] border border-gray-700 bg-white rounded checked:bg-primary"
                            />
                          </div>

                          <p
                            className={clsx(
                              subtask.isCompleted
                                ? "line-through decoration-gray-600 decoration-1 text-gray-500"
                                : ""
                            )}
                          >
                            {subtask.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h3 className="text-[#828FA3] text-sm font-semibold">Current Status</h3>
                    <SelectMenu currentStatus={task.status} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useMemo, useState} from "react";
import clsx from "clsx";
import {Dialog, Transition} from "@headlessui/react";
import {Formik, Form} from "formik";
import {useLocation} from "react-router-dom";
import SelectMenu from "./SelectMenu";
import {useSelector, useDispatch} from "react-redux";
import TaskDropDown from "../../dropdown/Task";
import {editTask} from "../../../store/features/boards";
import {BoardContext} from "../../../App";

export default function TaskDescription({open, setOpen, task, setOpenEditTask, setOpenDeleteTask}) {
  const dispatch = useDispatch();
  const board = useContext(BoardContext);

  const taskStatus = useMemo(() => {
    let status = [];

    if (board) {
      status = board.columns.map((column) => column.name);
    }
    return status;
  }, [board]);

  const initialValues = useMemo(() => {
    return {
      subtasks: task.subtasks,
      status: task.status,
    };
  }, [task]);
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[120]" onClose={setOpen}>
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

          <div className="fixed z-10 inset-0 ">
            <div className="w-full flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-full dark:bg-dark-grey flex flex-col space-y-4 relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                      dispatch(
                        editTask({
                          boardId: board.id,
                          currentColName: values.status,
                          taskId: task.id,
                          taskTitle: task.title,
                          taskDesc: task.description,
                          subtasks: values.subtasks,
                          prevColName: task.status,
                        })
                      );
                      setOpen(false);
                    }}
                  >
                    {({values, setFieldValue}) => {
                      const taskCompleted = values.subtasks.filter(
                        (task) => task.isCompleted
                      ).length;
                      return (
                        <Form>
                          <div className="pr-2 flex justify-between items-center ">
                            <h2 className="font-bold w-2/3 dark:text-white">{task.title}</h2>
                            <TaskDropDown
                              setOpenDeleteTask={setOpenDeleteTask}
                              setOpenEditTask={setOpenEditTask}
                              setOpenTaskDesc={setOpen}
                            />
                          </div>
                          <p className="text-sm text-[#828FA3] dark:text-medium-grey my-6">
                            {task.description}
                          </p>
                          <div className="flex flex-col ">
                            <h3 className="text-[#828FA3] text-sm font-semibold dark:text-white">{`Subtasks (${taskCompleted} of ${values.subtasks.length} )`}</h3>
                            <div className="overflow-y-auto py-4 px-1 max-h-32 space-y-2 flex flex-col items-start justify-center">
                              {values.subtasks.map((subtask) => (
                                <div
                                  key={subtask.title}
                                  className="w-full p-2 bg-[#F4F7FD] dark:bg-very-dark-grey flex items-center justify-start space-x-5 rounded-md hover:bg-[#635FC7]/25 cursor-pointer"
                                >
                                  <div className="flex items-center justify-center">
                                    <input
                                      id={subtask.title}
                                      name={subtask.title}
                                      defaultChecked={subtask.isCompleted}
                                      onChange={(event) => {
                                        if (event.target.checked) {
                                          setFieldValue(
                                            "subtasks",
                                            values.subtasks.map((subt) => {
                                              if (subt.id === subtask.id) {
                                                return {
                                                  ...subt,
                                                  isCompleted: true,
                                                };
                                              }
                                              return subt;
                                            })
                                          );
                                        } else {
                                          setFieldValue(
                                            "subtasks",
                                            values.subtasks.map((subt) => {
                                              if (subt.id === subtask.id) {
                                                return {
                                                  ...subt,
                                                  isCompleted: false,
                                                };
                                              }
                                              return subt;
                                            })
                                          );
                                        }
                                      }}
                                      type="checkbox"
                                      className="appearance-none  flex items-center justify-center focus:ring-indigo-500 h-5 w-5 text-[#635FC7] border border-gray-700 bg-white dark:bg-medium-grey rounded checked:bg-primary"
                                    />
                                  </div>

                                  <p
                                    className={clsx(
                                      subtask.isCompleted
                                        ? "line-through decoration-medium-grey decoration-1 text-gray-500 dark:text-medium-grey"
                                        : "dark:text-white font-bold"
                                    )}
                                  >
                                    {subtask.title}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="w-full flex flex-col space-y-2 mt-5">
                            <h3 className="text-[#828FA3] text-sm font-semibold dark:text-white">
                              Current Status
                            </h3>
                            <SelectMenu
                              currentStatus={task.status}
                              taskStatus={taskStatus}
                              setFieldValue={setFieldValue}
                            />
                          </div>

                          <button
                            type="submit"
                            className="mt-6 rounded-md bg-primary text-white w-full dark:bg-primary text-center px-2 py-2"
                          >
                            Confirm changes
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useMemo} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Formik, Form} from "formik";
import SelectMenu from "./SelectMenu";
import {v4} from "uuid";
import {CustomInput2} from "../../Input";
import CustomTextArea from "../../TextArea";
import {XIcon} from "@heroicons/react/outline";
import SubTask from "./SubTask";

import {useDispatch} from "react-redux";
import {editTask} from "../../../store/features/boards";
import {BoardContext} from "../../../App";
export default function EditTask({open, setOpen, setOpenTaskDesc, task}) {
  const board = useContext(BoardContext);

  const taskStatus = useMemo(() => {
    let status = [];

    if (board) {
      status = board.columns.map((column) => column.name);
    }
    return status;
  }, [board]);

  const dispatch = useDispatch();
  const initialValues = useMemo(() => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      subtasks: task.subtasks,
      status: task.status,
    };
  }, [task]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[120]"
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

        <div className="fixed z-10 inset-0 ">
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
              <Dialog.Panel className="flex flex-col space-y-4  relative dark:bg-dark-grey bg-white rounded-lg px-4 pt-2 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    dispatch(
                      editTask({
                        boardId: board.id,
                        status: values.status,
                        taskId: task.id,
                        taskTitle: values.title,
                        taskDesc: values.description,
                        subtasks: values.subtasks,
                        prevColName: task.status,
                        currentColName: values.status,
                      })
                    );
                    setOpen(false);
                  }}
                >
                  {({values, setFieldValue, setFieldError, errors}) => (
                    <Form>
                      <div className="pr-2 flex justify-between items-center ">
                        <h2 className="font-bold text-lg dark:text-white">Edit task</h2>
                      </div>
                      <div className="space-y-4 mt-4">
                        <CustomInput2
                          type="text"
                          name="title"
                          label="Title"
                          className="border border-gray-400 h-9 px-2"
                        />
                        <CustomTextArea
                          label="Description"
                          name="description"
                          placeholder="e.g It's always good to take a break. This 15 min break will reacharge your batteries a little"
                          className="h-24 py-3 px-2 border border-gray-400"
                        />
                        <div className="space-y-2">
                          <h2 className="dark:text-white text-medium-grey font-semibold">
                            Subtasks{" "}
                          </h2>
                          <div className="max-h-36  overflow-y-auto flex flex-col  space-y-3 justify-center items-center pr-2">
                            {values.subtasks.map((subtask) => (
                              <Fragment key={subtask.id}>
                                <div className="w-full flex space-x-3 items-center">
                                  <SubTask
                                    subtasks={values.subtasks}
                                    setFieldValue={setFieldValue}
                                    id={subtask.id}
                                    title={subtask.title}
                                    className="h-9 border border-[#828FA340] dark:border-lines-dark dark:bg-[#2B2C37] p-2 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                    placeholder={subtask.title}
                                    value={subtask.title}
                                  />
                                  <XIcon
                                    onClick={() => {
                                      if (values.subtasks.length === 1) {
                                        setFieldError("subtasks", "You need at least one subtask");
                                      } else {
                                        setFieldValue(
                                          "subtasks",
                                          values.subtasks.filter((subt) => subt.id !== subtask.id)
                                        );
                                      }
                                    }}
                                    className="w-5 h-5 stroke-medium-grey"
                                  />
                                </div>
                              </Fragment>
                            ))}
                          </div>

                          <button
                            type="button"
                            className="w-full font-semibold bg-[#635FC740] dark:bg-white py-2 rounded-full text-[#635FC7]"
                            onClick={() => {
                              setFieldValue(
                                "subtasks",
                                values.subtasks.concat({
                                  id: v4(),
                                  title: "",
                                  isCompleted: false,
                                })
                              );
                            }}
                          >
                            + Add new Subtask
                          </button>
                        </div>
                      </div>

                      <div className="w-full flex flex-col space-y-4 mt-4">
                        <h3 className="text-medium-grey font-semibold text-sm dark:text-white">
                          Status
                        </h3>
                        <SelectMenu
                          taskStatus={taskStatus}
                          setFieldValue={setFieldValue}
                          currentStatus={task.status}
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-3 w-full font-semibold bg-[#635FC7] py-2 rounded-full text-white"
                      >
                        Save changes
                      </button>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

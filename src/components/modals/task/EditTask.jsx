/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useMemo} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Formik, Form} from "formik";
import SelectMenu from "./SelectMenu";
import {v4} from "uuid";
import {CustomInput2} from "../../Input";
import CustomTextArea from "../../TextArea";
import {XIcon} from "@heroicons/react/outline";
import SubTask from "./SubTask";
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {editTask} from "../../../store/features/boards";
export default function EditTask({open, setOpen, setOpenTaskDesc, task}) {
  const location = useLocation();
  const boards = useSelector((state) => state.boards);
  const boardHref = location.pathname.split("/")[2];

  const taskStatus = useMemo(() => {
    let status = [];

    const board = boards.find((board) => board.href === boardHref);
    if (board) {
      status = board.columns.map((column) => column.name);
    }
    return status;
  }, [boards, boardHref]);

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
                        boardHref,
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
                  {({values, setFieldValue, setFieldError,errors}) => (
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
                            {errors.subtasks && (
                              <span className="ml-2 text-sm text-red-500">
                                {errors.subtasks}
                              </span>
                            )}
                          </h2>
                          {values.subtasks.map((subtask) => (
                            <div key={subtask.id} className="flex space-x-3 items-center pr-2">
                              <SubTask
                                id={subtask.id}
                                title={subtask.title}
                                subtasks={values.subtasks}
                                setFieldValue={setFieldValue}
                                className="h-9 border border-gray-500 p-2 dark:border-lines-dark dark:bg-inherit dark:text-white"
                                placeholder={subtask.title}
                                value={subtask.title}
                              />
                              <XIcon
                                className="w-5 h-5 stroke-medium-grey"
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
                              />
                            </div>
                          ))}

                          <button
                            type="button"
                            className="w-full font-semibold bg-[#635FC740] dark:bg-white py-2 rounded-full text-[#635FC7]"
                            onClick={() => {
                              if (values.subtasks.length === 3) {
                                setFieldError("subtasks", "Can't add more than 3 subtasks");
                              } else {
                                setFieldValue(
                                  "subtasks",
                                  values.subtasks.concat({
                                    id: v4(),
                                    title: "",
                                    isCompleted: false,
                                  })
                                );
                              }
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

/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useMemo} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useSelector, useDispatch} from "react-redux";
import SelectMenu from "./SelectMenu";
import {Formik, Form} from "formik";
import {useLocation} from "react-router-dom";
import {CustomInput2} from "../../Input";
import CustomTextArea from "../../TextArea";
import SubTask from "./SubTask";
import {v4} from "uuid";
import {hideAddTask} from "../../../store/features/modals";
import {XIcon} from "@heroicons/react/outline";
import {addTask} from "../../../store/features/boards";
import {object, string} from "yup";
import {BoardContext} from "../../../App";
const initialValues = {
  taskTitle: "",
  taskDesc: "",
  subtasks: [
    {
      id: 1,
      title: "",
      isCompleted: false,
    },
  ],
  status: "",
};
const validationSchema = object({
  taskTitle: string().required("Can't be empty"),
  taskDesc: string().required("Can't be empty"),
});
export default function AddTask() {
  const open = useSelector((state) => state.modals.task.add);
  const board = useContext(BoardContext);

  const taskStatus = useMemo(() => {
    let status = [];

    if (board) {
      status = board.columns.map((column) => column.name);
    }
    return status;
  }, [board]);

  const dispatch = useDispatch();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[120] " onClose={() => void dispatch(hideAddTask())}>
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
              <Dialog.Panel className="flex flex-col  space-y-4 relative dark:bg-[#2B2C37] bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    dispatch(
                      addTask({
                        boardId: board.id,
                        status: values.status,
                        taskTitle: values.taskTitle,
                        taskDesc: values.taskDesc,
                        subtasks: values.subtasks,
                      })
                    );
                    dispatch(hideAddTask());
                  }}
                >
                  {(props) => {
                    return (
                      <Form>
                        <div className="pr-2 flex justify-between items-center ">
                          <h2 className="font-bold text-lg dark:text-white">Add new task</h2>
                        </div>
                        <div className="overflow-y-scroll h-[32rem] md:h-fit">
                          <div className="mt-4 space-y-4">
                            <CustomInput2
                              type="text"
                              name="taskTitle"
                              label="Title"
                              className="border border-gray-400 h-9 px-4"
                            />
                            <CustomTextArea
                              name="taskDesc"
                              label="Description"
                              placeholder="e.g It's always good to take a break. "
                              className="h-24 py-3 px-2 border border-gray-400"
                            />
                            <div className="space-y-4">
                              <h2 className="dark:text-white text-medium-grey font-semibold">
                                Subtasks{" "}
                                {props.errors.subtasks && (
                                  <span className="hidden ml-2 text-sm text-red-500">
                                    {props.errors.subtasks}
                                  </span>
                                )}
                              </h2>
                              <div className=" flex flex-col  space-y-3 justify-center items-center pr-2">
                                {props.values.subtasks.map((subtask) => (
                                  <Fragment key={subtask.id}>
                                    <div className="w-full flex space-x-3 items-center">
                                      <SubTask
                                        subtasks={props.values.subtasks}
                                        setFieldValue={props.setFieldValue}
                                        id={subtask.id}
                                        className="h-9 border border-[#828FA340] dark:border-lines-dark dark:bg-[#2B2C37] p-2 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                        placeholder="Cook"
                                      />
                                      <XIcon
                                        onClick={() => {
                                          if (props.values.subtasks.length === 1) {
                                            props.setFieldError(
                                              "subtasks",
                                              "You need at least one subtask"
                                            );
                                          } else {
                                            props.setFieldValue(
                                              "subtasks",
                                              props.values.subtasks.filter(
                                                (subt) => subt.id !== subtask.id
                                              )
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
                                disabled={props.values.subtasks.length === 14}
                                onClick={() => {
                                  if (props.values.subtasks.length === 3) {
                                    props.setFieldError(
                                      "subtasks",
                                      "Can't add more than 3 subtasks"
                                    );
                                  } else {
                                    props.setFieldValue(
                                      "subtasks",
                                      props.values.subtasks.concat({
                                        id: v4(),
                                        title: "",
                                        isCompleted: false,
                                      })
                                    );
                                  }
                                }}
                                className="disabled:bg-teal-700 disabled:text-white w-full bg-[#635FC71A] dark:bg-white font-semibold hover:bg-[#2f2e6240] py-2 rounded-full text-[#635FC7]"
                              >
                                + Add new Subtask
                              </button>
                            </div>
                          </div>
                          <div className="mt-4 w-full flex flex-col space-y-2">
                            <h3 className="text-[#828FA3] text-sm font-semibold dark:text-white">
                              Status
                            </h3>
                            <SelectMenu
                              taskStatus={taskStatus}
                              setFieldValue={props.setFieldValue}
                            />
                          </div>
                          <button
                            type="submit"
                            className="mt-6 w-full font-semibold bg-[#635FC7] py-2 rounded-full text-white"
                          >
                            Create task
                          </button>
                        </div>
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
  );
}

/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useMemo} from "react";
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

export default function AddTask() {
  const open = useSelector((state) => state.modals.task.add);
  const boards = useSelector((state) => state.boards);
  const location = useLocation();
  const boardHref = location.pathname.split("/")[2];
  const currentStatus = useMemo(() => {
    let status = [];

    const board = boards.find((board) => board.href === boardHref);
    if (board) {
      status = board.columns.map((column) => column.name);
    }
    return status;
  }, [boards, boardHref]);

  const dispatch = useDispatch();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[120]" onClose={() => void dispatch(hideAddTask())}>
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
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    console.log(values);
                    dispatch(
                      addTask({
                        boardHref,
                        status: values.status,
                        taskTitle: values.taskTitle,
                        taskDesc: values.taskDesc,
                        subtasks: values.subtasks,
                      })
                    );
                  }}
                >
                  {(props) => {
                    return (
                      <Form>
                        <div className="pr-2 flex justify-between items-center ">
                          <h2 className="font-bold text-lg">Add new task</h2>
                        </div>
                        <div className="mt-2 space-y-4">
                          <CustomInput2
                            type="text"
                            name="taskTitle"
                            label="Title"
                            className="border border-gray-400 h-9 px-4"
                          />
                          <CustomTextArea
                            name="taskDesc"
                            label="Description"
                            placeholder="e.g It's always good to take a break. This 15 min break will reacharge your batteries a little"
                            className="h-24 py-3 px-2 border border-gray-400"
                          />
                          <div className="space-y-4">
                            <h2>Subtasks</h2>
                            <div className="flex flex-col space-y-3 justify-center items-center pr-2">
                              {props.values.subtasks.map((subtask) => (
                                <Fragment key={subtask.id}>
                                  <div className="w-full flex  space-x-3 items-center pr-2">
                                    <SubTask
                                      subtasks={props.values.subtasks}
                                      setFieldValue={props.setFieldValue}
                                      id={subtask.id}
                                      name={subtask.name}
                                      className="h-9 border border-red-500 p-2"
                                      placeholder="Cook"
                                    />
                                    <XIcon
                                      onClick={() => {
                                        props.setFieldValue(
                                          "subtasks",
                                          props.values.subtasks.filter(
                                            (subt) => subt.id !== subtask.id
                                          )
                                        );
                                      }}
                                      className="w-5 h-5"
                                    />
                                  </div>
                                </Fragment>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                props.setFieldValue(
                                  "subtasks",
                                  props.values.subtasks.concat({
                                    id: v4(),
                                    title: "",
                                    isCompleted: false,
                                  })
                                );
                              }}
                              style={{backgroundColor: "#635FC740"}}
                              className="w-full font-semibold hover:bg-[#2f2e6240] py-2 rounded-full text-indigo-900"
                            >
                              + Add new Subtask
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 w-full flex flex-col space-y-2">
                          <h3 className="text-[#828FA3] text-sm font-semibold">Current Status</h3>
                          <SelectMenu
                            currentStatus={currentStatus}
                            setFieldValue={props.setFieldValue}
                          />
                        </div>
                        <button
                          type="submit"
                          style={{backgroundColor: "#A8A4FF"}}
                          className="mt-6 w-full font-semibold bg-[#A8A4FF] py-2 rounded-full text-white"
                        >
                          Create task
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
  );
}

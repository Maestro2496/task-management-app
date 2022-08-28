/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useMemo} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import {useSelector, useDispatch} from "react-redux/";
import {CustomInput2} from "../../Input";
import {Formik, Form} from "formik";

import {hideEditBoard} from "../../../store/features/modals";
import ColumnInput from "./ColumnInput";
import {v4} from "uuid";
import {editBoard} from "../../../store/features/boards";
import {BoardContext} from "../../../App";

export default function EditBoard() {
  const dispatch = useDispatch();
  const board = useContext(BoardContext);

  const initialValues = useMemo(() => {
    return {
      boardName: board?.name,
      columns: board?.columns,
    };
  }, [board]);
  const open = useSelector((state) => state.modals.board.edit);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[120]" onClose={() => void dispatch(hideEditBoard())}>
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
              <Dialog.Panel className="flex flex-col dark:bg-[#2B2C37]  relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    dispatch(
                      editBoard({
                        boardId: board.id,
                        boardName: values.boardName,
                        columns: values.columns,
                      })
                    );
                  }}
                >
                  {({values, setFieldValue}) => (
                    <Form className="">
                      <div className="pr-2 flex justify-between items-center ">
                        <h2 className="font-bold text-lg dark:text-white">Edit Board</h2>
                      </div>
                      <div className="space-y-8 mt-6">
                        <CustomInput2
                          type="text"
                          name="boardName"
                          label="Board Name"
                          className="border border-gray-400 h-9 px-4 "
                        />

                        <div className="">
                          <h2 className="block text-sm font-medium text-medium-grey dark:text-white">
                            Board Columns
                          </h2>
                          <div className="overflow-y-auto max-h-32 mt-2 space-y-3">
                            {values.columns.map((col) => (
                              <div key={col.id} className="flex space-x-3 items-center pr-2 ">
                                <ColumnInput
                                  className="h-9  p-2 border dark:placeholder:bg-[#2B2C37] dark:border-[#828FA340] dark:placeholder:text-white dark:bg-[#2B2C37] border-gray-800 rounded-md placeholder:text-black dark:text-white"
                                  placeholder={col.name}
                                  setFieldValue={setFieldValue}
                                  columns={values.columns}
                                  id={col.id}
                                />
                                <XIcon
                                  onClick={() => {
                                    setFieldValue(
                                      "columns",
                                      values.columns.filter((column) => column.id !== col.id)
                                    );
                                  }}
                                  className="hover:fill-teal-300 w-6 h-6 dark:stroke-[#828FA3]"
                                />
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            style={{}}
                            onClick={() => {
                              setFieldValue(
                                "columns",
                                values.columns.concat({
                                  id: v4(),
                                  name: "",
                                  tasks: [],
                                })
                              );
                            }}
                            className="mt-4 w-full font-semibold dark:bg-white bg-[#635FC740] py-2 rounded-full text-[#635FC7]"
                          >
                            + Add new column
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "#635FC7",
                        }}
                        className="mt-4 w-full font-semibold bg-[#A8A4FF] py-2 rounded-full text-white"
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

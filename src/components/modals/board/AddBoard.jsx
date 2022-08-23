import {Formik, Form} from "formik";
import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import {object} from "yup";
import {v4} from "uuid";
import {CustomInput2} from "../../Input";
import {useDispatch, useSelector} from "react-redux";
import SubTask from "../../SubTask";
import {addNewBoard} from "../../../store/features/boards/";

const initialValues = {
  boardName: "",
  columns: [
    {id: "1", name: "Todo", tasks: []},
    {id: "2", name: "Doing", tasks: []},
    {id: "3", name: "Done", tasks: []},
  ],
};

const validationSchema = object({
  boardName: "",
});
export default function AddBoard({open, setOpen}) {
  const dispatch = useDispatch();

  return (
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
              <Dialog.Panel className="flex flex-col  relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    console.log(values);
                    dispatch(addNewBoard(values));
                  }}
                >
                  {({values, setFieldValue}) => (
                    <Form>
                      <div className="pr-2 flex justify-between items-center ">
                        <h2 className="font-bold text-lg">Add New Board</h2>
                      </div>
                      <div className="space-y-4 mt-2">
                        <CustomInput2
                          type="text"
                          name="boardName"
                          label="Board Name"
                          id="boardName"
                          className="border border-gray-400 h-9 px-4"
                        />

                        <div className="">
                          <h2 className="block text-sm font-medium text-gray-700">Columns</h2>
                          <div className="mt-2 space-y-3">
                            {values.columns.map((column) => (
                              <div key={column.id} className="flex space-x-3 items-center pr-2 ">
                                <SubTask
                                  type="text"
                                  name={column.name}
                                  id={column.id}
                                  className="h-9  p-2 border border-gray-800 rounded-md"
                                  placeholder={column.name}
                                  setFieldValue={setFieldValue}
                                  columns={values.columns}
                                />
                                <XIcon
                                  onClick={() => {
                                    setFieldValue(
                                      "columns",
                                      values.columns.filter((col) => col.id !== column.id)
                                    );
                                  }}
                                  className="hover:fill-teal-300 w-6 h-6"
                                />
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => {
                              const id = v4();
                              setFieldValue(
                                "columns",
                                values.columns.concat({id, name: "", tasks: []})
                              );
                            }}
                            type="button"
                            className="mt-4 w-full font-semibold bg-[#635FC740] py-2 rounded-full text-indigo-900"
                          >
                            + Add new column
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        style={{backgroundColor: "#A8A4FF"}}
                        className="relative z-[135] mt-8 w-full font-semibold bg-[#A8A4FF] py-2 rounded-full text-white"
                      >
                        Create new board
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

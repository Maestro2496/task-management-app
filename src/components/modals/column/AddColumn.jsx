/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux/";
import {addColumn} from "../../../store/features/boards";
import {hideAddColumn} from "../../../store/features/modals";
export default function AddColumn() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const boardHref = location.pathname.split("/")[2];
  const open = useSelector((state) => state.modals.column.add);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[130]" onClose={() => dispatch(hideAddColumn())}>
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

        <div className="fixed z-10 inset-0 overflow-y-auto">
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
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <form
                  className="flex flex-col space-y-3 justify-center items-center"
                  onSubmit={(event) => {
                    event.preventDefault();
                    dispatch(addColumn({boardHref, columnName: name}));
                    dispatch(hideAddColumn());
                  }}
                >
                  <label className="w-full text-left">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="border border-gray-600/30 focus:ring-gray-500 rounded-md px-4 h-8 w-full"
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 bg-teal-900 text-center rounded-md w-1/2 text-white"
                    style={{backgroundColor: "#635FC7"}}
                  >
                    Add new column
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

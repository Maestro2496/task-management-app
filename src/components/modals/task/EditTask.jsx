/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";

import SelectMenu from "../SelectMenu";

import CustomInput from "../../Input";
import CustomTextArea from "../../TextArea";
import SubTask from "../../SubTask";
import IconCross from "../../../assets/IconCross";

export default function EditTask({open, setOpen}) {
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
              <Dialog.Panel className="flex flex-col space-y-4 relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                <div className="pr-2 flex justify-between items-center ">
                  <h2 className="font-bold text-lg">Edit task</h2>
                </div>
                <div className="space-y-4">
                  <CustomInput
                    type="text"
                    name="title"
                    label="Title"
                    className="border border-gray-400 h-9"
                  />
                  <CustomTextArea
                    label="Description"
                    placeholder="e.g It's always good to take a break. This 15 min break will reacharge your batteries a little"
                    className="h-24 py-3 px-2 border border-gray-400"
                  />
                  <div className="space-y-4">
                    <h2>Subtasks</h2>
                    <div className="flex space-x-3 items-center pr-2">
                      <SubTask
                        className="h-9 border border-red-500 p-2"
                        placeholder="e.g Eddy the great guy"
                      />
                      <IconCross className="hover:fill-teal-300" />
                    </div>
                    <div className="flex space-x-3 items-center pr-2">
                      <SubTask
                        className="h-9 border border-red-500 p-2"
                        placeholder="e.g Eddy the great guy"
                      />
                      <IconCross className="hover:fill-teal-300" />
                    </div>
                    <button className="w-full font-semibold bg-[#635FC740] py-2 rounded-full text-indigo-900">
                      + Add new Subtask
                    </button>
                  </div>
                </div>

                <div className="w-full flex flex-col space-y-4">
                  <h3 className="text-[#828FA3] text-sm font-semibold">Current Status</h3>
                  <SelectMenu />
                </div>
                <button className="w-full font-semibold bg-[#A8A4FF] py-2 rounded-full text-white">
                  Create task
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useEffect, useMemo, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/solid";

const taskStatus = [{name: "Todo"}, {name: "Doing"}, {name: "Done"}];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectMenu({currentStatus = 0, setFieldValue}) {
  const indexOfCurrentStatus = useMemo(() => {
    const index = taskStatus.findIndex((status) => status.name === currentStatus);
    if (index === -1) return 0;
    return index;
  }, [currentStatus]);

  const [selected, setSelected] = useState(taskStatus[indexOfCurrentStatus]);
  useEffect(() => {
    setFieldValue("status", selected.name);
  }, [selected, setFieldValue]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({open}) => (
        <>
          <div className="mt-1 relative z-[60]">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-[70] mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {taskStatus.map((status) => (
                  <Listbox.Option
                    key={status.name}
                    className={({active}) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={status}
                  >
                    {({selected, active}) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {status.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

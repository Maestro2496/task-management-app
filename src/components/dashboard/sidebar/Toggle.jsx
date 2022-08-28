/* This example requires Tailwind CSS v2.0+ */
import {useContext, useEffect, useState} from "react";
import {Switch} from "@headlessui/react";
import {LightContext} from "../../../App";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Toggle() {
  const {light, setLight} = useContext(LightContext);

  return (
    <Switch
      checked={light}
      onChange={(value) => {
        setLight(value);
        setLight(value);
      }}
      className={classNames(
        light ? "bg-blue-900" : "bg-blue-400",
        "px-1 relative flex items-center flex-shrink-0 h-[18px] w-[36px] border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none "
      )}
      style={{backgroundColor: "#635FC7"}}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          light ? "translate-x-4" : "translate-x-0",
          "pointer-events-none inline-block h-[13px] w-[14px] rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        )}
      />
    </Switch>
  );
}

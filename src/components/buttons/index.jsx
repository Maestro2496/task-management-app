import React from "react";
import clsx from "clsx";

export default function Button({py, px, children, color, opacity = "1", width}) {
  return (
    <button
      className={clsx("rounded-full py-6 bg-[#635FC7] ")}
      style={{padding: `${py} ${px}`, color, opacity, width: `${width}rem`}}
    >
      {children}
    </button>
  );
}

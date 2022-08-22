import clsx from "clsx";

export default function SubTask({className, name, placeholder}) {
  return (
    <input
      type="text"
      name={name}
      id={name}
      className={clsx("shadow-sm  block w-full sm:text-sm  rounded-md", className)}
      placeholder={placeholder}
    />
  );
}

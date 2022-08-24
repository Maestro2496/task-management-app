import clsx from "clsx";
import {useField} from "formik";

export function CustomInput1({label, ...props}) {
  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...props}
          className={clsx(
            "cursor-pointer shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
            props.className
          )}
        />
      </div>
    </div>
  );
}
export function CustomInput2({label, ...props}) {
  const [field] = useField(props);
  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...field}
          {...props}
          className={clsx(
            "cursor-pointer shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
            props.className
          )}
        />
      </div>
    </div>
  );
}

import clsx from "clsx";
import {useField} from "formik/";
export default function CustomTextArea({label, ...props}) {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-medium-grey dark:text-white"
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <textarea
          {...field}
          {...props}
          className={clsx(
            "bg-white relative w-full border bg-inherit dark:text-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1  sm:text-sm",
            props.className,
            meta.touched && meta.error
              ? "border-red-500 animate-pulse focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          )}
        />
        {meta.touched && meta.error ? (
          <div className="absolute right-3 bottom-2 text-[#EA5555] animate-pulse ">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}

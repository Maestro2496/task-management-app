import clsx from "clsx";
import {useField} from "formik/";
export default function CustomTextArea({label, ...props}) {
  const [field] = useField(props);
  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          {...field}
          {...props}
          className={clsx(
            "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
            props.className
          )}
        />
      </div>
    </div>
  );
}

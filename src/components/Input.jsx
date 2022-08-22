import clsx from "clsx";
export default function CustomInput({label, className, type, name, placeholder}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={name}
          className={clsx(
            "cursor-pointer shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
            className
          )}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

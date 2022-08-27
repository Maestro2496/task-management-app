import clsx from "clsx";

export default function SubTask({className, name, placeholder, setFieldValue, columns, id}) {
  return (
    <input
      type="text"
      name={name}
      id={name}
      className={clsx("shadow-sm  block w-full sm:text-sm  rounded-md", className)}
      placeholder={name}
      onChange={(event) => {
        setFieldValue(
          "columns",
          columns.map((column) => {
            if (column.id === id) {
              return {
                ...column,
                name: event.target.value,
              };
            }
            return column;
          })
        );
      }}
    />
  );
}

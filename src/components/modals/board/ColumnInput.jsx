import clsx from "clsx";

export default function ColumnInput({className, placeholder, setFieldValue, columns, id}) {
  return (
    <input
      type="text"
      className={clsx("shadow-sm  block w-full sm:text-sm  rounded-md", className)}
      placeholder={placeholder}
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

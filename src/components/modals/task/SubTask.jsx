import clsx from "clsx";

export default function SubTask({className, name, placeholder, setFieldValue, subtasks, id}) {
  return (
    <input
      type="text"
      name={name}
      id={name}
      className={clsx("shadow-sm  block w-full sm:text-sm  rounded-md", className)}
      placeholder={placeholder}
      onChange={(event) => {
        setFieldValue(
          "subtasks",
          subtasks.map((subtask) => {
            if (subtask.id === id) {
              return {
                ...subtask,
                title: event.target.value,
              };
            }
            return subtask;
          })
        );
      }}
    />
  );
}

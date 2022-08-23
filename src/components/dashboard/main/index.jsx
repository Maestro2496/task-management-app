import clsx from "clsx";
import React, {useMemo, useState} from "react";
import TaskDescription from "../../modals/task/TaskDescription";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import EditTask from "../../modals/task/EditTask";
import DeleteTask from "../../modals/task/DeleteTask";

const Task = ({task}) => {
  const [openTaskDesc, setOpenTaskDesc] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const taskCompleted = useMemo(() => {
    return task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }, [task.subtasks]);
  return (
    <>
      <DeleteTask
        open={openDeleteTask}
        setOpen={setOpenDeleteTask}
        setOpenTaskDesc={setOpenTaskDesc}
      />
      <EditTask open={openEditTask} setOpen={setOpenEditTask} setOpenTaskDesc={setOpenTaskDesc} />
      <TaskDescription
        open={openTaskDesc}
        setOpen={setOpenTaskDesc}
        task={task}
        taskCompleted={taskCompleted}
        setOpenDeleteTask={setOpenDeleteTask}
        setOpenEditTask={setOpenEditTask}
      />
      <div
        onClick={() => setOpenTaskDesc(true)}
        className=" py-6 px-3 bg-slate-50 shadow-lg rounded-md cursor-pointer"
      >
        <p className="font-bold text-black">{task.title}</p>
        <p className="text-sm text-gray-500">{`${taskCompleted} of ${task.subtasks.length} subtasks`}</p>
      </div>
    </>
  );
};
export default function TaskBoard() {
  const sidebar = useSelector((state) => state.sidebar);
  const params = useParams();
  let boards = useSelector((state) => state.boards);

  const board = useMemo(() => {
    return boards.find((board) => board.href === params.boardId);
  }, [boards, params.boardId]);

  return (
    <>
      <div
        className={clsx(
          "transition-all duration-700 border border-red-500 bg-[#E4EBFA] flex w-full space-x-4 relative z-40  h-full pt-8 pb-8 pr-8",
          sidebar === "show" ? "ml-[22%] pl-8" : "ml-0 pl-12"
        )}
      >
        {board.columns.map((column) => {
          return (
            <div
              key={column.name}
              className="w-[22rem] h-full rounded-md  p-4 flex flex-col space-y-4 bg-transparent"
            >
              <div className="flex space-x-3 justify-start items-center">
                <div className="rounded-full w-3 h-3 bg-teal-500" />
                <span>{`${column.name} (${column.tasks.length})`}</span>
              </div>
              <div className="flex flex-col space-y-3 overflow-y-scroll">
                {column.tasks.map((task) => (
                  <Task key={task.title} task={task} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="w-[22rem] h-full flex items-center justify-center">
          <p className="bg-[#E4EBFA] mt-8 h-[86%] w-full flex justify-center items-center rounded-md shadow-lg">
            + New Column
          </p>
        </div>
      </div>
    </>
  );
}

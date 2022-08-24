import clsx from "clsx";
import React, {useMemo, useState} from "react";
import TaskDescription from "../../modals/task/TaskDescription";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import EditTask from "../../modals/task/EditTask";
import DeleteTask from "../../modals/task/DeleteTask";
import AddColumn from "../../modals/column/AddColumn";
import {showAddColumn} from "../../../store/features/modals";

const Task = ({task}) => {
  const [openTaskDesc, setOpenTaskDesc] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const taskCompleted = useMemo(() => {
    return task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }, [task.subtasks]);
  return (
    <>
      <div
        onClick={() => setOpenTaskDesc(true)}
        className=" py-6 px-3 bg-slate-50 shadow-lg rounded-md cursor-pointer"
      >
        <p className="font-bold text-black">{task.title}</p>
        <p className="text-sm text-gray-500">{`${taskCompleted} of ${task.subtasks.length} subtasks`}</p>
      </div>
      <DeleteTask
        open={openDeleteTask}
        setOpen={setOpenDeleteTask}
        setOpenTaskDesc={setOpenTaskDesc}
        task={task}
      />
      <EditTask
        open={openEditTask}
        setOpen={setOpenEditTask}
        setOpenTaskDesc={setOpenTaskDesc}
        task={task}
      />
      <TaskDescription
        open={openTaskDesc}
        setOpen={setOpenTaskDesc}
        task={task}
        taskCompleted={taskCompleted}
        setOpenDeleteTask={setOpenDeleteTask}
        setOpenEditTask={setOpenEditTask}
      />
    </>
  );
};
export default function TaskBoard() {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const params = useParams();
  let boards = useSelector((state) => state.boards);

  const board = useMemo(() => {
    return boards.find((board) => board.href === params.boardId);
  }, [boards, params.boardId]);

  return (
    <>
      <AddColumn />
      <div
        className={clsx(
          "transition-all duration-700 bg-[#E4EBFA] flex w-fit space-x-4 relative z-40  h-full pt-8 pb-8 pr-8",
          sidebar === "show" ? "ml-[22%] pl-8" : "ml-0 pl-12"
        )}
      >
        {board.columns.map((column) => {
          return (
            <div
              key={column.name}
              className="w-[22rem] h-full rounded-md p-4 flex flex-col space-y-4 bg-transparent border border-cyan-300 shadow-md"
            >
              <div className="flex space-x-3 justify-start items-center">
                <div className="rounded-full w-3 h-3 bg-teal-500" />
                <span>{`${column.name} (${column.tasks.length})`}</span>
              </div>
              {column.tasks.length === 0 ? (
                <div>
                  <p>This column has no task</p>
                  <button>Add a task</button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 overflow-y-scroll h-[38rem] p-2">
                  {column.tasks.map((task) => (
                    <Task key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="w-[22rem] h-full flex items-center justify-center border border-cyan-300 rounded-md">
          <button
            onClick={() => dispatch(showAddColumn())}
            className="bg-[#E4EBFA] mt- w-full h-[36.5rem] flex justify-center items-center rounded-md shadow-lg"
          >
            + New Column
          </button>
        </div>
      </div>
    </>
  );
}

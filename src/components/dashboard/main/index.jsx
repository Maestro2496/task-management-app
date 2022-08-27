import clsx from "clsx";
import React, {useCallback, useMemo, useState} from "react";
import TaskDescription from "../../modals/task/TaskDescription";
import {useSelector, useDispatch} from "react-redux";
import {useLocation, useParams} from "react-router-dom";

import EditTask from "../../modals/task/EditTask";
import DeleteTask from "../../modals/task/DeleteTask";
import AddColumn from "../../modals/column/AddColumn";
import {showAddColumn} from "../../../store/features/modals";
import {editTask} from "../../../store/features/boards";

const Task = ({task}) => {
  const [openTaskDesc, setOpenTaskDesc] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const taskCompleted = useMemo(() => {
    return task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }, [task.subtasks]);
  const onDrag = useCallback(
    (event) => {
      const taskInfos = {
        title: task.title,
        description: task.description,
        subtasks: task.subtasks,
        status: task.status,
        id: task.id,
      };

      event.dataTransfer.setData("application/json", JSON.stringify(taskInfos));
      event.dataTransfer.setData("text", "Eddy");
    },
    [task]
  );
  return (
    <>
      <div
        draggable
        onClick={() => setOpenTaskDesc(true)}
        onDragStart={onDrag}
        className="cursor-grab py-2 md:py-6 px-3 bg-slate-50 dark:bg-[#2B2C37] shadow-lg rounded-md "
      >
        <p className="font-bold text-black dark:text-white">{task.title}</p>
        <p className="text-sm text-gray-500 dark:text-[#828FA3]">{`${taskCompleted} of ${task.subtasks.length} subtasks`}</p>
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
  const location = useLocation();
  const boardHref = location.pathname.split("/")[2];
  const board = useMemo(() => {
    return boards.find((board) => board.href === params.boardId);
  }, [boards, params.boardId]);
  const onDrop = useCallback(
    (event, currentColName) => {
      const task = JSON.parse(event.dataTransfer.getData("application/json"));

      dispatch(
        editTask({
          boardHref,
          prevColName: task.status,
          currentColName,
          taskId: task.id,
          taskTitle: task.title,
          taskDesc: task.description,
          subtasks: task.subtasks,
        })
      );
    },
    [boardHref, dispatch]
  );
  return (
    <>
      <AddColumn />
      <div
        className={clsx(
          "transition-all ml-4 py-12 duration-500 dark:bg-[#20212C] bg-[#E4EBFA] flex w-fit space-x-4 relative z-40  h-screen pt-8 pb-8 pr-8",
          sidebar === "show" ? "lg:ml-[22%] md:ml-[32%] md:pl-8" : " md:pl-12"
        )}
      >
        {board.columns.map((column) => {
          return (
            <div
              onDrop={(event) => onDrop(event, column.name)}
              onDragOver={(e) => e.preventDefault()}
              key={column.name}
              className=" w-[16rem] md:w-[22rem] h-[85%] rounded-md md:p-4 flex flex-col justify-center items-center space-y-4 bg-transparent "
            >
              <div className="w-full flex space-x-3 justify-start items-center pl-2 ">
                <div className="rounded-full w-3 h-3 bg-teal-500" />
                <span className="dark:text-[#828FA3]">{`${column.name} (${column.tasks.length})`}</span>
              </div>
              {column.tasks.length === 0 ? (
                <div className=" rounded-md flex flex-col space-y-4 items-center justify-center h-[38rem] p-2 w-full dark:text-white">
                  <p>This column has no task</p>
                  <button className="bg-primary p-2 rounded-md text-white">Add a task</button>
                </div>
              ) : (
                <div className=" rounded-md flex flex-col space-y-3 overflow-y-scroll h-[38rem] p-2 w-full">
                  {column.tasks.map((task) => (
                    <Task key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="w-[16rem] md:w-[22rem] h-[85%] bg-[#E4EBFA] dark:bg-[#20212C] rounded-md md:p-4 flex flex-col justify-center items-center space-y-4 bg-transparent ">
          <button
            onClick={() => dispatch(showAddColumn())}
            className=" mt- w-full md:h-[36.5rem] flex justify-center items-center dark:text-[#828FA3]"
          >
            + New Column
          </button>
        </div>
      </div>
    </>
  );
}

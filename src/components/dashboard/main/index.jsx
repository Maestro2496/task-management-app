import clsx from "clsx";
import React, {useContext, useMemo, useState} from "react";
import TaskDescription from "../../modals/task/TaskDescription";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {BoardContext} from "../../../App";
import "./Main.scss";
import AddBoard from "../../modals/board/AddBoard";
import EditBoard from "../../modals/board/EditBoard";

const Column = () => {
  <div></div>;
};
const Task = ({task}) => {
  const [open, setOpen] = useState(false);
  const taskCompleted = useMemo(() => {
    return task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }, [task.subtasks]);
  return (
    <>
      <TaskDescription open={open} setOpen={setOpen} task={task} taskCompleted={taskCompleted} />
      <div
        onClick={() => setOpen(true)}
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
  let boards = useContext(BoardContext);

  const tasks = useMemo(() => {
    return boards.find((board) => board.href === params.boardId);
  }, [boards, params.boardId]);

  return (
    <>
      <EditBoard/>
      <div
        className={clsx(
          "flex w-full space-x-4 relative z-40  h-full pt-8 pb-8 pr-8",
          sidebar === "show" ? "pl-8" : "pl-12"
        )}
      >
        {tasks.columns.map((column) => {
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
        {/*  <div className="w-[22rem] h-full rounded-md  p-4 flex flex-col space-y-4 bg-transparent">
          <div className="flex space-x-3 justify-start items-center">
            <div className="rounded-full w-3 h-3 bg-teal-500" />
            <span>TODO (6)</span>
          </div>
          <div className="flex flex-col space-y-3 overflow-y-scroll">
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
        </div>
        <div className="w-[22rem] h-full rounded-md  p-4 flex flex-col space-y-4 bg-transparent">
          <div className="flex space-x-3 justify-start items-center">
            <div className="rounded-full w-3 h-3 bg-purple-500" />
            <span>DOING (6)</span>
          </div>
          <div className="flex flex-col space-y-3 overflow-y-scroll">
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
        </div>
        <div className="w-[22rem] h-full rounded-md  p-4 flex flex-col space-y-4 bg-transparent">
          <div className="flex space-x-3 justify-start items-center">
            <div className="rounded-full w-3 h-3 bg-green-500" />
            <span>DONE (6)</span>
          </div>
          <div className="flex flex-col space-y-3 overflow-y-scroll">
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
        </div> */}
        <div className="w-[22rem] h-full flex items-center justify-center">
          <p className="bg-[#E4EBFA] mt-8 h-[86%] w-full flex justify-center items-center rounded-md shadow-lg">
            + New Column
          </p>
        </div>
      </div>
    </>
  );
}

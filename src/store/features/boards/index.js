import {createSlice} from "@reduxjs/toolkit";
import {boards} from "../../../data";
import {v4} from "uuid";

const initialState = boards;

const boardReducer = createSlice({
  initialState,
  name: "boards",
  reducers: {
    addNewBoard: (boards, action) => {
      console.log("Eddy");
      const id = v4();
      const {boardName, columns} = action.payload;
      const href = boardName.replace(" ", "");
      boards.push({id, name: boardName, href, columns});
    },
    editBoardName: (boards, action) => {
      const {boardId, name} = action.payload;
      const newBoards = boards.map((board) => {
        if (board.id === boardId) {
          board.name = name;
          board.href = name.replace(" ", "");
        }
        return board;
      });
      return newBoards;
    },
    addColumn: (boards, action) => {
      const {boardId, name} = action.payload;
      //Find the board
      const board = boards.find((board) => board.id === boardId);
      //Add a new column
      board.columns.push({name, tasks: []});
    },
    editColumnName: (boards, action) => {
      const {boardId, columnId, name} = action.payload;
      //Find the board
      const board = boards.find((board) => board.id === boardId);

      //Find and update the column name
      board.columns = board.columns.map((column) => {
        if (column.id === columnId) {
          column.name = name;
        }
        return column;
      });
    },
    deleteColumn: (boards, action) => {
      const {boardId, columnId} = action.payload;
      //Find the board
      const board = boards.find((board) => board.id === boardId);

      //Find and delete the column name
      board.columns = board.columns.filter((column) => column.id !== columnId);
    },
    deleteBoard: (boards, action) => {
      const {boardId} = action.payload;
      const newBoard = boards.filter((board) => board.id !== boardId);
      return newBoard;
    },
    addTask: (boards, action) => {
      const {boardHref, status, taskTitle, taskDesc, subtasks} = action.payload;
      //Find the board
      const board = boards.find((board) => board.href === boardHref);
      //Find the column
      const column = board.columns.find((column) => column.name === status);

      //Add a new Task
      column.tasks.push({title: taskTitle, description: taskDesc, status: column.name, subtasks});
    },
    editTask: (boards, action) => {
      const {boardHref, columnId, taskId, taskTitle, taskDesc, subtasks} = action.payload;
      //Find the board
      const board = boards.find((board) => board.href === boardHref);
      //Find the column
      const column = board.columns.find((column) => column.id === columnId);

      //Add a new Task
      column.tasks = column.tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            ...(taskTitle && {title: taskTitle}),
            ...(taskDesc && {description: taskDesc}),
            ...(subtasks && {subtasks}),
          };
        }
        return task;
      });
    },
  },
});

export const {addNewBoard, editBoardName, addColumn, editColumnName, deleteColumn, deleteBoard,addTask} =
  boardReducer.actions;
export default boardReducer.reducer;

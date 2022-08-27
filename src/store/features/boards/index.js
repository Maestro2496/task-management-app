import {createSlice} from "@reduxjs/toolkit";
import {boards} from "../../../data";
import {v4} from "uuid";

const initialState = boards;

const boardReducer = createSlice({
  initialState,
  name: "boards",
  reducers: {
    addNewBoard: (boards, action) => {
      const id = v4();
      const {boardName, columns} = action.payload;
      const href = boardName.replace(" ", "");
      boards.push({id, name: boardName, href, columns});
    },
    editBoard: (boards, action) => {
      const {boardHref, boardName, columns} = action.payload;
      const newBoards = boards.map((board) => {
        if (board.href === boardHref) {
          return {
            ...board,
            name: boardName,
            columns: columns,
            //href: boardName.replace(" ", ""),
          };
        }
        return board;
      });
      return newBoards;
    },
    addColumn: (boards, action) => {
      const {boardHref, columnName} = action.payload;
      //Find the board
      const board = boards.find((board) => board.href === boardHref);
      //Add a new column
      board.columns.push({id: v4(), name: columnName, tasks: []});
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
      const {boardHref, currentColName, taskId, taskTitle, taskDesc, subtasks, prevColName} =
        action.payload;
      
      //Find the board
      const board = boards.find((board) => board.href === boardHref);

      //Find the prevColumn
      const prevColumn = board.columns.find((column) => column.name === prevColName);
      //Find the currentColumn
      const currentColumn = board.columns.find((column) => column.name === currentColName);
      if (currentColName === prevColName) {
        //Edit the task
        prevColumn.tasks = prevColumn.tasks.map((task) => {
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
      } else {
        console.log('Here')
        //Add the task to the new column and delete from the prev
        currentColumn.tasks.push({
          id: taskId,
          title: taskTitle,
          description: taskDesc,
          subtasks,
          status: currentColName,
        });
        prevColumn.tasks = prevColumn.tasks.filter((task) => task.id !== taskId);
      }
    },
    deleteTask: (boards, action) => {
      const {boardHref, columnName, taskId} = action.payload;
      //Find the board
      const board = boards.find((board) => board.href === boardHref);
      //Find the column
      const column = board.columns.find((column) => column.name === columnName);

      //Delete the task by it's Id
      column.tasks = column.tasks.filter((task) => task.id !== taskId);
    },
  },
});

export const {
  addNewBoard,
  editBoard,
  addColumn,
  editColumnName,
  deleteColumn,
  deleteBoard,
  addTask,
  editTask,
  deleteTask,
} = boardReducer.actions;
export default boardReducer.reducer;

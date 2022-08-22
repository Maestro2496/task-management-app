import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

const boardReducer = createSlice({
  initialState,
  name: "board",
  reducer: {
    add: (boards, action) => {
      //columns = [{name:'', tasks:[]}]
      const {name, columns} = action.payload;
      const href = name.replace(" ", "");
      boards.push({name, href, columns});
    },
    editName: (boards, action) => {
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
    delete: (boards, action) => {
      const {boardId} = action.payload;
      const newBoard = boards.filter((board) => board.id !== boardId);
      return newBoard;
    },
  },
});

export default boardReducer.reducer;

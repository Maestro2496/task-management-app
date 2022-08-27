import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  board: {
    add: false,
    edit: false,
    delete: false,
    mobile: false,
  },
  task: {
    add: false,
    edit: false,
    delete: false,
  },
  column: {
    add: false,
  },
};
const modalSlice = createSlice({
  initialState,
  name: "modals",
  reducers: {
    //Board
    //AddBoardModal
    showAddBoard: (state) => {
      //Show the addBoard and hide all the others
      state.board.add = true;
    },
    hideAddBoard: (state) => {
      state.board.add = false;
    },
    //EditBoardModal
    showEditBoard: (state) => {
      state.board.edit = true;
    },
    hideEditBoard: (state) => {
      state.board.edit = false;
    },
    //DeleteBoardModal
    showDeleteBoard: (state) => {
      state.board.delete = true;
    },
    hideDeleteBoard: (state) => {
      state.board.delete = false;
    },
    //Column
    showAddColumn: (state) => {
      state.column.add = true;
    },
    hideAddColumn: (state) => {
      state.column.add = false;
    },
    showAddTask: (state) => {
      state.task.add = true;
    },
    hideAddTask: (state) => {
      state.task.add = false;
    },
    showMobile: (state) => {
      state.board.mobile = true;
    },
    hideMobile: (state) => {
      state.board.mobile = false;
    },
  },
});
export const {
  showAddBoard,
  showAddTask,
  showDeleteBoard,

  showEditBoard,

  hideAddBoard,
  hideAddTask,
  hideDeleteBoard,

  hideEditBoard,
  showAddColumn,
  hideAddColumn,
  showMobile,
  hideMobile,
} = modalSlice.actions;
export default modalSlice.reducer;

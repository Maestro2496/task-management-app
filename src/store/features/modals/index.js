import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  board: {
    add: false,
    edit: false,
    delete: false,
  },
  task: {
    add: false,
    edit: false,
    delete: false,
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
    //Task
    //AddTaskModal
    showAddTask: (state) => {
      state.task.add = true;
    },
    hideAddTask: (state) => {
      state.task.add = false;
    },
    //EditTaskModal
    showEditTask: (state) => {
      state.task.edit = true;
    },
    hideEditTask: (state) => {
      state.task.edit = false;
    },
    //DeleteTaskModal
    showDeleteTask: (state) => {
      state.task.delete = true;
    },
    hideDeleteTask: (state) => {
      state.task.delete = false;
    },
  },
});
export const {
  showAddBoard,
  showAddTask,
  showDeleteBoard,
  showDeleteTask,
  showEditBoard,
  showEditTask,
  hideAddBoard,
  hideAddTask,
  hideDeleteBoard,
  hideDeleteTask,
  hideEditBoard,
  hideEditTask,
} = modalSlice.actions;
export default modalSlice.reducer;

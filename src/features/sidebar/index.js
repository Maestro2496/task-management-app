import {createSlice} from "@reduxjs/toolkit";
const initialState = "show";

export const sidebarReducer = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    show: () => {
      return "show";
    },
    hide: () => {
      return "hide";
    },
  },
});

//Action creators
export const {show, hide} = sidebarReducer.actions;

export default sidebarReducer.reducer;

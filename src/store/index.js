import {configureStore} from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebar";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export default store;

import {configureStore} from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar";
import boardReducer from "./features/boards";
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    boards: boardReducer,
  },
});

export default store;

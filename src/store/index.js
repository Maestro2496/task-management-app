import {configureStore} from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar";
import boardReducer from "./features/boards";
import modalReducer from "./features/modals";
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    boards: boardReducer,
    modals: modalReducer,
  },
});

export default store;

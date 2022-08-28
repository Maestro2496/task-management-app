import {configureStore} from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar";
import boardReducer from "./features/boards";
import modalReducer from "./features/modals";
import {loadState, saveState} from "./storage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    boards: boardReducer,
    modals: modalReducer,
  },
  preloadedState: {
    sidebar: "show",
    boards: persistedState,
    modals: {
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
    },
  },
});
store.subscribe(() => {
  saveState(store.getState().boards);
});
export default store;

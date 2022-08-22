import {boards} from "./data";

import "./App.css";
import React from "react";
import {Outlet} from "react-router-dom";
export const BoardContext = React.createContext();

function App() {
  return (
    <BoardContext.Provider value={boards}>
      <div className="font-jakarta">
        <Outlet />
      </div>
    </BoardContext.Provider>
  );
}

export default App;

import "./App.css";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
export const LightContext = React.createContext();
export const BoardContext = React.createContext();
function App() {
  const [light, setLight] = useState(true);
  const boardId = useLocation().pathname.split("/")[2];
  console.log({boardId})
  const boards = useSelector((state) => state.boards);
  const board = useMemo(() => {
    return boards.find((board) => String(board.id) === boardId);
  }, [boards, boardId]);
  useEffect(() => {
    if (!light) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [light]);
  return (
    <LightContext.Provider value={{light, setLight}}>
      <BoardContext.Provider value={board}>
        <div className="font-jakarta">
          <Outlet />
        </div>
      </BoardContext.Provider>
    </LightContext.Provider>
  );
}

export default App;

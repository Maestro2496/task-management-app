import "./App.css";
import React from "react";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
      <div className="font-jakarta">
        <Outlet />
      </div>
    </>
  );
}

export default App;

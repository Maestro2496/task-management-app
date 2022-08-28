import {boards} from "../data";

export const loadState = () => {
  try {
    const storageBoards = localStorage.getItem("boards");
    if (!storageBoards) {
      return boards;
    } else {
      return JSON.parse(storageBoards);
    }
  } catch (error) {
    return boards;
  }
};

export const saveState = (boards) => {
  try {
    localStorage.setItem("boards", JSON.stringify(boards));
  } catch (error) {
    console.log(error);
  }
};

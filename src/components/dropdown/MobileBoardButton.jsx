/* This example requires Tailwind CSS v2.0+ */

import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";
import {useContext} from "react";
import {useSelector, useDispatch} from "react-redux";
import {BoardContext} from "../../App";
import {showMobile} from "../../store/features/modals";

export default function MobileBoardButton() {
  const open = useSelector((state) => state.modals.board.mobile);
  const board = useContext(BoardContext);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center items-center w-fit">
      <p className="w-full">{board?.name}</p>
      <div
        className="inline-flex justify-center  bg-transparent text-sm font-medium text-medium-grey"
        onClick={() => {
          dispatch(showMobile());
        }}
      >
        {!open ? (
          <ChevronDownIcon className="-mr-1 ml-2 h-4 w-4 stroke-[#635FC7]" aria-hidden="true" />
        ) : (
          <ChevronUpIcon className="-mr-1 ml-2 h-4 w-4 stroke-[#635FC7]" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

/* This example requires Tailwind CSS v2.0+ */

import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";
import {useSelector, useDispatch} from "react-redux";
import {showMobile} from "../../store/features/modals";

export default function MobileBoardButton() {
  const open = useSelector((state) => state.modals.board.mobile);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center items-center">
      <p>PlatformLauch</p>
      <div
        className="inline-flex justify-center w-full bg-transparent text-sm font-medium text-medium-grey"
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

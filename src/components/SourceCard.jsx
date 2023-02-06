import React, { useState } from "react";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SourceCard = ({ source, i, gotoSource, deleteCard, rename }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  return (
    <div
      key={source.id}
      className=" bg-grey p-3 rounded-2xl cursor-pointer"
      onClick={() => {
        gotoSource(source.id);
      }}
    >
      <div className="flex justify-between">
        <div className="font-bold text-lg">{source.Name}</div>
        <div
          className=" bg-gray-200 rounded-xl relative"
          onClick={(e) => {
            e.stopPropagation();
            setOptionsOpen(!optionsOpen);
          }}
        >
          <FontAwesomeIcon
            className="w-6 text-gray-600 mx-2"
            icon={faEllipsis}
          />
          <div
            className={`${
              !optionsOpen && "hidden"
            } z-20 absolute border-2 top-10 right-0 text-gray-800 font-semibold text-lg bg-grey px-3 pr-6 rounded-2xl`}
          >
            <div
              className="text-left my-3 whitespace-nowrap hover:text-gray-600"
            //   onClick={rename}
            >
              rename
            </div>
            <div
              className="text-left my-3 whitespace-nowrap hover:text-gray-600"
            //   onClick={gotoSources}
            >
              view sources
            </div>
            <div className="h-[2px] -my-1 w-full bg-gray-200"></div>
            <div
              className="text-left my-3 text-red-400 hover:text-red-500"
              onClick={() => deleteCard(source.id, i)}
            >
              delete
            </div>
          </div>
        </div>
      </div>
      <div>{source.SourceType}</div>
    </div>
  );
};

export default SourceCard;

import React, { useState, useRef } from "react";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SourceList = ({ source, index, gotoSource, deleteCard, rename }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [renameOn, setRenameOn] = useState(false);
  const [nameInput, setNameInput] = useState(source.Name);
  const inputRef = useRef(null);
  function submitHandler(e) {
    e.preventDefault();
    rename(source.id, nameInput);
    setRenameOn(false);
  }
  return (
    <div
      key={source.id}
      className=" bg-grey p-3 rounded-2xl cursor-pointer border-2 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.005] transition-all"
      onClick={() => {
        !renameOn && gotoSource(source.id);
      }}
    >
      <div className="flex justify-between">
        {!renameOn ? (
          <div className="font-bold text-lg leading-tight mb-4 flex-1 w-full">
            {nameInput}
          </div>
        ) : (
          <form
            className="w-full mr-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              type="text"
              name="name"
              ref={inputRef}
              autoFocus
              required
              autocomplete="off"
              id="name"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
              className="bg-grey outline-none font-bold text-lg leading-tight mb-4 flex-1 mr-3 w-full"
            />
          </form>
        )}
        <div
          className=" bg-gray-200 rounded-xl relative h-7"
          onClick={(e) => {
            e.stopPropagation();
            if (renameOn) {
              submitHandler(e);
            } else {
              setOptionsOpen(!optionsOpen);
            }
          }}
        >
          <FontAwesomeIcon
            className={`${
              !renameOn ? "pt-0" : "pt-[1px]"
            } w-6 text-gray-600 mx-2`}
            icon={!renameOn ? faEllipsis : faCheck}
          />
          <div
            className={`${
              !optionsOpen && "hidden"
            } z-20 absolute border-2 top-10 right-0 text-gray-800 font-semibold text-lg bg-grey px-3 pr-6 rounded-2xl`}
          >
            <div
              className="text-left my-3 whitespace-nowrap hover:text-gray-600"
              onClick={() => {
                setRenameOn(true);
                inputRef.autofocus;
              }}
            >
              rename
            </div>
            <div className="h-[2px] -my-1 w-full bg-gray-200"></div>
            <div
              className="text-left my-3 text-red-400 hover:text-red-500"
              onClick={() => deleteCard(source.id, index)}
            >
              delete
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="font-bold text-gray-600">{source.SourceType}</div>
        <div>{source.CreatedAt.toDate().toISOString().substring(0, 10)}</div>
      </div>
    </div>
  );
};

export default SourceList;

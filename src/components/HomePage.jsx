import React from "react";
import FakeInput from "./FakeInput";
import FileInputButton from "./FileInputButton";

const HomePage = ({ text, setText, setPage, setSource, getText }) => {
  return (
    <div className="mx-12 flex flex-col justify-center align-middle">
      <div className="flex justify-center">
        <div className="bg-gradient-to-r mb-3 font-black text-3xl bg-clip-text from-purple to-blue text-transparent text-center justify-self-center w-auto sm:text-4xl">
          summarize, analyze, annotate
        </div>
      </div>
      <div className="flex justify-center my-6 mb-3 sm:my-8 sm:mb-3">
        {/* <FileInputButton onChange={getText} /> */}
        <FakeInput />
      </div>
      <div className="flex justify-center mt-3">
        <div className="text-base font-black text-gray-700">OR</div>
      </div>
      <div className="border-12 border-grey bg-grey m-8 mt-3 mx-3 p-5 text-base font-medium rounded-3xl sm:mx-28 lg:mx-48 ">
        <textarea
          className="bg-grey p-3 text-sm font-medium rounded-3xl resize-none outline-none w-full"
          placeholder="Paste text here... (1000 characters min, 5000 characters max)"
          name="source-text"
          id="source-text"
          cols="30"
          rows="15"
          maxLength="50000"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        <div
          className={`mx-3 ${
            text.length > 1000 && text.length < 20000
              ? "text-purple"
              : "text-gray-700"
          }`}
        >
          {text.length}/20000
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className={`${
            text.length > 1000 && text.length < 20000
              ? "bg-purple"
              : "bg-grey text-gray-500"
          } cursor-pointer text-2xl p-3 px-6 rounded-2xl font-bold transition-all duration-200 ease-in-out text-gray-700`}
          onClick={() => {
            text.length > 1000 && text.length < 20000 && setPage("info"); // ##@#@$%#$@$ REMEMBER TO SWITCH THIS BACKKK!!!!!!!!
          }}
        >
          Annotate!
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React from "react";

const HomePage = ({ text, setText, setPage, setSource }) => {
  return (
    <div className="mx-12 my-6 flex flex-col justify-center align-middle">
      <div className="flex justify-center">
        <div className="bg-gradient-to-r font-black text-3xl bg-clip-text from-purple to-blue text-transparent text-center justify-self-center w-auto sm:text-4xl">
          summarize, analyze, annotate
        </div>
      </div>
      <div className="flex justify-center my-6 mb-3 sm:my-8 sm:mb-3">
        <label
          className="bg-grey cursor-pointer font-bold p-3 px-4 w-auto rounded-2xl text-base sm:text-xl text-gray-700"
          htmlFor="pdf-upload"
        >
          Upload PDF
        </label>
        <input
          className="hidden"
          type="file"
          accept=".pdf"
          id="pdf-upload"
          onChange={(e) => {
            setPage(1);
            setSource(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
      </div>
      <div className="flex justify-center">
        <div className="text-base font-black text-gray-700">OR</div>
      </div>
      <textarea
        className="bg-grey m-8 mt-3 mx-3 p-5 text-base font-medium rounded-3xl md:text-xl sm:mx-28 lg:mx-48 resize-none outline-none"
        placeholder="Paste Text Here..."
        name="source-text"
        id="source-text"
        cols="30"
        rows="10"
        maxlength="10000"
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
      <div className="flex justify-center">
        <div
          className={`${
            text.length > 0 ? "bg-purple" : "bg-grey text-gray-500"
          } cursor-pointer text-2xl p-3 px-6 rounded-2xl font-bold transition-all duration-200 ease-in-out text-gray-700`}
          onClick={() => {
            text.length > 0 ? setPage(1) : null;
          }}
        >
          Annotate!
        </div>
      </div>
    </div>
  );
};

export default HomePage;

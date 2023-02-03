import React, {useState} from "react";
import { sanitize } from "dompurify";

const AnnotatedSource = ({ highlightedText, summarizedText, bullets }) => {
  const [isSummary, setIsSummary] = useState(true);

  return (
    <div className="mx-12 my-6 flex flex-col justify-center align-middle">
      <div className="flex justify-center">
        <div className="bg-gradient-to-r font-black text-3xl bg-clip-text from-purple to-blue text-transparent text-center justify-self-center w-auto sm:text-4xl">
          your summary
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-20 h-[60vh] my-12 mx-6">
        <div
          className="bg-grey p-6 pt-12 text-sm font-semibold rounded-[3rem] overflow-y-auto border-[1rem] border-grey"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        ></div>
        <div className="bg-grey p-10 rounded-[3rem] font-medium border-12 border-grey">
          <div className="flex m-auto justify-center mb-5 relative">
            <div
              className={`${
                isSummary ? "text-black" : "text-gray-500"
              } text-2xl font-semibold mx-3 cursor-pointer flex flex-col items-center`}
              onClick={() => setIsSummary(true)}
            >
              summary
              <div
                className={`${
                  isSummary ? "bg-black" : "bg-transparent"
                } w-12 h-1 rounded-full transition-all duration-75 ease-out`}
              ></div>
            </div>
            <div
              className={`${
                !isSummary ? "text-black" : "text-gray-500"
              } text-2xl font-semibold mx-3 cursor-pointer flex flex-col items-center`}
              onClick={() => setIsSummary(false)}
            >
              bullets
              <div
                className={`${
                  isSummary ? " bg-transparent" : "bg-black"
                } w-12 h-1 rounded-full transition-all duration-75 ease-out`}
              ></div>
            </div>
          </div>
          <div className="h-96 overflow-y-auto">
            {isSummary ? summarizedText : bullets.map((bullet) => (
              <div>{bullet}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotatedSource;

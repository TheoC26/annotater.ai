import React from "react";

const InfoPage = ({ text, subject, isPrimary, setSubject, setIsPrimary }) => {
  return (
    <div className="mx-12 my-6 flex flex-col justify-center align-middle">
      <div className="flex justify-center">
        <div className="bg-gradient-to-r font-black text-3xl bg-clip-text from-purple to-blue text-transparent text-center justify-self-center w-auto sm:text-4xl">
          tell us a little about your source...
        </div>
      </div>
      <div className="bg-grey m-8 mt-8 mx-3 p-5 text-base font-medium rounded-3xl h-96 md:text-xl sm:mx-28 lg:mx-48 overflow-y-scroll border-8 border-grey">
        {text}
      </div>
      <div className="flex justify-around w-2/3 mx-auto my-3 text-gray-700">
        <div
          className={`${
            subject == "history" ? "bg-purple" : "bg-grey"
          } p-3 px-10 font-semibold cursor-pointer text-2xl rounded-2xl transition-colors duration-200 ease-in-out`}
          onClick={() => setSubject("history")}
        >
          history
        </div>
        <div
          className={`${
            subject == "english" ? "bg-purple" : "bg-grey"
          } p-3 px-10 font-semibold cursor-pointer text-2xl rounded-2xl transition-colors duration-200 ease-in-out`}
          onClick={() => setSubject("english")}
        >
          english
        </div>
        <div
          className={`${
            subject == "science" ? "bg-purple" : "bg-grey"
          } p-3 px-10 font-semibold cursor-pointer text-2xl rounded-2xl transition-colors duration-200 ease-in-out`}
          onClick={() => setSubject("science")}
        >
          science
        </div>
        <div
          className={`${
            subject == "other" ? "bg-purple" : "bg-grey"
          } p-3 px-10 font-semibold cursor-pointer text-2xl rounded-2xl transition-colors duration-200 ease-in-out`}
          onClick={() => setSubject("other")}
        >
          other
        </div>
      </div>
      <div
        className={`${
          subject != "history" && "hidden"
        } transition-all duration-100 ease-in-out text-gray-700`}
      >
        <div className="h-1 rounded-full mx-12 my-6 bg-grey"></div>
        <div className="flex justify-around w-1/3 mx-auto my-3">
          <div
            className={`${
              isPrimary == true ? "bg-purple" : "bg-grey"
            } p-3 px-10 font-semibold cursor-pointer text-2xl rounded-2xl transition-colors duration-200 ease-in-out`}
            onClick={() => setIsPrimary(true)}
          >
            primary
          </div>
          <div
            className={`${
              isPrimary == false ? "bg-purple" : "bg-grey"
            } p-3 px-10 font-semibold cursor-pointer text-2xl rounded-2xl transition-colors duration-200 ease-in-out`}
            onClick={() => setIsPrimary(false)}
          >
            secondary
          </div>
        </div>
      </div>

      <div
        className={`${
          (subject == "" || (subject == "history" && isPrimary == null)) &&
          "hidden"
        } flex justify-center my-6 fixed right-6 bottom-3`}
      >
        <div
          className={`bg-gradient-to-r text-gray-700 from-purple to-blue cursor-pointer text-2xl p-3 px-6 rounded-2xl font-bold transition-all duration-200 ease-in-out`}
        >
          Annotate!
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

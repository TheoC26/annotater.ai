import React, { useState, useEffect } from "react";
import { sanitize } from "dompurify";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, addDoc, serverTimestamp } from "firebase/firestore";

const AnnotatedSource = ({ highlightedText, summarizedText, bullets, id }) => {
  const [isSummary, setIsSummary] = useState(true);
  const [copyText, setCopyText] = useState(false);
  const [notes, setNotes] = useState("");
  const doneTypingInterval = 3000;
  var typingTimer;

  const { currentUser } = useAuth();

  function doneTyping() {
    console.log("done typing");
  }
  const saveSummaryToDatabase = async () => {

    const summariesRef = doc(db, `/users/${currentUser.uid}/sources`, );

    var data = {};

    if (subject != "history") {
      data = {
        AnnotatedSource: highlightsArray.join(""),
        BulletPoints: bullets.split(/\n/g),
        Summary: summariesArray.join(""),
        SourceType: subject,
        Name: name.trimStart(),
        CreatedAt: serverTimestamp(),
      };
    } else {
      data = {
        AnnotatedSource: highlightsArray.join(""),
        BulletPoints: bullets.split(/\n/g),
        Summary: summariesArray.join(""),
        SourceType: subject,
        Primary: isPrimary,
        Name: name,
        CreatedAt: serverTimestamp(),
      };
    }

    await addDoc(summariesRef, data)
      .then((summariesRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function copySummarizedText() {
    console.log(highlightedText)
    setCopyText(true);
    isSummary
      ? navigator.clipboard.writeText(summarizedText)
      : navigator.clipboard.writeText(bullets);
    setTimeout(function () {
      setCopyText(false);
    }, 1000);
  }


  return (
    <div className="mx-6 lg:mx-12 my-6 flex flex-col justify-center align-middle">
      <div className="flex justify-center">
        <div className="bg-gradient-to-r font-black text-3xl bg-clip-text from-purple to-blue text-transparent text-center justify-self-center w-auto sm:text-4xl">
          your summary
        </div>
      </div>
      <div className=" grid grid-cols-1 gap-6 my-12 mx-3 md:mx-6 md:grid-cols-2 lg:gap-20">
        <div
          className="bg-grey p-3 lg:p-6 pt-6 lg:pt-12 text-sm font-medium rounded-[3rem] overflow-y-auto border-[1rem] border-grey h-[62vh]"
          dangerouslySetInnerHTML={{ __html: sanitize(highlightedText) }}
        ></div>
        <div className="bg-grey p-6 p-3x lg:px-10 rounded-[3rem] font-medium border-12 border-grey h-[62vh] border-[1rem]">
          <div className="flex m-auto justify-between mb-5 relative">
            <div className="w-6"></div>
            <div className="flex">
              <div
                className={`${
                  isSummary ? "text-black" : "text-gray-500"
                } text-xl md:text-2xl font-semibold mx-3 cursor-pointer flex flex-col items-center`}
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
                } text-xl md:text-2xl font-semibold mx-3 cursor-pointer flex flex-col items-center`}
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
            <div
              className={`triangle grid place-content-center cursor-pointer scale-105 hover:scale-110 transition-all duration-75 relative after:text-sm after:font-bold before:hidden after:hidden before:hover:block after:hover:block before:absolute before:bg-purple before:-top-1.5 before:w-3 before:h-3 after:absolute after:-top-7 after:px-3 after:rounded-md after:-right-7 after:py-0.5 after:w-20 after:text-center after:content-['${
                !copyText ? "copy" : "copied!"
              }'] after:bg-purple`}
              onClick={copySummarizedText}
            >
              <div className="w-0 before:hidden after:hidden after:content-['copy'] after:content-['copied!']"></div>
              <FontAwesomeIcon icon={faCopy} className="w-4" />
            </div>
          </div>
          <div className="overflow-y-auto h-[90%] lg:h-[92%]">
            {isSummary
              ? summarizedText
              : bullets.map((bullet) => (
                  <div key={bullet} className="my-2">
                    {bullet.length > 5 && bullet.trimStart()[0] != "-" && "- "}
                    {bullet}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="mx-6 p-3 bg-grey border-12 border-grey rounded-[3rem]">
        <textarea
          name="notes"
          className="bg-grey w-full outline-none p-3 resize-none"
          placeholder="Add your notes here..."
          cols="30"
          rows="10"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onKeyDown={(e) => {clearTimeout(typingTimer);}}
          onKeyUp={(e) => {clearTimeout(typingTimer); typingTimer = setTimeout(doneTyping, doneTypingInterval)}}
        ></textarea>
      </div>
    </div>
  );
};

export default AnnotatedSource;

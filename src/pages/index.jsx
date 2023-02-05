import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState, useEffect, use } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, addDoc, collection } from "firebase/firestore";

import HomePage from "../components/HomePage";
import InfoPage from "../components/InfoPage";
import Header from "../components/Header";
import AnnotatedSource from "../components/AnnotatedSource";
import LoadingPage from "../components/LoadingPage";

const inter = Inter({ subsets: ["latin"] });

// todos before launch
// todo: turn pdf into text (using pdf-extract)
// todo: add copy button and save to pdf
// todo: save to database
// todo: highlight text into purple
//

// todos after launch
// todo: payment for extra features
//

// payment ideas
// - Make better summarizations (use davinci)
// - Analyze sources
// - Can input longer sources

export default function Home() {
  const [page, setPage] = useState("home");
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [subject, setSubject] = useState("");
  const [isPrimary, setIsPrimary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedSource, setHighlightedSource] = useState("");
  const [summariesArray, setSummariesArray] = useState([]);
  const [highlightsArray, setHighlightsArray] = useState([]);
  const [bullets, setBullets] = useState("");
  const [name, setName] = useState("");
  // var chunkSize = 2499;

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (
      (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    );
  }

  function findTextIndex(text, source) {
    var bestIndex = 0;
    var bestScore = 0;
    for (var i = 0; i < source.length; i++) {
      var score = similarity(text, source.substring(i, i + text.length));
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }
    return bestIndex;
  }

  const startGenerating = async () => {
    setIsLoading(true);
    setHighlightedSource(text);
    text
      .replace(/(\r\n|\n|\r)/gm, " ")
      .match(/.{1,2000}/g)
      .map(async (text_snippet, i) => {
        await generateSummary(text_snippet + " ", i);
        await generateHighlightText(text_snippet, i);
        if (
          text.replace(/(\r\n|\n|\r)/gm, " ").match(/.{1,2000}/g).length - 1 ==
          i
        ) {
          await generateName(summariesArray.join(""));
          await generateBullets(summariesArray.join(""));
          console.log(name);
          setPage("annotated");
        }
      });
  };

  const generateSummary = async (input, index) => {
    var generatedText = "";
    // const prompt =
    //   "Generate a detailed summary of this " +
    //   (subject != "other" && subject) +
    //   " source:" +
    //   input +
    //   "\n";
    const prompt = `
      ${input} 

      Summarize the content from the above ${
        subject != "other" && subject
      } source:

    `;
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      generatedText = generatedText + chunkValue;
      const tempArr = summariesArray;
      tempArr[index] = generatedText;
      setSummariesArray(tempArr);
    }
  };

  const generateHighlightText = async (input, index) => {
    var highlightedText = "";
    // const prompt = `
    //     If you were to annotate this source: ${input}, what are the top three phrases you would highlight in quotes?
    //   `;
    const prompt = `
      ${input}

      If you were to annotate this source, what are the top three sentences you would highlight in quotes?
      `;
    // setHighlightedSource(text);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      highlightedText = highlightedText + chunkValue;
    }
    generateHighlightSource(highlightedText, index, input);
  };

  const generateHighlightSource = (input, highlightIndex, text_snippet) => {
    const sentences = input.replace(/"/g, "");
    var tempText = text_snippet;
    sentences.split(".").map((highlight) => {
      const index = findTextIndex(highlight, tempText);
      tempText =
        tempText.substring(0, index) +
        "<strong>" +
        tempText.substring(index, index + highlight.length) +
        "</strong>" +
        tempText.substring(index + highlight.length);
    });
    const tempArr = highlightsArray;
    tempArr[highlightIndex] = tempText;
    setHighlightsArray(tempArr);
  };

  const generateBullets = async (input) => {
    setBullets("");
    const prompt = `
      ${input} 

      Summarize the content from the above article with 5 bullet points clearly seperated by a new line:
    `;
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setBullets((prev) => prev + chunkValue);
    }
    setIsLoading(false);
  };

  const generateName = async (input) => {
    setName("");
    const prompt = `
      ${input} 

      Generate a title for the above source:
    `;
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setName((prev) => prev + chunkValue);
    }
  };

  const { currentUser } = useAuth();

  const saveSummaryToDatabase = async () => {
    if (summariesArray == []) {
      return;
    }
    const summariesRef = collection(db, `/users/${currentUser.uid}/sources`);

    var data = {};

    if (subject != "history") {
      data = {
        AnnotatedSource: highlightsArray.join(""),
        BulletPoints: bullets.split(/\n/g),
        Summary: summariesArray.join(""),
        SourceType: subject,
        Name: name,
      };
    } else {
      data = {
        AnnotatedSource: highlightsArray.join(""),
        BulletPoints: bullets.split(/\n/g),
        Summary: summariesArray.join(""),
        SourceType: subject,
        Primary: isPrimary,
        Name: name,
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

  useEffect(() => {
    if (isLoading) {
      return;
    }
    saveSummaryToDatabase();
    console.log("working!");
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>annotater.app | summarize</title>
        <meta
          name="description"
          content="Summarize and analyze any history, enlgish, science source for free!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <Header user={currentUser} />
        {page == "home" && (
          <HomePage
            text={text}
            setText={setText}
            setSource={setSource}
            setPage={setPage}
          />
        )}
        {page == "info" && (
          <InfoPage
            text={text}
            subject={subject}
            isPrimary={isPrimary}
            setSubject={setSubject}
            setIsPrimary={setIsPrimary}
            generateSummary={startGenerating}
            setPage={setPage}
          />
        )}
        {page == "loading" && <LoadingPage />}
        {page == "annotated" && (
          <AnnotatedSource
            highlightedText={"<u>"+name+"</u></br>" + highlightsArray.join("")}
            summarizedText={summariesArray}
            bullets={bullets.split(/\n/g)}
          />
        )}
      </main>
    </>
  );
}

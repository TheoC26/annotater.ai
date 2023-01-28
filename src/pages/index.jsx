import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState } from "react";
import HomePage from "@/components/HomePage";
import InfoPage from "@/components/InfoPage";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [page, setPage] = useState(0);
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [subject, setSubject] = useState("");
  const [isPrimary, setIsPrimary] = useState(null);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Summarize and analyze any history, enlgish, science source for free!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <Header />
        {page == 0 ? (
          <HomePage text={text} setText={setText} setSource={setSource} setPage={setPage} />
        ) : (
          <InfoPage text={text} subject={subject} isPrimary={isPrimary} setSubject={setSubject} setIsPrimary={setIsPrimary} />
        )}
      </main>
    </>
  );
}

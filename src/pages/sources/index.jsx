import React, { useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import useFetchSources from "../../../hooks/fetchSources";
import { useAuth } from "../../../context/AuthContext";
import SourceCard from "../../components/SourceCard";
import { db } from "../../../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const SourcesPage = () => {
  const { loading, error, sources, setSources } = useFetchSources();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      window.location.replace("./login");
      return;
    }
    
  }, [currentUser]);


  function gotoSource(sourceId) {
    if (currentUser) {
      window.location.replace("./sources/" + sourceId);
    }
  }

  function gotoAnnotate() {
    if (currentUser) {
      window.location.replace("../");
    }
  }

  async function deleteCard(id, index) {
    const docRef = doc(db, `/users/${currentUser.uid}/sources`, id);
    await deleteDoc(docRef)
      .catch((err) => {
        console.log(err)
      })
    var tempArr = sources;
    tempArr.pop(index);
    setSources(tempArr);
    setSources([...sources])
    console.log(tempArr.length)
  }

  async function rename(id, newName) {
    const docRef = doc(db, `/users/${currentUser.uid}/sources`, id);
    await updateDoc(docRef, {
      Name: newName,
    })
  }

  return (
    <div>
      <Head>
        <title>annotater.app | sources</title>
        <meta
          name="description"
          content="Summarize and analyze any history, enlgish, science source for free!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={currentUser} />
      <div>
        <div className="flex justify-center mt-6 md:mt-3">
          <div className="bg-gradient-to-r font-black text-3xl bg-clip-text from-purple to-blue text-transparent text-center justify-self-center w-auto sm:text-4xl">
            your sources
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 m-6 md:grid-cols-2 lg:grid-cols-3">
          {sources.map((source, i) => {
            return (
              <SourceCard
                source={source}
                index={i}
                gotoSource={gotoSource}
                deleteCard={deleteCard}
                rename={rename}
              />
            );
          })}
        </div>
        {sources.length == 0 && !loading && (
          <div>
            <div className="text-xl text-center w-full font-semibold mt-28">
              You haven't created any sources yet...
            </div>
            <div className="mx-auto w-36 bg-purple text-center font-bold p-3 rounded-2xl my-3 cursor-pointer" onClick={gotoAnnotate}>Make one!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourcesPage;

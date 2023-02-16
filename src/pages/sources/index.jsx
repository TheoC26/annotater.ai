import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import useFetchSources from "../../../hooks/fetchSources";
import { useAuth } from "../../../context/AuthContext";
import SourceCard from "../../components/SourceCard";
import { db } from "../../../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import SourceList from "../../components/SourceList";

const SourcesPage = () => {
  const { loading, error, sources, setSources } = useFetchSources();
  const { currentUser } = useAuth();
  const [isGridView, setIsGridView] = useState(true);
  const [filter, setFilter] = useState("all");
  var numberShowing = 0;

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
    await deleteDoc(docRef).catch((err) => {
      console.log(err);
    });
    var tempArr = sources;
    tempArr.splice(index, 1);
    setSources(tempArr);
    setSources([...sources]);
    window.location.reload(false);

  }

  async function rename(id, newName) {
    const docRef = doc(db, `/users/${currentUser.uid}/sources`, id);
    await updateDoc(docRef, {
      Name: newName,
    });
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
          <div className="bg-gradient-to-r mb-2 font-black text-3xl bg-clip-text from-purple to-blue text-transparent text-center justify-self-center w-auto sm:text-4xl">
            your sources
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex mx-6 text-sm font-semibold">
            <div
              className={`${
                !isGridView ? "bg-grey" : "bg-gray-200 text-gray-700"
              } m-2 p-2 px-4 rounded-xl cursor-pointer border-2`}
              onClick={() => setIsGridView(true)}
            >
              grid
            </div>
            <div
              className={`${
                isGridView ? "bg-grey" : "bg-gray-200 text-gray-700"
              } m-2 p-2 px-4 rounded-xl cursor-pointer border-2`}
              onClick={() => setIsGridView(false)}
            >
              list
            </div>
          </div>
          <select
            name="filter"
            id="filter"
            onChange={(e) => {setFilter(e.target.value); numberShowing = 0;}}
            value={filter}
            className="bg-grey border-2 focus:outline-transparent active:outline-transparent font-medium m-2 mr-6 p-2 rounded-xl "
          >
            <option value="all">all</option>
            <option value="history">history</option>
            <option value="english">english</option>
            <option value="science">science</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="h-1 mx-3 rounded-full bg-grey"></div>
        {isGridView ? (
          <div className="grid grid-cols-1 gap-3 m-6 md:grid-cols-2 lg:grid-cols-3">
            {sources.map((source, i) => {
              if (source.SourceType == filter || filter == "all") {
                numberShowing ++;
                return (
                  <SourceCard
                    source={source}
                    index={i}
                    gotoSource={gotoSource}
                    deleteCard={deleteCard}
                    rename={rename}
                  />
                );
              }
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 m-6">
            {sources.map((source, i) => {
              if (source.SourceType == filter || filter == "all") {
                numberShowing ++;
                return (
                  <SourceList
                    source={source}
                    index={i}
                    gotoSource={gotoSource}
                    deleteCard={deleteCard}
                    rename={rename}
                    key={source.id}
                  />
                );
              }
            })}
          </div>
        )}
        {(numberShowing == 0 && !loading) && (
          <div>
            <div className="text-xl text-center w-full font-semibold mt-28">
              You haven't created any{filter != "all" && " " + filter} sources yet...
            </div>
            <div
              className="mx-auto w-36 bg-purple text-center font-bold p-3 rounded-2xl my-3 cursor-pointer"
              onClick={gotoAnnotate}
            >
              Make one!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourcesPage;

import React, {useEffect} from "react";
import Head from "next/head";
import Header from "../../components/Header";
import useFetchTodos from "../../../hooks/fetchSources";
import { useAuth } from "../../../context/AuthContext";

const SourcesPage = () => {
  const { loading, error, sources, setSources } = useFetchTodos();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      window.location.replace("./login");
    }
  }, [currentUser]);

  function gotoSource(sourceId) {
    if (currentUser) {
      window.location.replace("./sources/"+sourceId);
    }
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
        <div className="grid grid-cols-3 gap-3 m-6">
            {sources.map((source) => {
                return (
                <div key={source.id} className=" bg-grey p-3 rounded-2xl cursor-pointer" onClick={() => {gotoSource(source.id)}}>
                    <div className="font-bold text-lg">{source.Name}</div>
                    <div>{source.SourceType}</div>
                </div>)
            })}
            {(sources.length == 0 && !loading) && (
              <div>You haven't created any sources yet...</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SourcesPage;

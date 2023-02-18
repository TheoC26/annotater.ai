import React, {useEffect} from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/AuthContext";
import useFetchSource from "../../../hooks/fetchSource";
import Header from "../../components/Header";
import AnnotatedSource from "../../components/AnnotatedSource";

const SourcePage = () => {
  const router = useRouter();
  const { source } = router.query;
  const { loading, error, sourceData, setSource } = useFetchSource(source);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      window.location.replace("../");
    }
  }, [currentUser]);

  function gotoSources() {
    if (currentUser) {
      window.location.replace("../sources/");
    }
  }

  return (
    <div>
      <Head>
        <title>annotater.app | source</title>
        <meta
          name="description"
          content="Summarize and analyze any history, enlgish, science source for free!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
      </Head>
      <Header user={currentUser} />
      {!loading && sourceData && (
        <AnnotatedSource
          highlightedText={
            "<u>" + sourceData.Name + "</u></br>" + sourceData.AnnotatedSource
          }
          summarizedText={sourceData.Summary}
          bullets={sourceData.BulletPoints}
          id={source}
        />
      )}
      {!loading && !sourceData && (
        <div className="w-[100vw] h-[50vh] grid place-content-center">
          Sorry... we could not find your source
          <div
            className="text-center cursor-pointer text-purple"
            onClick={gotoSources}
          >
            go back to your sources
          </div>
        </div>
      )}
    </div>
  );
};

export default SourcePage;

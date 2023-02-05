import React, {useEffect} from "react";
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
      window.location.replace("../login");
    }
  }, [currentUser]);

  function gotoSources() {
    if (currentUser) {
      window.location.replace("../sources/");
    }
  }

  return (
    <div>
      <Header user={currentUser} />
      {!loading && sourceData && (
        <AnnotatedSource
          highlightedText={
            "<u>" + sourceData.Name + "</u></br>" + sourceData.AnnotatedSource
          }
          summarizedText={sourceData.Summary}
          bullets={sourceData.BulletPoints}
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

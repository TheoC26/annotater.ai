import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export default function useFetchSource(sourceId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sourceData, setSourceData] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(
          db,
          `/users/${currentUser.uid}/sources/`,
          sourceId
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSourceData(docSnap.data());
        }
      } catch (err) {
        setError("Failed to load source");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (currentUser) {
      fetchData();
    }
  }, []);
  return { loading, error, sourceData, setSourceData };
}

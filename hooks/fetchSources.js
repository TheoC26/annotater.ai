import React, { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export default function useFetchSources() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sources, setSources] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const collectionRef = collection(
          db,
          `/users/${currentUser.uid}/sources`
        );
        const docSnap = await getDocs(collectionRef);
        
        var tempArr = []
        docSnap.forEach((doc) => {
            console.log(doc)
          tempArr.push(Object.assign(doc.data(), {id: doc.id}))
        });
        setSources(tempArr)
      } catch (err) {
        setError("Failed to load sources");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (currentUser) {
      fetchData();
    }
  }, []);
  return { loading, error, sources, setSources };
}

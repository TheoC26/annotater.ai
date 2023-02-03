import React, { useContext, useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // createUserWithEmailAndPassword(auth, email, password);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    // return signInWithEmailAndPassword(auth, email, password);
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth);
  }

  function loginWithGoogle() {
    console.log("loginWithGoogle")
    return signInWithPopup(auth, provider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

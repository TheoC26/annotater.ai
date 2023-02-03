import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login, signup, currentUser, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (currentUser) {
      sendToHomePage();
    }
  }, [currentUser]);

  function sendToHomePage() {
    window.location.replace("./");
  }

  async function submitHandler() {
    if (!email || !password) {
      setError("please enter email and password");
      return;
    }
    if (isLoggingIn) {
      await login(email, password).catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage.split("auth/")[1].split(")")[0]);
      });
      return;
    }
    if (password !== confirmPassword) {
      setError("passwords do not match");
      return;
    }
    await signup(email, password).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage.split("auth/")[1].split(")")[0]);
    });

    return;
  }
  async function loginWithGoogleHandler() {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="">
      <Header />
      <div className="flex justify-center">
        <div className="bg-gradient-to-r font-black text-3xl bg-clip-text from-purple to-blue text-transparent text-center justify-self-center w-auto sm:text-4xl">
          {isLoggingIn ? "log in" : "sign up"}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex flex-col align-middle w-1/2">
          <div
            className={`${
              !error && "hidden"
            } bg-red-300 m-3 p-4 px-6 text-base font-medium rounded-full text-center text-slate-800`}
          >
            {error}
          </div>
          <input
            className="bg-grey m-3 p-4 px-6 text-base font-medium rounded-full outline-none"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="bg-grey m-3 p-4 px-6 text-base font-medium rounded-full outline-none"
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {!isLoggingIn && (
            <input
              className="bg-grey m-3 p-4 px-6 text-base font-medium rounded-full outline-none"
              type="text"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          )}
          <div
            className={`${
              (email != "" || password != "") && "hidden"
            } text-center font-black text-lg my-8`}
          >
            OR
          </div>
          <div
            className="cursor-pointer flex justify-around bg-grey w-80 mx-auto p-4 px-6 rounded-full my-3 font-bold text-xl text-gray-700"
            onClick={
              email != "" || password != ""
                ? submitHandler
                : loginWithGoogleHandler
            }
          >
            {email != "" || password != "" ? (
              <div>{isLoggingIn ? "log in" : "sign up"}</div>
            ) : (
              <div className="">log in with google</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex fixed bottom-3 justify-center w-full font-bold text-lg">
        <div>
          {isLoggingIn ? "don't have an account?" : "already have an account?"}
        </div>
        <div
          className="text-purple mx-3 cursor-pointer"
          onClick={() => {
            setIsLoggingIn(!isLoggingIn);
            setError(null);
            setPassword("");
            setEmail("");
          }}
        >
          {isLoggingIn ? "sign up" : "log in"}
        </div>
      </div>
      <div
        className="fixed bottom-3 right-6 font-semibold cursor-pointer"
        onClick={sendToHomePage}
      >
        continue without logging in 👉
      </div>
    </div>
  );
};

export default LoginPage;

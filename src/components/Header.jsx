import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

const Header = ({ user, isHeader }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { logout, currentUser } = useAuth();
  async function handleLogout() {
    await logout();
  }

  function gotoSources() {
    if (currentUser) {
      window.location.replace("../sources");
    }
  }
  function gotoAnnotate() {
    if (currentUser) {
      window.location.replace("../summarize");
    }
  }
  
  return (
    <>
      <div className="flex justify-between px-6 sm:px-12 py-8 pb-6 align-middle top-0 w-full sticky bg-white z-50">
        <div
          onClick={gotoAnnotate}
          className="text-2xl font-bold text-purple place-self-center sm:text-3xl sm:font-extrabold cursor-pointer"
        >
          annotater.app
        </div>
        <div className="flex align-middle justify-center">
          {isHeader == null && (
            <Link href={"../sources"}>
            <div className=" hidden place-self-center mx-10 px-6 font-bold bg-grey h-full place-content-center rounded-xl cursor-pointer text-gray-700 hover:bg-purple transition-all md:grid">
              your sources
            </div>
          </Link>
          )}
          
          {user ? (
            <div
              className="relative font-extrabold bg-pink p-3 w-10 h-10 text-xs text-center rounded-xl text-white sm:w-12 sm:h-12 sm:text-base cursor-pointer hover:opacity-95 transition-all"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              {user.email[0].toUpperCase()}
              <div
                className={`${
                  !settingsOpen && "hidden"
                } absolute border-2 right-0 z-20 top-16 text-gray-800 font-semibold text-lg bg-grey px-3 pr-6 rounded-2xl`}
              >
                <div
                  className="text-left my-3 whitespace-nowrap hover:text-gray-600"
                  onClick={gotoAnnotate}
                >
                  annotate
                </div>
                <div
                  className="text-left my-3 whitespace-nowrap hover:text-gray-600"
                  onClick={gotoSources}
                >
                  view sources
                </div>
                <div className="h-[2px] -my-1 w-full bg-gray-200"></div>
                <div
                  className="text-left my-3 text-red-400 hover:text-red-500"
                  onClick={handleLogout}
                >
                  logout
                </div>
              </div>
            </div>
          ) : (
            <a
              href="./login"
              className=" font-extrabold text-xl cursor-pointer hover:text-gray-600 transition-all duration-150"
            >
              login
            </a>
          )}
        </div>
      </div>
      {isHeader == null && (
        <Link
          href={"../terms"}
          className="hidden fixed bottom-3 left-3 cursor-pointer sm:block"
        >
          terms
        </Link>
      )}
    </>
  );
};

export default Header;

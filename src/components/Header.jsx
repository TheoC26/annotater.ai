import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Header = ({ user }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { logout } = useAuth();
  async function handleLogout() {
    await logout();
  }
  return (
    <div className="flex justify-between px-12 py-8 align-middle top-0 w-full sticky">
      <a
        href="./"
        className="text-xl font-bold text-purple place-self-center sm:text-3xl sm:font-extrabold cursor-pointer"
      >
        annotater.app
      </a>
      {user ? (
        <div 
        className=" relative font-extrabold bg-pink p-3 w-10 h-10 text-xs text-center rounded-xl text-white sm:w-12 sm:h-12 sm:text-base cursor-pointer"
        
        onClick={() => setSettingsOpen(!settingsOpen)}
        >
          {user.email[0].toUpperCase()}
          <div
            className={`${
              !settingsOpen && "hidden"
            } absolute right-1 top-16 text-gray-800 font-semibold text-lg bg-grey px-3 pr-6 rounded-2xl`}
          >
            <div className="text-left my-3 whitespace-nowrap hover:text-gray-600">
              view projects
            </div>
            <div
              className="text-left my-3 hover:text-gray-600"
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
  );
};

export default Header;

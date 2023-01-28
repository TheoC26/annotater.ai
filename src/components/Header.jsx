import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between px-12 py-8 align-middle top-0 w-full sticky">
      <a href="./" className="text-xl font-bold text-purple place-self-center sm:text-3xl sm:font-extrabold cursor-pointer">
        annotater.ai
      </a>
      <div className="font-extrabold bg-pink p-3 w-10 h-10 text-xs text-center rounded-xl text-white sm:w-12 sm:h-12 sm:text-base cursor-pointer">
        TC
      </div>
    </div>
  );
}

export default Header
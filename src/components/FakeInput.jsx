import React, {useState} from 'react'

const FakeInput = () => {
    const [clicked, setClicked] = useState(false)
    var timeout = null;
    
    function onClick() {
        setClicked(true)
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          setClicked(false);
        }, 3000);
    }
  return (
    <div>
      <div
        className="bg-grey cursor-pointer font-bold p-3 px-4 w-auto rounded-2xl text-base sm:text-xl text-gray-700"
        onClick={onClick}
      >
        Upload File
      </div>
      {clicked && (
        <div
          className={`bg-grey border-4 border-gray-200 font-extrabold text-base sm:text-lg text-gray-700 p-6 rounded-2xl absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2`}
        >
          Feature Coming Soon...
        </div>
      )}
    </div>
  );
}

export default FakeInput
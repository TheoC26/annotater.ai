import React, { useEffect, useState } from "react";

const LoadingPage = () => {
    const [dots, setDots] = useState(".");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "" : prev + "."))
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="grid place-items-center h-[60vh]">
      <div className="flex flex-col align-middle">
        <div className="text-center bg-gradient-to-r font-black text-7xl bg-clip-text from-purple to-blue text-transparent leading-relaxed">
          Analyzing{dots}
        </div>
        <div className="text-center bg-gradient-to-r font-black text-3xl bg-clip-text from-purple to-blue text-transparent">
          Just a moment!
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

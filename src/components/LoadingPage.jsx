import React from "react";

const Loading = () => {
  return (
    <div className="w-full py-10 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

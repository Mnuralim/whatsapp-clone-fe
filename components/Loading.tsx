import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingComp = () => {
  return (
    <div className="fixed top-0 left-0 h-screen bg-transparent w-full flex items-center justify-center">
      <div className="bg-black bg-opacity-30 w-full h-screen fixed top-0 "></div>
      <AiOutlineLoading3Quarters size="32" color="white" className="animate-spin" />
    </div>
  );
};

export default LoadingComp;

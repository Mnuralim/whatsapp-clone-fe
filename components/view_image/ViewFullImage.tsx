"use client";
import React from "react";
import Header from "./Header";
import { useGlobalContext } from "@/context/GlobalContext";
import Body from "./Body";

const ViewFullImage = () => {
  const { showViewImage } = useGlobalContext();

  return (
    <div className={`fixed h-screen top-0 left-0 w-screen z-[1000] flex flex-col justify-between transition-all duration-[400ms] transform bg-black md:bg-[#111b21] md:bg-opacity-95 ${showViewImage.isShow ? "scale-100" : "scale-0"}`}>
      <Header />
      <Body />
      <div></div>
    </div>
  );
};

export default ViewFullImage;

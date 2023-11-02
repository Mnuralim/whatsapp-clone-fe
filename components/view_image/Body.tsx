import { useGlobalContext } from "@/context/GlobalContext";
import Image from "next/image";
import React from "react";

const Body = () => {
  const { showViewImage } = useGlobalContext();
  const { image } = showViewImage;
  return (
    <>
      <Image src={image} alt="image" width={40000} height={40000} className="w-full h-auto md:w-auto md:h-3/4 self-center" />
    </>
  );
};

export default Body;

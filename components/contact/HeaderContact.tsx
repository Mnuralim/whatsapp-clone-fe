import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const HeaderContact = () => {
  const { setShowAllContact } = useGlobalContext();
  return (
    <div className="min-w-0 flex items-center bg-[#202c33] text-[#aebac1] px-3 py-[10px] gap-5 md:px-6 md:pt-20 md:pb-5">
      <FaArrowLeft onClick={() => setShowAllContact(false)} color="white" className="cursor-pointer" />
      <h2 className="text-white text-xl">New chat</h2>
    </div>
  );
};

export default HeaderContact;

import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const HeaderProfile = () => {
  const { setShowOtherProfileSetting } = useGlobalContext();
  return (
    <div className="min-w-0 flex items-center bg-[#202c33] text-[#aebac1] px-3 py-[10px] md:py-4 gap-5 md:px-6">
      <FaArrowLeft size="20" onClick={() => setShowOtherProfileSetting(false)} color="#aebac1" className="cursor-pointer" />
      <h2 className="text-white text-xl">Profile</h2>
    </div>
  );
};

export default HeaderProfile;

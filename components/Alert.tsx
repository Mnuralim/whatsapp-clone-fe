"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { deleteMessages } from "@/utils/fetch";
import { useRouter } from "next/navigation";
import React from "react";
import { mutate } from "swr";

const Alert = () => {
  const { showAlert, setShowAlert } = useGlobalContext();
  const { currentUser, targetUser, isShow } = showAlert;
  const router = useRouter();
  const handleDeleteMessages = async () => {
    try {
      const response = await deleteMessages(currentUser, targetUser);
      if (response?.ok) {
        mutate(`${process.env.API_URL}/api/v1/messages/conversations/${currentUser}`);
        mutate(`${process.env.API_URL}/api/v1/messages/${currentUser}/${targetUser}`);

        setShowAlert({
          isShow: false,
          currentUser: "",
          targetUser: "",
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`fixed h-screen top-0 left-0 w-screen z-[1000] flex flex-col justify-center items-center transition-all duration-[400ms] transform  bg-[#111b21] bg-opacity-80 ${isShow ? "scale-100" : "scale-0"}`}>
      <div className="w-4/5 md:w-1/3 h-[150px] md:h-[190px] rounded-md bg-[#3b4a54] flex justify-between flex-col px-5 md:px-8 py-2 md:py-5">
        <h2 className="text-white text-lg md:text-xl">Delete this chat?</h2>
        <div className="self-end flex items-center gap-2 md:gap-5">
          <button onClick={() => setShowAlert({ isShow: false, currentUser: "", targetUser: "" })} className="text-[#10977a] border border-slate-400 border-opacity-20 py-1 md:py-2 px-3 md:px-5 rounded-full font-semibold">
            Cancel
          </button>
          <button onClick={handleDeleteMessages} className="bg-[#10977a] py-1 md:py-2 px-3 md:px-5 rounded-full font-semibold">
            Delete chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;

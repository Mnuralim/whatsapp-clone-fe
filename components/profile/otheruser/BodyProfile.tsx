"use client";
import Avatar from "@/components/Avatar";
import { useGlobalContext } from "@/context/GlobalContext";
import { useSession } from "next-auth/react";
import React from "react";
import { BiSolidDislike } from "react-icons/bi";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { MdBlock, MdDelete, MdPhone } from "react-icons/md";

interface Props {
  otherUser: IUser;
}

const BodyProfile = ({ otherUser }: Props) => {
  const { setShowViewImage, setShowOtherProfileSetting, setShowAlert } = useGlobalContext();
  const { data: session } = useSession();
  const currentUser = session?.user;

  const handleShowViewImage = () => {
    setShowViewImage({
      isShow: true,
      author: otherUser.username,
      createdAt: new Date(otherUser.createdAt),
      profileImage: otherUser.profile_image,
      image: otherUser.profile_image,
    });
  };

  return (
    <div className=" mt-10 text-white flex flex-col items-center w-full gap-3 h-screen">
      <div className="aspect-square relative">
        <button onClick={handleShowViewImage}>
          <Avatar src={otherUser.profile_image as string} size="large" className="w-24 h-24 md:w-40 md:h-40" />
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full items-center pb-3">
        <h2 className="text-2xl font-semibold">{otherUser.username}</h2>
        <h3 className="text-[#85939c] text-lg">{otherUser.email}</h3>
        <div className="flex items-center gap-6 mt-4 text-[#10977a] font-semibold">
          <button onClick={() => setShowOtherProfileSetting(false)} className="flex flex-col gap-3 items-center">
            <BsFillChatRightTextFill size="22" />
            Message
          </button>
          <div className="flex flex-col items-center gap-3">
            <MdPhone size="22" />
            Audio
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaVideo size="22" />
            Video
          </div>
        </div>
      </div>
      <div className="bg-black self-start py-2 w-full">
        <div className=" bg-[#121b22] py-4 px-3 md:px-6">
          <h2 className="text-lg">{otherUser.about}</h2>
          <p className="text-[#85939c]">April 3</p>
        </div>
      </div>
      <div className="px-3 md:px-6 self-start text-[#F15C6D] mt-5">
        <div className="flex items-center gap-5 cursor-not-allowed">
          <MdBlock size="24" />
          <p>Block {otherUser.username}</p>
        </div>
        <div className="flex items-center mt-5 gap-5 cursor-not-allowed">
          <BiSolidDislike size="24" />
          <p>Report {otherUser.username}</p>
        </div>
        <div onClick={() => setShowAlert({ isShow: true, currentUser: currentUser?._id as string, targetUser: otherUser._id })} className="flex items-center mt-5 gap-5 cursor-pointer">
          <MdDelete size="24" />
          <p>Delete chat</p>
        </div>
      </div>
    </div>
  );
};

export default BodyProfile;

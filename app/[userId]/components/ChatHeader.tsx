import { ButtonBack } from "@/components/button/Button";
import React from "react";
import { FaVideo } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGlobalContext } from "@/context/GlobalContext";
import Avatar from "@/components/Avatar";

interface Props {
  targetUser: IUser;
}

const ChatHeader = ({ targetUser }: Props) => {
  const { setShowOtherProfileSetting, showOtherProfileSetting } = useGlobalContext();
  return (
    <div className={`flex fixed top-0 items-center justify-between py-[10px] px-4 bg-[#202c33] text-[#aebac1] z-[100]  w-full transition-all duration-[400ms] ${showOtherProfileSetting ? "md:max-w-[42%] md:left-[31%]" : "md:max-w-[69%]"}`}>
      <div className="flex items-center gap-1 ">
        <div className="md:hidden">
          <ButtonBack color="white" size="19" />
        </div>
        <div onClick={() => setShowOtherProfileSetting(true)} className="flex items-center md:pr-[200%] cursor-pointer">
          <Avatar src={targetUser.profile_image} size="small" />
          <div className="flex flex-col items-start ml-2 ">
            <h2 className="font-semibold text-[#e0e6eb]">{targetUser.username}</h2>
            {/* <p className="text-xs">{onlineStatus ? "online" : "offline"}</p> */}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <FaVideo size="19" />
        <MdPhone size="19" />
        <BsThreeDotsVertical size="19" />
      </div>
    </div>
  );
};

export default ChatHeader;

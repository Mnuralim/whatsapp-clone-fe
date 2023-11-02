import Image from "next/image";
import React from "react";
import MessageStatus from "./MessageStatus";
import { useGlobalContext } from "@/context/GlobalContext";

interface Props {
  side: string;
  message: string;
  time: string;
  messageStatus: string;
  senderId: string;
  currentUserId: string;
  senderUsername: string;
  senderProfileImage: string;
  createdAt: Date;
}

export const ImageMessage = ({ side, message, time, messageStatus, senderId, currentUserId, senderUsername, senderProfileImage, createdAt }: Props) => {
  const { setShowViewImage } = useGlobalContext();

  const handleShowViewImage = () => {
    setShowViewImage({
      author: senderUsername,
      isShow: true,
      profileImage: senderProfileImage,
      createdAt: new Date(createdAt),
      image: message,
    });
  };

  const isCurrentUser = senderId === currentUserId;

  return (
    <div onClick={handleShowViewImage} className={`p-1 rounded-lg max-w-[60%] min-w-[40%] cursor-pointer ${side === "right" ? "bg-[#005d4b]" : "bg-[#1f2c34]"}`}>
      <div className="relative">
        <Image src={message} alt="message image" width={3000} height={3000} className="rounded-lg object-cover w-[500px] h-auto" />
        <div className="absolute right-0 bottom-0 flex items-center">
          <p className={`text-[10px] min-w-fit ${side === "right" ? "text-white" : "text-[#85939c]"}`}>{time}</p>
          {isCurrentUser && (
            <div>
              <MessageStatus messageStatus={messageStatus} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import Link from "next/link";
import React from "react";
import Avatar from "../Avatar";
import MessageStatus from "@/app/[userId]/components/MessageStatus";
import { FaCamera, FaMicrophone } from "react-icons/fa";
import { calculateTime } from "@/utils/time";

interface Props {
  conversation: Conversation;
  currentUserId: string;
  pathName: string;
}

const ConversationItem = ({ conversation, currentUserId, pathName }: Props) => {
  const isSender = currentUserId === conversation.sender._id;
  const isReceiverPath = pathName === `/${conversation.receiver._id}`;
  const isSenderPath = pathName === `/${conversation.sender._id}`;

  return (
    <Link
      key={conversation._id}
      href={isSender ? `/${conversation.receiver._id}` : `/${conversation.sender._id}`}
      className={`flex justify-between hover:bg-[#85939c] hover:bg-opacity-10 py-2 px-3 ${isSender ? (isReceiverPath ? "bg-[#85939c] bg-opacity-20" : "") : isSenderPath ? "bg-[#85939c] bg-opacity-20" : ""}`}
    >
      <div className="flex items-center gap-4">
        <Avatar src={isSender ? `${conversation.receiver.profile_image}` : `${conversation.sender.profile_image}`} size="medium" />
        <div>
          <h2 className="font-semibold text-[#e0e6eb]">{isSender ? conversation.receiver.username : conversation.sender.username}</h2>
          <p className="text-[#85939c] flex items-center gap-1  max-w-[230px] md:max-w-[310px]">
            {isSender ? (
              <div className="min-w-[25px]">
                <MessageStatus messageStatus={conversation.messageStatus} />
              </div>
            ) : null}
            {conversation.type === "text" ? (
              <span className="line-clamp-1">{conversation.message}</span>
            ) : conversation.type === "image" ? (
              <div className="flex items-center gap-1">
                <FaCamera />
                <span>Image</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <FaMicrophone />
                <span>Audio</span>
              </div>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className={`${conversation.totalUnreadMessage > 0 ? "text-xs text-[#10977a]" : "text-xs text-[#85939c]"}`}>{calculateTime(conversation.createdAt)}</p>
        {conversation.totalUnreadMessage > 0 ? (
          <div className="flex items-center justify-center aspect-square bg-[#10977a] w-5 self-end rounded-full">
            <p className="text-xs text-[#121b22]">{conversation.totalUnreadMessage}</p>
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default ConversationItem;

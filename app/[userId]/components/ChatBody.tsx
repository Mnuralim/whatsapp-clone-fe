import React, { useEffect, useRef, useState } from "react";
import { ImageMessage } from "./ImageMessage";
import MessageStatus from "./MessageStatus";
import { calculateTime } from "@/utils/time";
import Pusher from "pusher-js";
import { VoiceMessage } from "./VoiceMessage";
import { LoadImage } from "@/components/LoadImage";

interface Props {
  currentUserId?: string;
  targetUserId: string;
  messages: Conversation[];
}

const ChatBody = ({ currentUserId, messages, targetUserId }: Props) => {
  const [allMessages, setAllMessages] = useState<Conversation[]>(messages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY as string, {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("messages");
    const handleNewMessage = (data: any) => {
      const message: Conversation = data.message;
      setAllMessages((prev) => {
        if ((message.sender._id === currentUserId || message.sender._id === targetUserId) && (message.receiver._id === currentUserId || message.receiver._id === targetUserId)) {
          return [...prev, message];
        } else {
          return [...prev];
        }
      });
    };
    channel.bind("new-message", handleNewMessage);

    return () => {
      pusher.unsubscribe("messages");
      pusher.unbind("new-message", handleNewMessage);
    };
  }, [currentUserId, targetUserId]);

  const isCurrentUser = (senderId: string) => senderId === currentUserId;

  return (
    <div className="px-3 pt-3 text-white mt-20 mb-20 md:px-12">
      <div className="bg-chat-background top-14 left-0 bg-fixed fixed w-full h-screen min-h-screen opacity-20 md:left-[31%]"></div>
      <div className="flex w-full">
        <div className="flex flex-col gap-1 w-full  z-10 list-chat ">
          {allMessages.map((message) => (
            <div key={message._id} className={`${isCurrentUser(message.sender._id) ? "justify-end flex item" : "justify-start flex item"}`}>
              {message.type === "image" ? (
                <div className={`${isCurrentUser(message.sender._id) ? "justify-end flex" : "justify-start flex"}`}>
                  <ImageMessage
                    side={`${isCurrentUser(message.sender._id) ? "right" : "left"}`}
                    message={message.message}
                    time={calculateTime(message.createdAt)}
                    messageStatus={message.messageStatus}
                    senderId={message.sender._id}
                    currentUserId={currentUserId as string}
                    senderUsername={message.sender.username}
                    senderProfileImage={message.sender.profile_image}
                    createdAt={message.createdAt}
                  />
                </div>
              ) : message.type === "text" ? (
                <div className={`${isCurrentUser(message.sender._id) ? "bg-[#005d4b]" : "bg-[#1f2c34]"} max-w-[80%] pt-1 rounded-xl px-2 flex flex-col`}>
                  <div className="break-all">{message.message}</div>
                  <div className="flex gap-0 justify-end items-center">
                    <p className="text-[10px] text-[#85939c] min-w-fit">{calculateTime(message.createdAt)}</p>
                    {isCurrentUser(message.sender._id) ? (
                      <div>
                        <MessageStatus messageStatus={message.messageStatus} />
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className={`${isCurrentUser(message.sender._id) ? "justify-end flex" : "justify-start flex"}`}>
                  <VoiceMessage
                    side={`${isCurrentUser(message.sender._id) ? "right" : "left"}`}
                    message={message.message}
                    time={calculateTime(message.createdAt)}
                    messageStatus={message.messageStatus}
                    senderId={message.sender._id}
                    currentUserId={currentUserId as string}
                    senderUsername={message.sender.username}
                    senderProfileImage={message.sender.profile_image}
                    createdAt={message.createdAt}
                  />
                </div>
              )}
            </div>
          ))}
          <LoadImage />
          <div ref={scrollDownRef}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;

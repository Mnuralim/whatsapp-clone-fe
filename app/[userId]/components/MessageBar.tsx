"use client";
import React, { useState } from "react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { BiSolidCamera } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { MdMic } from "react-icons/md";
import { newMessageImage, newMessageText } from "@/utils/fetch";
import { AiFillCloseCircle } from "react-icons/ai";
import Emoji from "@/components/Emoji";
import { useGlobalContext } from "@/context/GlobalContext";
import VoiceRecorder from "./VoiceRecorder";
import { mutate } from "swr";

interface Props {
  targetUserId: string;
  currentUserId: string;
}

const MessageBar = ({ targetUserId, currentUserId }: Props) => {
  const [showEmoji, setshowEmoji] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");
  const [showVoiceRecorder, setshowVoiceRecorder] = useState<boolean>(false);
  const { showOtherProfileSetting, setLoadImage } = useGlobalContext();

  const handleSubmitMessageText = async () => {
    try {
      const response = await newMessageText(currentUserId, targetUserId, message);
      if (response?.ok) {
        setmessage("");
        mutate(`${process.env.API_URL}/api/v1/messages/${currentUserId}/${targetUserId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setshowEmoji(false);
    }
  };

  const handleSubmitMessageImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLoadImage({
            isLoad: true,
            to: targetUserId,
            from: currentUserId,
            urlImage: reader.result,
            createdAt: new Date(),
          });
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("image", file);
        const response = await newMessageImage(currentUserId, targetUserId, formData);
        if (response?.ok) {
          mutate(`${process.env.API_URL}/api/v1/messages/${currentUserId}/${targetUserId}`);
          setLoadImage({
            isLoad: false,
            to: "",
            from: "",
            urlImage: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowEmoji = () => {
    setshowEmoji((prev) => !prev);
  };

  return (
    <div className={`fixed bottom-1 rounded-md z-[120] w-full transition-all duration-[400ms] ${showOtherProfileSetting ? "md:max-w-[60%]" : "md:max-w-full"}`}>
      {!showVoiceRecorder && (
        <div className="gap-1 w-full flex items-center justify-between md:max-w-[68.5%]">
          <div className="py-3 w-full bg-[#121b22] rounded-full ">
            <div className="flex gap-2 justify-between items-center px-3">
              {showEmoji ? (
                <AiFillCloseCircle onClick={handleShowEmoji} color="#85939c" size="30" id="emoji-button" className="cursor-pointer" />
              ) : (
                <BsFillEmojiLaughingFill onClick={handleShowEmoji} color="#85939c" size="30" id="emoji-button" className="cursor-pointer" />
              )}

              <div className="w-full">
                <input type="text" autoFocus className="outline-none text-white w-full bg-transparent px-5 rounded-full py-1" placeholder="Type a message" value={message} onChange={(e) => setmessage(e.target.value)} />
              </div>
              <ImAttachment color="#85939c" size="20" />
              <label htmlFor="imageMessage" className="cursor-pointer">
                <BiSolidCamera color="#85939c" size="20" />
                <input type="file" accept="image/*" name="imageMessage" id="imageMessage" className="hidden" onChange={handleSubmitMessageImage} />
              </label>
            </div>
          </div>
          <div className="w-11 bg-[#10977a] rounded-full h-11 aspect-square flex items-center justify-center">
            {message.length ? (
              <button onClick={handleSubmitMessageText}>
                <MdSend size="18" color="white" />
              </button>
            ) : (
              <button onClick={() => setshowVoiceRecorder(true)}>
                <MdMic size="18" color="white" />
              </button>
            )}
          </div>
        </div>
      )}

      {showEmoji && (
        <div className="md:w-[69%] bg-[#1f2c34] ">
          <Emoji setMessage={setmessage} />
        </div>
      )}
      {showVoiceRecorder && <VoiceRecorder hide={setshowVoiceRecorder} currentUserId={currentUserId} targetUserId={targetUserId} />}
    </div>
  );
};

export default MessageBar;

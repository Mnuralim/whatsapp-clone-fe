import React, { useEffect, useRef, useState } from "react";
import MessageStatus from "./MessageStatus";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaStop } from "react-icons/fa";
import Avatar from "@/components/Avatar";

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

export const VoiceMessage = ({ side, message, time, messageStatus, senderId, currentUserId, senderUsername, senderProfileImage, createdAt }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [audioMessage, setAudioMessage] = useState<HTMLAudioElement | null>(null);
  const waveFormRef = useRef<HTMLDivElement | null>(null);
  const waveForm = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveForm.current === null) {
      waveForm.current = WaveSurfer.create({
        container: waveFormRef.current!,
        waveColor: "#aaa",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 20,
        barGap: 5,
      });
      waveForm.current.on("finish", () => {
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    const audioURL = message;
    const audio = new Audio(audioURL);
    setAudioMessage(audio);
    waveForm.current!.load(audioURL);
    waveForm.current!.on("ready", () => {
      setTotalDuration(waveForm.current!.getDuration());
    });
  }, [message]);

  useEffect(() => {
    if (audioMessage) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };

      audioMessage.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audioMessage]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveForm.current?.stop();
      waveForm.current?.play();
      audioMessage.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    waveForm.current?.stop();
    audioMessage?.pause();
    setIsPlaying(false);
  };

  return (
    <div className={`p-2 rounded-lg  flex items-center gap-5  ${side === "right" ? "bg-[#005d4b]" : "bg-[#1f2c34]"}`}>
      <Avatar src={senderProfileImage} size="medium" />
      <div className="text-gray-400 cursor-pointer">{!isPlaying ? <FaPlay onClick={handlePlayAudio} /> : <FaStop onClick={handlePauseAudio} />}</div>
      <div className="relative">
        <div className="w-48" ref={waveFormRef} />
        <div className="flex justify-between items-center text-[10px] text-[#85939c] absolute bottom-[-25px] w-full">
          <span>{formatTime(isPlaying ? currentPlaybackTime : totalDuration)}</span>
          <div className="flex gap-1 items-center">
            <span>{time}</span>
            {senderId == currentUserId ? (
              <div>
                <MessageStatus messageStatus={messageStatus} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

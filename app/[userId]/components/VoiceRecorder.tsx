"use client";
import { newMessageAudio } from "@/utils/fetch";
import React, { useRef, useState, useEffect } from "react";
import { FaMicrophone, FaPauseCircle, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";
import { mutate } from "swr/_internal";

interface Props {
  hide: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
  targetUserId: string;
}

const VoiceRecorder = ({ hide, currentUserId, targetUserId }: Props) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [isPlaying, setisPlaying] = useState<boolean>(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
  const [totalDuration, settotalDuration] = useState<number>(0);
  const [waveForm, setWaveForm] = useState<WaveSurfer | null>(null);
  const [renderedAudio, setRenderedAudio] = useState<File | null>(null);
  const waveFormRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          settotalDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormRef.current!,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
    });
    setWaveForm(waveSurfer);
    waveSurfer.on("finish", () => {
      setisPlaying(false);
    });
    return () => {
      waveSurfer.destroy();
    };
  }, []);

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(recordedAudio.currentTime);
      };

      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  const formaTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (waveForm) handleStartRecording();
  }, [waveForm]);

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveForm?.stop();
      waveForm?.play();
      recordedAudio.play();
      setisPlaying(true);
    }
  };

  const handlePauseRecording = () => {
    waveForm?.stop();
    recordedAudio?.pause();
    setisPlaying(false);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      waveForm?.stop();

      const audioChunks: any[] = [];
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderedAudio(audioFile);
      });
    }
  };

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    settotalDuration(0);
    setIsRecording(true);
    setRecordedAudio(null);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioRef.current!.srcObject = stream;

        const chunks: any = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          setRecordedAudio(audio);

          waveForm?.load(audioURL);
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendRecording = async () => {
    try {
      if (renderedAudio) {
        const formData = new FormData();
        formData.append("audio", renderedAudio);
        const response = await newMessageAudio(currentUserId, targetUserId, formData);
        if (response?.ok) {
          mutate(`${process.env.API_URL}/api/v1/messages/${currentUserId}/${targetUserId}`);
          hide(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center w-full  bg-[#121b22] justify-end rounded-full md:max-w-[68.5%]">
      <button onClick={() => hide(false)}>
        <FaTrash color="#85939c" size="20" />
      </button>
      <div className="py-2 px-4 flex gap-3 justify-center items-center">
        {isRecording ? (
          <div className="text-red-500 animate-pulse 2-60 text-center">
            Recording <span>{recordingDuration}s</span>
          </div>
        ) : (
          <div>{recordedAudio && <>{!isPlaying ? <FaPlay onClick={handlePlayRecording} color="white" /> : <FaStop color="white" onClick={handlePauseRecording} />}</>}</div>
        )}
        <div className="w-32" ref={waveFormRef} hidden={isRecording} />
        {recordedAudio && isPlaying && <span className="text-white">{formaTime(currentPlaybackTime)}</span>}
        {recordedAudio && !isPlaying && <span className="text-white">{formaTime(totalDuration)}</span>}
        <audio ref={audioRef} hidden />
        <div className="mr-4">{!isRecording ? <FaMicrophone className="text-red-500" onClick={handleStartRecording} /> : <FaPauseCircle className="text-red-500" onClick={handleStopRecording} />}</div>
        <button className="w-11 bg-[#10977a] rounded-full h-11 aspect-square flex items-center justify-center">
          <MdSend size="18" color="white" onClick={sendRecording} />
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;

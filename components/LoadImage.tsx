import Image from "next/image";
import React from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbClockHour3 } from "react-icons/tb";
import { calculateTime } from "@/utils/time";
import { useParams } from "next/navigation";

export const LoadImage = () => {
  const { loadImage } = useGlobalContext();
  const { isLoad, createdAt, to, from, urlImage } = loadImage;
  const params = useParams();
  const userParamId: string = params?.userId as string;

  if (!isLoad || userParamId != to) return null;

  return (
    <div className={`p-1 rounded-lg max-w-[60%]  md:max-w-[300px] cursor-pointer bg-[#005d4b] self-end`}>
      <div className="relative">
        <Image src={urlImage as string} alt="message image" width={3000} height={3000} className="rounded-lg object-cover w-full h-auto blur-sm bg-black" />
        <div className="absolute right-0 bottom-0 flex items-center gap-1">
          <p className={`text-[10px] min-w-fit $}`}>{calculateTime(createdAt as Date)}</p>
          <div>
            <TbClockHour3 size="13" color="#85939c" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AiOutlineLoading3Quarters color="#10977a" size="45" className="animate-spin font-bold" />
        </div>
      </div>
    </div>
  );
};

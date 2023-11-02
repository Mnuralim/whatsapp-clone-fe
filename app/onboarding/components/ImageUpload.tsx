import Image from "next/image";
import React from "react";
import { BiSolidCamera } from "react-icons/bi";

interface Props {
  thumbnail: ArrayBuffer | string | null;
  profileImageUser: string | null | File;
}

const ImageUpload = ({ thumbnail, profileImageUser }: Props) => {
  return (
    <>
      <label htmlFor="imageProfile" className="relative aspect-square w-20 rounded-full p-3 group cursor-pointer">
        {thumbnail ? (
          <Image src={`${thumbnail}`} alt="logo" width={80} height={80} className=" object-cover rounded-full group-hover:opacity-40 aspect-square" />
        ) : (
          <Image src={profileImageUser as string} alt="logo" width={80} height={80} className="object-cover rounded-full group-hover:opacity-40 aspect-square" />
        )}
        <div className="w-full h-full absolute rounded-full inset-0 flex flex-col text-white justify-center items-center opacity-0 group-hover:opacity-100 transform transition-opacity duration-300 ease-in-out">
          <BiSolidCamera size="20" />
          <p className="text-xs">Change</p>
          <p className="text-xs">profile</p>
          <p className="text-xs">photo</p>
        </div>
      </label>
    </>
  );
};

export default ImageUpload;

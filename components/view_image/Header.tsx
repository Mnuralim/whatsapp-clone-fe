import { useGlobalContext } from "@/context/GlobalContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillEmojiLaughingFill, BsFillStarFill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";

const Header = () => {
  const { showViewImage, setShowViewImage } = useGlobalContext();
  const { author, createdAt, profileImage, image } = showViewImage;

  const handleCloseViewImage = () => {
    setShowViewImage({
      author: "",
      profileImage: "",
      image: "",
      isShow: false,
      createdAt: null,
    });
  };

  const handleButtonDownload = async () => {
    const url = image;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed");
      }
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      console.log(urlBlob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = urlBlob;
      a.download = `IMG-${Date.now()}${author}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    } catch (error) {
      console.error("An error ocured:", error);
    }
  };

  return (
    <div className="flex items-center justify-between py-[10px] px-3 text-[#85939c]">
      <div className="flex items-center gap-3">
        <FaArrowLeft onClick={handleCloseViewImage} className="cursor-pointer md:hidden" />
        <Image width={4000} height={4000} src={profileImage} alt="profile" className="object-cover w-10 aspect-square rounded-full hidden md:block" />
        <div>
          <h2 className="text-white">{author}</h2>
          <p className="text-xs">{createdAt && createdAt?.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <BsFillStarFill size="21" className="cursor-pointer" />
        <BsFillEmojiLaughingFill size="21" className="cursor-pointer" />
        <PiShareFatFill size="21" className="cursor-pointer" />
        {image && (
          <button onClick={handleButtonDownload}>
            <MdDownload size="21" className="cursor-pointer" />
          </button>
        )}
        <AiOutlineClose onClick={handleCloseViewImage} size="21" className="hidden cursor-pointer md:block" />
      </div>
    </div>
  );
};

export default Header;

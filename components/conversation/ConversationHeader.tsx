"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { SiCircleci } from "react-icons/si";
import { IoMdCall } from "react-icons/io";
import { BiDotsVerticalRounded, BiSolidMessageAdd } from "react-icons/bi";
import { useGlobalContext } from "@/context/GlobalContext";
import Avatar from "../Avatar";
import { MdGroups2 } from "react-icons/md";

const ConversationHeader = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const { setShowProfileSetting, setShowAllContact } = useGlobalContext();

  const handeleOpenSetting = () => {
    setShowProfileSetting(true);
  };

  return (
    <div className="min-w-0 flex items-center justify-between bg-[#202c33] text-[#aebac1] px-4 py-[10px]">
      <button onClick={handeleOpenSetting}>
        <Avatar src={currentUser?.image as string} size="small" />
      </button>
      <div className="flex items-center gap-7">
        <Link href={"/story"}>
          <SiCircleci size="24" />
        </Link>
        <Link href={"/call"}>
          <IoMdCall size="24" />
        </Link>
        <button onClick={() => setShowAllContact(true)}>
          <BiSolidMessageAdd size="22" />
        </button>
        <MdGroups2 size="25" />
        <BiDotsVerticalRounded size="24" />
      </div>
    </div>
  );
};

export default ConversationHeader;

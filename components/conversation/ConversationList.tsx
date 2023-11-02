"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { SearchBar } from "./SearchBar";
import ConversationItem from "./ConversationItem";

interface Props {
  conversations: Conversation[];
}

const ConversationList = ({ conversations }: Props) => {
  const [keyword, setKeyword] = useState<string>("");
  const { setShowAllContact } = useGlobalContext();

  const { data: session } = useSession();
  const currentUser = session?.user;
  const pathName = usePathname();

  const filterConversations = conversations.filter((el) => (currentUser?._id === el.sender._id ? el.receiver.username.toLowerCase().includes(keyword.toLowerCase()) : el.sender.username.toLowerCase().includes(keyword.toLowerCase())));

  if (!conversations.length) {
    return (
      <div className="flex justify-center flex-col items-center  w-full h-full bg-[#111b21] gap-2 pb-28">
        <div className="text-slate-200 text-xl ">Welcome to WhatsApp</div>
        <button onClick={() => setShowAllContact(true)} className="bg-[#10977a] text-black py-2 px-3 font-semibold rounded-md mt-3">
          Getting started
        </button>
      </div>
    );
  }
  return (
    <div className="bg-[#111b21] min-h-screen pt-2">
      <SearchBar keyword={keyword} onKeywordChange={setKeyword} />
      <div className="flex flex-col mt-2">
        {!filterConversations.length ? (
          <p className="text-center mt-24 text-[#8696A0]">No contacts found</p>
        ) : (
          filterConversations.map((conv) => <ConversationItem key={conv._id} conversation={conv} currentUserId={currentUser?._id as string} pathName={pathName as string} />)
        )}
      </div>
    </div>
  );
};

export default ConversationList;

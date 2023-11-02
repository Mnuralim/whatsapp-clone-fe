"use client";
import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import ChatHeader from "./components/ChatHeader";
import { fetcher } from "@/utils/fetcher";
import LoadingComp from "@/components/Loading";
import ChatBody from "./components/ChatBody";
import MessageBar from "./components/MessageBar";
import MainProfile from "@/components/profile/otheruser/MainProfile";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { userId: string } }) => {
  const router = useRouter();
  const { showOtherProfileSetting } = useGlobalContext();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace("/");
    },
  });
  const currentUser = session?.user;

  const messageUrl = currentUser ? `${process.env.API_URL}/api/v1/messages/${currentUser?._id}/${params.userId}` : null;
  const userUrl = currentUser ? `${process.env.API_URL}/api/v1/users/${params.userId}` : null;

  const { data: messageData, error: messageError } = useSWR(messageUrl, fetcher);
  const { data: userData, error: userError } = useSWR(userUrl, fetcher);

  const targetUser: IUser = userData?.data?.user;
  const allMessages: Conversation[] = messageData?.data?.messages;

  if (!messageData || !userData) return <LoadingComp />;
  if (messageError || userError) return <div>Error</div>;

  return (
    <>
      <section className="w-full absolute z-10 top-0 md:max-w-[69%] md:right-0">
        <div className={`w-full absolute  h-screen min-h-screen bg-black overflow-y-scroll scrollbar-width-none transition-all duration-[400ms] ${showOtherProfileSetting ? "md:max-w-[61%]" : "md:max-w-full"} `}>
          <ChatHeader targetUser={targetUser} />
          <ChatBody messages={allMessages} targetUserId={params.userId} currentUserId={currentUser?._id as string} />
          <MessageBar currentUserId={currentUser?._id as string} targetUserId={params.userId} />
        </div>
      </section>
      <div className={`h-screen w-full top-0 fixed z-[200] md:fixed md:max-w-[27%] overflow-hidden transition-all duration-[400ms] ${showOtherProfileSetting ? "right-[0px]" : "md:right-[-27%] -right-full"}`}>
        <MainProfile />
      </div>
    </>
  );
};

export default Page;

"use client";
import React, { useEffect, useState } from "react";
import ConversationHeader from "./ConversationHeader";
import ConversationList from "./ConversationList";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import { redirect, usePathname } from "next/navigation";
import Pusher from "pusher-js";
import MainProfile from "../profile/myprofile/MainProfile";
import MainContact from "../contact/MainContact";

const MainConversation = () => {
  const pathName = usePathname();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/login");
    },
  });
  const currentUser = session?.user;

  const { data, error } = useSWR(
    currentUser ? `${process.env.API_URL}/api/v1/messages/conversations/${currentUser._id}` : null, // Only fetch when currentUser is available
    fetcher
  );
  const conversations = data?.data?.conversations || [];

  useEffect(() => {
    const subscribeToPusher = () => {
      const pusher = new Pusher(process.env.PUSHER_KEY as string, {
        cluster: "ap1",
      });
      const channel = pusher.subscribe("messages");
      channel.bind("new-message", async (data: any) => {
        await mutate(`${process.env.API_URL}/api/v1/messages/conversations/${currentUser?._id}`);
      });
    };

    if (currentUser) {
      subscribeToPusher();
    }
  }, [currentUser]);

  if (error) return <div>error</div>;

  return pathName === "/login" || pathName === "/onboarding" ? null : (
    <aside className="md:fixed md:max-w-[31%] md:min-w-0 md:w-full min-h-screen h-screen overflow-hidden border-r-slate-700 border-r">
      <ConversationHeader />
      <ConversationList conversations={conversations} />
      <MainProfile />
      <MainContact />
    </aside>
  );
};

export default MainConversation;

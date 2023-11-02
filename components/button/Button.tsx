"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export const ButtonLoginGoogle = () => {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "/onboarding" })} className="w-full flex justify-between gap-2 py-2 px-2 rounded-lg bg-slate-900 text-white ">
      <Image src={"/img/google.png"} alt="google" width={25} height={25} />
      <span className="font-medium">Continue with Google</span>
      <span></span>
    </button>
  );
};

export const ButtonLoginGithub = () => {
  return (
    <button onClick={() => signIn("github", { callbackUrl: "/onboarding" })} className="w-full flex justify-between py-2 px-2 rounded-lg bg-slate-900 text-white">
      <BsGithub size={25} />
      <span className="font-medium">Continue with Github</span>
      <span></span>
    </button>
  );
};

export const ButtonBack = ({ color, size }: { color: string; size: string }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <FaArrowLeft color={color} size={size} />
    </button>
  );
};

export const ButtonLogout = () => {
  return (
    <button className="text-[#F15C6D] flex items-center gap-5" onClick={() => signOut()}>
      <BiLogOut className="transform scale-x-[-1] " size="24" />
      <p>Log out</p>
    </button>
  );
};

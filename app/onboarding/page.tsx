"use client";

import LoadingComp from "@/components/Loading";
import { updateUser } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import { mutate } from "swr";

const Page = () => {
  const [username, setUsername] = useState("");
  const [aboutUser, setaboutUser] = useState("");
  const [profileImageUser, setProfileImageUser] = useState<string | null | File>("");
  const [thumbnail, setthumbnail] = useState<ArrayBuffer | string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;

  useEffect(() => {
    if (currentUser) {
      setProfileImageUser(currentUser.image);
      setaboutUser(currentUser.about);
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageUser(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setthumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const formData = new FormData();
      formData.append("about", aboutUser);
      formData.append("username", username);
      formData.append("image", profileImageUser as string);

      const response = await updateUser(currentUser?._id as string, formData);
      if (response?.ok) {
        setisLoading(false);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      setisLoading(false);
    }
  };

  if (!currentUser) return <LoadingComp />;

  return (
    <section className="relative bg-[#1f2c34] z-[99] h-full top-0 w-full overflow-hidden left-0 min-h-screen flex-col flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image src={"/img/whatsapp.gif"} alt="logo" width={70} height={70} className="object-contain" />
          <h2 className="text-white font-semibold text-2xl">WhatsApp</h2>
        </div>
        <p className="text-white text-center">Create your profile</p>
        <Form
          handleSubmit={handleSubmit}
          handleChangeImage={handleChangeImage}
          isLoading={isLoading}
          profileImageUser={profileImageUser}
          thumbnail={thumbnail}
          username={username}
          about={aboutUser}
          setUsername={setUsername}
          setAbout={setaboutUser}
        />
      </div>
      {isLoading ? <LoadingComp /> : null}
    </section>
  );
};

export default Page;

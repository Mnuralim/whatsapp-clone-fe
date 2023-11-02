"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiFillCamera, AiOutlineLoading3Quarters, AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import Form from "./Form";
import { updateUser } from "@/utils/fetch";
import { mutate } from "swr";
import { useGlobalContext } from "@/context/GlobalContext";
import Avatar from "@/components/Avatar";
import { ButtonLogout } from "@/components/button/Button";

interface Props {
  currentUser: IUser;
}

const BodyProfile = ({ currentUser }: Props) => {
  const [showEditMenu, setshowEditMenu] = useState(false);
  const [bgBlack, setbgBlack] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [label, setLabel] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const { setShowViewImage } = useGlobalContext();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id !== "usernameBtn" && target.id !== "aboutBtn") {
        if (formRef.current && !formRef.current.contains(target)) {
          setshowEditMenu(false);
          setbgBlack(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleEditMenu = (label: string) => {
    setbgBlack(true);
    setLabel(label);
    setshowEditMenu(true);
  };

  const handleUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files?.[0];

    try {
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const response = await updateUser(currentUser._id, formData);
        if (response?.ok) {
          mutate(`${process.env.API_URL}/api/v1/users/${currentUser._id}`);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowViewImage = () => {
    setShowViewImage({
      isShow: true,
      author: currentUser.username,
      createdAt: new Date(currentUser.createdAt),
      profileImage: currentUser.profile_image,
      image: currentUser.profile_image,
    });
  };

  return (
    <div className=" mt-16 text-white flex flex-col items-center w-full px-3 gap-5 h-screen">
      <div className="aspect-square relative cursor-pointer">
        <button onClick={handleShowViewImage}>
          <Avatar src={currentUser.profile_image as string} size="large" />
        </button>
        {loading ? (
          <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 rounded-full flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin" size="30" />
          </div>
        ) : null}
        <div className="absolute -right-1 bottom-1">
          <label htmlFor="profileImage">
            <div className="w-12 h-12 bg-[#10977a] rounded-full flex items-center justify-center cursor-pointer">
              <AiFillCamera size="23" />
              <input type="file" name="profileImage" id="profileImage" accept="image/*" className="hidden" onChange={handleUpdateImage} />
            </div>
          </label>
        </div>
      </div>
      <div className="flex flex-col w-full px-5">
        <div className="flex flex-col w-full gap-1 border-b-[0.5px] border-[#85939c] border-opacity-20 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <BsFillPersonFill color="#85939c" size="23" />
              <div className="flex flex-col">
                <p className="text-[#85939c]">Username</p>
                <p>{currentUser.username}</p>
              </div>
            </div>
            <div>
              <button onClick={() => handleEditMenu("username")}>
                <label htmlFor="username">
                  <MdModeEdit size="20" color="#10977a" id="usernameBtn" className="cursor-pointer" />
                </label>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <BsFillPersonFill color="#1f2c34" className="opacity-0" size="23" />
            </div>
            <p className="text-[#85939c] text-sm">This is your username. This username will be visible to your WhatsApp contacts.</p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1 border-b-[0.5px] border-[#85939c] border-opacity-20 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <PiWarningCircle color="#85939c" size="23" />
              <div className="flex flex-col">
                <p className="text-[#85939c]">About</p>
                <p>{currentUser.about}</p>
              </div>
            </div>
            <div>
              <button onClick={() => handleEditMenu("about")}>
                <label htmlFor="about">
                  <MdModeEdit size="20" color="#10977a" id="aboutBtn" className="cursor-pointer" />
                </label>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <AiOutlineMail color="#85939c" size="23" />
              <div className="flex flex-col">
                <p className="text-[#85939c]">Email</p>
                <p>{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 self-start px-5">
        <ButtonLogout />
      </div>
      {bgBlack && <div className="bg-black bg-opacity-50 absolute z-50 top-0 left-0 w-full h-screen"></div>}
      {showEditMenu && (
        <div ref={formRef} className="w-full">
          <Form setshowEditMenu={setshowEditMenu} setbgBlack={setbgBlack} label={label} currentUserId={currentUser._id} />
        </div>
      )}
    </div>
  );
};

export default BodyProfile;

import Emoji from "@/components/Emoji";
import { updateUser } from "@/utils/fetch";
import React, { useState } from "react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { mutate } from "swr";

interface Props {
  setshowEditMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setbgBlack: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  currentUserId: string;
}

const Form = ({ setshowEditMenu, setbgBlack, label, currentUserId }: Props) => {
  const [username, setusername] = useState<string>("");
  const [about, setabout] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const handleClose = () => {
    setshowEditMenu(false);
    setbgBlack(false);
  };

  const handleSubmitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      const response = await updateUser(currentUserId, formData);
      if (response?.ok) {
        mutate(`${process.env.API_URL}/api/v1/users/${currentUserId}`);
        setshowEditMenu(false);
        setbgBlack(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleSubmitAbout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("about", about);
      const response = await updateUser(currentUserId, formData);
      if (response?.ok) {
        mutate(`${process.env.API_URL}/api/v1/users/${currentUserId}`);
        setshowEditMenu(false);
        setbgBlack(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute w-full bg-[#1f2c34] rounded-t-lg h-[18%] bottom-0 left-0 z-[100]">
      <form onSubmit={label === "username" ? handleSubmitUsername : handleSubmitAbout} className="px-6">
        <div className="flex flex-col justify-between gap-3 py-5">
          <label htmlFor={label} className="font-semibold">
            Enter your {label}
          </label>
          <div className="flex items-center justify-between gap-4">
            <div className="w-full relative">
              {label === "username" ? (
                <input type="text" name={label} id={label} className="w-full bg-transparent border-b-[#10977a] border-b-2 outline-none" value={username} onChange={(e) => setusername(e.target.value)} maxLength={25} />
              ) : (
                <input type="text" name={label} id={label} className="w-full bg-transparent border-b-[#10977a] border-b-2 outline-none" value={about} onChange={(e) => setabout(e.target.value)} maxLength={25} />
              )}
              <p className="absolute right-1 bottom-1 text-[#85939c] text-sm">{label === "username" ? 25 - username.length : 25 - about.length}</p>
            </div>

            <BsFillEmojiLaughingFill onClick={() => setShowEmoji((prev) => !prev)} size="21" color="#85939c" className="cursor-pointer" />
          </div>
          <div className="flex gap-6 self-end mt-3">
            <button onClick={handleClose} type="button" className="text-[#10977a]">
              Cancel
            </button>
            <button type="submit" className="text-[#10977a]">
              Save
            </button>
          </div>
        </div>
      </form>
      <div className={`absolute w-full ${showEmoji ? "top-[-300px]" : "top-44"}`}>
        <Emoji setMessage={label === "username" ? setusername : setabout} />
      </div>
    </div>
  );
};

export default Form;

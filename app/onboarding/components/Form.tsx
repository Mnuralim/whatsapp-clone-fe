import React from "react";
import ImageUpload from "./ImageUpload";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  username: string;
  about: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setAbout: React.Dispatch<React.SetStateAction<string>>;
  profileImageUser: string | null | File;
  thumbnail: ArrayBuffer | string | null;
  isLoading: boolean;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({ handleSubmit, handleChangeImage, username, about, setUsername, setAbout, thumbnail, profileImageUser, isLoading }: Props) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
      <ImageUpload thumbnail={thumbnail} profileImageUser={profileImageUser} />
      <input type="file" name="imageProfile" accept="image/*" id="imageProfile" className="hidden" onChange={handleChangeImage} />
      <div>
        <label htmlFor="username" className="text-[#10977a] opacity-80 font-semibold">
          Username
        </label>
        <div className="mt-1">
          <input type="text" name="username" id="username" className="rounded-md py-1 px-2 text-white bg-[#28373e] outline-none" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      </div>
      <div>
        <label htmlFor="about" className="text-[#10977a] opacity-80 font-semibold">
          About
        </label>
        <div className="mt-1">
          <input type="text" name="about" id="about" className="rounded-md py-1 px-2 text-white bg-[#28373e] outline-none" value={about} onChange={(e) => setAbout(e.target.value)} />
        </div>
      </div>
      <div className="w-full self-center flex justify-center mt-2">
        <button type="submit" className="bg-slate-900 text-white px-5 font-semibold rounded-md py-2">
          {isLoading ? "Saving..." : "Create Profile"}
        </button>
      </div>
    </form>
  );
};

export default Form;

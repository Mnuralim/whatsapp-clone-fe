import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";

interface Props {
  keyword: string;
  onKeywordChange: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ keyword, onKeywordChange }: Props) => {
  return (
    <div className="relative flex items-center justify-between px-2 gap-2">
      <input type="text" className="w-full bg-[#202c33] py-1 rounded-md outline-none pl-14 pr-10 text-white" value={keyword} onChange={(e) => onKeywordChange(e.target.value)} />
      <BsFilter color="#aebac1" size="23" />
      <AiOutlineSearch color="#aebac1" className="absolute left-6" />
    </div>
  );
};

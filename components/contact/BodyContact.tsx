"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../Avatar";

interface Props {
  users: IUser[];
}

const BodyContact = ({ users }: Props) => {
  const [keyword, setkeyword] = useState("");
  const userFilter = users?.filter((user) => user.username.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <div>
      <div className={`w-full px-3 mt-2`}>
        <input id="searchForm" type="search" className="w-full bg-[#202c33] rounded-2xl py-2 outline-none px-5 text-white" placeholder="Search name..." value={keyword} onChange={(e) => setkeyword(e.target.value)} />
      </div>
      <div className="min-h-screen mt-5 text-white max-h-screen flex flex-col w-full px-3 gap-6">
        <p className="text-[#85939c] font-semibold">Contacts on WhatsApp</p>
        {userFilter.length ? (
          userFilter.map((user) => (
            <Link href={`/${user._id}`} key={user._id} className="flex justify-between">
              <div className="flex items-center gap-4">
                <Avatar src={user.profile_image} size="medium" />
                <div>
                  <h2 className="font-semibold text-[#e0e6eb]">{user.username}</h2>
                  <p className="text-[#85939c] flex items-center gap-1">{user?.about}</p>
                </div>
              </div>
              <p className="text-xs text-[#85939c]"></p>
            </Link>
          ))
        ) : (
          <p className="ml-10 text-[#85939c]">{`No results found for '${keyword}'`}</p>
        )}
      </div>
    </div>
  );
};

export default BodyContact;

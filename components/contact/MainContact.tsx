import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import useSWR from "swr";
import LoadingComp from "@/components/Loading";
import { fetcher } from "@/utils/fetcher";
import HeaderContact from "./HeaderContact";
import BodyContact from "./BodyContact";

const MainContact = () => {
  const { showAllContact } = useGlobalContext();

  const { data, error } = useSWR(`${process.env.API_URL}/api/v1/users/`, fetcher);

  if (!data) return <LoadingComp />;
  if (error) return <div>error</div>;

  const allUsers: IUser[] = data.data.users;
  return (
    <div className={`fixed h-screen bg-[#111b21]  w-full md:max-w-[31%] top-0 transition-all duration-[400ms] ${showAllContact ? "left-0" : "left-[-100%] md:left-[-31%]"} `}>
      <HeaderContact />
      <BodyContact users={allUsers} />
    </div>
  );
};

export default MainContact;

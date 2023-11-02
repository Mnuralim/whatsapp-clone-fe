import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import HeaderProfile from "./HeaderProfile";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import LoadingComp from "@/components/Loading";
import { fetcher } from "@/utils/fetcher";
import BodyProfile from "./BodyProfile";

const MainProfile = () => {
  const { showProfileSetting } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user;
  const { data, error } = useSWR(user ? `${process.env.API_URL}/api/v1/users/${user?._id}` : null, fetcher);
  const currentUser: IUser = data?.data?.user;

  if (!data) return <LoadingComp />;
  if (error) return <div>error</div>;
  return (
    <div className={`fixed h-screen bg-[#111b21]  w-full md:max-w-[31%] top-0 transition-all duration-[400ms] ${showProfileSetting ? "left-0" : "left-[-100%] md:left-[-31%]"} `}>
      <HeaderProfile />
      <BodyProfile currentUser={currentUser} />
    </div>
  );
};

export default MainProfile;

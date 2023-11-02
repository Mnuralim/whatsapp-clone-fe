import React from "react";
import HeaderProfile from "./HeaderProfile";
import useSWR from "swr";
import LoadingComp from "@/components/Loading";
import { fetcher } from "@/utils/fetcher";
import { useParams } from "next/navigation";
import BodyProfile from "./BodyProfile";

const MainProfile = () => {
  const params = useParams();
  const { data, error } = useSWR(`${process.env.API_URL}/api/v1/users/${params?.userId}`, fetcher);

  if (!params?.userId) return <LoadingComp />;
  if (!data) return <LoadingComp />;
  if (error) return <div>error</div>;

  const otherUser: IUser = data.data.user;
  return (
    <div className="bg-[#111b21] relative">
      <HeaderProfile />
      <BodyProfile otherUser={otherUser} />
    </div>
  );
};

export default MainProfile;

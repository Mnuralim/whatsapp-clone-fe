import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
interface Props {
  messageStatus: string;
}

const MessageStatus = ({ messageStatus }: Props) => {
  return (
    <>
      {messageStatus === "sent" && <BsCheck size="25" color="#85939c" />}
      {messageStatus === "delivered" && <BsCheckAll size="25" color="#85939c" />}
      {messageStatus === "read" && <BsCheckAll size="25" color="#53bdeb" />}
    </>
  );
};

export default MessageStatus;

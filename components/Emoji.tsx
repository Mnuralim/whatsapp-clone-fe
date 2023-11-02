import React from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";

interface Props {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Emoji = ({ setMessage }: Props) => {
  const handleEmojiClik = (emoji: any) => {
    setMessage((prev) => prev + emoji.emoji);
  };
  return (
    <>
      <EmojiPicker onEmojiClick={handleEmojiClik} lazyLoadEmojis searchDisabled autoFocusSearch theme={Theme.DARK} width={"100%"} height={300} />
    </>
  );
};

export default Emoji;

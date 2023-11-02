import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  size?: string;
  className?: string;
}

const Avatar = ({ src, size, className }: Props) => {
  return (
    <>
      {size === "small" && <Image width={2000} height={2000} src={src} alt={"avatar"} className={`${className} rounded-full object-cover aspect-square w-10 h-10`} />}
      {size === "medium" && <Image width={2000} height={2000} src={src} alt={"avatar"} className={`${className} rounded-full object-cover aspect-square w-12 h-12`} />}
      {size === "semi-large" && <Image width={2000} height={2000} src={src} alt={"avatar"} className={`${className} rounded-full object-cover aspect-square w-28 h-28`} />}
      {size === "large" && <Image width={2000} height={2000} src={src} alt={"avatar"} className={`${className} rounded-full object-cover aspect-square w-40 h-40`} />}
    </>
  );
};

export default Avatar;

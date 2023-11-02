import Image from "next/image";
import React from "react";
import { ButtonLoginGithub, ButtonLoginGoogle } from "@/components/button/Button";

const Page = () => {
  return (
    <section className="relative bg-[#1f2c34] z-[99] h-full top-0 w-full overflow-hidden left-0 min-h-screen flex-col flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image src={"/img/whatsapp.gif"} alt="logo" width={70} height={70} className="object-contain" />
          <h2 className="text-white font-semibold text-2xl">WhatsApp</h2>
        </div>
        <div className="w-full flex mt-5">
          <ButtonLoginGoogle />
        </div>
        <div className="w-full flex">
          <ButtonLoginGithub />
        </div>
      </div>
    </section>
  );
};

export default Page;

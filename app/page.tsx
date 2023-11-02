"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import Image from "next/image";

export default function Home() {
  const { setShowAllContact } = useGlobalContext();
  return (
    <main className="hidden md:block md:w-full md:absolute md:max-w-[69%] md:right-0 md:top-0">
      <div className="flex justify-center flex-col items-center w-full h-screen min-h-screen bg-[#1f2c34] gap-12">
        <div>
          <Image src={"/img/whatsapp.gif"} alt="logo" width={100} height={100} className="object-contain" />
        </div>
        <div className="text-slate-200 text-5xl ">Welcome to WhatsApp</div>
        <p className="text-[#8696A0] text-center max-w-[55%]">Make calls, share your screen and get a faster experience when you download the Windows app.</p>
        <button onClick={() => setShowAllContact(true)} className="bg-[#10977a] text-black py-2 px-3 font-semibold rounded-md mt-3">
          Getting started
        </button>
      </div>
    </main>
  );
}

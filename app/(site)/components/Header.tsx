"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { GoBell, GoPeople } from "react-icons/go";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession({ required: true });

  const router = useRouter();

  return (
    <div className="sticky top-0 flex flex-row justify-between w-full">
      <div className="flex flex-row px-8 py-5 space-x-2">
        <button
          className="items-center justify-center transition bg-black rounded-full hover:opacity-75"
          onClick={() => router.back()}
        >
          <RxCaretLeft size={35}></RxCaretLeft>
        </button>

        <button
          className="items-center justify-center hidden transition bg-black rounded-full md:flex hover:opacity-75"
          onClick={() => router.forward()}
        >
          <RxCaretRight size={35}></RxCaretRight>
        </button>
      </div>
      <div className="flex flex-row py-5 px-8 space-x-2">
        <button className="items-center justify-center transition bg-black rounded-full hover:opacity-75">
          <GoBell className="p-2" size={35}></GoBell>
        </button>
        <button className="items-center justify-center transition bg-black rounded-full hover:opacity-75">
          <GoPeople className="p-2" size={35}></GoPeople>
        </button>

        <button
          onClick={() => signOut()}
          className="items-center justify-center transition bg-black rounded-full hover:opacity-75"
        >
          <Image
            className="rounded-full p-1"
            src={session?.user!.image!}
            alt="Profile Picture"
            width={35}
            height={35}
          />
        </button>
      </div>
    </div>
  );
}

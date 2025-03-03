"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { Home, House, LucideHome } from "lucide-react";
import { useGetProfile } from "@/hooks/useProfile";

const TopSection = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
    }
  }, []);
  const { data } = useGetProfile(userId);

  const router = useRouter();
  return (
    <div className="w-[100%] h-16 flex gap-3 justify-between px-5 items-center rounded-none fixed z-10 bg-background">
      <div className="flex items-center gap-3 text-xl">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
        {/* <span className="">Zed Space</span> */}
      </div>
      <Avatar
        className="me-2 cursor-pointer w-11 h-11"
        onClick={() => {
          router.push(`/profile/${userId}`);
        }}
      >
        {data?.profileImg ? (
          <AvatarImage src={data?.profileImg} sizes="2" />
        ) : (
          <AvatarFallback className="bg-secondary text-white">P</AvatarFallback>
        )}
        {/* <img src="https://avatars.githubusercontent.com/u/103447301?v=4" alt="profile" /> */}
      </Avatar>
    </div>
  );
};

export default TopSection;

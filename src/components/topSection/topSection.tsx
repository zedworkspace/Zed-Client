"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
const TopSection = () => {
  const [userId, setUserId] = useState("");

  const userDetails = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user") as string);
      setUserId(user?._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userDetails();
  }, []);

  console.log(userId);

  const router = useRouter();
  return (
    <div className="w-full flex justify-between p-1">
      <div>
        <Image src="/logo.svg" width={40} height={0} alt="logo" />
      </div>
      <Avatar
        className="me-2 cursor-pointer"
        onClick={() => {
          router.push(`/${userId}`);
        }}
      >
        <AvatarImage src="" sizes="2" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TopSection;

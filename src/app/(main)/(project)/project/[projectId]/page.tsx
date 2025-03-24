"use client";
import { useGetBoards } from "@/hooks/useBoard";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const { projectId } = useParams() as {
    projectId: string;
  };
  const { data, isSuccess } = useGetBoards({ projectId });
  
  useEffect(() => {
    if (isSuccess) {
      const board = data?.data.find((board) => board.isDefault === true);
      if (board) {
        sessionStorage.setItem("channelType", "board");
        router.push(`/project/${projectId}/${board?._id}`);
      }
    }
  }, [isSuccess, router, projectId, data]);

  return <>{/* here we will load board skelton */}</>;
}

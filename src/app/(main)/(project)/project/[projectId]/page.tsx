"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams();
  const { projectId } = params;
  return <div>Project Id : {projectId}</div>;
}

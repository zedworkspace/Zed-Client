"use client"
import React from "react";
import { useParams } from "next/navigation";
export default function Page() {
  const { roleId } = useParams() as { roleId: string };
  return <div>This is role page
    <h1>Role:{roleId}</h1>
  </div>;
}

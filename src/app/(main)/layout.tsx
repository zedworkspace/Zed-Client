"use client";
import React from "react";

import TopSection from "@/components/topSection/topSection";
import LeftSection from "@/components/leftSection/leftSection";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <>
      <TopSection />
      <div className="flex">
        <LeftSection />
        <main className="bg-primary w-full min-h-screen border-none rounded-tl-xl">
          {children}
        </main>
      </div>
    </>
  );
}

export default layout;

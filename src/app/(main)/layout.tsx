"use client";
import React from "react";

import LeftSection from "@/components/leftSection/leftSection";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <>
      <div className="flex">
        <LeftSection />
        <main className="bg-primary w-[calc(100vw-4rem)] ml-16 h-screen overflow-scroll scrollbar-hide">
          {children}
        </main>
      </div>
    </>
  );
}

export default layout;

"use client";
import React from "react";

import TopSection from "@/components/topSection/topSection";
import SideBar from "@/components/adminSideBar/sidebar";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <>
      <TopSection />
      <div className="flex">
        <SideBar />
        <main className="bg-primary w-full  min-h-screen border-none mt-16">
          {children}
        </main>
      </div>
    </>
  );
}

export default layout;

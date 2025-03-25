"use client";
import Signup from "@/components/auth/signup";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <Signup />
    </Suspense>
  );
}

export default page;

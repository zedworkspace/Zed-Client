"use client";

import Signin from "@/components/auth/signin";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Signin />
    </Suspense>
  );
};

export default page;

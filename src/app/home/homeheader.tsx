import React from "react";
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from  "./ui/card";
import { Check, Users } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeHeader() {
  return (
    <Card className="bg-primary border-none mt-4">
      <CardHeader className="flex-col justify-center items-center">
        <CardDescription className="text-2xl text-muted-foreground">
          Friday, February 14
        </CardDescription>
        <CardTitle className="text-4xl text-muted-foreground font-normal">
          Good evening, shanoof
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col justify-center items-center">
        <div className="bg-secondary grid grid-cols-3 p-4 gap-4 justify-items-center items-center border-none rounded-full text-muted-foreground shadow-lg">
          <div className="flex justify-center items-center space-x-2 text-center ">
            <h1>Date Range</h1>
          </div>
          <div className="flex justify-center items-center space-x-2 text-center">
            <Check />
            <h1>
              <span className="text-xl">0</span> tasks completed
            </h1>
          </div>
          <div className="flex justify-center items-center space-x-2 text-center">
            <Users />
            <h1>
              <span className="text-xl">1</span> collaborator
            </h1>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

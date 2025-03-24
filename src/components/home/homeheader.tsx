import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Check, Users, ChevronDown } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetProfile } from "@/hooks/useProfile";

export default function HomeHeader() {
  const [userId, setUserId] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [greeting, setGreeting] = useState("Good Day");
  const [selectedWeek, setSelectedWeek] = useState("This Week");
  const [selectedMonth, setSelectedMonth] = useState("This Month");
  const [completedTasks, setCompletedTasks] = useState(0);
  const [collaborators, setCollaborators] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
    }

    // Greeting based on time
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hours = now.getHours();
      let greet = "Good Evening"; // Default 

      if (hours >= 5 && hours < 12) {
        greet = "Good Morning";
      } else if (hours >= 12 && hours < 18) {
        greet = "Good Afternoon";
      }

      setGreeting(greet);
      setCurrentDateTime(format(now, "EEEE, MMMM d"));
    };

    // Update the greeting
    updateTimeAndGreeting();

    // Update every minute
    const interval = setInterval(updateTimeAndGreeting, 60000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const { data: profileData } = useGetProfile(userId);

  return (
    <Card className="bg-neutral-900/100 border-none mt-4">
      <CardHeader className="flex-col justify-center items-center">
        <CardDescription className="text-2xl text-muted-foreground">
          {currentDateTime}
        </CardDescription>
        <CardTitle className="text-4xl text-muted-foreground font-normal">
          {greeting} {profileData?.name || "User"}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col justify-center items-center">
        <div className="bg-secondary grid grid-cols-3 p-4 gap-4 justify-items-center items-center border-none rounded-full text-muted-foreground shadow-lg">
          {/* Dropdown for My Week */}
          <div className="flex justify-center items-center space-x-2 text-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <h1>{selectedWeek}</h1>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedWeek("This Week")}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedWeek("This Month")}>
                  This Month
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setSelectedWeek("Next Week")}>
                  Next Week
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Dropdown for Completed Tasks */}
          <div className="flex justify-center items-center space-x-2 text-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <Check />
                <h1>
                  <span className="text-xl">{completedTasks}</span> tasks completed
                </h1>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCompletedTasks(0)}>
                  0 tasks completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCompletedTasks(5)}>
                  5 tasks completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCompletedTasks(10)}>
                  10 tasks completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Dropdown for Collaborators */}
          <div className="flex justify-center items-center space-x-2 text-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <Users />
                <h1>
                  <span className="text-xl">{collaborators}</span> collaborator
                </h1>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCollaborators(1)}>
                  1 collaborator
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCollaborators(2)}>
                  2 collaborators
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCollaborators(3)}>
                  3 collaborators
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
  useRepo,
  useRepoBranches,
  useRepoCommit,
  useRepoContributors,
  useRepoIssues,
  useRepoPulls,
} from "@/hooks/useGitHub";
import {
  Clock,
  Filter,
  GitBranch,
  GitGraph,
  Github,
  Search,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GitCommit, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import TrackerHeader from "@/components/GitHubTracker/TrackerHeader";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartData1 = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartDatad = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartData1d = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const chartConfig1 = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const data = [1,2,3];

const page = () => {
  const storedRepoName = localStorage.getItem("repoName") || "";
  const [repoName, setRepoNme] = useState("");
  const [isEnable, setEnable] = useState(false);
  const [brach, setBranch] = useState("main");
  const [details, setDetails] = useState(false);
  const qureyClient = useQueryClient();
  const { data: repo } = useRepo(storedRepoName, isEnable);
  const { data: commits } = useRepoCommit(storedRepoName, brach, isEnable);
  const { data: contributors } = useRepoContributors(storedRepoName, isEnable);
  const { data: pull } = useRepoPulls(storedRepoName, isEnable);
  const { data: issues } = useRepoIssues(storedRepoName, isEnable);
  const { data: branches } = useRepoBranches(storedRepoName, isEnable);
  console.log(branches);

  useEffect(() => {
    if (storedRepoName) {
      setEnable(true);
      qureyClient.invalidateQueries({ queryKey: ["commit", storedRepoName] });
    }
    console.log("useeffect worked");
  }, [brach, storedRepoName]);

  const handleOnSubmit = () => {
    setEnable(true);
    localStorage.setItem("repoName", repoName);
  };

  const totalVisitors = React.useMemo(() => {
    return chartData1.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");
  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  if (details) {
    return (
      <div className="bg-neutral-900/100">
        <div className="fixed z-10 w-full"><TrackerHeader/></div>
        <div className="w-[100%] flex flex-col items-center gap-5 mb-10">
          <div className="w-[90%] flex items-center gap-3 justify-between mt-20">
            <div className="flex items-center gap-3">
              <GitCommit />
              <h1 className="text-2xl font-bold">Commits</h1>
            </div>
            <button
              onClick={() => setDetails(false)}
              className="bg-black p-1 px-2 rounded-md text-white"
            >
              Back
            </button>
          </div>
          <div className="top w-[90%] h-[20rem] rounded-md flex gap-5">
            <div className="commit-graph w-[60%] h-full bg-primary rounded-md p-6">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <AreaChart accessibilityLayer data={chartDatad}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <defs>
                    <linearGradient
                      id="fillDesktop"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="url(#fillMobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="commit-list w-[40%] h-full bg-primary rounded-md p-5 flex flex-col gap-5 overflow-auto scrollbar-hide">
              <p className="font-bold text-lg">Commits</p>
              {commits &&
                commits.map((commit: any, index: number) => {
                  return (
                    <div key={index} className="flex gap-5 items-center">
                      <img
                        src={commit.author?.avatar_url}
                        alt=""
                        className="w-12 h-12 rounded-full bg-slate-300"
                      />
                      <div>
                        <div className="flex gap-3 items-center">
                          <span className="font-bold">
                            {commit.author?.login}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {moment(commit?.commit?.author?.date).fromNow()}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs">{commit.commit.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="w-[90%] flex gap-3">
            <Users />
            <h1 className="text-2xl font-bold">Contributions</h1>
          </div>
          <div className="bottom w-[90%] h-[20rem] bg-primary rounded-md">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData1d}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  dataKey={activeChart}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full bg-neutral-900/100 h-full flex flex-col overflow-auto">
        <div className="fixed z-10 w-full"><TrackerHeader/></div>
      <div className="w-full h-full flex justify-center mt-10">
        <div className="w-[90%] h-full flex pt-10">
          <div className="left-side w-[60%] h-full flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-400">
                Add Reprositries to this Collection :
              </p>
              <div className="w-full bg-[#232326] p-3 gap-3 rounded-md h-[5rem] flex justify-center items-center relative">
                <input
                  onChange={(e) => setRepoNme(e.target.value)}
                  type="text"
                  placeholder="Search repositories "
                  className=" focus:outline-none border-gray-500 text-sm px-2 w-[90%]  bg-primary border h-9 rounded"
                />
                <button
                  onClick={handleOnSubmit}
                  className="h-9 px-2 border border-gray-500 rounded bg-primary"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
            <p className="flex gap-3 text-sm text-gray-400">
              <Filter className="h-4 w-4" /> Sorted by
              <span className="font-bold">" date added "</span>
            </p>
            <div>
              {
                repo?null: <p className="text-sm text-gray-400">Limit Exided... Check After Some Time.</p>
              }
            </div>
            {isEnable && repo &&
              data.map((value, index: number) => {
                return (
                  <div
                    key={index}
                    className="bg-primary h-[23rem] w-full rounded-md flex flex-col gap-5 p-5"
                  >
                    <div className="top flex justify-between w-full">
                      <div className=" w-full flex flex-col gap-3">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-400">
                            Last seen : 4m ago
                          </p>
                          <div className="flex gap-2 h-7 ">
                            {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div className="px-2 border p-1 border-gray-500 rounded text-sm text-gray-400 flex items-center justify-between gap-2">
                                <GitBranch className="h-3 w-3" />
                                <button>main</button>
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-background text-white border-none">
                              <DropdownMenuLabel>Branches</DropdownMenuLabel>
                              <DropdownMenuCheckboxItem
                              className=" focus:bg-primary focus:text-white"
                                checked={false}
                                onCheckedChange={()=>{}}
                              >
                                Status Bar
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu> */}
                            <Select onValueChange={(value) => setBranch(value)}>
                              <SelectTrigger className="h-7 w-[5rem] focus:ring-0 border bg-secondary focus:border-gray-500 border-gray-500 rounded text-sm text-gray-400 flex items-center justify-between gap-2">
                                <div className="flex items-center ">
                                  <GitBranch className="h-3" />
                                  <SelectValue placeholder="main" />
                                </div>
                              </SelectTrigger>

                              {branches && (
                                <SelectContent className="bg-black text-white">
                                  <SelectGroup>
                                    {branches.map((branch: any) => (
                                      <SelectItem
                                        key={branch.name}
                                        value={branch.name}
                                      >
                                        {branch.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              )}
                            </Select>

                            <button
                              onClick={() => setDetails(true)}
                              className=" w-[5rem] border border-gray-500 rounded flex justify-center items-center text-sm text-gray-400 bg-secondary"
                            >
                              Details
                            </button>
                            <button className=" w-[2rem] flex justify-center items-center border border-gray-500 rounded text-sm text-gray-400 bg-secondary">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          <img
                            className="h-14  w-12.5  rounded-md"
                            src={repo?.owner?.avatar_url}
                            alt=""
                          />
                          <div className="flex flex-col">
                            <p className=" text-gray-400">
                              {repo?.owner?.login}
                            </p>
                            <h1 className="text-2xl font-bold">
                              {repo?.name}{" "}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between ">
                      <div className="text-sm text-gray-400 flex flex-col gap-3 w-full ">
                        <div className="flex gap-3">
                          <div>
                            <p>Commits : {commits?.length}</p>
                            <p>Issues : {issues?.length}</p>
                            <p>Pull Requests : {pull?.length}</p>
                          </div>
                          <ChartContainer
                            config={chartConfig}
                            className="w-[75%] h-[5rem]"
                          >
                            <AreaChart accessibilityLayer data={chartData}>
                              <CartesianGrid vertical={false} />
                              <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                              />
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                              />
                              <defs>
                                <linearGradient
                                  id="fillDesktop"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                  />
                                </linearGradient>
                                <linearGradient
                                  id="fillMobile"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                  />
                                </linearGradient>
                              </defs>
                              <Area
                                dataKey="mobile"
                                type="natural"
                                fill="url(#fillMobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                stackId="a"
                              />
                              <Area
                                dataKey="desktop"
                                type="natural"
                                fill="url(#fillDesktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                stackId="a"
                              />
                            </AreaChart>
                          </ChartContainer>
                        </div>
                        <div>
                          <h1 className="text-lg font-bold text-white">
                            Contributions
                          </h1>
                          <div className="flex -space-x-3">
                            {contributors?.map((forkes: any) => {
                              return (
                                <img
                                  src={forkes.owner.avatar_url}
                                  alt="Profile"
                                  className="border-2 border-black rounded-full w-8 h-8 "
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator className="bg-gray-500" />
                    <div className="bott flex justify-between">
                      <div className="flex gap-2 text-gray-400 items-center">
                        <Clock className="h-4 w-4" />
                        <p className="text-sm">
                          Last commit{" "}
                          <span className="text-white/90">
                            {moment(commits?.[0]?.commit.author.date).fromNow()}{" "}
                            {/* {moment('2025-03-14T11:48:52Z').fromNow()} */}
                          </span>
                          by{" "}
                          <span className="text-white/90">
                            {" "}
                            {commits?.[0]?.author?.login}
                          </span>
                        </p>
                      </div>
                      <img
                        src={commits?.[0]?.author?.avatar_url}
                        alt="Profile"
                        className=" rounded-full w-6 h-6"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="right-side w-[40%] h-full flex justify-center">
            <ChartContainer
              config={chartConfig1}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData1}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
    );
  }
};

export default page;

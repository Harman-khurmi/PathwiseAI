"use client";

import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import {
  BriefcaseIcon,
  LineChart,
  TrendingDown,
  TrendingUp,
  Clock,
  Zap,
  Target,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useMemo, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import MainDashboardCard from "./MainDashboardCard";
import Image from "next/image";
import { assets } from "@/app/assets";

const getDemandLevelColor = (level) => {
  switch (level?.toLowerCase()) {
    case "high":
      return "text-green-500 bg-green-500/5 group-hover:bg-green-500/10";
    case "medium":
      return "text-yellow-500 bg-yellow-500/5 group-hover:bg-yellow-500/10";
    case "low":
      return "text-red-500 bg-red-500/5 group-hover:bg-red-500/10";
    default:
      return "text-gray-500 bg-gray-500/5 group-hover:bg-gray-500/10";
  }
};

const DashboardView = ({ insights, firstName }) => {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    return "Evening";
  };

  const salaryData = useMemo(() => {
    return (insights?.salaryRanges || []).map((range) => ({
      name: range.role,
      min: (range.min || 0) / 1000,
      max: (range.max || 0) / 1000,
      median: (range.median || 0) / 1000,
    }));
  }, [insights?.salaryRanges]);

  if (!insights) {
    return null;
  }

  const nextUpdateDistance = insights.nextUpdate
    ? formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true })
    : "N/A";

  const stats = [
    {
      title: "Market Outlook",
      value: insights.marketOutlook,
      description: `Next update ${nextUpdateDistance}`,
      icon:
        insights.marketOutlook?.toLowerCase() === "positive"
          ? TrendingUp
          : insights.marketOutlook?.toLowerCase() === "negative"
            ? TrendingDown
            : LineChart,
      color:
        insights.marketOutlook?.toLowerCase() === "positive"
          ? "text-green-500"
          : insights.marketOutlook?.toLowerCase() === "negative"
            ? "text-red-500"
            : "text-yellow-500",
      bg:
        insights.marketOutlook?.toLowerCase() === "positive"
          ? "bg-green-500/5 group-hover:bg-green-500/10"
          : insights.marketOutlook?.toLowerCase() === "negative"
            ? "bg-green-500/5 group-hover:bg-green-500/10"
            : "bg-yellow-500/5 group-hover:bg-yellow-500/10",
      // bg:
      //   insights.marketOutlook?.toLowerCase() === "positive"
      //     ? "bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
      //     : insights.marketOutlook?.toLowerCase() === "negative"
      //       ? "bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
      //       : "bg-yellow-500/5 shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    },
    {
      title: "Industry Growth",
      value: `${insights.growthRate.toFixed(1)}%`,
      description: "Annual growth rate",
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/5 group-hover:bg-primary/10",
      progress: insights.growthRate,
    },
    {
      title: "Demand Level",
      value: insights.demandLevel,
      description: "Current hiring intensity",
      icon: BriefcaseIcon,
      color: getDemandLevelColor(insights.demandLevel).split(" ")[0],
      bg: getDemandLevelColor(insights.demandLevel).split(" ")[1],
      bghighlight: getDemandLevelColor(insights.demandLevel).split(" ")[2]
    },
    {
      title: "Top Skills",
      value: `${insights.topSkills.length} Core Skills`,
      description: "High-demand specialities",
      icon: Target,
      color: "text-purple-500",
      bg: "bg-purple-500/5 group-hover:bg-purple-500/10",
      skills: insights.topSkills,
    },
  ];

  return (
    <div className="space-y-10 pb-0 ">
      {/* Greetings Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h1 className="flex gap-1 text-2xl md:text-5xl font-bold tracking-tight flex-wrap">
          <span className="text-foreground flex gap-2">
            <span className="hidden md:flex">
              <Image
                src={assets.sparkle}
                alt="sparkle"
                width={30}
                height={30}
                className="block dark:hidden"
              ></Image>
              <Image
                src={assets.sparkleLight}
                alt="sparkle"
                width={30}
                height={30}
                className="dark:block hidden"
              ></Image>
            </span>
            <span className="md:hidden flex">
              <Image
                src={assets.sparkle}
                alt="sparkle"
                width={20}
                height={20}
                className="block dark:hidden"
              ></Image>
              <Image
                src={assets.sparkleLight}
                alt="sparkle"
                width={20}
                height={20}
                className="dark:block hidden"
              ></Image>
            </span>
            Good {isMounted ? getGreeting() : "Morning"} ,
          </span>
          <span className="gradient-title">{firstName || "Friend"}</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base font-medium">
          Here&apos;s the comprehensive market trends and data for your
          professional field.
        </p>
      </motion.div>

      {/* Main Container Card */}
      <MainDashboardCard>
        <div className="w-full space-y-8 ">
          {/* Header Info Inside Card */}
          <div className="flex flex-col items-start md:flex-row md:items-stretch justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Industry{" "}
                <span className="gradient-title text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  Insights
                </span>
              </h2>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className=" bg-[#3C71FA]/5 py-1.5 md:py-2 px-4 rounded-full font-semibold self-center md:self-start shadow-inner shadow-primary/25 hover:shadow-primary/55 cursor-default transition-shadow duration-400 ease-in w-fit">
                <p className="flex gap-2 items-center text-xs lg:text-sm lg:px-2 ">
                  <Clock className="h-4 w-4 text-[#55C7F1]  transition-colors duration-400 ease-in-out" />
                  Fresh Date :{" "}
                  {format(new Date(insights.createdAt), "dd MMM, yyyy")}
                </p>
              </span>
              <p className="text-[10px] md:text-xs text-muted-foreground font-semibold">
                Updated Automatically every 7 days
              </p>
            </div>
          </div>

          {/* Summary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="border-3 border-[#55C7F1]/10 hover:border-[#55C7F1]/25 bg-[#55C7F1]/5 cursor-default ease-in-out transition-all hover:scale-[1.011] duration-400 group overflow-hidden h-full rounded-xl shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground transition-colors">
                      {stat.title}
                    </CardTitle>
                    <div
                      className={cn(
                        "p-2 rounded-md transition-all duration-400 group-hover:scale-[1.04]",
                        stat.bg,stat?.bghighlight
                      )}
                    >
                      <stat.icon
                        className={cn("h-4 w-4 md:h-5 md:w-5", stat.color)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-black mb-1 text-foreground">
                      {stat.value}
                    </div>
                    {stat.progress !== undefined ? (
                      <div className="mt-2 space-y-2">
                        <Progress
                          value={stat.progress}
                          className="h-1.5 bg-[#55C7F1]/10 [&>div]:bg-[#55C7F1]"
                        />
                        <p className="text-xs text-muted-foreground font-bold flex items-center gap-2 mt-2">
                          <TrendingUp size={14} className="text-green-500" />
                          Stable Growth
                        </p>
                      </div>
                    ) : stat.skills ? (
                      <div className="flex flex-wrap gap-1 mt-2 overflow-x-clip">
                        {stat.skills.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs whitespace-break-spaces px-1.5 bg-[#55C7F1]/10 text-[#55C7F1] border border-[#55C7F1]/20 font-bold"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground font-medium flex  items-center gap-1.5 mt-1">
                        <Clock className="h-3 w-3 text-[#55C7F1]/70" />
                        {stat.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Salary Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full"
          >
            <Card className="border-3 group border-[#55C7F1]/10 hover:border-[#55C7F1]/25 transition-all duration-400 ease-in-out bg-[#55C7F1]/5 shadow-none overflow-hidden rounded-xl hover:scale-[1.003]">
              <CardHeader className="pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl md:text-2xl font-black">
                    Salary Ranges By Roles
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm font-black text-primary/70 group-hover:text-primary transition-all duration-400 ease-in-out">
                    Displaying Minimum, Median, And Maximum Salaries (In
                    Thousands USD)
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-8">
                <div className="h-[300px] md:h-[400px] w-full min-w-0 relative">
                  {isMounted ? (
                    <ResponsiveContainer
                      id="salary-chart"
                      width="100%"
                      height="100%"
                      minWidth={0}
                      minHeight={0}
                      debounce={50}
                    >
                      <BarChart data={salaryData} margin={{ bottom: 20 }}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#55C7F1"
                          opacity={0.1}
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "currentColor",
                            opacity: 0.5,
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "currentColor",
                            opacity: 0.5,
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        />
                        <Tooltip
                          cursor={{ fill: "#55C7F1", opacity: 0.05 }}
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background/80 backdrop-blur-xl border-3 border-[#55C7F1]/30 rounded-2xl p-4 shadow-2xl min-w-[150px]">
                                  <p className="font-black text-sm mb-2 border-b-2 border-[#55C7F1]/20 pb-1">
                                    {label}
                                  </p>
                                  <div className="space-y-1.5">
                                    {payload.map((item) => (
                                      <div
                                        key={item.name}
                                        className="flex items-center justify-between gap-4 text-xs font-bold"
                                      >
                                        <span className="text-muted-foreground/80">
                                          {item.name}:
                                        </span>
                                        <span className="text-[#55C7F1]">
                                          ${item.value}k
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="min"
                          fill="#55C7F1"
                          fillOpacity={0.3}
                          radius={[6, 6, 0, 0]}
                        />
                        <Bar
                          dataKey="median"
                          fill="#55C7F1"
                          fillOpacity={1}
                          radius={[6, 6, 0, 0]}
                        />
                        <Bar
                          dataKey="max"
                          fill="#55C7F1"
                          fillOpacity={0.6}
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full bg-[#55C7F1]/5 animate-pulse rounded-3xl" />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trends & Skills details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-3 group border-[#55C7F1]/10 hover:border-[#55C7F1]/25 bg-[#55C7F1]/5 shadow-none h-full overflow-hidden rounded-xl hover:scale-[1.004] transition-all duration-400">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl md:text-2xl font-black">
                    Key Industry Trends
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm font-black text-primary/70 group-hover:text-primary transition-all duration-400 ease-in-out">
                    Current Market Shifts Shaping The Landscape
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <ul className="space-y-4">
                    {insights.keyTrends.map((trend, index) => (
                      <li key={index} className="space-y-2">
                        <span className="text-xs font-bold leading-relaxed opacity-75 hover:opacity-100 transition-opacity duration-300 ease-in tracking-tight line-clamp-2">
                          {trend}
                        </span>
                        <Progress
                          value={85 - index * 10}
                          className="h-2 bg-[#55C7F1]/10 [&>div]:bg-[#55C7F1] rounded-full"
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-3 group border-[#55C7F1]/10 hover:border-[#55C7F1]/25 bg-[#55C7F1]/5 shadow-none h-full overflow-hidden rounded-xl transition-all duration-400 ease-in-out hover:scale-[1.004]">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl md:text-2xl font-black">
                    Recommended Skills
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm font-black text-primary/70 group-hover:text-primary transition-all duration-400 ease-in-out">
                    Target These Skills For Professional Growth
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <div className="flex flex-wrap gap-2.5">
                    {insights.recommendedSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs font-bold leading-relaxed opacity-75 hover:opacity-100 transition-all duration-300 ease-in tracking-tight line-clamp-2 md:px-4 md:py-2 p-2 bg-primary/20 hover:bg-primary/30 border-2 border-[#55C7F1]/10"
                        // className="md:px-4 md:py-2 p-2 text-xs font-black bg-[#55C7F1]/10 text-primary/80 hover:text-primary border-2 border-[#55C7F1]/10 hover:bg-primary/20 transition-all rounded-xl whitespace-pre-line"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </MainDashboardCard>
    </div>
  );
};

export default DashboardView;

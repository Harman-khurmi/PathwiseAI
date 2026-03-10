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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMemo, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import MainDashboardCard from "./MainDashboardCard";
import Image from "next/image";
import { assets } from "@/app/assets";
import DashboardLoading from "./DashboardLoading";
import StatCard from "./StatCard";
import SalaryChart from "./SalaryChart";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};

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

  const salaryData = useMemo(() => {
    return (insights?.salaryRanges || []).map((range) => ({
      name: range.role,
      min: (range.min || 0) / 1000,
      max: (range.max || 0) / 1000,
      median: (range.median || 0) / 1000,
    }));
  }, [insights?.salaryRanges]);

  const nextUpdateDistance = insights?.nextUpdate
    ? formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true })
    : "N/A";

  const stats = useMemo(() => {
    if (!insights) return [];

    const marketOutlook = insights.marketOutlook?.toLowerCase();
    const updateDistance = insights.nextUpdate
      ? formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true })
      : "N/A";

    return [
      {
        title: "Market Outlook",
        value: insights.marketOutlook,
        description: `Next update ${updateDistance}`,
        icon:
          marketOutlook === "positive"
            ? TrendingUp
            : marketOutlook === "negative"
              ? TrendingDown
              : LineChart,
        color:
          marketOutlook === "positive"
            ? "text-green-500"
            : marketOutlook === "negative"
              ? "text-red-500"
              : "text-yellow-500",
        bg:
          marketOutlook === "positive"
            ? "bg-green-500/5 group-hover:bg-green-500/10"
            : marketOutlook === "negative"
              ? "bg-red-500/5 group-hover:bg-red-500/10"
              : "bg-yellow-500/5 group-hover:bg-yellow-500/10",
      },
      {
        title: "Industry Growth",
        value: `${insights.growthRate?.toFixed(1) || 0}%`,
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
        bghighlight: getDemandLevelColor(insights.demandLevel).split(" ")[2],
      },
      {
        title: "Top Skills",
        value: `${insights.topSkills?.length || 0} Core Skills`,
        description: "High-demand specialities",
        icon: Target,
        color: "text-purple-500",
        bg: "bg-purple-500/5 group-hover:bg-purple-500/10",
        skills: insights.topSkills,
      },
    ];
  }, [insights]);

  if (!insights) {
    return <DashboardLoading />;
  }

  return (
    <div className="space-y-10 pb-0">
      {/* Greetings Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h1 className="flex flex-wrap gap-1 text-2xl font-bold tracking-tight md:text-5xl">
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
                className="hidden dark:block"
              ></Image>
            </span>
            <span className="flex md:hidden">
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
                className="hidden dark:block"
              ></Image>
            </span>
            Good {isMounted ? getGreeting() : "Morning"} ,
          </span>
          <span className="gradient-title">{firstName || "Friend"}</span>
        </h1>
        <p className="text-muted-foreground text-sm font-medium md:text-base">
          Here&apos;s the comprehensive market trends and data for your
          professional field.
        </p>
      </motion.div>

      {/* Main Container Card */}
      <MainDashboardCard>
        <div className="w-full space-y-8">
          {/* Header Info Inside Card */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-stretch">
            <div className="space-y-2">
              <h2 className="text-3xl leading-tight font-black tracking-tight md:text-5xl">
                Industry{" "}
                <span className="gradient-title text-3xl leading-tight font-black tracking-tight md:text-5xl">
                  Insights
                </span>
              </h2>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="shadow-primary/25 hover:shadow-primary/55 w-fit cursor-default self-center rounded-full bg-[#3C71FA]/5 px-4 py-1.5 font-semibold shadow-inner transition-shadow duration-400 ease-in md:self-start md:py-2">
                <p className="flex items-center gap-2 text-xs lg:px-2 lg:text-sm">
                  <Clock className="h-4 w-4 text-[#55C7F1] transition-colors duration-400 ease-in-out" />
                  Fresh Date :{" "}
                  {format(new Date(insights.createdAt), "dd MMM, yyyy")}
                </p>
              </span>
              <p className="text-muted-foreground text-[10px] font-semibold md:text-xs">
                Updated Automatically every 7 days
              </p>
            </div>
          </div>

          {/* Summary Stats Grid */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>

          {/* Salary Chart */}
          <SalaryChart salaryData={salaryData} isMounted={isMounted} />

          {/* Trends & Skills details */}
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="group h-full overflow-hidden rounded-xl border-3 border-[#55C7F1]/10 bg-[#55C7F1]/5 shadow-none transition-all duration-400 hover:scale-[1.004] hover:border-[#55C7F1]/25">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-black md:text-2xl">
                    Key Industry Trends
                  </CardTitle>
                  <CardDescription className="text-primary/70 group-hover:text-primary text-xs font-black transition-all duration-400 ease-in-out md:text-sm">
                    Current Market Shifts Shaping The Landscape
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <ul className="space-y-4" role="list">
                    {insights.keyTrends?.map((trend, index) => (
                      <li key={index} className="space-y-2">
                        <span className="line-clamp-2 text-xs leading-relaxed font-bold tracking-tight opacity-75 transition-opacity duration-300 ease-in hover:opacity-100">
                          {trend}
                        </span>
                        <Progress
                          value={85 - index * 10}
                          className="h-2 rounded-full bg-[#55C7F1]/10 [&>div]:bg-[#55C7F1]"
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
              <Card className="group h-full overflow-hidden rounded-xl border-3 border-[#55C7F1]/10 bg-[#55C7F1]/5 shadow-none transition-all duration-400 ease-in-out hover:scale-[1.004] hover:border-[#55C7F1]/25">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-black md:text-2xl">
                    Recommended Skills
                  </CardTitle>
                  <CardDescription className="text-primary/70 group-hover:text-primary text-xs font-black transition-all duration-400 ease-in-out md:text-sm">
                    Target These Skills For Professional Growth
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <div className="flex flex-wrap gap-2.5">
                    {insights.recommendedSkills?.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-primary/20 hover:bg-primary/30 h-auto w-fit rounded-lg border-2 border-[#55C7F1]/10 p-1.5 px-2.5 text-left text-xs leading-relaxed font-bold tracking-tight whitespace-normal opacity-90 transition-all duration-300 ease-in hover:opacity-100  md:py-1.5 md:px-3 md:text-sm"
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

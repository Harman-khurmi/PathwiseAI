"use client";

import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import {
  Brain,
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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const getDemandLevelColor = (level) => {
  switch (level?.toLowerCase()) {
    case "high":
      return "text-green-500 bg-green-500/10";
    case "medium":
      return "text-yellow-500 bg-yellow-500/10";
    case "low":
      return "text-red-500 bg-red-500/10";
    default:
      return "text-gray-500 bg-gray-500/10";
  }
};

const DashboardView = ({ insights }) => {
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
          ? "bg-green-500/10"
          : insights.marketOutlook?.toLowerCase() === "negative"
            ? "bg-red-500/10"
            : "bg-yellow-500/10",
    },
    {
      title: "Industry Growth",
      value: `${insights.growthRate.toFixed(1)}%`,
      description: "Annual growth rate",
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/10",
      progress: insights.growthRate,
    },
    {
      title: "Demand Level",
      value: insights.demandLevel,
      description: "Current hiring intensity",
      icon: BriefcaseIcon,
      color: getDemandLevelColor(insights.demandLevel).split(" ")[0],
      bg: getDemandLevelColor(insights.demandLevel).split(" ")[1],
    },
    {
      title: "Top Skills",
      value: `${insights.topSkills.length} Core Skills`,
      description: "High-demand specialities",
      icon: Target,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      skills: insights.topSkills,
    },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Industry <span className="gradient-title">Insights</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium tracking-tight">
            Comprehensive market trends and data for your professional field.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge
            variant="secondary"
            className="px-6 py-2 rounded-2xl font-black text-xs border-2 shadow-sm"
          >
            <Clock className="h-4 w-4 mr-2 text-primary" />
            FRESH DATA: {format(new Date(insights.createdAt), "MMM dd, yyyy")}
          </Badge>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest pl-2">
            Updated automatically every 7 days
          </p>
        </div>
      </motion.div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="border-2 shadow-sm hover:shadow-md transition-all group overflow-hidden h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                  {stat.title}
                </CardTitle>
                <div
                  className={cn(
                    "p-2.5 rounded-xl transition-all group-hover:scale-110",
                    stat.bg,
                  )}
                >
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                {stat.progress !== undefined ? (
                  <div className="mt-3 space-y-2">
                    <Progress value={stat.progress} className="h-2" />
                    <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                      <TrendingUp size={12} className="text-green-500" />
                      STABLE GROWTH
                    </p>
                  </div>
                ) : stat.skills ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {stat.skills.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[9px] px-1.5 py-0"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {stat.skills.length > 3 && (
                      <span className="text-[9px] text-muted-foreground font-bold pl-1">
                        +{stat.skills.length - 3} MORE
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-1">
                    <Clock className="h-3 w-3" />
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
      >
        <Card className="border-2 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-black">
                  Salary Ranges by Role
                </CardTitle>
                <CardDescription className="text-base">
                  Displaying minimum, median, and maximum salaries (in thousands
                  USD)
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm bg-primary/40" /> Min
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm bg-primary" /> Median
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm bg-primary/70" /> Max
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[400px] w-full min-w-0 relative">
              {isMounted ? (
                <ResponsiveContainer
                  id="salary-chart"
                  width="100%"
                  height="100%"
                  minWidth={0}
                  minHeight={0}
                  debounce={50}
                >
                  <BarChart
                    data={salaryData}
                    margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
                    barGap={8}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="currentColor"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "currentColor",
                        opacity: 0.5,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "currentColor",
                        opacity: 0.5,
                        fontSize: 12,
                      }}
                      tickFormatter={(value) => `$${value}k`}
                    />
                    <Tooltip
                      cursor={{ fill: "currentColor", opacity: 0.05 }}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-card border-2 rounded-2xl p-4 shadow-xl backdrop-blur-sm min-w-[150px]">
                              <p className="font-black text-lg mb-2 border-b pb-1">
                                {label}
                              </p>
                              <div className="space-y-1.5">
                                {payload.map((item) => (
                                  <div
                                    key={item.name}
                                    className="flex items-center justify-between gap-4 text-sm font-bold"
                                  >
                                    <span className="text-muted-foreground">
                                      {item.name}:
                                    </span>
                                    <span className="text-primary">
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
                      fill="oklch(78.09% 0.118 225.76)"
                      fillOpacity={0.4}
                      name="Min"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="median"
                      fill="oklch(78.09% 0.118 225.76)"
                      name="Median"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="max"
                      fill="oklch(78.09% 0.118 225.76)"
                      fillOpacity={0.7}
                      name="Max"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Skeleton className="h-full w-full rounded-3xl" />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trends & Skills details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-2 shadow-sm h-full overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-xl font-black">
                Key Industry Trends
              </CardTitle>
              <CardDescription>
                Current market shifts shaping the landscape
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-base font-medium leading-relaxed group-hover:text-primary transition-colors tracking-tight">
                      {trend}
                    </span>
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
          <Card className="border-2 shadow-sm h-full overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-xl font-black">
                Recommended Skills
              </CardTitle>
              <CardDescription>
                Target these skills for professional growth
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-3">
                {insights.recommendedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-4 py-2 text-sm font-bold border-2 hover:bg-primary/5 hover:border-primary/50 cursor-default transition-all"
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
  );
};

export default DashboardView;

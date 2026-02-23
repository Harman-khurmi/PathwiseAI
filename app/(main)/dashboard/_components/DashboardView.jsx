"use client";

import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import {
  Brain,
  BriefcaseIcon,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardView = ({ insights }) => {
  if (!insights) {
    return null;
  }

  const salaryData = (insights.salaryRanges || []).map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500 ";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-see";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Helper function to safely format dates
  const formatDate = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? "N/A" : format(d, "dd/MM/yyyy");
  };

  const formatDistance = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime())
      ? "N/A"
      : formatDistanceToNow(d, { addSuffix: true });
  };

  const nextUpdateDistance = formatDistance(insights.nextUpdate);

  return (
    <div className="space-y-6 mb-6">
      {/* //last updated */}
      <div className="flex items-center justify-between">
        <Badge className={``} variant="outline">
          {" "}
          Last updated: {formatDate(insights.createdAt)}
        </Badge>
      </div>
      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0`}
          >
            <CardTitle className={`text-sm font-medium`}>
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
            {/* <CardAction>Card Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.marketOutlook}</div>
            <p className="text-sm opacity-50">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0`}
          >
            <CardTitle className={`text-sm font-medium`}>
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className={`mt-2`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0`}
          >
            <CardTitle className={`text-sm font-medium`}>
              Demand Level
            </CardTitle>
            <BriefcaseIcon className="h-4 w-4 opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights.demandLevel)}`}
            ></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            className={`flex flex-row items-center justify-between space-y-0`}
          >
            <CardTitle className={`text-sm font-medium`}>Top Skills</CardTitle>
            <Brain className={`h-4 w-4 opacity-50`} />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => {
                return (
                  <Badge key={skill} variant={`secondary`}>
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* charts */}
      <Card>
        <CardHeader className={``}>
          <CardTitle className={`text-xl font-bold`}>
            Salary ranges by Role
          </CardTitle>
          <CardDescription>
            Displaying minimum , median and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-fit">
            <BarChart
              style={{
                width: "100%",
                // maxWidth: "full",
                maxHeight: "70vh",
                aspectRatio: 1.618,
              }}
              responsive
              data={salaryData}
              // margin={{
              //   top: 5,
              //   right: 0,
              //   left: 0,
              //   bottom: 5,
              // }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis width="auto" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="border bg-accent rounded-lg p-2 shadow-md">
                        <p className="font-medium">{label}</p>
                        {payload.map((item) => {
                          return (
                            <p key={item.name} className="text-sm">
                              {item.name}: ${item.value}K
                            </p>
                          );
                        })}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              {/* <Bar
                dataKey="pv"
                fill="#8884d8"
                activeBar={{ fill: "pink", stroke: "blue" }}
                radius={[10, 10, 0, 0]}
              />
              <Bar
                dataKey="uv"
                fill="#82ca9d"
                activeBar={{ fill: "gold", stroke: "purple" }}
                radius={[10, 10, 0, 0]}
              /> */}
              <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
              <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
              <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              {/* <RechartsDevtools />  */}
            </BarChart>
          </div>
        </CardContent>
      </Card>
      {/* key industry trends & recommended skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
            <CardDescription>
              Current Trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>
              Skills to consider while developing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => {
                return (
                  <Badge key={skill} variant={`secondary`}>
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;

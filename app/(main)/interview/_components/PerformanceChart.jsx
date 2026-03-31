"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const chartData = useMemo(() => {
    if (!assessments) return [];
    return assessments.map((assessment) => ({
      date: isMounted ? format(new Date(assessment.createdAt), "MMM dd") : "",
      score: assessment.quizScore,
    }));
  }, [assessments, isMounted]);

  return (
    <Card className="group h-full shadow-none overflow-hidden rounded-xl border-3 border-[#55C7F1]/10 bg-[#55C7F1]/5 transition-all duration-400 hover:scale-[1.004] hover:border-[#55C7F1]/25 w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-black md:text-2xl">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-primary/70 group-hover:text-primary text-xs font-black transition-all duration-400 ease-in-out md:text-sm">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full pt-4 relative">
          {assessments?.length > 0 ? (
            <ResponsiveContainer
              id="performance-chart"
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={0}
              debounce={50}
            >
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#55C7F1"
                  opacity={0.1}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "currentColor",
                    opacity: 0.5,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                  dy={10}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "currentColor",
                    opacity: 0.5,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  cursor={{ fill: "#55C7F1", opacity: 0.05 }}
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-background/80 min-w-[150px] rounded-2xl border-3 border-[#55C7F1]/30 p-4 shadow-2xl backdrop-blur-xl">
                          <p className="mb-2 border-b-2 border-[#55C7F1]/20 pb-1 text-sm font-black">
                            {payload[0].payload.date}
                          </p>
                          <div className="flex items-center justify-between gap-4 text-xs font-bold">
                            <span className="text-muted-foreground/80">
                              Score:
                            </span>
                            <span className="text-[#55C7F1] text-base">
                              {payload[0].value.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#55C7F1"
                  strokeWidth={4}
                  dot={{
                    fill: "#55C7F1",
                    strokeWidth: 2,
                    r: 4,
                    fillOpacity: 1,
                  }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 rounded-xl border-2 border-dashed border-[#55C7F1]/20 bg-background/40 p-6">
              <p className="text-muted-foreground/80 font-medium text-sm md:text-base">
                No performance data available yet.
              </p>
              <p className="text-xs text-muted-foreground font-medium max-w-sm">
                Take your first mock interview quiz to start tracking your scores and performance trend over time!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

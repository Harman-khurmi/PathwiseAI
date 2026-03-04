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
import { useMemo } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const chartData = useMemo(() => {
    if (!assessments) return [];
    return [...assessments].reverse().map((assessment) => ({
      date: format(new Date(assessment.createdAt), "MMM dd"),
      score: assessment.quizScore,
    }));
  }, [assessments]);

  return (
    <Card className="border-2 shadow-sm">
      <CardHeader>
        <CardTitle className="gradient-title text-3xl">
          Performance Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full pt-4 relative">
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
                stroke="currentColor"
                opacity={0.1}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "currentColor", opacity: 0.5, fontSize: 12 }}
                dy={10}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "currentColor", opacity: 0.5, fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-card border-2 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          {payload[0].payload.date}
                        </p>
                        <p className="text-2xl font-black text-primary">
                          {payload[0].value.toFixed(1)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="oklch(78.09% 0.118 225.76)"
                strokeWidth={4}
                dot={{
                  fill: "oklch(78.09% 0.118 225.76)",
                  strokeWidth: 2,
                  r: 4,
                  fillOpacity: 1,
                }}
                activeDot={{ r: 8, strokeWidth: 0 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useId } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "motion/react";

const SalaryChart = ({ salaryData, isMounted }) => {
  const chartId = useId();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full"
    >
      <Card className="group border-brand-primary/10 bg-brand-primary/5 hover:border-brand-primary/25 overflow-hidden rounded-xl border-3 shadow-none transition-all duration-400 ease-in-out hover:scale-[1.003]">
        <CardHeader className="pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-black md:text-2xl">
              Salary Ranges By Roles
            </CardTitle>
            <CardDescription className="text-primary/70 group-hover:text-primary text-xs font-black transition-all duration-400 ease-in-out md:text-sm">
              Displaying Minimum, Median, And Maximum Salaries (In Thousands
              USD)
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-8">
          <div className="custom-scrollbar relative h-[300px] w-full min-w-0 overflow-x-auto pb-4 md:h-[400px]">
            <div className="h-full min-w-[700px]">
              {isMounted ? (
                <ResponsiveContainer
                  id={chartId}
                  width="100%"
                  height="100%"
                  debounce={50}
                  aria-label="Salary distribution chart by roles"
                >
                  <BarChart
                    data={salaryData}
                    margin={{ bottom: 20 }}
                    accessibilityLayer={false}
                  >
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
                            <div className="bg-background/80 border-brand-primary/30 min-w-[150px] rounded-2xl border-3 p-4 shadow-2xl backdrop-blur-xl">
                              <p className="border-brand-primary/20 mb-2 border-b-2 pb-1 text-sm font-black">
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
                                    <span className="text-brand-primary">
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
                <div className="bg-brand-primary/5 h-full w-full animate-pulse rounded-3xl" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalaryChart;

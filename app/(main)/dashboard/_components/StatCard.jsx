"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const StatCard = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group h-full cursor-default overflow-hidden rounded-xl border-3 border-[#55C7F1]/10 bg-[#55C7F1]/5 shadow-none transition-all duration-400 ease-in-out hover:scale-[1.011] hover:border-[#55C7F1]/25">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-muted-foreground text-xs font-black tracking-widest uppercase transition-colors">
            {stat.title}
          </CardTitle>
          <div
            className={cn(
              "rounded-md p-2 transition-all duration-400 group-hover:scale-[1.04]",
              stat.bg,
              stat?.bghighlight,
            )}
          >
            <stat.icon className={cn("h-4 w-4 md:h-5 md:w-5", stat.color)} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-foreground mb-1 text-2xl font-black">{stat.value}</div>
          {stat.progress !== undefined ? (
            <div className="mt-2 space-y-2">
              <Progress
                value={stat.progress}
                className="h-1.5 bg-[#55C7F1]/10 [&>div]:bg-[#55C7F1]"
              />
              <p className="text-muted-foreground mt-2 flex items-center gap-2 text-xs font-bold">
                <TrendingUp size={14} className="text-green-500" />
                Stable Growth
              </p>
            </div>
          ) : stat.skills ? (
            <div className="mt-2 flex flex-wrap gap-1 overflow-x-clip">
              {stat.skills?.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  title={skill}
                  className="relative inline-flex max-w-full items-center overflow-hidden border border-[#55C7F1]/20 bg-[#55C7F1]/10 px-2 py-0.5 text-xs font-semibold text-[#55C7F1]"
                >
                  <span className="overflow-hidden whitespace-nowrap">{skill}</span>
                </Badge>
              )) ?? []}
            </div>
          ) : (
            <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs font-medium">
              <Clock className="h-3 w-3 text-[#55C7F1]/70" />
              {stat.description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;

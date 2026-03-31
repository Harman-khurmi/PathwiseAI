import { Brain, Target, Trophy, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0,
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestScore = () => {
    if (!assessments?.length) return 0;
    return assessments[0]?.quizScore.toFixed(1);
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0,
    );
  };

  const stats = [
    {
      title: "Average Score",
      value: `${getAverageScore()}%`,
      description: "Across all assessments",
      icon: Trophy,
      color: "text-yellow-500",
      bg: "bg-yellow-500/5 group-hover:bg-yellow-500/10",
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions(),
      description: "Total mock questions",
      icon: Brain,
      color: "text-primary",
      bg: "bg-primary/5 group-hover:bg-primary/10",
    },
    {
      title: "Latest Score",
      value: `${getLatestScore()}%`,
      description: "From your last quiz",
      icon: Target,
      color: "text-green-500",
      bg: "bg-green-500/5 group-hover:bg-green-500/10",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
           key={index}
           initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
                )}
              >
                <stat.icon className={cn("h-4 w-4 md:h-5 md:w-5", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-foreground mb-1 text-2xl font-black">{stat.value}</div>
              <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs font-medium">
                <Clock className="h-3 w-3 text-[#55C7F1]/70" />
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

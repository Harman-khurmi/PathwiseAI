import { Brain, Target, Trophy, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
      bg: "bg-yellow-500/10",
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions(),
      description: "Total mock questions",
      icon: Brain,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Latest Score",
      value: `${getLatestScore()}%`,
      description: "From your last quiz",
      icon: Target,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/20 group"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
              {stat.title}
            </CardTitle>
            <div
              className={cn(
                "p-2 rounded-xl transition-all duration-300 group-hover:scale-110",
                stat.bg,
              )}
            >
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

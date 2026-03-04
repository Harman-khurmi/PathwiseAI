"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./QuizResult";
import { ChevronRight, Calendar, Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="border-2 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl mb-2">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-base">
                Review your past quiz performance and track your growth.
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="btn-primary group h-12 px-6 rounded-xl flex items-center gap-2"
            >
              Start New Quiz
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {assessments?.length > 0 ? (
              assessments.map((assessment, i) => (
                <div
                  key={assessment.id}
                  className="group cursor-pointer hover:bg-muted/50 transition-all duration-300 p-6 flex items-center justify-between"
                  onClick={() => setSelectedQuiz(assessment)}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                        assessment.quizScore >= 80
                          ? "bg-green-500/10 text-green-600"
                          : assessment.quizScore >= 50
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-red-500/10 text-red-600",
                      )}
                    >
                      <Trophy className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        Quiz #{assessments.length - i}
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {format(
                            new Date(assessment.createdAt),
                            "MMM dd, yyyy",
                          )}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold",
                            assessment.quizScore >= 80
                              ? "bg-green-500/10 text-green-700"
                              : assessment.quizScore >= 50
                                ? "bg-yellow-500/10 text-yellow-700"
                                : "bg-red-500/10 text-red-700",
                          )}
                        >
                          Score: {assessment.quizScore.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t taken any quizzes yet.
                </p>
                <Button
                  onClick={() => router.push("/interview/mock")}
                  variant="outline"
                >
                  Take your first quiz
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 shadow-2xl p-0">
          <DialogHeader className="p-0 h-0 overflow-hidden">
            <DialogTitle />
          </DialogHeader>
          <div className="p-6 md:p-10">
            <QuizResult
              result={selectedQuiz}
              hideStartNew
              onStartNew={() => router.push("/interview/mock")}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

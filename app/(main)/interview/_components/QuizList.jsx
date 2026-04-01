"use client";

import { useState, useEffect } from "react";
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
  const [isMounted, setIsMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Card className="group h-full overflow-hidden rounded-xl border-3 border-primary/10 bg-primary/5 transition-all duration-400 hover:scale-[1.004] hover:border-primary/25 w-full shadow-none">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-black md:text-2xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-primary/70 group-hover:text-primary text-xs font-black transition-all duration-400 ease-in-out md:text-sm mt-1">
                Review your past quiz performance and track your growth.
              </CardDescription>
            </div>
            {assessments?.length > 0 && (
              <Button
                size="responsive"
                onClick={() => router.push("/interview/mock")}
                className="flex items-center group/CTA"
              >
                Start New Quiz
                <ArrowRight className="h-4 w-4 group-hover/CTA:translate-x-1 transition-transform duration-400 ease-in-out" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-5 md:px-6 pb-6 ">
          <div className="space-y-4">
            {assessments?.length > 0 ? (
              <>
                {[...assessments]
                  .reverse()
                  .slice(0, visibleCount)
                  .map((assessment, i) => (
                    <div
                      key={assessment.id}
                  className="group/quiz cursor-pointer rounded-xl border-2 border-transparent bg-background/40 hover:bg-primary/5 hover:border-primary/20 transition-all duration-400 ease-in-out p-4 md:p-6 flex items-center justify-between shadow-none group/icon"
                  onClick={() => setSelectedQuiz(assessment)}
                >
                  <div className="flex items-center gap-4 md:gap-6 ">
                    <div
                      className={cn(  
                        "h-11 w-11 md:h-14 md:w-14 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover/quiz:scale-110 shadow-none duration-400 ease-in-out",
                        assessment.quizScore >= 80
                          ? "bg-green-500/15 text-green-600 border border-green-500/20"
                          : assessment.quizScore >= 50
                            ? "bg-yellow-500/15 text-yellow-600 border border-yellow-500/20"
                            : "bg-red-500/15 text-red-600 border border-red-500/20",
                      )}
                    >
                      <Trophy className="h-5 w-5 md:h-7 md:w-7" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg lg:text-xl font-black md:mb-1.5 mb-1 text-text-dark/90 dark:text-text-light/90 group-hover/quiz:text-primary dark:group-hover/quiz:text-primary transition-colors duration-400 ease-in-out">
                        Quiz #{assessments.length - i}
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-2 md:gap-x-4 text-[10px] md:text-sm text-muted-foreground font-semibold">
                        <span className="flex items-center gap-1.5 bg-background/50 px-2.5 py-1 rounded-md shrink-0">
                          <Calendar className="h-3.5 w-3.5 group-hover/icon:text-primary" />
                          {isMounted
                            ? format(new Date(assessment.createdAt), "MMM dd, yyyy")
                            : "..."}
                        </span>
                        <span
                          className={cn(
                            "px-3 py-1 rounded-md text-[8px] text-nowrap md:text-xs uppercase tracking-widest font-black shadow-none",
                            assessment.quizScore >= 80
                              ? "bg-green-500/15 text-green-700 dark:text-green-400"
                              : assessment.quizScore >= 50
                                ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
                                : "bg-red-500/15 text-red-700 dark:text-red-400",
                          )}
                        >
                          Score: {assessment.quizScore.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 md:p-3 md:rounded-lg transition-all duration-400 ease-in-out group-hover/quiz:bg-primary/10 group-hover/quiz:translate-x-1 ml-5 md:ml-0">
                    <ChevronRight className=" h-5 w-5 md:h-6 md:w-6 text-muted-foreground/30 group-hover/quiz:text-primary transition-colors duration-400 ease-in-out" />
                  </div>
                </div>
              ))}
                {assessments.length > 5 && (
                  <div className="pt-4 flex justify-center">
                    {assessments.length > visibleCount ? (
                      <Button
                        variant="outline"
                        size="responsive"
                        onClick={() => setVisibleCount(assessments.length)}
                        className="border-primary/20 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      >
                        Show All
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="responsive"
                        onClick={() => setVisibleCount(5)}
                        className="border-primary/20 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      >
                        Show Less
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border-2 border-dashed border-primary/20 bg-background/40">
                <p className="text-muted-foreground mb-4 font-medium">
                  You haven&apos;t taken any quizzes yet.
                </p>
                <Button
                  variant="outline"
                  size="responsive"
                  onClick={() => router.push("/interview/mock")}
                >
                  Take your first quiz
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-3 border-brand-primary/20 bg-background/95 backdrop-blur-xl shadow-[0_0_80px_-15px_rgba(85,199,241,0.15)] p-0 custom-scrollbar">
          <DialogHeader className="p-0 h-0 overflow-hidden">
            <DialogTitle />
          </DialogHeader>
          <div className="p-6 md:p-10 pb-0">
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

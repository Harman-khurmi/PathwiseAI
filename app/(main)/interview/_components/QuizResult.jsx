"use client";

import {
  Trophy,
  CheckCircle2,
  XCircle,
  Lightbulb,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent! You've mastered these concepts.";
    if (score >= 50)
      return "Good job! A little more practice and you'll be there.";
    return "Keep learning! Review the explanations below to improve.";
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700",
        hideStartNew ? "pb-4" : "pb-12",
      )}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex flex-col items-center text-center space-y-4",
          hideStartNew ? "mb-8" : "mb-12",
        )}
      >
        <div className="bg-yellow-500/10 p-4 rounded-full mb-2">
          <Trophy className="h-10 w-10 md:h-12 md:w-12 text-yellow-500" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Quiz <span className="gradient-title">Results</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl px-4">
          {getScoreMessage(result.quizScore)}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Trophy size={120} />
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-6">
            <div className="text-center">
              <span
                className={cn(
                  "text-6xl md:text-7xl font-black",
                  getScoreColor(result.quizScore),
                )}
              >
                {result.quizScore.toFixed(0)}%
              </span>
              <p className="text-muted-foreground font-medium mt-2 uppercase tracking-widest text-sm">
                Overall Score
              </p>
            </div>

            <div className="w-full max-w-md space-y-2">
              <Progress value={result.quizScore} className="h-4" />
              <div className="flex justify-between text-xs font-medium text-muted-foreground px-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Improvement Tip */}
          {result.improvementTip && (
            <div className="mt-10 bg-primary/5 border border-primary/10 p-6 rounded-2xl flex gap-4 items-start">
              <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-primary mb-1 text-sm uppercase tracking-wider">
                  Improvement Tip
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  {result.improvementTip}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Questions Review */}
        <div className="space-y-8 mt-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold">Question Review</h2>
            <span className="text-sm font-medium bg-muted px-3 py-1 rounded-full text-muted-foreground">
              {result.questions.length} Questions
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {result.questions.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className={cn(
                  "group relative border rounded-2xl p-6 transition-all duration-300 hover:shadow-md",
                  q.isCorrect
                    ? "border-green-500/20 bg-green-500/5"
                    : "border-red-500/20 bg-red-500/5",
                )}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Question {index + 1}
                    </span>
                    <p className="text-lg font-semibold leading-tight">
                      {q.question}
                    </p>
                  </div>
                  {q.isCorrect ? (
                    <div className="bg-green-500/10 p-2 rounded-full shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                  ) : (
                    <div className="bg-red-500/10 p-2 rounded-full shrink-0">
                      <XCircle className="h-6 w-6 text-red-500" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div
                    className={cn(
                      "p-4 rounded-xl text-sm space-y-1",
                      q.isCorrect ? "bg-green-500/10" : "bg-red-500/10",
                    )}
                  >
                    <p className="font-bold uppercase tracking-tighter text-[10px] opacity-70">
                      Your Answer
                    </p>
                    <p className="font-medium">{q.userAnswer}</p>
                  </div>

                  {!q.isCorrect && (
                    <div className="p-4 rounded-xl bg-green-500/10 text-sm space-y-1">
                      <p className="font-bold uppercase tracking-tighter text-[10px] opacity-70 text-green-700">
                        Correct Answer
                      </p>
                      <p className="font-medium text-green-700">{q.answer}</p>
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 p-5 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Explanation
                    </p>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {!hideStartNew && (
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Button
            onClick={onStartNew}
            size="lg"
            className="group btn-primary px-8 h-14 text-lg rounded-2xl flex items-center gap-3 transition-all active:scale-95"
          >
            <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            Start New Quiz
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

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
  timeTaken,
}) {
  if (!result) return null;

  const formatTime = (seconds) => {
    if (seconds == null) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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
        "animate-in fade-in slide-in-from-bottom-4 mx-auto w-full max-w-4xl duration-700",
        hideStartNew ? "pb-4" : "pb-12",
      )}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex flex-col items-center space-y-4 text-center",
          hideStartNew ? "mb-8" : "mb-12",
        )}
      >
        <div
          className={cn(
            "mb-2 rounded-full p-4",
            result.quizScore >= 80
              ? "bg-green-500/10"
              : result.quizScore >= 50
                ? "bg-yellow-500/10"
                : "bg-red-500/10",
          )}
        >
          <Trophy
            className={cn(
              "h-10 w-10 md:h-12 md:w-12",
              getScoreColor(result.quizScore),
            )}
          />
        </div>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          Quiz <span className="gradient-title">Results</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl px-4 text-base md:text-lg">
          {getScoreMessage(result.quizScore)}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {/* Confident Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="from-brand-primary/20 via-brand-primary/5 border-brand-primary/20 hover:border-brand-primary/40 relative overflow-hidden rounded-3xl border-3 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] to-transparent p-8 shadow-[0_0_-60px_-15px_rgba(85,199,241,0.2)] transition-all duration-700 hover:scale-[1.01] md:p-12"
        >
          {/* Pulsing Trophy Background Graphic */}
          <motion.div
            animate={{
              scale: [1.2, 1.3, 1.2],
              rotate: [10, 12, 15, 12, 10],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            className="pointer-events-none absolute top-0 -right-[5%] origin-top-right p-8"
          >
            <Trophy
              size={280}
              className="text-brand-primary h-[200px] w-[200px] drop-shadow-[0_0_40px_rgba(85,199,241,0.8)] md:h-[280px] md:w-[280px]"
            />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center space-y-6">
            <div className="group cursor-default text-center">
              <span
                className={cn(
                  "inline-block text-7xl font-black drop-shadow-sm transition-transform duration-500 group-hover:scale-105 md:text-8xl",
                  result.quizScore >= 80
                    ? "bg-linear-to-br from-green-400 to-green-600 bg-clip-text text-transparent"
                    : result.quizScore >= 50
                      ? "bg-linear-to-br from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                      : "bg-linear-to-br from-red-400 to-red-600 bg-clip-text text-transparent",
                )}
              >
                {result.quizScore.toFixed(0)}%
              </span>
              <p className="text-muted-foreground mt-2 text-sm font-bold tracking-[0.3em] uppercase md:text-base">
                Overall Score
              </p>
            </div>

            {timeTaken !== undefined && timeTaken !== null && (
              <div className="bg-background/40 border-brand-primary/30 hover:bg-brand-primary/10 rounded-full border px-6 py-2.5 text-sm font-bold tracking-wider shadow-sm backdrop-blur-md transition-all md:text-base">
                <span className="mr-3 text-xs font-semibold uppercase opacity-80">
                  Time Taken :
                </span>
                <span className="text-brand-primary font-black tracking-widest">
                  {formatTime(timeTaken)}
                </span>
              </div>
            )}

            <div className="mt-6 w-full max-w-md space-y-3">
              <Progress
                value={result.quizScore}
                className="bg-background/50 border-brand-primary/10 h-4 border shadow-inner"
              />
              <div className="text-muted-foreground flex justify-between px-1 text-xs font-bold tracking-widest uppercase">
                <span className="opacity-60">0%</span>
                <span className="text-brand-primary/80 opacity-60">50%</span>
                <span className="opacity-60">100%</span>
              </div>
            </div>
          </div>

          {result.improvementTip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-background/60 border-brand-primary/20 group hover:bg-brand-primary/5 relative mt-12 flex flex-col items-start gap-5 overflow-hidden rounded-2xl border p-6 shadow-xl backdrop-blur-md transition-colors md:flex-row md:p-8"
            >
              <div className="from-brand-primary/10 absolute inset-0 bg-linear-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="from-brand-primary to-brand-secondary shadow-brand-primary/20 relative z-10 shrink-0 rounded-xl bg-linear-to-br p-3 shadow-lg">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div className="relative z-10 mt-1 space-y-2">
                <p className="text-brand-primary text-xs font-black tracking-[0.2em] uppercase">
                  Pro Improvement Tip
                </p>
                <p className="text-foreground/90 leading-relaxed font-medium md:text-lg">
                  {result.improvementTip}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Questions Review */}
        <div className="mt-6 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black tracking-tight md:text-3xl">
              Question Review
            </h2>
            <span className="bg-brand-primary/10 border-brand-primary/20 text-brand-primary rounded-full border px-4 py-2 text-[8px] font-black tracking-[0.2em] text-nowrap uppercase shadow-sm md:text-xs lg:text-sm">
              {result.questions.length} Questions
            </span>
          </div>

          <div className="custom-scrollbar grid max-h-[60vh] grid-cols-1 gap-6 overflow-y-auto rounded-xl pr-3 pb-8 md:max-h-[600px]">
            {result.questions.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border-2 p-6 transition-all duration-300 hover:shadow-lg md:p-8",
                  q.isCorrect
                    ? "border-green-500/30 bg-green-500/5 hover:bg-green-500/10"
                    : "border-red-500/30 bg-red-500/5 hover:bg-red-500/10",
                )}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      Question {index + 1}
                    </span>
                    <p className="text-lg leading-tight font-semibold">
                      {q.question}
                    </p>
                  </div>
                  {q.isCorrect ? (
                    <div className="shrink-0 rounded-full bg-green-500/10 p-2">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                  ) : (
                    <div className="shrink-0 rounded-full bg-red-500/10 p-2">
                      <XCircle className="h-6 w-6 text-red-500" />
                    </div>
                  )}
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div
                    className={cn(
                      "space-y-1 rounded-xl p-4 text-sm",
                      q.isCorrect ? "bg-green-500/10" : "bg-red-500/10",
                    )}
                  >
                    <p className="text-[10px] font-bold tracking-tighter uppercase opacity-70">
                      Your Answer
                    </p>
                    <p className="font-medium">{q.userAnswer}</p>
                  </div>

                  {!q.isCorrect && (
                    <div className="space-y-1 rounded-xl bg-green-500/10 p-4 text-sm">
                      <p className="text-[10px] font-bold tracking-tighter text-green-700 uppercase opacity-70">
                        Correct Answer
                      </p>
                      <p className="font-medium text-green-700">{q.answer}</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-primary/5 border-brand-primary/10 rounded-2xl border p-6 shadow-inner">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="bg-brand-primary/10 rounded-lg p-2">
                      <Lightbulb className="text-brand-primary h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <p className="text-brand-primary text-xs font-bold tracking-widest uppercase">
                      Explanation
                    </p>
                  </div>
                  <p className="text-foreground/90 pl-1 text-sm leading-relaxed font-medium md:pl-12 md:text-base">
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
          <Button onClick={onStartNew} size="responsive">
            Start New Quiz
            <RefreshCw className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

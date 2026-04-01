"use client";
import useFetch from "@/hooks/use-fetch";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Clock,
  Search,
  Sliders,
  BrainCircuit,
  CheckCircle2,
  Trophy,
  X,
  Timer,
} from "lucide-react";
import QuizResult from "./QuizResult";
import { motion, AnimatePresence } from "motion/react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const Quiz = () => {
  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const [loadingText, setLoadingText] = useState("Analyzing industry data...");
  useEffect(() => {
    const loadingMessages = [
      "Analyzing industry data...",
      "Calibrating difficulty...",
      "Generating tailored scenarios...",
      "Finalizing your mock interview...",
    ];
    if (generatingQuiz) {
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[i]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [generatingQuiz]);

  if (generatingQuiz) {
    const getLoadingIcon = (text) => {
      switch (text) {
        case "Analyzing industry data...":
          return <Search className="text-brand-primary md:h-16 h-10 w-10 md:w-16" />;
        case "Calibrating difficulty...":
          return <Sliders className="text-brand-primary md:h-16 h-10 w-10 md:w-16" />;
        case "Generating tailored scenarios...":
          return <BrainCircuit className="text-brand-primary md:h-16 h-10 w-10 md:w-16" />;
        case "Finalizing your mock interview...":
          return <CheckCircle2 className="text-brand-primary md:h-16 h-10 w-10 md:w-16" />;
        default:
          return <BrainCircuit className="text-brand-primary md:h-16 h-10 w-10 md:w-16" />;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        className="mx-auto mt-12 flex min-h-[40vh] max-w-2xl flex-col items-center justify-center space-y-8 py-12"
      >
        <div className="relative">
          <div className="bg-brand-primary/20 absolute -inset-4 animate-pulse rounded-full blur-xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={loadingText}
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 15 }}
              transition={{ duration: 0.5 }}
              className="bg-brand-primary/10 relative z-10 rounded-3xl p-4"
            >
              {getLoadingIcon(loadingText)}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="space-y-4 text-center">
          <h3 className="gradient-title text-xl md:text-2xl lg:text-3xl font-black tracking-tight">
            Crafting Your Quiz
          </h3>
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground text-lg font-medium"
            >
              {loadingText}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  if (!quizData) {
    return (
      <div className="flex w-full justify-center px-2 py-6 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="border-brand-primary/10 bg-brand-primary/5 hover:border-brand-primary/25 shadow-brand-primary/10 relative flex w-full  flex-col items-center gap-8 overflow-hidden rounded-2xl border-3 p-8 text-center shadow-inner transition-all duration-700 md:p-12 lg:p-16 hover:scale-[1.01]"
        >
          <div className="pointer-events-none absolute top-1/5 -right-1/2 md:top-1/3 md:right-1/20 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
            <Lightbulb size={320} className="dark:text-brand-primary text-brand-active rotate-12 h-40 w-40 md:h-80 md:w-80" />
          </div>

          <div className="relative z-10 w-full space-y-4 md:space-y-6">
            <h2 className="mb-2 text-3xl leading-tight font-black tracking-tight md:text-5xl">
              Ready to <span className="gradient-title mb-2 text-3xl leading-tight font-black tracking-tight md:text-5xl">Level Up?</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed font-medium">
              This custom mock interview features 10 AI-curated questions
              tailored to your specific industry and professional background.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4 pt-6 md:pt-8">
            <Button
              onClick={() => generateQuizFn()}
              size="responsive"
              className="group"
            >
              Start Personalised Quiz
              <ArrowRight className="h-2 w-2 transition-transform group-hover:translate-x-[3px] md:h-4 md:w-4" />
            </Button>
            <p className="text-muted-foreground/60 mt-1 text-[10px] font-bold tracking-widest uppercase md:text-xs">
              Estimated time : 10 - 15 minutes
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return <QuizDisplay questions={quizData} onStartNew={generateQuizFn} />;
};

const QuizDisplay = ({ questions, onStartNew }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null),
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (!startTime) setStartTime(Date.now());
  }, [startTime]);

  useEffect(() => {
    let interval;
    if (startTime && timeTaken === null) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, timeTaken]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
    error: saveError,
  } = useFetch(saveQuizResult);

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (savingResult) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  useEffect(() => {
    if (resultData && !savingResult) {
      toast.success("Quiz Completed!");
    }
    if (saveError && !savingResult) {
      toast.error(saveError.message || "Failed to save quiz results!");
    }
  }, [resultData, saveError, savingResult]);

  const finishQuiz = async () => {
    const score = calculateScore();
    const finalTime = Math.floor((Date.now() - startTime) / 1000);
    setTimeTaken(finalTime);
    try {
      await saveQuizResultFn(questions, answers, score);
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results!");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
    setResultData(null);
    setStartTime(Date.now());
    setElapsedTime(0);
    setTimeTaken(null);
    onStartNew();
  };

  if (savingResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        className="mx-auto mt-12 flex min-h-[40vh] max-w-2xl flex-col items-center justify-center space-y-8 py-12"
      >
        <div className="relative">
          <div className="bg-brand-primary/20 absolute -inset-4 animate-pulse rounded-full blur-xl" />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1, y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-brand-primary/10 relative z-10 rounded-3xl p-5"
          >
            <Trophy className="text-brand-primary h-10 w-10 md:h-16 md:w-16" />
          </motion.div>
        </div>
        <div className="space-y-4 text-center">
          <h3 className="gradient-title animate-pulse text-xl md:text-2xl lg:text-3xl font-black tracking-tight">
            Evaluating Results...
          </h3>
          <p className="text-muted-foreground text-lg font-medium">
            Analyzing your performance
          </p>
        </div>
      </motion.div>
    );
  }

  if (resultData) {
    return (
      <div className="w-full">
        <QuizResult
          result={resultData}
          timeTaken={timeTaken}
          onStartNew={startNewQuiz}
        />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <div className="relative mx-auto w-full space-y-6 py-4 md:space-y-8 md:py-6
      border-brand-primary/10 bg-brand-primary/5 hover:border-brand-primary/25 shadow-brand-primary/10 overflow-hidden rounded-xl border-3 shadow-inner transition-all duration-700 p-5 md:p-12 lg:p-16 hover:scale-[1.005]"
          >
      <div className="mb-4 space-y-6 md:mb-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:gap-8">
          <div className="flex-1 space-y-1 md:space-y-2 mb-2">
            <span className="text-brand-primary/80 text-[10px] font-black tracking-[0.2em] uppercase sm:text-xs md:tracking-[0.3em]">
              Live Assessment
            </span>
            <div className="flex items-center gap-2 mt-2">
              <h2 className="flex items-baseline gap-1 text-xl font-black tracking-tight sm:text-2xl md:text-3xl">
                Q.
                <span className="flex items-baseline gap-1 text-xl font-black tracking-tight sm:text-2xl md:text-3xl">
                  {currentQuestion + 1}
                </span>
                <span className="text-muted-foreground/40 text-base font-bold md:text-xl">
                  /{questions.length}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3 md:w-auto md:items-end">
            <div className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 flex items-center gap-2 rounded-full border md:px-5 px-3 py-2 font-bold shadow-sm backdrop-blur-md md:py-2.5">
              <span className="text-[10px] md:text-xs tracking-widest uppercase opacity-80">
              <Timer className="h-4 w-4 md:h-6 md:w-6" />
              </span>
              <span className="text-sm tracking-wider md:text-lg">
                {formatTime(elapsedTime)}
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full space-y-2">
          <div className="text-muted-foreground flex w-full justify-between text-[10px] font-black tracking-widest uppercase">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 w-full rounded-full shadow-inner"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full space-y-6 overflow-hidden md:space-y-8">
            <div className="relative space-y-3 pt-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start md:gap-4">

                <h3 className="text-foreground/90 text-xl leading-relaxed font-bold md:text-3xl">
                  &ldquo;{question.question}&rdquo;
                </h3>
                <span
                  className={cn(
                    "mt-1 self-start rounded-sm border px-3 py-1 text-[10px] font-black tracking-widest whitespace-nowrap uppercase shadow-sm md:py-1.5 md:text-xs",
                    question.difficulty === "Easy" &&
                      "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
                    question.difficulty === "Medium" &&
                      "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                    question.difficulty === "Hard" &&
                      "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
                    !question.difficulty &&
                      "border-brand-primary/30 bg-brand-primary/10 text-brand-primary",
                  )}
                >
                  {question.difficulty || "Medium"}
                </span>
              </div>
            </div>
            <div className="">
              <RadioGroup
                onValueChange={handleAnswer}
                value={answers[currentQuestion]}
                className="grid gap-0 md:gap-2"
              >
                {question.options.map((option, index) => {
                  const isSelected = answers[currentQuestion] === option;
                  return (
                    <Label
                      key={index}
                      htmlFor={`option-${index}`}
                      className={cn(
                        "group hover:bg-brand-primary/5 hover:border-brand-primary/30 flex cursor-pointer items-start gap-4 rounded-xl border p-3 transition-all duration-200 outline-none active:scale-[0.995] sm:items-center md:p-4",
                        isSelected
                          ? "border-brand-primary bg-brand-primary/10 shadow-sm"
                          : "border-border/40 bg-transparent",
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-200 sm:mt-0 md:h-5 md:w-5",
                          isSelected
                            ? "border-brand-primary bg-brand-primary shadow-inner"
                            : "border-muted-foreground/40 group-hover:border-brand-primary/50",
                        )}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-1.5 w-1.5 rounded-full bg-white shadow-sm md:h-2 md:w-2"
                          />
                        )}
                      </div>
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}`}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "text-sm md:text-base leading-relaxed font-medium transition-colors",
                          isSelected
                            ? "text-foreground font-semibold"
                            : "text-foreground/80 group-hover:text-foreground",
                        )}
                      >
                        {option}
                      </span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>

            {/* Pro Insights Explanation removed from here to top level */}

            <div className="border-border/30 flex flex-col justify-between gap-4 sm:w-full border-t pt-4 sm:flex-row md:pt-6">
              <div className=" items-center flex md:block justify-center">
                <Button
                  onClick={() => setShowExplanation(true)}
                  variant="outline"
                  size="responsive"
                  disabled={!answers[currentQuestion]}
                  className={`w-full md:w-fit`}
                >
                  <Lightbulb className="text-brand-primary h-4 w-4 md:h-5 md:w-5" />
                  View Pro Insights
                </Button>
              </div>

              <div className="md:self-end items-center flex justify-center group">
                <Button
                  onClick={handleNext}
                  size="responsive"
                  className={`w-full md:w-fit`}
                  disabled={!answers[currentQuestion] || savingResult}
                >
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "Submit Quiz"}
                  <ArrowRight className="ml-0 group-hover:translate-x-1 transition-transform duration-300 ease-in-out h-2 w-2 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

      {/* Pro Insights Overlay Modal */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/80 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              className="bg-background border-brand-primary/20 relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border-3 p-6 shadow-[0_0_80px_-15px_rgba(85,199,241,0.15)] md:p-8"
            >
              <div className="from-brand-primary/5 pointer-events-none absolute inset-0 bg-linear-to-br to-transparent" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex items-start justify-between gap-4 sm:items-center shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="bg-brand-primary/10 border-brand-primary/20 rounded-xl border p-3 shadow-inner shrink-0">
                      <Lightbulb className="text-brand-primary h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <p className="text-brand-primary text-sm font-black tracking-widest uppercase md:text-base">
                      Pro Insights
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowExplanation(false)}
                    className="hidden md:flex hover:bg-brand-primary/10 bg-background/50 text-brand-primary/80 hover:text-brand-primary hover:border-brand-primary/20 h-10 w-10 shrink-0 rounded-full border border-brand-primary/10 shadow-sm transition-all"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="bg-muted/30 border-brand-primary/10 rounded-2xl border p-5 shadow-inner md:p-6">
                  <p className="text-foreground/90 text-sm leading-relaxed font-medium lg:text-base">
                    {question.explanation}
                  </p>
                </div>

                <div className="mt-8 pb-8 md:pb-0 flex justify-center md:justify-end shrink-0">
                  <Button
                    onClick={() => setShowExplanation(false)}
                    size="responsive"
                  >
                    Understood
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Quiz;

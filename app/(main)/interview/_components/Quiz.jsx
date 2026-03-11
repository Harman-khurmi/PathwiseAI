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
import { Loader2, ArrowRight, ArrowLeft, Lightbulb } from "lucide-react";
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

  if (generatingQuiz) {
    return (
      <div className="py-12 max-w-4xl space-y-8 mt-12">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64 md:h-16" />
          <Skeleton className="h-6 w-full max-w-lg" />
        </div>
        <Skeleton className="h-4 w-full rounded-full" />
        <Card className="border-2 rounded-3xl overflow-hidden shadow-sm">
          <CardHeader className="p-8">
            <Skeleton className="h-10 w-full mb-4" />
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-4">
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
          </CardContent>
          <CardFooter className="p-8 pt-0 flex justify-between">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-40 rounded-xl" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!quizData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl py-12"
      >
        <Card className="border-2 shadow-2xl max-w-2xl mx-auto overflow-hidden rounded-[32px] relative">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <Lightbulb size={120} className="text-primary rotate-12" />
          </div>
          <div className="h-3 bg-primary/20 w-full" />
          <CardHeader className="pt-12 px-10 pb-6 text-center">
            <CardTitle className="text-4xl md:text-5xl font-black mb-6 leading-[1.1]">
              Ready to <span className="gradient-title">Level Up?</span>
            </CardTitle>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-md mx-auto">
              This custom mock interview features 10 AI-curated questions tailored
              to your specific industry and professional background.
            </p>
          </CardHeader>
          <CardFooter className="pb-16 px-10 flex flex-col items-center gap-6">
            <Button
              onClick={generateQuizFn}
              size="lg"
              className="btn-primary h-16 px-12 text-xl rounded-2xl group shadow-xl hover:shadow-primary/20 active:scale-95 transition-all"
            >
              Start Personalised Quiz
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
            </Button>
            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
              Estimated time : 10 - 15 minutes
            </p>
          </CardFooter>
        </Card>
      </motion.div>
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
  } = useFetch(saveQuizResult);

  const question = questions[currentQuestion];

  const handleNext = () => {
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

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(questions, answers, score);
      toast.success("Quiz Completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results!");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
    setResultData(null);
    onStartNew();
  };

  if (resultData) {
    return (
      <div className="w-full">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="py-8 md:py-12 space-y-12 w-full">
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary/80">
              Live Assessment
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Question <span className="text-primary">{currentQuestion + 1}</span> <span className="text-muted-foreground/30 font-thin">/</span> {questions.length}
            </h2>
          </div>
          <div className="w-full md:w-48 space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 rounded-full shadow-sm" />
          </div>
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
          <Card className="border-2 shadow-sm overflow-hidden rounded-[32px]">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-black leading-tight md:text-4xl italic">
                &ldquo;{question.question}&rdquo;
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-6">
              <RadioGroup
                onValueChange={handleAnswer}
                value={answers[currentQuestion]}
                className="grid gap-4"
              >
                {question.options.map((option, index) => {
                  const isSelected = answers[currentQuestion] === option;
                  return (
                    <Label
                      key={index}
                      htmlFor={`option-${index}`}
                      className={cn(
                        "flex items-center gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer hover:bg-muted/50 active:scale-[0.99]",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-inner"
                          : "border-border/50",
                      )}
                    >
                      <div
                        className={cn(
                          "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0",
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-border",
                        )}
                      >
                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
                        )}
                      </div>
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}`}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "text-lg font-bold",
                          isSelected && "text-primary",
                        )}
                      >
                        {option}
                      </span>
                    </Label>
                  );
                })}
              </RadioGroup>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                    className="mt-8 p-8 rounded-3xl bg-primary/5 border-2 border-primary/10"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-primary/10 p-2 rounded-xl">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-black text-xs uppercase tracking-[0.2em] text-primary">
                        Pro Insights
                      </p>
                    </div>
                    <p className="text-foreground/80 leading-relaxed font-medium text-lg">
                      {question.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="p-8 pt-0 flex flex-col sm:flex-row gap-4 justify-between border-t border-border/50 bg-muted/10">
              {!showExplanation ? (
                <Button
                  onClick={() => setShowExplanation(true)}
                  variant="outline"
                  size="lg"
                  disabled={!answers[currentQuestion]}
                  className="rounded-xl font-bold h-14 w-full sm:w-auto border-2 hover:bg-white dark:hover:bg-slate-900"
                >
                  Deep Explain
                </Button>
              ) : (
                <div className="h-14" /> // Spacer
              )}
              <Button
                onClick={handleNext}
                size="lg"
                className="btn-primary rounded-xl h-14 px-10 font-bold w-full sm:w-auto text-lg shadow-lg active:scale-95"
                disabled={!answers[currentQuestion] || savingResult}
              >
                {savingResult && (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                )}
                {currentQuestion < questions.length - 1
                  ? "Next Prompt"
                  : "Finalise Quiz"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;

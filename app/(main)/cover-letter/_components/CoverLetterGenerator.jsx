"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Update content when letter is generated
  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter, router, reset]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <Card className="rounded-[32px] border-2 border-muted/30 bg-muted/5 dark:bg-white/5 backdrop-blur-xl shadow-xl shadow-primary/5 overflow-hidden">
        <CardHeader className="md:p-8 border-b border-muted/20">
          <CardTitle className="text-2xl md:text-3xl font-black tracking-tight">
            Job Details
          </CardTitle>
          <CardDescription className="text-lg font-medium">
            Provide information about the position you&apos;re applying for
          </CardDescription>
        </CardHeader>
        <CardContent className="md:p-8 md:pt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="companyName"
                  className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70"
                >
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Google, Microsoft, StartupX"
                  className="rounded-xl h-12 border-muted/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive font-semibold">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="jobTitle"
                  className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70"
                >
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Senior Software Engineer"
                  className="rounded-xl h-12 border-muted/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-destructive font-semibold">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="jobDescription"
                className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70"
              >
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job requirements and responsibilities here to generate a highly tailored letter..."
                className="h-48 rounded-xl border-muted/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium resize-none leading-relaxed"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-destructive font-semibold">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={generating}
                className="rounded-xl font-bold px-8 h-12"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Crafting your letter...
                  </>
                ) : (
                  "Generate AI Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

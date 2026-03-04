"use client";

import { onboardingSchema } from "@/app/lib/schema";
import React, { useEffect, useState, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2, Sparkles, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const {
    loading: updateLoading,
    fn: updateUserFunction,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      experience: "",
      skills: "",
      bio: "",
    },
  });

  const watchIndustry = useWatch({
    control,
    name: "industry",
  });

  const watchSubIndustry = useWatch({
    control,
    name: "subIndustry",
  });

  const onSubmit = useCallback(
    async (values) => {
      try {
        const formattedIndustry = `${values.industry}-${values.subIndustry
          .toLowerCase()
          .replace(/ /g, "-")}`;
        await updateUserFunction({ ...values, industry: formattedIndustry });
      } catch (error) {
        console.error("Onboarding Error:", error);
      }
    },
    [updateUserFunction],
  );

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading, router]);

  return (
    <div className="flex items-center justify-center py-10 px-4 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 shadow-2xl rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles size={120} className="text-primary" />
          </div>

          <CardHeader className="p-8 md:p-12 pb-4">
            <CardTitle className="text-4xl md:text-5xl font-black mb-4">
              Complete your <span className="gradient-title">Profile</span>
            </CardTitle>
            <CardDescription className="text-lg font-medium leading-relaxed max-w-md">
              Select your industry to get personalized career insights and
              AI-driven growth recommendations.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 md:p-12 pt-4">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Industry selection */}
                <div className="space-y-3">
                  <Label
                    htmlFor="industry"
                    className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Industry
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("industry", value);
                      setSelectedIndustry(
                        industries.find((indus) => indus.id === value),
                      );
                      setValue("subIndustry", "");
                    }}
                    value={watchIndustry}
                  >
                    <SelectTrigger
                      id="industry"
                      className="h-14 rounded-2xl border-2 hover:border-primary/50 transition-all text-base font-medium"
                    >
                      <SelectValue placeholder="Select an Industry" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2">
                      {industries.map((indus) => (
                        <SelectItem
                          value={indus.id}
                          key={indus.id}
                          className="rounded-xl my-1 focus:bg-primary/10"
                        >
                          {indus.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-xs font-bold text-red-500 animate-pulse">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                {/* subindustry selection */}
                <AnimatePresence mode="wait">
                  {watchIndustry ? (
                    <motion.div
                      key="sub"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      <Label
                        htmlFor="subIndustry"
                        className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                      >
                        Sub-Industry
                      </Label>
                      <Select
                        onValueChange={(value) => {
                          setValue("subIndustry", value);
                        }}
                        value={watchSubIndustry}
                      >
                        <SelectTrigger
                          id="subIndustry"
                          className="h-14 rounded-2xl border-2 hover:border-primary/50 transition-all text-base font-medium"
                        >
                          <SelectValue placeholder="Field / Role" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-2">
                          {selectedIndustry?.subIndustries.map((indus) => (
                            <SelectItem
                              value={indus}
                              key={indus}
                              className="rounded-xl my-1 focus:bg-primary/10"
                            >
                              {indus}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subIndustry && (
                        <p className="text-xs font-bold text-red-500 animate-pulse">
                          {errors.subIndustry.message}
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center border-2 border-dashed rounded-2xl p-6 opacity-30">
                      <p className="text-sm font-bold text-center">
                        Select Industry
                        <br />
                        to show sub-fields
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* years of experience */}
              <div className="space-y-3">
                <Label
                  htmlFor="experience"
                  className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Years of Experience
                </Label>
                <div className="relative group">
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    max="50"
                    className="h-14 rounded-2xl border-2 pl-6 text-lg font-bold group-hover:border-primary/50 transition-all"
                    placeholder="Enter years of Experience"
                    {...register("experience")}
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-black pointer-events-none group-focus-within:text-primary transition-colors uppercase text-xs tracking-widest">
                    YEARS
                  </div>
                </div>
                {errors.experience && (
                  <p className="text-xs font-bold text-red-500 animate-pulse">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              {/* skills field */}
              <div className="space-y-3">
                <Label
                  htmlFor="skills"
                  className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex justify-between"
                >
                  Core Skills
                  <span className="text-[10px] text-primary lowercase tracking-normal font-medium">
                    separated by commas
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="skills"
                    className="h-14 rounded-2xl border-2 pl-6 pr-12 text-base font-medium hover:border-primary/50 transition-all"
                    placeholder="e.g : JavaScript, React, System Design"
                    {...register("skills")}
                  />
                  <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                </div>
                {errors.skills && (
                  <p className="text-xs font-bold text-red-500 animate-pulse">
                    {errors.skills.message}
                  </p>
                )}
              </div>

              {/* professional bio */}
              <div className="space-y-3">
                <Label
                  htmlFor="bio"
                  className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Professional Summary
                </Label>
                <Textarea
                  id="bio"
                  className="min-h-[140px] rounded-3xl border-2 p-6 text-base leading-relaxed resize-none hover:border-primary/50 transition-all"
                  placeholder="Tell us about your career journey and professional impact..."
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-xs font-bold text-red-500 animate-pulse">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* submit button */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-16 rounded-2xl text-lg font-black tracking-tight btn-primary group shadow-lg"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    PREPARING YOUR EXPERIENCE...
                  </>
                ) : (
                  <>
                    Complete Your Journey
                    <Plus className="ml-3 h-5 w-5 group-hover:rotate-90 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;

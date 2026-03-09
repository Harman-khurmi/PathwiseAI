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
import { Loader2, Sparkles, Plus, X, Info, ArrowRight } from "lucide-react";
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
    <div className="flex items-center justify-center pt-3 pb-6 md:py-6 lg:py-8 px-4 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="border-3 border-[#55C7F1]/10 hover:border-[#55C7F1]/25 bg-primary/5 hover:bg-primary/6 transition-all duration-400 ease-in shadow-none rounded-xl overflow-hidden relative">
          <div className="absolute -top-4 md:top-0 right-4 md:right-0 px-0 py-8 md:p-8 opacity-[0.05] pointer-events-none">
            <Sparkles
              size={160}
              className="text-primary size-20 md:size-32"
            />
          </div>

          <CardHeader className="p-4 md:p-8 pb-0">
            <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-black mb-1 md:mb-2">
              Complete your <span className="gradient-title">Profile</span>
            </CardTitle>
            <CardDescription className="text-sm md:text-base lg:text-lg font-medium leading-relaxed md:max-w-lg">
              Select your industry to get personalized career insights and
              AI-driven growth recommendations.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 md:p-8 md:pt-0">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                {/* Industry selection */}
                <div className="space-y-3">
                  <Label
                    htmlFor="industry"
                    className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Preferred Industry
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
                      className="w-full h-14 px-3 md:px-6 py-6 rounded-lg border-2 border-[#55C7F1]/10 bg-[#55C7F1]/5 hover:bg-[#55C7F1]/10 focus:border-[#55C7F1]/50! focus-visible:border-[#55C7F1]/50! hover:border-[#55C7F1]/25 focus-visible:ring-[#55C7F1]/30! focus-visible:ring-[3px]! transition-all duration-400 text-sm md:text-base font-semibold outline-none cursor-pointer"
                    >
                      <SelectValue placeholder="Select an Industry" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-2 border-[#55C7F1]/20 bg-background/95 backdrop-blur-xl">
                      {industries.map((indus) => (
                        <SelectItem
                          value={indus.id}
                          key={indus.id}
                          className="rounded-lg my-1.5 font-semibold focus:bg-[#55C7F1]/10 focus:text-primary transition-colors cursor-pointer"
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
                <div className="space-y-3">
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
                          className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground"
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
                            className="w-full h-14 px-3 md:px-6 py-6 rounded-lg border-2 border-[#55C7F1]/10 bg-[#55C7F1]/5 hover:bg-[#55C7F1]/10 focus:border-[#55C7F1]/50! focus-visible:border-[#55C7F1]/50! hover:border-[#55C7F1]/25 focus-visible:ring-[#55C7F1]/30! focus-visible:ring-[3px]! transition-all duration-400 text-sm md:text-base font-semibold outline-none cursor-pointer"
                          >
                            <SelectValue placeholder="Field / Role" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-2 border-[#55C7F1]/20 bg-background/95 backdrop-blur-xl">
                            {selectedIndustry?.subIndustries.map((indus) => (
                              <SelectItem
                                value={indus}
                                key={indus}
                                className="rounded-lg my-1.5 font-semibold focus:bg-[#55C7F1]/10 focus:text-primary transition-colors cursor-pointer"
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
                      <div className="flex items-center justify-center border-2 border-dashed border-[#55C7F1]/20 bg-[#55C7F1]/5 rounded-lg p-3 md:p-6 h-18 opacity-70 w-full mt-2">
                        <p className="text-xs md:text-sm font-bold text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                          Select Industry to show sub-fields
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              {/* years of experience */}
              <div className="space-y-3">
                <Label
                  htmlFor="experience"
                  className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Years of Experience
                </Label>
                <div className="relative group">
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    max="50"
                    className="w-full h-14 px-3 py-4 md:py-5 lg:py-6 rounded-lg border-2 border-[#55C7F1]/10 bg-[#55C7F1]/5 hover:bg-[#55C7F1]/10 focus:border-[#55C7F1]/50! focus-visible:border-[#55C7F1]/50! hover:border-[#55C7F1]/25 focus-visible:ring-[#55C7F1]/30! focus-visible:ring-[3px]! md:pl-6 pr-12 text-sm md:text-base lg:text-lg font-medium transition-all duration-400 outline-none"
                    placeholder="Enter years of experience"
                    {...register("experience")}
                  />
                  <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-black pointer-events-none opacity-50 group-focus-within:opacity-100 transition-opacity uppercase text-xs tracking-widest">
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
                  className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground flex justify-between"
                >
                  Core Skills
                  <span className="text-[10px] md:text-xs text-muted-foreground lowercase tracking-normal font-bold flex items-center gap-1 opacity-80">
                    <Info size={16} className="size-4 md:size-5" />
                    separated by commas
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="skills"
                    className="w-full h-14 px-3 py-4 md:py-5 lg:py-6 rounded-lg border-2 border-[#55C7F1]/10 bg-[#55C7F1]/5 hover:bg-[#55C7F1]/10 focus:border-[#55C7F1]/50! focus-visible:border-[#55C7F1]/50! hover:border-[#55C7F1]/25 focus-visible:ring-[#55C7F1]/30! focus-visible:ring-[3px]! md:pl-6 pr-12 text-sm md:text-base lg:text-lg font-medium transition-all duration-300 outline-none"
                    placeholder="e.g: JavaScript, React, System Design..."
                    {...register("skills")}
                  />
                  <Sparkles className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
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
                  className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Professional Summary
                </Label>
                <Textarea
                  id="bio"
                  className="w-full min-h-33 rounded-xl border-2 border-[#55C7F1]/10 bg-[#55C7F1]/5 hover:bg-[#55C7F1]/10 focus:border-[#55C7F1]/50! focus-visible:border-[#55C7F1]/50! hover:border-[#55C7F1]/25 focus-visible:ring-[#55C7F1]/30! focus-visible:ring-[3px]! p-3 md:p-6 text-sm md:text-base lg:text-lg font-medium leading-relaxed transition-all duration-400 outline-none"
                  placeholder="Tell us about your career journey, milestones, and professional impact..."
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-xs font-bold text-red-500 animate-pulse">
                    {errors.bio.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="responsive"
                disabled={updateLoading}
                className="relative group w-full overflow-hidden py-5 md:py-6 lg:py-7 text-sm md:text-lg lg:text-xl font-semibold text-white bg-linear-to-b from-[#55C7F1] to-[#3C71FA] hover:from-[#39BDEE] hover:to-[#1D58F0] hover:shadow-lg hover:shadow-[#1D58F0]/20 transition-all duration-300 ease-out"
              >
                {/* Glass reflection sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] transition-transform duration-900 ease-out group-hover:translate-x-full" />

                {/* Content */}
                <span className="relative z-10 flex items-center justify-center">
                  {updateLoading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Analyzing Profile...
                    </>
                  ) : (
                    <>
                      Unlock Your Career Path
                      <ArrowRight
                        size={20}
                        strokeWidth={3}
                        className="ml-3 transition-transform duration-400 group-hover:translate-x-1 translate-y-px"
                      />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;

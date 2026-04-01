"use client";

import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useCallback, useMemo } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
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
import { Loader2, Sparkles, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const formatIndustry = (industry, sub) =>
  `${industry}-${sub.toLowerCase().replace(/\s+/g, "-")}`;

const inputStyles =
  "border-2 border-brand-primary/10 bg-brand-primary/5 hover:bg-brand-primary/10 hover:border-brand-primary/25 focus:border-brand-primary/50! focus-visible:border-brand-primary/50! focus-visible:ring-brand-primary/30! focus-visible:ring-[3px]! transition-all duration-400 outline-none";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const OnboardingForm = ({ industries }) => {
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
    control,
    setValue,
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

  const selectedIndustry = useMemo(() => {
    return industries?.find((ind) => ind.id === watchIndustry) || null;
  }, [watchIndustry, industries]);

  const onSubmit = useCallback(
    async (values) => {
      if (updateLoading) return;
      try {
        const skillsArray = Array.isArray(values.skills)
          ? values.skills
          : typeof values.skills === "string"
            ? values.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [];

        const formattedIndustry = formatIndustry(
          values.industry,
          values.subIndustry,
        );

        await updateUserFunction({
          ...values,
          industry: formattedIndustry,
          skills: skillsArray,
        });
      } catch (error) {
        console.error("Onboarding Error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
    [updateUserFunction, updateLoading],
  );

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading, router]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 pt-3 pb-6 md:py-6 lg:py-8">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="border-brand-primary/10 bg-primary/5 hover:border-brand-primary/25 hover:bg-primary/6 relative overflow-hidden rounded-xl border-3 shadow-none transition-all duration-400 ease-in">
          <div className="pointer-events-none absolute -top-4 right-4 py-8 opacity-[0.05] md:top-0 md:right-0 md:p-8">
            <Sparkles size={160} className="text-primary size-20 md:size-32" />
          </div>

          <CardHeader className="p-4 pb-0 md:p-8">
            <CardTitle className="mb-1 text-3xl font-black md:mb-2 md:text-4xl lg:text-5xl">
              Complete your <span className="gradient-title">Profile</span>
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed font-medium md:max-w-lg md:text-base lg:text-lg">
              Select your industry to get personalized career insights and
              AI-driven growth recommendations.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 md:p-8 md:pt-0">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <IndustryField
                control={control}
                industries={industries}
                errors={errors}
                setValue={setValue}
              />
              <SubIndustryField
                control={control}
                selectedIndustry={selectedIndustry}
                watchIndustry={watchIndustry}
                errors={errors}
              />
              <ExperienceField register={register} errors={errors} />
              <SkillsField register={register} errors={errors} />
              <BioField register={register} errors={errors} />
              <SubmitButton updateLoading={updateLoading} />
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingForm;

// --- Exracted Field Components ---

const IndustryField = ({ control, industries, errors, setValue }) => (
  <div className="space-y-3">
    <Label
      htmlFor="industry"
      className="text-muted-foreground text-xs font-bold tracking-wider uppercase sm:text-sm"
    >
      Preferred Industry
    </Label>
    <Controller
      control={control}
      name="industry"
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={(val) => {
            field.onChange(val);
            setValue("subIndustry", "");
          }}
        >
          <SelectTrigger
            id="industry"
            aria-invalid={!!errors.industry}
            aria-describedby="industry-error"
            className={cn(
              "h-14 w-full cursor-pointer rounded-lg px-3 py-6 text-sm font-semibold md:px-6 md:text-base",
              inputStyles,
            )}
          >
            <SelectValue placeholder="Select an Industry" />
          </SelectTrigger>
          <SelectContent className="bg-background/95 border-brand-primary/20 rounded-lg border-2 backdrop-blur-xl">
            {industries?.map((indus) => (
              <SelectItem
                value={indus.id}
                key={indus.id}
                className="focus:bg-brand-primary/10 focus:text-primary my-1.5 cursor-pointer rounded-lg font-semibold transition-colors"
              >
                {indus.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
    <div className="min-h-[16px]">
      {errors.industry && (
        <p
          id="industry-error"
          className="animate-pulse text-xs font-bold text-red-500"
        >
          {errors.industry.message}
        </p>
      )}
    </div>
  </div>
);

const SubIndustryField = ({
  control,
  selectedIndustry,
  watchIndustry,
  errors,
}) => (
  <div className="space-y-3">
    <AnimatePresence mode="wait">
      {watchIndustry ? (
        <motion.div
          key="sub"
          initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
          className="space-y-3"
        >
          <Label
            htmlFor="subIndustry"
            className="text-muted-foreground text-xs font-bold tracking-wider uppercase sm:text-sm"
          >
            Sub-Industry
          </Label>
          <Controller
            control={control}
            name="subIndustry"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!watchIndustry}
              >
                <SelectTrigger
                  id="subIndustry"
                  aria-invalid={!!errors.subIndustry}
                  aria-describedby="subIndustry-error"
                  className={cn(
                    "h-14 w-full cursor-pointer rounded-lg px-3 py-6 text-sm font-semibold md:px-6 md:text-base",
                    inputStyles,
                  )}
                >
                  <SelectValue placeholder="Field / Role" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 border-brand-primary/20 rounded-xl border-2 backdrop-blur-xl">
                  {selectedIndustry?.subIndustries?.map((indus) => (
                    <SelectItem
                      value={indus}
                      key={indus}
                      className="focus:bg-brand-primary/10 focus:text-primary my-1.5 cursor-pointer rounded-lg font-semibold transition-colors"
                    >
                      {indus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="min-h-[16px]">
            {errors.subIndustry && (
              <p
                id="subIndustry-error"
                className="animate-pulse text-xs font-bold text-red-500"
              >
                {errors.subIndustry.message}
              </p>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="fallback"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          className="bg-brand-primary/5 border-brand-primary/20 mt-2 flex h-18 w-full items-center justify-center rounded-lg border-2 border-dashed p-3 opacity-70 md:p-6"
        >
          <p className="text-muted-foreground text-center text-xs leading-relaxed font-bold tracking-widest uppercase md:text-sm">
            Select Industry to show sub-fields
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ExperienceField = ({ register, errors }) => (
  <div className="space-y-3">
    <Label
      htmlFor="experience"
      className="text-muted-foreground text-xs font-bold tracking-wider uppercase md:text-sm"
    >
      Years of Experience
    </Label>
    <div className="group relative">
      <Input
        id="experience"
        type="number"
        min="0"
        max="50"
        aria-invalid={!!errors.experience}
        aria-describedby="experience-error"
        className={cn(
          "h-14 w-full rounded-lg px-3 py-4 pr-12 text-sm font-medium md:py-5 md:pl-6 md:text-base lg:py-6 lg:text-lg",
          inputStyles,
        )}
        placeholder="Enter years of experience"
        {...register("experience")}
      />
      <div className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs font-black tracking-widest uppercase opacity-50 transition-opacity group-focus-within:opacity-100 md:right-6">
        YEARS
      </div>
    </div>
    <div className="min-h-[16px]">
      {errors.experience && (
        <p
          id="experience-error"
          className="animate-pulse text-xs font-bold text-red-500"
        >
          {errors.experience.message}
        </p>
      )}
    </div>
  </div>
);

const SkillsField = ({ register, errors }) => (
  <div className="space-y-3">
    <Label
      htmlFor="skills"
      className="text-muted-foreground flex justify-between text-xs font-bold tracking-wider uppercase md:text-sm"
    >
      Core Skills
      <span className="text-muted-foreground flex items-center gap-1 text-[10px] font-bold tracking-normal lowercase opacity-80 md:text-xs">
        <Info size={16} className="size-4 md:size-5" />
        separated by commas
      </span>
    </Label>
    <div className="relative">
      <Input
        id="skills"
        aria-invalid={!!errors.skills}
        aria-describedby="skills-error"
        className={cn(
          "h-14 w-full rounded-lg px-3 py-4 pr-12 text-sm font-medium transition-all duration-300 md:py-5 md:pl-6 md:text-base lg:py-6 lg:text-lg",
          inputStyles,
        )}
        placeholder="e.g: JavaScript, React, System Design..."
        {...register("skills")}
      />
      <Sparkles className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-50 md:right-6" />
    </div>
    <div className="min-h-[16px]">
      {errors.skills && (
        <p
          id="skills-error"
          className="animate-pulse text-xs font-bold text-red-500"
        >
          {errors.skills.message}
        </p>
      )}
    </div>
  </div>
);

const BioField = ({ register, errors }) => (
  <div className="space-y-3">
    <Label
      htmlFor="bio"
      className="text-muted-foreground text-xs font-bold tracking-wider uppercase md:text-sm"
    >
      Professional Summary
    </Label>
    <Textarea
      id="bio"
      aria-invalid={!!errors.bio}
      aria-describedby="bio-error"
      className={cn(
        "min-h-33 w-full rounded-xl p-3 text-sm leading-relaxed font-medium md:p-6 md:text-base lg:text-lg",
        inputStyles,
      )}
      placeholder="Tell us about your career journey, milestones, and professional impact..."
      {...register("bio")}
    />
    <div className="min-h-[16px]">
      {errors.bio && (
        <p
          id="bio-error"
          className="animate-pulse text-xs font-bold text-red-500"
        >
          {errors.bio.message}
        </p>
      )}
    </div>
  </div>
);

const SubmitButton = ({ updateLoading }) => (
  <Button
    type="submit"
    size="responsive"
    disabled={updateLoading}
    className="group from-brand-primary relative w-full overflow-hidden bg-linear-to-b to-brand-secondary py-5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:from-brand-hover hover:to-brand-active hover:shadow-lg hover:shadow-brand-active/20 md:py-6 md:text-lg lg:py-7 lg:text-xl"
  >
    {/* Glass reflection sweep */}
    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-900 ease-out group-hover:translate-x-full" />

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
            className="ml-3 translate-y-px transition-transform duration-400 group-hover:translate-x-1"
          />
        </>
      )}
    </span>
  </Button>
);

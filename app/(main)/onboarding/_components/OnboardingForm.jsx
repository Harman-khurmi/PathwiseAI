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
import { Loader2 } from "lucide-react";

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
    watch,
    control,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
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
    <div className="flex items-center justify-center">
      <Card className={`w-full max-w-lg`}>
        <CardHeader>
          <CardTitle>Complete your profile</CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations
          </CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6 flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Industry selection */}
            <div className="w-full space-y-2">
              <Label htmlFor="industry">Industry</Label>
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
                <SelectTrigger id="industry" className="w-full">
                  <SelectValue placeholder="Select an Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {industries.map((indus) => {
                      return (
                        <SelectItem value={indus.id} key={indus.id}>
                          {indus.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* subindustry selection */}
            {watchIndustry && (
              <div className="w-full space-y-2">
                <Label htmlFor="subIndustry">Sub-Industry</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                  value={watchSubIndustry}
                >
                  <SelectTrigger id="subIndustry" className="w-full">
                    <SelectValue placeholder="Select a Sub-Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {selectedIndustry?.subIndustries.map((indus) => {
                        return (
                          <SelectItem value={indus} key={indus}>
                            {indus}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* years of experience */}
            <div className="w-full space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type={`number`}
                min="0"
                max="50"
                placeholder="Enter years of Experience"
                {...register("experience")}
              ></Input>
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* skills field */}
            <div className="w-full space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g : JavaScript, TypeScript, Python"
                {...register("skills")}
              />
              <p className="text-sm opacity-50">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-xs text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* professional bio */}
            <div className="w-full space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                className={`h-32`}
                placeholder="Tell us about your professional background..."
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-xs text-red-500">{errors.bio.message}</p>
              )}
            </div>

            {/* submit button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;

import React from "react";
import OnboardingForm from "./_components/OnboardingForm";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import industries from "@/app/data/industries";

const OnboardingPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) redirect("/dashboard");

  return (
    <div className="w-full">
      <OnboardingForm industries={industries} />
    </div>
  );
};

export default OnboardingPage;

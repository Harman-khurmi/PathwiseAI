import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "./_components/DashboardView";
import { getIndustryInsights } from "@/actions/dashboard";
import { currentUser } from "@clerk/nextjs/server";

const IndustryInsightPage = async () => {
  // ⚠️ DEBUG: Uncomment the line below to test the loading skeleton continuously
  // await new Promise(() => {});
  
  // to check error.js
  // throw new Error("Test Error"); 

  const user = await currentUser();
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();
  const serializedInsights = insights
    ? JSON.parse(JSON.stringify(insights))
    : null;

  return (
    <div className="py-6 md:py-8">
      <DashboardView
        insights={serializedInsights}
        firstName={user?.firstName}
      />
    </div>
  );
};

export default IndustryInsightPage;

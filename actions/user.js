"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAiInsights } from "./dashboard";

//2 APIs
export async function updateUser(data) {
  // checks if user exists
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  //to check if user exists in our db
  const user = await db.user.findUnique({
    where: {
      ClerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found in db");
  }

  // Check if industry insight already exists
  let industryInsight = await db.industryInsight.findUnique({
    where: {
      industry: data.industry,
    },
  });

  // If industry insight doesn't exist, generate it outside the transaction
  if (!industryInsight) {
    const insights = await generateAiInsights(data.industry);

    try {
      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        // If it was created by another request in the meantime, just fetch it
        industryInsight = await db.industryInsight.findUnique({
          where: { industry: data.industry },
        });
      } else {
        throw error;
      }
    }
  }

  // Use a transaction for the final user update
  try {
    const result = await db.$transaction(
      async (tx) => {
        // update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000,
      },
    );
    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile" + error.message);
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        ClerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}

// industryInsight = await tx.industryInsight.create({
//   data: {
//     industry: data.industry,
//     salaryRanges: [],
//     growthRate: 0,
//     demandLevel: "MEDIUM",
//     topSkills: [],
//     marketOutlook: "NEUTRAL",
//     keyTrends: [],
//     recommendedSkills: [],
//     nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//   },
// });

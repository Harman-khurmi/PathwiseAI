"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  // "gemini-3-flash-preview",
  model: "gemini-2.5-flash",
});

export const generateAiInsights = async (industry) => {
  const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const insights = JSON.parse(cleanedText);

    return {
      ...insights,
      demandLevel: insights.demandLevel?.toUpperCase() || "MEDIUM",
      marketOutlook: insights.marketOutlook?.toUpperCase() || "NEUTRAL",
    };
  } catch (error) {
    console.error("Error generating AI insights:", error);
    throw new Error(
      "Failed to generate industry insights. Please try again later.",
    );
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { ClerkUserId: userId },
    include: { industryInsight: true },
  });

  if (!user) throw new Error("User not found");

  // If insight exists and isn't stale, return it
  if (user.industryInsight && user.industryInsight.nextUpdate > new Date()) {
    return user.industryInsight;
  }

  // Otherwise, generate/regenerate
  const insights = await generateAiInsights(user.industry);
  const nextUpdate = new Date();
  nextUpdate.setDate(nextUpdate.getDate() + 7); // Update in 7 days

  const industryInsight = await db.industryInsight.upsert({
    where: { industry: user.industry },
    update: {
      ...insights,
      nextUpdate,
    },
    create: {
      industry: user.industry,
      ...insights,
      nextUpdate,
    },
  });

  return industryInsight;
}

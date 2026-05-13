"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateAiInsights = async (industry) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing in environment variables.");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

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
    
    // Robust JSON parsing: Extract everything between the first '{' and the last '}'
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error(`Failed to extract JSON from AI response. Original text: ${text}`);
    }
    
    let insights;
    try {
      insights = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      throw new Error(`Failed to parse extracted JSON. Error: ${parseErr.message}`);
    }

    // Strict Sanitization to match Prisma schema types and enums exactly
    const validDemandLevels = ["HIGH", "MEDIUM", "LOW"];
    const validMarketOutlooks = ["POSITIVE", "NEUTRAL", "NEGATIVE"];

    const demandLevel = insights.demandLevel?.toUpperCase() || "MEDIUM";
    const marketOutlook = insights.marketOutlook?.toUpperCase() || "NEUTRAL";

    return {
      salaryRanges: Array.isArray(insights.salaryRanges) ? insights.salaryRanges : [],
      growthRate: typeof insights.growthRate === "number" && !isNaN(insights.growthRate) ? insights.growthRate : 0,
      demandLevel: validDemandLevels.includes(demandLevel) ? demandLevel : "MEDIUM",
      topSkills: Array.isArray(insights.topSkills) ? insights.topSkills : [],
      marketOutlook: validMarketOutlooks.includes(marketOutlook) ? marketOutlook : "NEUTRAL",
      keyTrends: Array.isArray(insights.keyTrends) ? insights.keyTrends : [],
      recommendedSkills: Array.isArray(insights.recommendedSkills) ? insights.recommendedSkills : [],
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
  
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in environment variables.");
  }

  const user = await db.user.findUnique({
    where: { ClerkUserId: userId },
    include: { industryInsight: true },
  });

  if (!user) throw new Error("User not found");
  
  if (!user.industry || user.industry.trim() === "") {
    throw new Error("User has no industry set; cannot generate insights.");
  }

  // If insight exists and isn't stale, return it
  if (user.industryInsight && user.industryInsight.nextUpdate > new Date()) {
    return user.industryInsight;
  }

  // Otherwise, generate/regenerate
  const insights = await generateAiInsights(user.industry);
  const nextUpdate = new Date();
  nextUpdate.setDate(nextUpdate.getDate() + 7); // Update in 7 days

  // Explicitly passing createdAt and updatedAt handles edge cases where the Prisma client 
  // is stale and doesn't auto-fill these fields, preventing the null constraint violation.
  const now = new Date();
  
  const industryInsight = await db.industryInsight.upsert({
    where: { industry: user.industry },
    update: {
      ...insights,
      nextUpdate,
      updatedAt: now,
    },
    create: {
      industry: user.industry,
      ...insights,
      nextUpdate,
      createdAt: now,
      updatedAt: now,
    },
  });

  return industryInsight;
}

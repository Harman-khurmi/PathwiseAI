"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function saveResume(content, formData = null) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { ClerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
        ...(formData && { formData }),
      },
      create: {
        userId: user.id,
        content,
        ...(formData && { formData }),
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error(`Failed to save resume: ${error.message || "Unknown error"}`);
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { ClerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { ClerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

    const prompt = `
      As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
      Make it highly ATS-friendly, impactful, and aligned with industry standards.
      Current content: "${current}"

      Requirements:
      1. Use strong action verbs to start each phrase.
      2. Eliminate passive voice and fluff.
      3. Integrate hard numbers, metrics, and measurable results.
      4. Highlight technical abilities implicitly through accomplishments.
      5. Frame sentences as powerful bullet points compatible with standard ATS trackers algorithms.
      6. Incorporate high-value industry keywords logically.
      
      CRITICAL: Return ONLY the formatted text. Format your response exactly as one or a series of professional bullet points (if it's long enough, use - to separate if needed) without any conversational text or introductory remarks. It must be a direct drop-in replacement.
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvedContent = response.text().trim();

    if (!improvedContent) {
      throw new Error("AI failed to improve content. Please try again.");
    }
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}

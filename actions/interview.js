"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  // "gemini-3-flash-preview",
  model: "gemini-2.5-flash-lite",
});

export async function generateQuiz() {
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

  try {
    const industry = user.industry || "professional";
    const prompt = `
    Generate 10 technical interview questions for a ${industry} professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""}.
    
    IMPORTANT RULES:
    1. Each question must have EXACTLY 4 multiple-choice options.
    2. EXACTLY 1 option must be correct.
    3. The correct answer MUST be determinable STRICTLY from the 4 provided options alone.
    4. DO NOT generate any questions that require analyzing images, external code snippets, or outside context not provided in the question. 
    5. Order the 10 questions progressively by difficulty: start with Easy questions, move to Medium, and end with Hard questions.
    
    Return the response strictly as a pure JSON object, with absolutely no markdown formatting (do not wrap in \`\`\`json), no code blocks, and no other text.
    The format MUST be:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string",
          "difficulty": "Easy | Medium | Hard"
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Clean potential markdown blocks or hidden whitespace robustly
    const cleanedText = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    const quiz = JSON.parse(cleanedText);
    return quiz.questions || [];
  } catch (error) {
    console.error("Error Generating Quiz:", error);
    if (error instanceof SyntaxError) {
      throw new Error("AI returned an invalid format. Please try again.");
    }
    throw new Error(error.message || "Failed to generate Quiz questions");
  }
}

export const saveQuizResult = async (questions, answers, score) => {
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

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`,
      )
      .join("\n\n");

    const industry = user.industry || "professional";
    const improvementPrompt = `
      The user got the following ${industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
};

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { ClerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}

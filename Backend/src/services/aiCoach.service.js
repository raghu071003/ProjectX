import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCode = async (code, language, problemTitle) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    Act as a senior software engineer conducting a code review.
    Analyze the following ${language} code for the problem "${problemTitle}".
    
    Code:
    ${code}

    Provide the output strictly in the following JSON format (no markdown code blocks, just raw JSON):
    {
      "timeComplexity": "Big O notation (e.g., O(n))",
      "spaceComplexity": "Big O notation (e.g., O(1))",
      "rating": "Score from 1 to 10 based on correctness and style",
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
      "summary": "Brief 1-sentence summary of the code quality."
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    // Clean up if the model adds markdown code blocks
    const cleanedCommon = response.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedCommon);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze code");
  }
};

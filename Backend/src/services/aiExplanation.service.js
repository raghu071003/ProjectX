import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const explainRecommendation = async ({
  problem,
  skill,
  mastery,
  mistakes
}) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are a coding mentor.

User skill: ${skill}
Current mastery (0 to 1): ${mastery}

Recommended problem:
- Title: ${problem.title}
- Difficulty: ${problem.difficulty}

Common mistakes:
${mistakes.length ? mistakes.join(", ") : "None"}

Explain:
1. Why this problem was chosen
2. What the user should focus on
3. How solving it improves their skill

Keep it concise and beginner-friendly.

Donot have any quotes or questions or headings it should just be a paragraph explanation.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export default explainRecommendation;

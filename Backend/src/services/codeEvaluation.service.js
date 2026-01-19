import axios from "axios";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const normalize = (output) =>
  output.trim().replace(/\s+/g, " ");

export const evaluateSubmission = async ({
  sourceCode,
  language,
  problem,
}) => {
  // console.log(problem)
  // 1️⃣ Language guard
  if (language !== "javascript") {
    return { success: false, error: "Unsupported Language" };
  }

  // 2️⃣ Enforce solve() existence
  if (!/function\s+solve\s*\(/.test(sourceCode)) {
    return { success: false, error: "Missing solve() function" };
  }

  // 3️⃣ HARD syntax validation (critical)
  try {
    new Function(sourceCode);
  } catch (err) {
    return {
      success: false,
      error: "Compilation Error",
      details: err.message,
    };
  }

  // 4️⃣ Execute against each test case
  for (const testCase of problem.testCases) {
    const wrappedCode = `
${sourceCode}

// 🚨 Forced execution wrapper
if (typeof solve !== "function") {
  throw new Error("solve() not defined");
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf8");

let result;
try {
  result = solve(input);
} catch (err) {
  console.error(err.toString());
  process.exit(1);
}

if (typeof result === "object") {
  console.log(JSON.stringify(result));
} else {
  console.log(result);
}
`;

    const response = await axios.post(
      PISTON_URL,
      {
        language: "javascript",
        version: "*",
        files: [{ content: wrappedCode }],
        stdin: testCase.input,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const compileErr = response.data.compile?.stderr?.trim();
    const runtimeErr = response.data.run?.stderr?.trim();
    const stdout = response.data.run?.stdout ?? "";

    // 5️⃣ Compilation error
    if (compileErr) {
      return {
        success: false,
        error: "Compilation Error",
        details: compileErr,
      };
    }

    // 6️⃣ Runtime error
    if (runtimeErr) {
      return {
        success: false,
        error: "Runtime Error",
        details: runtimeErr,
      };
    }

    // 7️⃣ No output
    if (!stdout.trim()) {
      return {
        success: false,
        error: "No Output",
      };
    }

    // 8️⃣ Wrong answer
    if (
      normalize(stdout) !==
      normalize(testCase.expectedOutput)
    ) {
      return {
        success: false,
        error: "Wrong Answer",
      };
    }
  }

  // ✅ All test cases passed
  return { success: true };
};

import axios from "axios";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const normalize = (output) =>
  output.trim().replace(/\s+/g, " ");

export const evaluateSubmission = async ({
  sourceCode,
  language,
  problem,
}) => {
  // 1️⃣ Language check
  if (language !== "javascript") {
    return { success: false, error: "Unsupported Language" };
  }

  // 2️⃣ solve() existence
  if (!/function\s+solve\s*\(/.test(sourceCode)) {
    return { success: false, error: "Missing solve() function" };
  }

  // 3️⃣ Syntax validation
  try {
    new Function(sourceCode);
  } catch (err) {
    return {
      success: false,
      error: "Compilation Error",
      details: err.message,
    };
  }

  const results = [];

  // 4️⃣ Run all test cases
  for (let i = 0; i < problem.testCases.length; i++) {
    const testCase = problem.testCases[i];

    const wrappedCode = `
${sourceCode}

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

    let response;
    try {
      response = await axios.post(
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
    } catch {
      return {
        success: false,
        error: "Judge Error",
        details: "Execution service unavailable",
      };
    }

    const compileErr = response.data.compile?.stderr?.trim();
    const runtimeErr = response.data.run?.stderr?.trim();
    const stdout = response.data.run?.stdout ?? "";

    // 🚨 Compilation error
    if (compileErr) {
      return {
        success: false,
        error: "Compilation Error",
        details: compileErr,
      };
    }

    // 🚨 Runtime error
    if (runtimeErr) {
      return {
        success: false,
        error: "Runtime Error",
        details: runtimeErr,
      };
    }

    // 🚨 No output
    if (!stdout.trim()) {
      results.push({
        index: i,
        status: "FAILED",
        isHidden: testCase.isHidden,
        ...(testCase.isHidden
          ? {}
          : {
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
              actualOutput: "",
            }),
      });
      continue;
    }

    const actualOutput = normalize(stdout);
    const expectedOutput = normalize(testCase.expectedOutput);

    // ❌ Wrong Answer
    if (actualOutput !== expectedOutput) {
      results.push({
        index: i,
        status: "FAILED",
        isHidden: testCase.isHidden,
        ...(testCase.isHidden
          ? {}
          : {
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
              actualOutput: stdout.trim(),
            }),
      });
    } else {
      // ✅ Passed
      results.push({
        index: i,
        status: "PASSED",
        isHidden: testCase.isHidden,
        ...(testCase.isHidden
          ? {}
          : { output: stdout.trim() }),
      });
    }
  }

  // 5️⃣ Final evaluation
  const failed = results.filter(r => r.status === "FAILED");
  const publicResults = results.filter(r => !r.isHidden);

  if (failed.length > 0) {
    return {
      success: false,
      error: "Wrong Answer",
      summary: {
        total: results.length,
        passed: results.length - failed.length,
      },
      testCases: publicResults,
      hiddenTestFailed: failed.some(r => r.isHidden),
    };
  }

  // ✅ All passed
  return {
    success: true,
    summary: {
      total: results.length,
      passed: results.length,
    },
    testCases: publicResults,
  };
};

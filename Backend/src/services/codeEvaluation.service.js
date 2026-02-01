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
  const supportedLanguages = ["javascript", "python", "java", "cpp", "c++"];
  if (!supportedLanguages.includes(language.toLowerCase())) {
     return { success: false, error: "Unsupported Language" };
  }

  // 2️⃣ solve() existence / Basic validation
  // Simplified validation per language
  if (language === "javascript" && !/function\s+solve\s*\(/.test(sourceCode)) {
      return { success: false, error: "Missing solve() function" };
  } else if (language === "python" && !/def\s+solve\s*\(/.test(sourceCode)) {
      return { success: false, error: "Missing solve() function" };
  }

  // 3️⃣ Syntax validation (JS only for now, others rely on compiler)
  if (language === "javascript") {
      try {
        new Function(sourceCode);
      } catch (err) {
        return {
          success: false,
          error: "Compilation Error",
          details: err.message,
        };
      }
  }

  const results = [];

  // 4️⃣ Run all test cases
  for (let i = 0; i < problem.testCases.length; i++) {
    const testCase = problem.testCases[i];
    let wrappedCode = "";

    // Wrap code based on language
    if (language === "javascript") {
        wrappedCode = `
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
    } else if (language === "python") {
        wrappedCode = `
import sys
import json

${sourceCode}

if __name__ == "__main__":
    try:
        input_data = sys.stdin.read()
        result = solve(input_data)
        
        if isinstance(result, (dict, list)):
            print(json.dumps(result))
        else:
            print(result)
            
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
`;
    } else if (language === "java") {
        // Java requires class wrapping. Piston main file usually needs to be Main.java or similar if not specified.
        // Assuming user defines `class Solution { ... }` or at least `solve` method inside a class.
        // Flexible approach: Wrap user code in a class if it doesn't look like a full class, 
        // OR assume user is providing a method and we insert it into a runner.
        // For simplicity: We assume user provides a 'class Solution' with 'public static ... solve'
        
        // However, to make it easier for user:
        // We will inject the user code into a Main class.
        
        wrappedCode = `
import java.util.*;
import java.io.*;

public class Main {
    ${sourceCode}

    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);
            String input = "";
            while (scanner.hasNextLine()) {
                input += scanner.nextLine() + "\\n";
            }
            if (input.length() > 0 && input.charAt(input.length()-1) == '\\n') {
                input = input.substring(0, input.length()-1);
            }
            
            // Call solve. Assuming solve is static for simplicity or we instantiate.
            // If user writes 'public String solve(...)', we need an instance.
            // If user writes 'public static String solve(...)', we can call static.
            
            // To be safe, we try to support static 'solve' in the Main class.
            Object result = solve(input);
            
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
}
`;
    } else if (language === "cpp" || language === "c++") {
        wrappedCode = `
#include <iostream>
#include <string>
#include <vector>
#include <sstream>

using namespace std;

${sourceCode}

int main() {
    string input;
    string line;
    while (getline(cin, line)) {
        input += line + "\\n";
    }
    // Remove last newline if present
    if (!input.empty() && input.back() == '\\n') {
        input.pop_back();
    }

    try {
        auto result = solve(input);
        cout << result << endl;
    } catch (...) {
        return 1;
    }
    return 0;
}
`;
    }

    let response;
    try {
      response = await axios.post(
        PISTON_URL,
        {
          language: language === "cpp" ? "c++" : language,
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
    } catch (err) {
      console.log(err)
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

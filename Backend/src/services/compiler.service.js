import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";

const runCode = async ({ sourceCode, language }) => {
  if (language !== "javascript") {
    return {
      success: false,
      stdout: "",
      stderr: `Language ${language} is currently not supported for local execution.`,
      time: null,
      memory: null
    };
  }

  const tmpDir = os.tmpdir();
  const fileName = `code_${uuidv4()}.js`;
  const filePath = path.join(tmpDir, fileName);

  try {
    await fs.writeFile(filePath, sourceCode);

    return new Promise((resolve) => {
      // Execute the script with a 5 second timeout
      exec(`node ${filePath}`, { timeout: 5000 }, async (error, stdout, stderr) => {
        // Cleanup the temp file
        try {
          await fs.unlink(filePath);
        } catch (cleanupError) {
          console.error("Failed to cleanup temp file:", cleanupError);
        }

        if (error) {
          resolve({
            success: false,
            stdout: stdout || "",
            stderr: error.killed ? "Execution timed out" : stderr || error.message,
            time: null,
            memory: null
          });
        } else {
          resolve({
            success: true,
            stdout: stdout || "",
            stderr: stderr || "",
            time: null,
            memory: null
          });
        }
      });
    });
  } catch (err) {
    return {
      success: false,
      stdout: "",
      stderr: `System evaluation error: ${err.message}`,
      time: null,
      memory: null
    };
  }
};

export { runCode };

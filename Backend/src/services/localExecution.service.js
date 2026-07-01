import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root temp directory inside backend
const TEMP_ROOT = path.join(__dirname, "..", "..", "temp");

/**
 * Runs a shell command using spawn, piping stdin, and returning output.
 */
const runCommand = (command, args, stdin, timeout = 5000, cwd) => {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd });
    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeout);

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({
        error: err,
        code: null,
        stdout,
        stderr: stderr || err.message,
        timedOut,
      });
    });

    child.on("exit", (code) => {
      clearTimeout(timer);
      resolve({
        error: null,
        code,
        stdout,
        stderr,
        timedOut,
      });
    });

    if (stdin !== undefined && stdin !== null) {
      try {
        child.stdin.write(stdin);
      } catch (err) {
        // Handle case where stdin write fails because process already exited
      }
    }
    child.stdin.end();
  });
};

/**
 * Main execution function mimicking Piston API responses.
 */
export const localExecute = async ({ language, code, stdin }) => {
  const runId = Math.random().toString(36).substring(2, 15);
  const runDir = path.join(TEMP_ROOT, `run_${runId}`);

  // Create temporary directory for isolation
  await fs.mkdir(runDir, { recursive: true });

  let fileExt = "";
  let fileName = "";
  let compileCmd = null;
  let compileArgs = [];
  let executeCmd = "";
  let executeArgs = [];

  const langLower = language.toLowerCase();

  if (langLower === "javascript" || langLower === "js") {
    fileExt = "js";
    fileName = `solution.${fileExt}`;
    executeCmd = "node";
    executeArgs = [fileName];
  } else if (langLower === "python" || langLower === "py") {
    fileExt = "py";
    fileName = `solution.${fileExt}`;
    // On Windows, python is standard. Let's try python.
    executeCmd = "python";
    executeArgs = [fileName];
  } else if (langLower === "java") {
    fileExt = "java";
    // Java main class is Main
    fileName = "Main.java";
    compileCmd = "javac";
    compileArgs = [fileName];
    executeCmd = "java";
    executeArgs = ["Main"];
  } else if (langLower === "cpp" || langLower === "c++") {
    fileExt = "cpp";
    fileName = `solution.${fileExt}`;
    compileCmd = "g++";
    // Compile to solution.exe (on Windows) or solution
    compileArgs = ["-O3", fileName, "-o", "solution"];
    // Run the compiled executable
    executeCmd = process.platform === "win32" ? ".\\solution.exe" : "./solution";
    executeArgs = [];
  } else {
    // Unsupported fallback (should not reach here as language check is done before)
    await fs.rm(runDir, { recursive: true, force: true });
    return {
      data: {
        compile: null,
        run: {
          stdout: "",
          stderr: `Unsupported language: ${language}`,
          code: 1,
        },
      },
    };
  }

  const filePath = path.join(runDir, fileName);

  try {
    // Write code to execution directory
    await fs.writeFile(filePath, code, "utf8");

    // 1. Compile Phase (if needed)
    if (compileCmd) {
      const compileRes = await runCommand(compileCmd, compileArgs, null, 10000, runDir);
      
      // If compiler failed to execute (e.g. command not found)
      if (compileRes.error && compileRes.error.code === "ENOENT") {
        await fs.rm(runDir, { recursive: true, force: true });
        return {
          data: {
            compile: {
              stderr: `Compiler '${compileCmd}' not found on the server. Please ensure ${compileCmd} is installed and in the PATH.`,
            },
            run: null,
          },
        };
      }

      // If compilation had errors
      if (compileRes.code !== 0 || compileRes.stderr) {
        await fs.rm(runDir, { recursive: true, force: true });
        return {
          data: {
            compile: {
              stderr: compileRes.stderr || `Compilation failed with exit code ${compileRes.code}`,
            },
            run: null,
          },
        };
      }
    }

    // 2. Execution Phase
    const runRes = await runCommand(executeCmd, executeArgs, stdin, 5000, runDir);

    if (runRes.error && runRes.error.code === "ENOENT") {
      return {
        data: {
          compile: null,
          run: {
            stdout: "",
            stderr: `Execution command '${executeCmd}' not found on the server. Please ensure it is installed and in the PATH.`,
            code: 1,
          },
        },
      };
    }

    if (runRes.timedOut) {
      return {
        data: {
          compile: null,
          run: {
            stdout: "",
            stderr: "Time Limit Exceeded (5000ms limit reached)",
            code: 124, // standard timeout exit code
          },
        },
      };
    }

    return {
      data: {
        compile: null,
        run: {
          stdout: runRes.stdout,
          stderr: runRes.stderr,
          code: runRes.code,
        },
      },
    };
  } catch (error) {
    return {
      data: {
        compile: null,
        run: {
          stdout: "",
          stderr: `Internal Execution Error: ${error.message}`,
          code: 1,
        },
      },
    };
  } finally {
    // 3. Cleanup Phase
    try {
      await fs.rm(runDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.error(`Failed to clean up run directory: ${runDir}`, cleanupError);
    }
  }
};

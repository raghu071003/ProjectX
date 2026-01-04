import axios from "axios";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const runCode = async ({ sourceCode, language }) => {
  const response = await axios.post(
    PISTON_URL,
    {
      language,
      version: "*",
      files: [
        {
          content: sourceCode
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
  );

  const result = response.data.run;

  return {
    success: result.code === 0,
    stdout: result.stdout,
    stderr: result.stderr,
    time: result.time || null,
    memory: null
  };
};

export { runCode };

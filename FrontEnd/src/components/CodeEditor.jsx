import Editor from "@monaco-editor/react";
import Button from "./Button";
import { useState } from "react";

export default function CodeEditor({
  code,
  setCode,
  language = "javascript",
  setLanguage,
  onRun,
  loading
}) {
  const [toggleLangugage,setToggleLanguage] = useState(true);

  return (
    <div className="border rounded-lg overflow-hidden bg-[#0f172a] text-white shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#020617] border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-300">
            Code Editor
          </span>

          <span className="text-xs px-2 py-0.5 rounded bg-blue-600" onClick={()=>setToggleLanguage(true)}>
            {
            toggleLangugage ? (
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#020617] text-white text-xs border border-slate-600 rounded px-1"
              > 
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            )
            :
            language
          }
          </span>
          
        </div>

        <Button
          onClick={onRun}
          disabled={loading}
        >
          {loading ? "Running..." : "Run"}
        </Button>
      </div>

      {/* Editor */}
      <Editor
        height="420px"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={setCode}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true
        }}
      />
    </div>
  );
}

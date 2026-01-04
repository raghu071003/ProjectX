import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
  language = "javascript",
  onRun,
  loading
}) {
  return (
    <div className="border rounded-lg overflow-hidden bg-[#0f172a] text-white shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#020617] border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-300">
            Code Editor
          </span>

          <span className="text-xs px-2 py-0.5 rounded bg-blue-600">
            {language.toUpperCase()}
          </span>
        </div>

        <button
          onClick={onRun}
          disabled={loading}
          className="px-4 py-1.5 text-sm font-medium rounded bg-green-600 hover:bg-green-500 disabled:opacity-50"
        >
          {loading ? "Running..." : "Run"}
        </button>
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

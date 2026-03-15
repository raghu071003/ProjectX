import Editor from "@monaco-editor/react";
import Button from "./Button";
import { useState } from "react";
import { RefreshCcw, Users, LogOut, Play } from "lucide-react";

export default function CodeEditor({
  code,
  setCode,
  language = "javascript",
  // eslint-disable-next-line no-unused-vars
  setLanguage,
  loader,
  onRun, // This is submit
  loading,
  onTestRun, // This is run
  runLoading,
  resetCode,
  onAnalyze,
  analyzing,
  roomId,
  onJoinRoom,
  onLeaveRoom,
  roomCount = 0
}) {

  const [toggleLanguage,setToggleLanguage] = useState(true);
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [inputRoomId, setInputRoomId] = useState("");

  const handleJoin = () => {
    if (inputRoomId.trim()) {
      onJoinRoom(inputRoomId);
      setShowJoinInput(false);
      setInputRoomId("");
    }
  };

   return (
    <div className="flex flex-col h-full bg-[#0d1117] border border-gray-800 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] group/editor">

      {/* Header Container */}
      <div className="flex items-center justify-between px-6 py-5 bg-[#161b22]/80 backdrop-blur-xl border-b border-gray-800/60 sticky top-0 z-10">
        <div className="flex items-center gap-8">
          {/* Logo/Title Area */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover/editor:scale-105 transition-all duration-500">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white tracking-widest uppercase">
                Forge System
              </span>
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Real-time Lab</span>
            </div>
          </div>

          {/* Multiplayer Status */}
          <div className="flex items-center gap-4 border-l border-gray-800 pl-8">
            {roomId ? (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-2.5 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] text-green-400 font-black tracking-widest uppercase">Room: {roomId}</span>
                  <div className="h-3 w-[1px] bg-green-500/30 mx-1"></div>
                  <div className="flex items-center gap-1.5 text-[10px] text-white font-black uppercase">
                    <Users size={12} className="text-green-400" />
                    {roomCount} Nodes
                  </div>
                </div>
                <button 
                  onClick={onLeaveRoom} 
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                  title="Sever Connection"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowJoinInput(!showJoinInput)}
                  className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all border ${
                    showJoinInput 
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_10px_20px_rgba(79,70,229,0.3)]' 
                      : 'bg-gray-800/50 text-gray-400 hover:text-white border-gray-700/50 hover:bg-gray-800'
                  }`}
                >
                  <Users size={14} />
                  <span>Join Session</span>
                </button>
                
                {showJoinInput && (
                  <div className="absolute top-full left-0 mt-4 w-72 bg-[#161b22]/95 backdrop-blur-2xl border border-gray-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-5 z-[50] animate-in fade-in zoom-in-95 duration-300">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Terminal ID</label>
                        <input
                          type="text"
                          placeholder="EX: ALPHA-9"
                          value={inputRoomId}
                          onChange={(e) => setInputRoomId(e.target.value)}
                          className="w-full bg-[#0d1117] text-white text-xs px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-700 font-mono uppercase tracking-widest"
                        />
                      </div>
                      <button 
                        onClick={handleJoin}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-3 rounded-xl transition-all shadow-lg active:scale-95"
                      >
                        Establish Link
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-900/50 rounded-xl border border-gray-800 px-1 py-1 mr-2 scale-90 md:scale-100">
            {['javascript', 'python', 'java', 'cpp'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  language === lang 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {lang === 'javascript' ? 'JS' : lang === 'python' ? 'PY' : lang === 'java' ? 'JV' : lang}
              </button>
            ))}
          </div>

          <button 
            onClick={resetCode}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-all border border-transparent hover:border-gray-700"
            title="Purge Editor"
          >
            <RefreshCcw size={18} />
          </button>

          <div className="h-6 w-[1px] bg-gray-800 mx-1"></div>

          <div className="flex items-center gap-2">
             <Button 
                onClick={onAnalyze} 
                disabled={analyzing || loading}
                className="bg-purple-600 hover:bg-purple-500 text-white border-0 shadow-lg shadow-purple-500/20 h-10 px-5 rounded-xl transition-all active:scale-95 flex items-center gap-2 group/ai"
              >
                {analyzing ? (
                   <RefreshCcw className="animate-spin" size={16} />
                ) : (
                  <>
                    <svg className="w-4 h-4 transition-transform group-hover/ai:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Neural AI</span>
                  </>
                )}
             </Button>
             
             <Button
                onClick={onTestRun}
                disabled={runLoading || loading}
                className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700/50 h-10 px-5 rounded-xl transition-all active:scale-95 flex items-center gap-2 group/run"
              >
                {runLoading ? (
                  <RefreshCcw className="animate-spin" size={16} />
                ) : (
                  <>
                    <Play className="transition-transform group-hover/run:scale-110" size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Execute</span>
                  </>
                )}
             </Button>

             <Button
                onClick={onRun}
                disabled={loading || runLoading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg shadow-emerald-500/20 h-10 px-6 rounded-xl transition-all active:scale-95 flex items-center gap-2 group/submit"
              >
                {loading ? (
                  <RefreshCcw className="animate-spin" size={16} />
                ) : (
                  <>
                    <svg className="w-4 h-4 transition-transform group-submit:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Submit</span>
                  </>
                )}
             </Button>
          </div>
        </div>
      </div>

      {/* Editor Wrapper */}
      <div className="flex-1 relative bg-[#0d1117]">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={setCode}
          options={{
            fontSize: 15,
            lineHeight: 24,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 24, bottom: 24 },
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            renderLineHighlight: "all",
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              useShadows: false,
            },
            lineNumbersMinChars: 4,
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 12,
            backgroundColor: "#0d1117"
          }}
        />
      </div>

      {/* Footer System Status */}
      <div className="px-6 py-4 bg-[#161b22] border-t border-gray-800/60 flex items-center justify-between">
        <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">
          <div className="flex items-center gap-2 group-hover/editor:text-gray-400 transition-colors">
            <span>Lines:</span>
            <span className="text-gray-500 font-mono">{code?.split('\n').length || 0}</span>
          </div>
          <div className="flex items-center gap-2 group-hover/editor:text-gray-400 transition-colors">
            <span>Capacity:</span>
            <span className="text-gray-500 font-mono">{code?.length || 0} / 50k</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
          <span className="text-[9px] font-black text-emerald-500/80 uppercase tracking-widest">Core Synchronized</span>
        </div>
      </div>
    </div>
  );
}




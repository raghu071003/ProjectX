import Editor from "@monaco-editor/react";
import Button from "./Button";
import { useState } from "react";
import { RefreshCcw, Users, LogOut } from "lucide-react";

export default function CodeEditor({
  code,
  setCode,
  language = "javascript",
  // eslint-disable-next-line no-unused-vars
  setLanguage,
  loader,
  onRun,
  loading,
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
    <div className="flex flex-col h-full bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#161b22]/80 backdrop-blur-md border-b border-gray-800/60 sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-wide">
                Code Forge
              </span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Collaborative Mode</span>
            </div>
          </div>



          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setToggleLanguage(!toggleLanguage)}>
            <div 
              className="flex items-center gap-2 bg-gray-900/50 hover:bg-gray-900 border border-gray-700/50 rounded-lg px-3 py-1.5 transition-all"
            >
              {toggleLanguage ? (
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-gray-300 text-xs font-semibold cursor-pointer outline-none appearance-none pr-1"
                  onClick={(e) => e.stopPropagation()}
                > 
                  <option value="javascript">JS</option>
                  <option value="python">PY</option>
                  <option value="java">JV</option>
                  <option value="cpp">C++</option>
                </select>
              ) : (
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                  {language === 'javascript' ? 'JS' : language === 'python' ? 'PY' : language === 'java' ? 'JV' : language}
                </span>
              )}
              <div className="w-[1px] h-3 bg-gray-700 mx-1"></div>
              <RefreshCcw size={10} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
            </div>
          </div>



          {/* Multiplayer UI */}
          <div className="flex items-center gap-3 border-l border-gray-800 pl-6">
            {roomId ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all hover:bg-indigo-500/15">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[11px] text-indigo-100 font-semibold tracking-wide uppercase">ID: {roomId}</span>
                  <div className="h-4 w-[1px] bg-indigo-500/30 ml-1"></div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white font-bold ml-1">
                    <Users size={12} className="text-indigo-400" />
                    {roomCount}
                  </div>
                </div>
                <button 
                  onClick={onLeaveRoom} 
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
                  title="Leave Room"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowJoinInput(!showJoinInput)}
                  className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg ${
                    showJoinInput 
                      ? 'bg-indigo-600 text-white shadow-indigo-500/20' 
                      : 'bg-[#21262d] text-gray-300 hover:bg-[#30363d] border border-gray-700/50'
                  }`}
                >
                  <Users size={14} />
                  <span>Collaboration</span>
                </button>
                
                {showJoinInput && (
                  <div className="absolute top-full left-0 mt-3 w-64 bg-[#161b22]/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] p-4 z-[100] animate-in fade-in slide-in-from-top-2">
                    <div className="flex flex-col gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Room Identifier</label>
                        <input
                          type="text"
                          placeholder="Ex: alpha-nexus"
                          value={inputRoomId}
                          onChange={(e) => setInputRoomId(e.target.value)}
                          className="w-full bg-[#0d1117] text-white text-xs px-3 py-2.5 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-700 font-mono"
                        />
                      </div>
                      <button 
                        onClick={handleJoin}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/10 active:scale-95"
                      >
                        Secure Entry
                      </button>

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

            
        <div className="flex items-center gap-2">
          <button 
            onClick={resetCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            title="Reset Context"
          >
            <RefreshCcw size={18} />
          </button>

          <div className="h-6 w-[1px] bg-gray-800 mx-1"></div>

          <Button 
            onClick={onAnalyze} 
            disabled={analyzing || loading}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white border-0 shadow-lg shadow-purple-500/20 h-10 px-4 rounded-xl flex items-center gap-2"
          >
            {analyzing ? (
               <div className="flex items-center gap-2">
                 <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 <span className="text-xs font-bold uppercase tracking-wider">Syncing...</span>
               </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">AI Coach</span>
              </div>
            )}
          </Button>
          
          <Button
            onClick={onRun}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-500/20 h-10 px-4 rounded-xl flex items-center gap-2"
          >
            {loading ? (
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Compiling...
              </div>
            ) : (
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Execute
              </div>
            )}
          </Button>
        </div>

        
      </div>

      {/* Editor Wrapper */}
      <div className="flex-1 relative min-h-[400px]">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={setCode}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 20 },
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
          }}
        />
      </div>

      
      {/* Footer Info */}
      <div className="px-6 py-3 bg-[#161b22] border-t border-gray-800/60 flex items-center justify-between">
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Len:</span>
            <span className="text-gray-400">{code?.split('\n').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Chars:</span>
            <span className="text-gray-400">{code?.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-500/5 px-2 py-1 rounded-full border border-green-500/20">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[10px] font-bold text-green-500/80 uppercase tracking-tighter">System Ready</span>
        </div>
      </div>
    </div>

  );
};




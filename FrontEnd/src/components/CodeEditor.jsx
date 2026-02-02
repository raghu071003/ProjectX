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
  onLeaveRoom
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
    <div className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">
              Code Editor
            </span>
          </div>

          <div 
            className="cursor-pointer"
            onClick={() => setToggleLanguage(!toggleLanguage)}
          >
            {toggleLanguage ? (
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-900 text-white text-sm border border-gray-600 rounded-lg px-3 py-1.5 cursor-pointer hover:border-indigo-500/50 transition outline-none"
                onClick={(e) => e.stopPropagation()}
              > 
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            ) : (
              <span className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium">
                {language}
              </span>
            )}
          </div>

          {/* Multiplayer UI */}
          <div className="flex items-center gap-2 border-l border-gray-600 pl-4">
            {roomId ? (
              <div className="flex items-center gap-2 bg-indigo-900/50 px-3 py-1.5 rounded-lg border border-indigo-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-white font-medium">Room: {roomId}</span>
                <button onClick={onLeaveRoom} className="text-gray-400 hover:text-white ml-2">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowJoinInput(!showJoinInput)}
                  className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${showJoinInput ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  <Users size={14} />
                  Collaborate
                </button>
                
                {showJoinInput && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-2 z-50 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Enter Room ID"
                      value={inputRoomId}
                      onChange={(e) => setInputRoomId(e.target.value)}
                      className="w-full bg-gray-900 text-white text-xs px-2 py-1.5 rounded border border-gray-600 focus:border-indigo-500 outline-none"
                    />
                    <button 
                      onClick={handleJoin}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium py-1.5 rounded transition-colors"
                    >
                      Join Room
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
            
        <div className="flex items-center justify-center gap-1">
          <Button onClick={resetCode}>
            <span className="flex items-center">
              <RefreshCcw /> Reset
            </span>
          </Button>

          <Button 
            onClick={onAnalyze} 
            disabled={analyzing || loading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {analyzing ? (
               <span className="flex items-center gap-2">
                 <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Analyzing...
               </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Coach
              </span>
            )}
          </Button>
            <Button
          onClick={onRun}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running...
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Run Code
            </span>
          )}
        </Button>
        </div>
        
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
      
      {/* Footer Info */}
      <div className="px-6 py-2 bg-gray-800 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>Lines: {code?.split('\n').length}</span>
          <span>Characters: {code?.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
};




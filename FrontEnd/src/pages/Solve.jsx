import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useSearchParams } from "react-router-dom";

import { Play, Clock, BarChart2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useSocket } from "../context/SocketContext";

import { submitCode, testCode } from "../store/slices/submissionSlice";
import { fetchProblem } from "../store/slices/problemSlice";

import CodeEditor from "../components/CodeEditor";
import ExecutionResult from "../components/ExecutionResult";
import ExplanationPanel from "../components/ExplanationPanel";
import TestCasesPanel from "../components/TestCasesPanel";
import AICoachPanel from "../components/AICoachPanel";
import api from "../apis/axios";

export default function Solve() {
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();


  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [roomId, setRoomId] = useState("");

  const [analyzing, setAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [roomCount, setRoomCount] = useState(0);
  const [notification, setNotification] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsFetchingUser(true);
      try {
        const res = await api.get("/profile");
        setCurrentUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      } finally {
        setIsFetchingUser(false);
      }
    };
    fetchUser();
  }, []);



  const problem = useSelector((state) => state.problem);
  const { result, loading, runResult, runLoading } = useSelector((state) => state.submission);

  const currProblem = problem.current;
  const socket = useSocket();
  const isRemoteUpdate = useRef(false);

  const urlRoomId = searchParams.get("roomId");

  /* Socket Initialization & Event Listeners */
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleCodeUpdate = (newCode) => {
      isRemoteUpdate.current = true;
      setCode(newCode);
    };

    const handleLanguageUpdate = (newLanguage) => {
      isRemoteUpdate.current = true;
      setLanguage(newLanguage);
    };

    socket.on("code_update", handleCodeUpdate);
    socket.on("language_update", handleLanguageUpdate);

    socket.on("room_update", ({ count, code: roomCode, language: roomLang, userJoined, userLeft }) => {
      setRoomCount(count);
      if (roomCode !== undefined && roomCode !== "") {
        isRemoteUpdate.current = true;
        setCode(roomCode);
      }
      if (roomLang !== undefined) {
        isRemoteUpdate.current = true;
        setLanguage(roomLang);
      }
      
      if (userJoined) {
        setNotification(`User established link!`);
        setTimeout(() => setNotification(null), 3000);
      }
      if (userLeft) {
        setNotification(`A link was terminated.`);
        setTimeout(() => setNotification(null), 3000);
      }
    });

    socket.on("user_joined", () => {
      setNotification("Another user joined the room!");
      setTimeout(() => setNotification(null), 3000);
    });

    socket.on("join_error", (errorMessage) => {
      setNotification(errorMessage);
      setRoomId("");
      setRoomCount(0);
      setSearchParams({}); // Clear from URL if error
      setTimeout(() => setNotification(null), 5000);
    });

    return () => {
      socket.off("code_update", handleCodeUpdate);
      socket.off("language_update", handleLanguageUpdate);
      socket.off("room_update");
      socket.off("user_joined");
      socket.off("join_error");
    };
  }, [socket]);

  /* Reactive Room Joining */
  useEffect(() => {
    if (!socket || !currentUser || !problemId) return;

    if (urlRoomId) {
      setRoomId(urlRoomId);
      socket.emit("join_room", {
        roomId: urlRoomId,
        userId: currentUser._id,
        problemId: problemId
      });
      console.log(`Auto-joining room ${urlRoomId} for problem ${problemId}`);
    } else {
      setRoomId("");
      setRoomCount(0);
    }
  }, [socket, urlRoomId, currentUser, problemId]);




  const handleJoinRoom = (id) => {
    if (!socket || !currentUser) return;
    setRoomId(id);
    setSearchParams({ roomId: id });
    socket.emit("join_room", { roomId: id, userId: currentUser._id, problemId: problemId });
  };




  const handleLeaveRoom = () => {
    if (socket && roomId && currentUser) {
      socket.emit("leave_room", { roomId, userId: currentUser._id });
    }
    setRoomId("");
    setRoomCount(0);
    setSearchParams({});
  };



  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (roomId && !isRemoteUpdate.current && socket) {
      socket.emit("code_change", { roomId, code: newCode });
    }
    isRemoteUpdate.current = false;
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (roomId && !isRemoteUpdate.current && socket) {
      socket.emit("language_change", { roomId, language: newLang });
    }
    isRemoteUpdate.current = false;
  };

  /* 1️⃣ Fetch problem on mount */
  useEffect(() => {
    dispatch(fetchProblem(problemId));
  }, [dispatch, problemId]);

  /* 2️⃣ Load starter code */
  // Fixed dependency logic: only run when starterCode specifically changes to prevent overwriting user progress on other updates
  useEffect(() => {
    if (!code && currProblem?.starterCode?.[language]) {
      setCode(currProblem.starterCode[language]);
    }
  }, [currProblem?.starterCode, language]);

  /* 3️⃣ Submit solution */
  const runCode = () => {
    if (!problem || !code.trim()) return;

    dispatch(
      submitCode({
        skillKey: currProblem.skillKey,
        problemId: currProblem.problemId,
        language,
        sourceCode: code,
        mistakes: [],
      }),
    );
  };

  /* 4️⃣ Run test code */
  const handleTestCode = () => {
    if (!problem || !code.trim()) return;

    dispatch(
      testCode({
        problemId: currProblem.problemId,
        language,
        sourceCode: code,
      }),
    );
  };

  const resetCode = () => {
    const starterCode = currProblem.starterCode?.[language] || "";
    if (roomId && socket) {
      socket.emit("code_change", { roomId, code: starterCode });
    }
    setCode(starterCode);
  };


  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setAnalyzing(true);
    setAiFeedback(null);
    try {
      const response = await api.post("/ai-coach/analyze", {
        code,
        language,
        problemTitle: currProblem?.title,
      });
      setAiFeedback(response.data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setAnalyzing(false);
    }
  };
  if (!currProblem || isFetchingUser)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium animate-pulse">Setting up your workspace...</p>
        </div>
      </div>
    );


  return (
    // Main Container: Solid dark background for professional feel
    <div className="flex flex-col lg:flex-row h-screen bg-[#0d1117] overflow-hidden font-sans text-gray-300">
      
      {/* ================= LEFT PANEL: Problem Context ================= */}
      <div className="w-full lg:w-[450px] h-full flex flex-col border-r border-gray-800 bg-[#0d1117] shrink-0">
        {/* Header Section */}
        <div className="p-8 border-b border-gray-800/60 bg-[#161b22]/50 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">System Link Active</span>
          </div>
          <h1 className="text-3xl font-black text-white leading-tight mb-4 tracking-tight">
            {currProblem.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 text-[10px]">
            <span
              className={`px-3 py-1.5 rounded-lg font-black uppercase tracking-widest border ${
                currProblem.difficulty === 1
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : currProblem.difficulty === 2
                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    : "bg-red-500/10 text-red-500 border-red-500/20"
              }`}
            >
              {currProblem.difficulty === 1
                ? "Level: Alpha"
                : currProblem.difficulty === 2
                  ? "Level: Beta"
                  : "Level: Gamma"}
            </span>
            <span className="flex items-center gap-2 text-gray-400 bg-gray-800/50 border border-gray-700/50 px-3 py-1.5 rounded-lg uppercase tracking-widest font-bold">
              <Clock size={12} className="text-indigo-400" />
              {currProblem.estimatedTime}s
            </span>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
               <span className="w-4 h-[1px] bg-indigo-500/40"></span> Objective
            </h3>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed font-medium">
              <p>{currProblem?.description || "No description available"}</p>
            </div>
          </div>

          {/* Test Cases */}
          {currProblem?.testCases && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-4 h-[1px] bg-indigo-500/40"></span> Verification Gates
              </h3>
              <div className="bg-[#161b22] rounded-2xl p-2 border border-gray-800 shadow-inner">
                <TestCasesPanel testCases={currProblem.testCases} />
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-6 bg-[#161b22]/30 border-t border-gray-800 text-[10px] text-gray-600 font-bold uppercase tracking-tight text-center">
            Cross-language synchronization enabled
        </div>
      </div>

      {/* ================= RIGHT PANEL: Workspace ================= */}
      <div className="flex-1 h-full flex flex-col bg-[#0d1117] relative">
        {/* Editor Container */}
        <div className="flex-1 flex flex-col p-6 min-h-0">
          <div className="flex-1 relative flex flex-col overflow-hidden">
            <CodeEditor
              resetCode={resetCode}
              code={code}
              setCode={handleCodeChange}
              language={language}
              setLanguage={handleLanguageChange}
              onRun={runCode}
              loading={loading}
              onTestRun={handleTestCode}
              runLoading={runLoading}
              starterCode={currProblem?.starterCode}
              onAnalyze={handleAnalyze}
              analyzing={analyzing}
               roomId={roomId}
               onJoinRoom={handleJoinRoom}
               onLeaveRoom={handleLeaveRoom}
               roomCount={roomCount}
            />
            
            {/* Real-time Link Notification */}
            {notification && (
              <div className="absolute top-6 right-6 z-[100] animate-in fade-in slide-in-from-top-6 duration-500">
                <div className="bg-[#161b22]/95 backdrop-blur-2xl border border-indigo-500/30 text-white px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">System Alert</span>
                    <span className="text-sm font-bold text-gray-200">{notification}</span>
                  </div>
                  <button 
                    onClick={() => setNotification(null)}
                    className="ml-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all border border-transparent hover:border-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}

            <AICoachPanel feedback={aiFeedback} onClose={() => setAiFeedback(null)} />
          </div>
        </div>

        {/* Output / Results Panel - Floating style */}
        {(result || loading || runResult || runLoading) && (
          <div className="absolute bottom-10 left-10 right-10 z-40 max-h-[40%] flex-shrink-0 flex flex-col pointer-events-none">
            <div className="w-full bg-[#161b22]/90 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Console Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span className="ml-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Terminal Output</span>
                   </div>
                   {(result || runResult) && (
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        (result?.verdict || runResult?.verdict) === "Accepted"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}>
                         {(result?.verdict || runResult?.verdict) === "Accepted" ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                         {(result?.verdict || runResult?.verdict)}
                      </div>
                   )}
                </div>

                <div className="p-8 max-h-[300px] overflow-y-auto custom-scrollbar bg-black/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <ExecutionResult execution={(result || runResult)?.execution} />
                        {result?.updatedSkill && (
                          <div className="p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-between group transition-all hover:bg-indigo-600/20">
                            <div>
                              <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-1">Skill Progress</p>
                              <p className="text-2xl font-black text-white">{(result.updatedSkill.mastery * 100).toFixed(1)}%</p>
                            </div>
                            <BarChart2 size={32} className="text-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                     </div>
                     
                     <div className="border-l border-gray-800 pl-8">
                        {(result || runResult)?.explanation ? (
                           <div className="h-full">
                              <ExplanationPanel explanation={(result || runResult)?.explanation} />
                           </div>
                        ) : (
                           <div className="flex flex-col items-center justify-center h-48 opacity-20 text-center">
                              <Sparkles size={48} className="mb-4 text-gray-600" />
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Awaiting Neural Analysis</p>
                           </div>
                        )}
                     </div>
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

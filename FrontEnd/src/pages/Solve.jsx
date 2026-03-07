import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useSearchParams } from "react-router-dom";

import { Play, Clock, BarChart2, CheckCircle, AlertCircle } from "lucide-react"; 
import { useSocket } from "../context/SocketContext";

import { submitCode } from "../store/slices/submissionSlice";
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
  const { result, loading } = useSelector((state) => state.submission);

  const currProblem = problem.current;
  const socket = useSocket();
  const isRemoteUpdate = useRef(false);

  const urlRoomId = searchParams.get("roomId");

  /* Socket Initialization & Event Listeners */
  useEffect(() => {
    if (!socket) return;

    const handleCodeUpdate = (newCode) => {
      isRemoteUpdate.current = true;
      setCode(newCode);
    };

    socket.on("code_update", handleCodeUpdate);

    socket.on("room_update", ({ count }) => {
      setRoomCount(count);
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
    // Main Container: Full viewport height, restricted scroll on body
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden font-sans text-slate-800">
      {/* ================= LEFT PANEL: Problem Context ================= */}
      <div className="w-full lg:w-5/12 h-full flex flex-col border-r border-gray-200 bg-white">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {currProblem.title}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8">Note : If you choose a language other than javascript, the boiler plate must be written by you.</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span
              className={`px-3 py-1 rounded-full font-medium ${
                currProblem.difficulty === 1
                  ? "bg-green-100 text-green-700"
                  : currProblem.difficulty === 2
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {currProblem.difficulty === 1
                ? "Easy"
                : currProblem.difficulty === 2
                  ? "Medium"
                  : "Hard"}
            </span>
            <span className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <Clock size={14} /> Estimated Duration :{" "}
              {currProblem.estimatedTime}s
            </span>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description (If available in your data, add it here) */}
          <div className="prose prose-slate max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {/* Fallback description text if not in currProblem */}
              {currProblem.description}
            </p>
          </div>

          {/* Test Cases */}
          {currProblem?.testCases && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <CheckCircle size={18} className="text-blue-500" />
                Test Cases
              </h3>
              <div className="bg-slate-50 rounded-lg p-1 border border-gray-200">
                <TestCasesPanel testCases={currProblem.testCases} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= RIGHT PANEL: Workspace ================= */}
      <div className="w-full lg:w-7/12 h-full flex flex-col bg-gray-50">
        {/* Editor Container 
            min-h-0 is crucial here: it allows the flex item to shrink below its content size, 
            triggering the scrollbar on the child instead of expanding the page. 
        */}
        <div className="flex-1 flex flex-col p-4 pb-4 min-h-0 bg-gray-50">
          <div className="flex-1 relative flex flex-col overflow-hidden">
            <CodeEditor
              resetCode={resetCode}
              code={code}
              setCode={handleCodeChange}
              language={language}
              setLanguage={setLanguage}
              onRun={runCode}
              loading={loading}
              starterCode={currProblem?.starterCode}
              onAnalyze={handleAnalyze}
              analyzing={analyzing}
               roomId={roomId}
               onJoinRoom={handleJoinRoom}
               onLeaveRoom={handleLeaveRoom}
               roomCount={roomCount}
            />
            {notification && (
              <div className="absolute top-4 right-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="bg-gray-800/95 backdrop-blur-md border border-indigo-500/30 text-white px-5 py-3 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
                  <span className="text-sm font-medium">{notification}</span>
                  <button 
                    onClick={() => setNotification(null)}
                    className="ml-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <AlertCircle size={14} />
                  </button>
                </div>
              </div>
            )}

            <AICoachPanel feedback={aiFeedback} onClose={() => setAiFeedback(null)} />
          </div>
        </div>

        {/* Output / Results Panel */}
        <div className="h-auto max-h-[40%] flex-shrink-0 flex flex-col p-4 gap-4 overflow-y-auto">
          {(result || loading) && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Mastery Feedback */}
              {result?.updatedSkill && (
                <div className="bg-indigo-600 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-90 uppercase tracking-wider font-semibold">
                      Skill Mastery
                    </p>

                    <p className="text-lg font-bold">
                      {(result.updatedSkill.mastery * 100).toFixed(1)}%
                    </p>
                  </div>
                  <BarChart2 size={24} className="opacity-80" />
                </div>
              )}

              {/* Console Output */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Execution Result
                </div>
                {result?.verdict && (
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      result.verdict === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result.verdict === "Accepted" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    {result.verdict}
                  </div>
                )}

                <div className="p-4">
                  <ExecutionResult execution={result?.execution} />
                </div>
              </div>

              {/* Explanation */}
              {result?.explanation && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <ExplanationPanel explanation={result?.explanation} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

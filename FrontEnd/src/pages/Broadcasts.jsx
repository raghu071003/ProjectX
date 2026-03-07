import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { Radio, LogIn, Search, Send, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DropDown from "../components/DropDown";
import api from "../apis/axios";

export default function Broadcasts() {
  const socket = useSocket();
  const navigate = useNavigate();

  const [broadcasts, setBroadcasts] = useState([]);
  
  // Sender State
  const [isSending, setIsSending] = useState(false);
  const [problemName, setProblemName] = useState("");
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [problemId, setProblemId] = useState("");
  const [search, setSearch] = useState("");
  const [problems, setProblems] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const res = await api.get("/collaboration/active-broadcasts");
        setBroadcasts(res.data);
      } catch (err) {
        console.error("Failed to load initial broadcasts", err);
      }
    };
    fetchBroadcasts();

    if (!socket) return;

    // Listen for new broadcasts
    socket.on("receive_broadcast", (data) => {
      setBroadcasts((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("receive_broadcast");
    };
  }, [socket]);

  // Initial fetch/sync could be added here if backend supported persisted broadcasts
  // For now, it's real-time only as per existing logic

  useEffect(() => {
    if (!search || isSelecting) {
      if (!isSelecting) setProblems([]);
      setIsSelecting(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/problems/search/${search}`);
        setProblems(res.data);
      } catch (error) {
        console.error("Search failed", error);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search, isSelecting]);

  const handleSelectProblem = (id) => {
    const selected = problems.find(p => p.value === id);
    if (selected) {
      setIsSelecting(true);
      setProblemId(id);
      setProblemName(selected.label);
      setSearch(selected.label);
      setProblems([]);
    }
  };

  const handleSendBroadcast = () => {
    if (!problemName || !message || !roomId) return;
    
    const broadcastData = {
      problemName,
      problemId,
      message,
      roomId,
      senderId: socket.id
    };

    socket.emit("send_broadcast", broadcastData);
    setIsSending(false);
    setMessage("");
    setProblemName("");
    setRoomId("");
    setProblemId("");
    setSearch("");
  };

  const handleJoin = (targetRoomId, pId, senderId) => {
    socket.emit("request_join", { 
      targetUserId: senderId, 
      problemId: pId, 
      roomId: targetRoomId,
      requesterName: "Anonymous User" 
    });
    alert("Collaboration request sent. Awaiting owner's approval.");
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Feed */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                <Radio className="text-indigo-500 animate-pulse" size={32} />
                Live Network
              </h1>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-1 ml-1">
                Real-time Collaborative Signals
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#161b22] px-4 py-2 rounded-xl border border-gray-800">
              <Users size={16} className="text-gray-400" />
              <span className="text-xs font-black text-indigo-400">{broadcasts.length} Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {broadcasts.length === 0 ? (
              <div className="col-span-full py-20 bg-[#161b22] rounded-3xl border border-dashed border-gray-800 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <Clock size={32} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="text-gray-400 font-bold uppercase tracking-widest">Scanning frequencies...</h3>
                  <p className="text-gray-600 text-xs mt-1">No active broadcasts detected in your region.</p>
                </div>
              </div>
            ) : (
              broadcasts.map((b, idx) => (
                <div key={idx} className="bg-[#161b22] border border-gray-800 rounded-3xl p-6 hover:border-indigo-500/50 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-indigo-600/10 transition-colors"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)]"></span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Connection</span>
                      </div>
                      <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-lg uppercase">
                        ENV: {b.roomId}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors mb-2">
                      {b.problemName}
                    </h3>
                    
                    <div className="bg-[#0d1117] p-4 rounded-2xl border border-gray-800/50 mb-6 flex-grow">
                      <p className="text-gray-400 text-sm leading-relaxed italic">
                        "{b.message}"
                      </p>
                    </div>

                    <button 
                      onClick={() => handleJoin(b.roomId, b.problemId, b.senderId)}
                      className="w-full bg-gray-800 hover:bg-indigo-600 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 group-hover:shadow-lg group-hover:shadow-indigo-500/20"
                    >
                      <LogIn size={18} /> Establish Link
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Initiate Broadcast */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Send size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter">Broadcast Info</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Initiate Collaboration</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Target Problem</label>
                <DropDown
                  options={problems}
                  value={search}
                  setSearch={setSearch}
                  onSelect={handleSelectProblem}
                  placeholder="Seach Problem"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Environment ID</label>
                <input 
                  type="text" 
                  placeholder="EX: ALPHA-99" 
                  value={roomId} 
                  onChange={e => setRoomId(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl px-5 py-4 text-sm text-white focus:border-indigo-500 outline-none transition-all font-mono placeholder:text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Context Signal</label>
                <textarea 
                  placeholder="Provide context for your peers..." 
                  value={message} 
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-800 rounded-2xl px-5 py-4 text-sm text-white focus:border-indigo-500 outline-none transition-all h-32 resize-none placeholder:text-gray-700"
                />
              </div>

              <button 
                onClick={handleSendBroadcast}
                disabled={!problemName || !message || !roomId}
                className="w-full bg-indigo-600 disabled:bg-gray-800 disabled:text-gray-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 active:scale-95 mt-4"
              >
                Transmit Signal
              </button>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-indigo-600/5 rounded-3xl border border-indigo-500/10 space-y-3">
             <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
               Security Protocol
             </h4>
             <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
               Broadcasts are ephemeral and public. All connection requests must be manually approved by the transmitter to ensure environment security.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}

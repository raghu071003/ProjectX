import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { X, Radio, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import DropDown from "./DropDown";
import api from "../apis/axios";

export default function GlobalBroadcast() {
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const isBroadcastsPage = location.pathname === "/broadcasts";
  
  const [isOpen, setIsOpen] = useState(false);
  const [broadcasts, setBroadcasts] = useState([]);
  
  // Sender State
  const [isSending, setIsSending] = useState(false);
  const [problemName, setProblemName] = useState("");
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [problemId, setProblemId] = useState("");
  const [search,setSearch] = useState("");
  const [problems,setProblems] = useState([]);
  const [incomingRequest, setIncomingRequest] = useState(null);
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

    socket.on("receive_broadcast", (data) => {
      setBroadcasts((prev) => [data, ...prev]);
      setIsOpen(true); 
    });

    socket.on("receive_join_request", (request) => {
      setIncomingRequest(request);
      setIsOpen(true); 
    });

    return () => {
      socket.off("receive_broadcast");
      socket.off("receive_join_request");
    };
  }, [socket]);

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

  useEffect(() =>{
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
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [search, isSelecting]);

  const handleSelectProblem = (id) => {
    const selected = problems.find(p => p.value === id);
    if (selected) {
      setIsSelecting(true);
      setProblemId(id);
      setProblemName(selected.label);
      setSearch(selected.label);
      setProblems([]); // Immediately clear results
    }
  };


  useEffect(() => {
    if (isSending) {
      setSearch("");
      setProblems([]);
      setIsSelecting(false);
    }
  }, [isSending]);

  useEffect(() => {
    if (!socket) return;
    socket.on("navigate_to_room", ({ roomId, problemId }) => {
      navigate(`/solve/${problemId}?roomId=${roomId}`);
      setIsOpen(false);
    });

    return () => socket.off("navigate_to_room");
  }, [socket, navigate]);

  const handleJoin = (targetRoomId, problemId, senderId) => {
    socket.emit("request_join", { 
      targetUserId: senderId, 
      problemId, 
      roomId: targetRoomId,
      requesterName: "A User" 
    });
    alert("Request sent to the room owner. Please wait for acceptance.");
  };

  const handleAcceptRequest = () => {
    if (!incomingRequest) return;
    socket.emit("confirm_join", { 
      requesterId: incomingRequest.requesterId, 
      roomId: incomingRequest.roomId, 
      problemId: incomingRequest.problemId 
    });
    setIncomingRequest(null);
  };

  const handleRejectRequest = () => {
    setIncomingRequest(null);
  };

  const renderNotification = () => {
    if (!incomingRequest) return null;
    return (
      <div className="absolute top-0 left-0 right-0 z-[60] animate-in slide-in-from-top duration-300">
        <div className="bg-indigo-600 p-5 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-lg">
                 <Radio className="text-white animate-pulse" size={20} />
               </div>
               <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">Incoming Request</h4>
                  <p className="text-[10px] text-indigo-100 font-medium opacity-80 uppercase tracking-tighter">New Collaboration Connection</p>
               </div>
             </div>
             <button onClick={handleRejectRequest} className="text-white/60 hover:text-white transition-colors p-1"><X size={18}/></button>
          </div>
          <p className="text-xs text-indigo-50 mb-5 leading-relaxed">
            A fellow engineer wants to join your environment for <span className="font-black bg-white/10 px-1.5 py-0.5 rounded text-white">{incomingRequest.problemId}</span>.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={handleAcceptRequest}
              className="flex-1 bg-white text-indigo-600 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition shadow-lg active:scale-95"
            >
              Establish Connection
            </button>
            <button 
               onClick={handleRejectRequest}
               className="bg-indigo-500/50 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition active:scale-95"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isOpen && !isBroadcastsPage && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:bg-indigo-700 hover:scale-110 transition-all duration-300 z-50 group"
        >
          <Radio size={24} />
          {broadcasts.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2 border-2 border-gray-900 group-hover:scale-110 transition-transform">
              {broadcasts.length}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-gray-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col relative">
            
            <div className="bg-[#161b22] px-6 py-5 flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center border border-indigo-500/30">
                  <Radio size={18} className="text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-white font-black text-sm uppercase tracking-widest">Global Broadcasts</h2>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Real-time Collaboration Network</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all"
              >
                <X size={18} />
              </button>
            </div>
            
            {renderNotification()}

            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-6">
               <div className="flex justify-end">
                  <button 
                    onClick={() => setIsSending(!isSending)}
                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${
                      isSending 
                        ? 'bg-gray-800 text-gray-400 border-gray-700 hover:text-white' 
                        : 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-600/20'
                    }`}
                  >
                    {isSending ? "← Back to Feed" : "+ New Request"}
                  </button>
               </div>

               {isSending ? (
                  <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                     <div className="space-y-4 bg-[#161b22] p-5 rounded-2xl border border-gray-800 shadow-inner">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase ml-1">Select Target Problem</label>
                          <DropDown
                             options={problems}
                             value={search}
                             setSearch={setSearch}
                             onSelect={handleSelectProblem}
                             placeholder="Search Problem Name"
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase ml-1">Environment ID</label>
                          <input 
                             type="text" 
                             placeholder="Ex: alpha-456" 
                             value={roomId} 
                             onChange={e => setRoomId(e.target.value)}
                             className="w-full bg-[#0d1117] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-mono placeholder:text-gray-700 shadow-inner"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase ml-1">Context / Message</label>
                          <textarea 
                             placeholder="E.g., Need help optimizing the space complexity!" 
                             value={message} 
                             onChange={e => setMessage(e.target.value)}
                             className="w-full bg-[#0d1117] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all h-24 resize-none placeholder:text-gray-700 shadow-inner"
                          />
                        </div>
                     </div>

                     <button 
                        onClick={handleSendBroadcast}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                     >
                        Initiate Broadcast
                     </button>
                  </div>
               ) : (
                  <div className="space-y-4 animate-in slide-in-from-left-4 duration-300">
                     {broadcasts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-[#161b22]/50 rounded-2xl border border-dashed border-gray-800">
                          <Radio className="text-gray-700" size={40} />
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Awaiting active signals...</p>
                        </div>
                     ) : (
                        broadcasts.map((b, idx) => (
                           <div key={idx} className="bg-[#161b22] border border-gray-800 rounded-2xl p-5 shadow-sm hover:border-gray-700 transition-all group">
                              <div className="flex justify-between items-start mb-4">
                                 <div>
                                   <div className="flex items-center gap-2 mb-1">
                                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Live Broadcast</span>
                                   </div>
                                   <h4 className="font-black text-white text-base tracking-tight">{b.problemName}</h4>
                                 </div>
                                 <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-full uppercase tracking-widest">ID: {b.roomId}</span>
                              </div>
                              <p className="text-gray-400 text-xs mb-5 leading-relaxed bg-[#0d1117]/50 p-3 rounded-xl border border-gray-800/50 italic">"{b.message}"</p>
                              <button 
                                 onClick={() => handleJoin(b.roomId,b.problemId, b.senderId)}
                                 className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] group-hover:bg-indigo-600 group-hover:shadow-indigo-500/20"
                              >
                                 <LogIn size={16} /> Connect Environment
                              </button>
                           </div>
                        ))
                     )}
                  </div>
               )}
            </div>
            
            <div className="px-6 py-4 bg-[#161b22] border-t border-gray-800 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{broadcasts.length} Active Nodes</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-gray-800 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

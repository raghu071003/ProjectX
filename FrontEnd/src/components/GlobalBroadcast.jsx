import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { X, Radio, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import api from "../apis/axios";

export default function GlobalBroadcast() {
  const socket = useSocket();
  const navigate = useNavigate();
  
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

  useEffect(() => {
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
  };

  useEffect(() =>{
    if (!search) {
      setProblems([]);
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
  }, [search]);

  const handleSelectProblem = (id) => {
    setProblemId(id);
    const selected = problems.find(p => p.value === id);
    if (selected) {
      setProblemName(selected.label);
      setSearch(selected.label);
      setProblems([]);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("navigate_to_room", ({ roomId, problemId }) => {
      navigate(`/solve/${problemId}`, { state: { roomId } });
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
      <div className="absolute top-0 left-0 right-0 bg-indigo-900 text-white p-4 z-50 animate-in fade-in slide-in-from-top-2">
        <div className="flex justify-between items-center mb-2">
           <h4 className="font-bold flex items-center gap-2">
             <Radio className="text-green-400" size={16} /> Incoming Request
           </h4>
           <button onClick={handleRejectRequest}><X size={16}/></button>
        </div>
        <p className="text-sm mb-3">Someone wants to join your room for <strong>{incomingRequest.problemId}</strong> UI.</p>
        <div className="flex gap-2">
          <button 
            onClick={handleAcceptRequest}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm font-medium transition"
          >
            Accept
          </button>
          <button 
             onClick={handleRejectRequest}
             className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded text-sm font-medium transition"
          >
            Reject
          </button>
        </div>
      </div>
    );
  };

  if (!isOpen && broadcasts.length === 0) return (
     <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition z-50"
     >
        <Radio size={24} />
     </button>
  );

  return (
    <>
      {/* trigger button if closed but exists */}
      {!isOpen && (
         <button 
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition z-50 flex items-center gap-2"
         >
            <Radio size={20} />
            <span className="bg-red-500 text-xs rounded-full px-2 py-0.5 absolute -top-2 -right-2 transform scale-90">{broadcasts.length}</span>
         </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-indigo-600 p-4 flex justify-between items-center relative">
              <h2 className="text-white font-bold flex items-center gap-2">
                <Radio size={20} /> Global Broadcasts
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            {/* Notification Area */}
            {renderNotification()}

            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
               {/* Toggle Send Mode */}
               <div className="flex justify-end">
                  <button 
                    onClick={() => setIsSending(!isSending)}
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    {isSending ? "View Broadcasts" : "Send New Broadcast"}
                  </button>
               </div>

               {isSending ? (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                     <h3 className="font-semibold text-gray-700">Create Request</h3>
                     
                     <DropDown
                        options={problems}
                        value={search}
                        setSearch={setSearch}
                        onSelect={handleSelectProblem}
                        placeholder="Search Problem Name"
                     />
                     
                     <input 
                        type="text" 
                        placeholder="Room ID (Copy from Code Editor)" 
                        value={roomId} 
                        onChange={e => setRoomId(e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                     />
                     <textarea 
                        placeholder="Custom Message (e.g., Need help with DP approach!)" 
                        value={message} 
                        onChange={e => setMessage(e.target.value)}
                        className="w-full border rounded p-2 text-sm h-20"
                     />
                     <button 
                        onClick={handleSendBroadcast}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700"
                     >
                        Broadcast Request
                     </button>
                  </div>
               ) : (
                  <div className="space-y-3">
                     {broadcasts.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No active broadcasts yet.</p>
                     ) : (
                        broadcasts.map((b, idx) => (
                           <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition">
                              <div className="flex justify-between items-start mb-2">
                                 <h4 className="font-bold text-gray-800">{b.problemName}</h4>
                                 <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Room: {b.roomId}</span>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{b.message}</p>
                              <button 
                                 onClick={() => handleJoin(b.roomId,b.problemId, b.senderId)}
                                 className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-1.5 rounded text-sm hover:bg-slate-800"
                              >
                                 <LogIn size={14} /> Join
                              </button>
                           </div>
                        ))
                     )}
                  </div>
               )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

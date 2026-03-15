import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Users, Layout, Zap, Activity } from 'lucide-react';

export default function LiveStats() {
    const socket = useSocket();
    const [stats, setStats] = useState({
        activeUsers: 0,
        activeRooms: 0,
        totalSolves: 1240 // Placeholder or fetch initial
    });

    useEffect(() => {
        if (!socket) return;

        socket.on('global_stats_update', (data) => {
            setStats(prev => ({
                ...prev,
                activeUsers: data.activeUsers,
                activeRooms: data.activeRooms
            }));
        });

        return () => socket.off('global_stats_update');
    }, [socket]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 flex items-center justify-between group hover:border-indigo-500/30 transition-all duration-300">
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Active Now</p>
                    <h3 className="text-3xl font-black text-white">{stats.activeUsers}</h3>
                </div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:scale-110 transition-all">
                    <Users size={24} className="text-indigo-400 group-hover:text-white" />
                </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 flex items-center justify-between group hover:border-purple-500/30 transition-all duration-300">
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Live Rooms</p>
                    <h3 className="text-3xl font-black text-white">{stats.activeRooms}</h3>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500 group-hover:scale-110 transition-all">
                    <Layout size={24} className="text-purple-400 group-hover:text-white" />
                </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 flex items-center justify-between group hover:border-emerald-500/30 transition-all duration-300">
                <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Solves</p>
                    <h3 className="text-3xl font-black text-white">{stats.totalSolves}+</h3>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:scale-110 transition-all">
                    <Activity size={24} className="text-emerald-400 group-hover:text-white" />
                </div>
            </div>
        </div>
    );
}

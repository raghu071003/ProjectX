import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const isProduction = typeof window !== "undefined" && (window.location.hostname.includes("skill-forge-dsa") || !window.location.hostname.includes("localhost"));
        const url = isProduction ? "https://projectx-o5ae.onrender.com" : "http://localhost:5003";
        console.log("Using Socket URL:", url);
        const newSocket = io(url); // Initialize once
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

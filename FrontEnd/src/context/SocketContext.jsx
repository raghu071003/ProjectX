import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef(null);

    if (!socket.current) {
        socket.current = io("http://localhost:5000"); // Initialize once
    }

    useEffect(() => {
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};

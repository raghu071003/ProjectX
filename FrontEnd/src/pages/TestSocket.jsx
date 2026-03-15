import React from 'react'
import { io } from "socket.io-client";

const url = import.meta.env.VITE_ENV === "production" ? "https://projectx-o5ae.onrender.com" : "http://localhost:5003";
const socket = io(url);

const TestSocket = () => {
  return (
    <div>
      <h1>Test Socket</h1>
      <button onClick={() => { socket.emit("test", "hello from client"); }}>Send</button>
    </div>
  )
}

export default TestSocket
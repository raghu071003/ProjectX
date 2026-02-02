import React from 'react'
import {io} from "socket.io-client";

const socket = io("http://localhost:5000");

const TestSocket = () => {
  return (
    <div>
        <h1>Test Socket</h1>
        <button onClick={()=>{socket.emit("test", "hello from client");}}>Send</button>
    </div>
  )
}

export default TestSocket
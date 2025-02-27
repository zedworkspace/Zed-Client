'use client'
import React, {  useEffect, useState } from 'react'
import {io} from 'socket.io-client'

const socket = io("http://localhost:5000");

type Message = {
  senderId:string,
  message:string
}

 function Message() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem('userId')
  const channelId = '1111222'

  useEffect(() => {
    // Join the channel
    socket.emit("joinChannel", { channelId, userId });

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [channelId, userId]);

  // Send a message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { channelId, senderId: userId, message });
      setMessage("");
    }
  };
  return (
    <div>
    <h2>Group Chat</h2>
    <div>
      {messages.map((msg:Message, index) => (
        <p key={index}>
          <strong>{msg.senderId}:</strong> {msg.message}
        </p>
      ))}
    </div>
    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='text-black'/>
    <button onClick={sendMessage}>Send</button>
  </div>
  )
}

export default Message

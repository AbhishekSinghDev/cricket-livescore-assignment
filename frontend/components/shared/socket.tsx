"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSocket } from "@/hooks/use-socket";
import SocketEvents from "@/lib/socket-events";

const SocketComponent = () => {
  const socket = useSocket();
  const [msg, setMsg] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  // Message sending handler
  const handleSubmit = () => {
    if (socket) {
      socket.emit(SocketEvents.message, msg);
      setMsg("");
    }
  };

  // Listen for messages
  useEffect(() => {
    if (!socket) return;

    socket.on(SocketEvents.received_message, (data) => {
      console.log("Received message from server:", data);
      setReceivedMessages((prev) => [...prev, data]);
    });

    socket.on(SocketEvents.welcome, (data) => {
      console.log("Welcome message:", data);
    });

    // Cleanup listeners
    return () => {
      socket.off(SocketEvents.connect_error);
      socket.off(SocketEvents.welcome);
    };
  }, [socket]);

  return (
    <div className="max-w-7xl mx-auto px-10 space-y-6">
      <h1>Socket.IO Chat</h1>

      {/* Connection Status */}
      <div>
        Connection Status:
        <span
          style={{
            color: socket?.connected ? "green" : "red",
            marginLeft: "10px",
          }}
        >
          {socket?.connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Message Input */}
      <div className="flex space-x-2">
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message"
        />
        <Button onClick={handleSubmit} disabled={!socket?.connected}>
          Send
        </Button>
      </div>

      {/* Received Messages */}
      <div>
        <h2>Received Messages:</h2>
        {receivedMessages.map((message, index) => (
          <div key={index} className="bg-gray-100 p-2 my-1">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocketComponent;

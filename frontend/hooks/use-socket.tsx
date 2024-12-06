"use client";

import SocketEvents from "@/lib/socket-events";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    const socketIo = io("http://localhost:8080", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(socketIo);

    socketIo.on(SocketEvents.connect, () => {
      console.log("Socket connected successfully", socketIo.id);
    });

    socketIo.on(SocketEvents.connect_error, (error) => {
      console.error("Socket connection error:", error);
    });

    // Cleanup on component unmount
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};

"use client";

import SocketEvents from "@/lib/socket-events";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    const socketIo = io(url, {
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
  }, [url]);

  return socket;
};

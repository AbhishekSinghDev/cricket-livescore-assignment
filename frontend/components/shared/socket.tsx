import React from "react";
import { io } from "socket.io-client";

const Socket = () => {
  const socket = io("http://localhost:8080");

  return <div>Socket</div>;
};

export default Socket;

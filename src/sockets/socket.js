
import { io } from "socket.io-client";

let socket;
const SOCKET_SERVER_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

// Reuse one authenticated Socket.IO connection across the app.
export const connectSocket = (token) => {
  if (socket) {
    return socket;
  }

  socket = io(SOCKET_SERVER_URL, {
    extraHeaders: {
      "x-api-key": token,
    },
  });

  socket.on("connect", () => {
    console.info("Socket.IO connected.", {
      socketId: socket.id,
      serverUrl: SOCKET_SERVER_URL,
    });
  });
  socket.on("disconnect", (reason) => {
    console.warn("Socket.IO disconnected.", { reason });
  });
  socket.on("connect_error", (error) => {
    console.error("Socket.IO connection error.", error);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

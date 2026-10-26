
import { io } from "socket.io-client";

let socket;
let socketToken;
let customerSocket;
const SOCKET_SERVER_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

// Reuse one authenticated Socket.IO connection across the app.
export const connectSocket = (token) => {
  if (socket && socketToken === token) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socketToken = token;
  socket = io(SOCKET_SERVER_URL, {
    auth: { token },
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

export const connectCustomerSocket = (token) => {
  if (
    customerSocket?.connected &&
    customerSocket.auth?.token === token
  ) {
    return customerSocket;
  }

  if (customerSocket) customerSocket.disconnect();

  customerSocket = io(SOCKET_SERVER_URL, {
    auth: { token },
    extraHeaders: { "x-api-key": token },
  });

  customerSocket.on("connect_error", (error) => {
    console.error("Customer chat socket connection error.", error);
  });

  return customerSocket;
};

export const disconnectCustomerSocket = (socketToDisconnect) => {
  if (!customerSocket) return;
  if (socketToDisconnect && socketToDisconnect !== customerSocket) return;

  customerSocket.disconnect();
  customerSocket = null;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  socketToken = null;
};

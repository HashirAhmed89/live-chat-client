import { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../sockets/socket";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Page load par sessionStorage se purana login uthao
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      // Restore the shared socket when an authenticated session survives a reload.
      connectSocket(token);
    } else {
      disconnectSocket();
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
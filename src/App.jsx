import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import MainLayout from "./layouts/mainlayout";

import Dashboard from "./pages/dashboard.jsx";
import Agent from "./pages/agent";
import Customer from "./pages/customer";
import Conversation from "./pages/conversation";
import Ticket from "./pages/ticket";
import Analytics from "./pages/analytics";

import { AuthProvider } from "./auth/auth_Context.jsx";
import ProtectedRoutes from "./auth/protected_Routes.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Pages */}
          <Route element={<ProtectedRoutes />}>

            <Route element={<MainLayout />}>
            
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/agent" element={<Agent />} />

              <Route path="/customer" element={<Customer />} />

              <Route path="/conversation" element={<Conversation />} />

              <Route path="/ticket" element={<Ticket />} />

              <Route path="/analytics" element={<Analytics />} />

            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

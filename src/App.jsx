import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import MainLayout from "./layouts/mainlayout";
import Dashboard from "./pages/dashboard.jsx";
import Agent from "./pages/agent";
import Customer from "./pages/customer";
import Conversation from "./pages/conversation";
import Ticket from "./pages/ticket";
import Analytics from "./pages/analytics";
import ProtectedRoutes from "./auth/protected_Routes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          {/* Dashboard +  Pages */}
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
    </BrowserRouter>
  );
}

export default App;

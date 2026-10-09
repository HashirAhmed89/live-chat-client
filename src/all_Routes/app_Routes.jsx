import { Routes, Route } from "react-router-dom";

import Login from "../auth/login";
import MainLayout from "../layouts/mainlayout";

import Dashboard from "../pages/dashboard";
import Agent from "../pages/agent";
import Customer from "../pages/customer";
import Conversation from "../pages/conversation";
import Ticket from "../pages/ticket";
import Analytics from "../pages/analytics";

// Public routes
const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
];

// Protected page routes
const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/agent", element: <Agent /> },
  { path: "/customer", element: <Customer /> },
  { path: "/conversation", element: <Conversation /> },
  { path: "/ticket", element: <Ticket /> },
  { path: "/analytics", element: <Analytics /> },
];

const App_Routes = () => {
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}

      {/* Dashboard layout and its pages */}
      <Route element={<MainLayout />}>
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App_Routes;
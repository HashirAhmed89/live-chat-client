import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authcontext";

const ProtectedRoutes = () => {
  const { user , token } = useAuth();

  if (!user|| !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
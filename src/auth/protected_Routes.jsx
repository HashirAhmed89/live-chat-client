import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/auth_Context";

const ProtectedRoutes = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
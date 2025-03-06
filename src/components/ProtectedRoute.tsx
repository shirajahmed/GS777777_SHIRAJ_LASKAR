import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check localStorage for login state
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

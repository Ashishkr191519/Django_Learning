import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );

  if (!authChecked) {
    return <p>Checking authentication...</p>;
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;
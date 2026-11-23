
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import AuthLoader from "../components/AuthLoader";

const ProtectedRoute = () => {
  const { isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );

  // Authentication check hone tak modern spinner
  if (!authChecked) {
    return <AuthLoader />;
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;

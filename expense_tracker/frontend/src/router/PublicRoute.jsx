
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import AuthLoader from "../components/AuthLoader";

const PublicRoute = () => {
  const { isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );

  // Authentication verify hone tak spinner
  if (!authChecked) {
    return <AuthLoader />;
  }

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Outlet />;
};

export default PublicRoute;

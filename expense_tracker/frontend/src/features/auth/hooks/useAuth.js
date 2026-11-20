
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../api/authApi";
import { setUser, setLoading, setError } from "../state/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated, user } = useSelector((store) => store.auth);

  // Login function
  const login = async (userData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await loginUser(userData);

      dispatch(setUser({
        username: data.username
      }));

      return true;

    } catch (err) {
      dispatch(
        setError(err.response?.data?.error || "Login failed")
      );
      return false;

    } finally {
      dispatch(setLoading(false));
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      await registerUser(userData);
      return true;

    } catch (err) {
      dispatch(
        setError(
          JSON.stringify(err.response?.data || "Registration failed")
        )
      );
      return false;

    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    login,
    register,
    loading,
    error,
    user,
    isAuthenticated
  };
};

export default useAuth;

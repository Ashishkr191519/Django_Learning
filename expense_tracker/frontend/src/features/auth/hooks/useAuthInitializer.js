import { useEffect } from "react";
import { useDispatch } from "react-redux";


import { setUser, clearUser } from "../state/authSlice";
import { getCurrentUser } from "../../../api/api";


const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();

        dispatch(setUser(user));
      } catch (error) {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [dispatch]);
};

export default useAuthInitializer;
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, getCurrentUser } from "../services/userServices/authServices";
import { clearUser, setUser } from "../features/user/authSlice";

export function useAuth() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const login = async (credentials) => {
    const sessionUser = await loginUser(credentials)
    dispatch(setUser(sessionUser))
    return sessionUser
  }

  const logout = () => {
    logoutUser()
    dispatch(clearUser()) 
  }

  const restoreSession = () => {
    const session = getCurrentUser();

    if (session) {
      dispatch(setUser(session));
      return session;
    }

    dispatch(clearUser());
    return null;
  };

  return { user, isAuthenticated, login, logout, restoreSession}
}
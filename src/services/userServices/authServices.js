import { USERS } from "../../data/usersAPI";
import {
  clearSession,
  getSession,
  getUsers,
  setSession,
  setUsers,
} from "../utilityServices/localStorageService";

const simulateDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const loginUser = async ({ email, password }) => {
  if (!email?.trim() || !password?.trim()) {
    throw new Error("Email and password are required");
  }

  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  if (!isValidEmail) {
    throw new Error("Please enter a valid email");
  }

  await simulateDelay();

  let users = getUsers();

  if (!users || users.length === 0) {
    users = USERS;
    setUsers(users);
  }

  const user = users.find(
    (item) =>
      item.email === email &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAuthenticated: true,
    loginAt: new Date().toISOString(),
  };

  setSession(sessionUser);

  return sessionUser;
};

const logoutUser = () => {
  clearSession();
};

export const getCurrentUser = () => {
  return getSession();
};

export { loginUser, logoutUser };
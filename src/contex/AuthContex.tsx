import React from "react";
import type { Register, User, Login } from "../types/types";
import axios from "axios";
import { API_URL } from "../config/config";

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  login: (credentials: Login) => Promise<void>;
  logout: () => void;
  register: (user: Register) => Promise<User>;
  fetchCurrentUser: () => Promise<User | null>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  // Login: get token from backend and fetch current user
  const login = async (credentials: Login) => {
    const response = await axios.post<{ token: string }>(
      `${API_URL}/auth/login`,
      credentials
    );
    const token = response.data.token;
    setToken(token);
    localStorage.setItem("token", token);

    // Fetch current user after login
    await fetchCurrentUser();
  };

  // Fetch current user from /auth/me using stored token
  const fetchCurrentUser = async (): Promise<User | null> => {
    if (!token) return null;

    try {
      const response = await axios.get<User>(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Failed to fetch current user", error);
      setCurrentUser(null);
      return null;
    }
  };

  // Logout: clear token and user
  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Register function
  const register = async (newUser: Register): Promise<User> => {
    const response = await axios.post<User>(`${API_URL}/auth/register`, newUser);
    return response.data;
  };

  // Load token and currentUser from localStorage on mount
  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(); // fetch user from backend
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, token, login, logout, register, fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

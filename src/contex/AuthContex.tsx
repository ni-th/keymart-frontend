import React from "react";
import type { Register, User } from "../types/types";
import axios from "axios";
import { API_URL } from "../config/config";

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  register: (user: Register) => Promise<User>;
}

// Create context
const AuthContext = React.createContext<AuthContextType | null>(null);

// Provider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  // Login function: store user in state and localStorage
  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Logout function: remove user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Register function: POST request to backend, return the created user
  const register = async (newUser: Register): Promise<User> => {
  const response = await axios.post<User>(`${API_URL}/auth/register`, newUser);
  return response.data;
};

  // Load user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

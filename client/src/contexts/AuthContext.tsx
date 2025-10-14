import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredAuth() {
  try {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
  } catch (error) {
    console.error("Failed to parse stored auth:", error);
    localStorage.removeItem("auth");
  }
  return { isAuthenticated: false, username: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => getStoredAuth().isAuthenticated);
  const [username, setUsername] = useState<string | null>(() => getStoredAuth().username);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, username }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

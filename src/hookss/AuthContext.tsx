import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (isLoggedIn && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.get(
        "https://dummydata-9wt5.onrender.com/users"
      );
      const users = response.data;

      const foundUser = users.find(
        (u: User & { password: string }) =>
          u.email === email && u.password === password
      );

      if (foundUser) {
        const userData = { name: foundUser.name, email: foundUser.email };
        setUser(userData);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data
      } else {
        throw new Error("Invalid credentials");
      }
    } catch {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://dummydata-9wt5.onrender.com/users",
        {
          ID: Math.floor(Math.random() * 1000),
          name,
          email,
          password,
        }
      );

      if (response.status === 201) {
        const userData = { name, email };
        setUser(userData);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Registration failed");
      }
    } catch {
      throw new Error("Registration failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

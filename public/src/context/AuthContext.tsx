"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
  group: string;
  role: "STUDENT" | "ADMIN";
};

type AuthContextType = {
  user: User | null;
  login: (name: string, password: string) => void;
  register: (user: User, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (name: string, password: string) => {
    const storedUser = localStorage.getItem("registered_user");
    if (!storedUser) {
      alert("Користувач не зареєстрований");
      return;
    }

    const parsed = JSON.parse(storedUser);

    if (parsed.name === name && parsed.password === password) {
      const u = {
        name: parsed.name,
        group: parsed.group,
        role: parsed.role,
      };
      localStorage.setItem("user", JSON.stringify(u));
      setUser(u);
    } else {
      alert("Неправильний логін або пароль");
    }
  };

  const register = (user: User, password: string) => {
    const payload = {
      ...user,
      password,
    };

    localStorage.setItem("registered_user", JSON.stringify(payload));
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

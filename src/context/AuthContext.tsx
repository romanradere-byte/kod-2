"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  User,
  LoginData,
  RegisterData,
} from "@/services/auth.service";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setLoading(false);
  }, []);

  async function login(data: LoginData) {
    const u = await loginUser(data);
    setUser(u);
    router.replace("/");
  }

  async function register(data: RegisterData) {
    const u = await registerUser(data);
    setUser(u);
    router.replace("/");
  }

  function logout() {
    logoutUser();
    setUser(null);
    router.replace("/auth/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

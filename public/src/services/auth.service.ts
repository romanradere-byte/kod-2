import api from "@/lib/axios";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: "STUDENT" | "ADMIN" | "LIBRARIAN";
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me");
  return data;
};

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await api.post("/auth/signin", payload);
  return data;
};

export const register = async (payload: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/signup", payload);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

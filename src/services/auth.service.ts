import axios from "axios";



export const api = axios.create({
  baseURL: "https://api.collage-library.app",
  headers: {
    "Content-Type": "application/json",
  },
});


export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};



const TOKEN_KEY = "elib_token";
const USER_KEY = "elib_user";



function saveSession(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}



export async function loginUser(data: LoginData): Promise<User> {
  const res = await api.post("/auth/login", data);

  const { user, accessToken } = res.data;

  console.log("LOGIN TOKEN:", accessToken);

  const fixedUser: User = {
    ...user,
    role: user.role || "USER",
  };

  saveSession(accessToken, fixedUser);
  return fixedUser;
}

export async function registerUser(data: RegisterData): Promise<User> {
  const res = await api.post("/auth/register", data);

  const { user, accessToken } = res.data;

  const fixedUser: User = {
    ...user,
    role: user.role || "USER",
  };

  saveSession(accessToken, fixedUser);
  return fixedUser;
}



api.interceptors.request.use((config) => {
  const token = getToken();

  console.log("INTERCEPTOR TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

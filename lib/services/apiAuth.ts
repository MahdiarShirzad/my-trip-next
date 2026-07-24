import { apiRequest } from "../utils/apiClient";
import { setAccessToken, clearAccessToken } from "../utils/token";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  status: string;
  accessToken?: string;
  data: {
    user: User;
  };
}

export async function login(data: LoginPayload) {
  const res = await apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: data,
  });
  if (res?.accessToken) setAccessToken(res.accessToken);
  return res;
}

export async function signup(data: RegisterPayload) {
  const res = await apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: data,
  });
  if (res?.accessToken) setAccessToken(res.accessToken);
  return res;
}

export async function logout() {
  const res = await apiRequest("/auth/logout", { method: "POST" });
  clearAccessToken();
  return res;
}

export async function getMe() {
  return apiRequest<User>("/auth/me");
}

export async function refreshToken() {
  return apiRequest<AuthResponse>("/auth/refresh", { method: "POST" });
}

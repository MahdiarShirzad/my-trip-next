import { apiRequest } from "../utils/apiClient";
import { setAccessToken, clearAccessToken } from "../utils/token";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  passwordConfirm: string;
  name?: string;
  phone?: string;
  nationalId?: string;
}

export interface AuthResponse {
  status: string;
  accessToken?: string;
  data: {
    user: User;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  nationalId?: string;
  role: "user" | "admin";
}

export interface MeResponse {
  status: string;
  data: {
    user: User;
  };
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  address?: string;
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
  const res = await apiRequest<AuthResponse>("/auth/signup", {
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
  const res = await apiRequest<MeResponse>("/auth/me");
  return res?.data?.user ?? null;
}

export async function refreshToken() {
  return apiRequest<AuthResponse>("/auth/refresh", { method: "POST" });
}

export async function setNationalId(nationalId: string) {
  return apiRequest<{ status: string; data: { user: User } }>(
    "/auth/national-id",
    {
      method: "PATCH",
      body: { nationalId },
    },
  );
}

export async function updateProfile(data: UpdateProfilePayload) {
  return apiRequest<{ status: string; data: { user: User } }>(
    "/auth/update-me",
    {
      method: "PATCH",
      body: data,
    },
  );
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function updatePassword(data: UpdatePasswordPayload) {
  const res = await apiRequest<{ status: string; accessToken?: string }>(
    "/auth/update-password",
    {
      method: "PATCH",
      body: data,
    },
  );
  if (res?.accessToken) setAccessToken(res.accessToken);
  return res;
}

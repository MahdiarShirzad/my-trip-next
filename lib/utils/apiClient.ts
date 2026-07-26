import { getAccessToken, setAccessToken, clearAccessToken } from "./token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL && typeof window === "undefined") {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Add it in Vercel Project Settings → Environment Variables.",
  );
}

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  method?: string;
  body?: unknown;
  isFormData?: boolean;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessTokenOnce(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) return null;

      const data = await res.json();
      setAccessToken(data.accessToken);
      return data.accessToken as string;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiRequest<T = unknown>(
  path: string,
  { method = "GET", body, isFormData = false, ...rest }: ApiRequestOptions = {},
): Promise<T | null> {
  const headers: Record<string, string> = {};

  if (!isFormData) headers["Content-Type"] = "application/json";

  const token = getAccessToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let finalBody: BodyInit | undefined;
  if (isFormData) {
    finalBody = body as BodyInit;
  } else if (body) {
    finalBody = typeof body === "string" ? body : JSON.stringify(body);
  }

  let res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: finalBody,
    credentials: "include",
    ...rest,
  });

  if (res.status === 401 && path !== "/auth/refresh") {
    const newToken = await refreshAccessTokenOnce();

    if (newToken) {
      res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: { ...headers, Authorization: `Bearer ${newToken}` },
        body: finalBody,
        credentials: "include",
        ...rest,
      });
    } else {
      clearAccessToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new ApiError("Session expired", 401, null);
    }
  }

  if (res.status === 204) return null;

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const errorMsg =
      (data as { message?: string })?.message || `Server error: ${res.status}`;
    throw new ApiError(errorMsg, res.status, data);
  }

  return data as T;
}

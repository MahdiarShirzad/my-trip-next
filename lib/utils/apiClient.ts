const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function apiRequest<T = unknown>(
  path: string,
  { method = "GET", body, isFormData = false, ...rest }: ApiRequestOptions = {},
): Promise<T | null> {
  const headers: Record<string, string> = {};
  if (!isFormData) headers["Content-Type"] = "application/json";

  let finalBody: BodyInit | undefined;
  if (isFormData) {
    finalBody = body as BodyInit;
  } else if (body) {
    finalBody = typeof body === "string" ? body : JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: finalBody,
    credentials: "include",
    ...rest,
  });

  if (res.status === 204) return null;

  let text: string;
  try {
    text = await res.text();
  } catch (err) {
    console.error("❌ Failed to read response body:", err);
    throw new Error("Failed to read server response");
  }

  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      console.error("❌ Invalid JSON from server:", text);
      throw new Error(
        `Server returned invalid JSON: ${text.substring(0, 200)}`,
      );
    }
  }

  if (!res.ok) {
    const errorMsg =
      (data as { message?: string })?.message || `Server error: ${res.status}`;
    console.error("❌ API Error Response:", {
      status: res.status,
      message: errorMsg,
      data,
    });
    throw new ApiError(errorMsg, res.status, data);
  }

  return data as T;
}

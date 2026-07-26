import { apiRequest, ApiError as BaseApiError } from "@/lib/utils/apiClient";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string>,
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  try {
    const result = await apiRequest<T>(path, options);
    return result as T;
  } catch (err) {
    if (err instanceof BaseApiError) {
      const data = err.data as { errors?: Record<string, string> } | null;
      throw new ApiError(err.message, err.status, data?.errors);
    }
    throw err;
  }
}

export function buildQuery(
  params: Record<string, string | number | undefined | null>,
) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      usp.set(key, String(value));
    }
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const result = await apiRequest<{ url: string }>("/upload", {
    method: "POST",
    body: formData,
    isFormData: true,
  } as Parameters<typeof apiRequest>[1]);

  return result!.url;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

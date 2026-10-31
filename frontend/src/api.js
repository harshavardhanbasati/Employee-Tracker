const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export async function api(path, options = {}) {
  if (!API_URL) {
    throw new Error(
      "VITE_API_URL is not set. Add it to frontend/.env and restart the frontend.",
    );
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Request failed");
  }

  return data;
}

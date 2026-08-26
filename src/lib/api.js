const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://ndff-backend.onrender.com").replace(/\/+$/, "");

export class APIError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = "APIError";
    this.fields = fields;
  }
}

async function post(path, payload) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new APIError("We could not reach the NDFF team. Please check your connection and try again.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = data.error || {};
    throw new APIError(
      error.message || "Your information could not be submitted. Please try again.",
      error.fields || {},
    );
  }

  return data;
}

export function createRegistration(payload) {
  return post("/api/v1/registrations", payload);
}

export function createEnquiry(payload) {
  return post("/api/v1/enquiries", payload);
}

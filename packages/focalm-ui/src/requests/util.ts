export const api = (endpoint: string, options: RequestInit) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${endpoint}`, { credentials: 'include', ...options });

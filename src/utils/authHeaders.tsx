export function withAuthHeaders(extraHeaders: Record<string, string> = {}) {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': "application/json",
      ...extraHeaders,
    },
  };
}
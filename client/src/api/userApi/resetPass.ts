import { API_URL } from "../../utils/config";

export async function resetPass(username: string) {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

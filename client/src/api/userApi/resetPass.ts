import { API_URL } from "../../utils/config";

export async function resetPass(email: string) {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

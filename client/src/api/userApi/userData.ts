import { API_URL } from "../../utils/config";

export async function userData(token: string) {
  const response = await fetch(`${API_URL}/userData`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

import { API_URL } from "../../utils/config";

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login-user`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

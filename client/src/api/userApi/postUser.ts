import { API_URL } from "../../utils/config";

export async function postUser(username: string, password: string) {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

import { API_URL } from "../../utils/config";

export async function postUser(
  email: string,
  username: string,
  password: string
) {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

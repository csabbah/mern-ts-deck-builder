import { API_URL } from "../../utils/config";

export async function userData() {
  const response = await fetch(`${API_URL}/user-data`, {
    method: "POST",
    body: JSON.stringify({ token: localStorage.getItem("token") }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

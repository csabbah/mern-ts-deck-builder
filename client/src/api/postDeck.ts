import { API_URL } from "../utils/config";

export async function postDeck(title: string) {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    body: JSON.stringify({ title: title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

import { API_URL } from "../utils/config";

export type deck = {
  _id: string;
  cards: string[];
  title: string;
};

export async function postCard(deckId: string, text: string): Promise<deck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

import { API_URL } from "../utils/config";

export type deck = {
  _id: string;
  title: string;
  cards: string[];
  bgColor: string;
};
export type user = {
  _id: string;
  username: string;
  email: string;
  decks: deck[];
};

export async function updateDeck(
  title: string,
  bgColor: string,
  deckId: string,
  userId: string
): Promise<user> {
  const response = await fetch(`${API_URL}/${deckId}/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ title, bgColor }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

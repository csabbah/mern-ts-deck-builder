import { API_URL } from "../utils/config";

export type deck = {
  _id: string;
  title: string;
  cards: string[];
};
export type user = {
  _id: string;
  username: string;
  email: string;
  decks: deck[];
};

export async function deleteDeck(
  deckId: string,
  userId: string
): Promise<user> {
  const response = await fetch(`${API_URL}/decks/${deckId}/${userId}`, {
    method: "DELETE",
  });
  return response.json();
}

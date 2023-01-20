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

export async function postDeck(title: string, id: string): Promise<user> {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    body: JSON.stringify({ title: title, id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

import { API_URL } from "../utils/config";

export type card = {
  _id: string;
  title: string;
  text: string;
  bgColor: string;
};

export type deck = {
  _id: string;
  title: string;
  cards: card[];
};
export async function postCard(
  deckId: string,
  bgColor: string,
  title: string,
  text: string
): Promise<deck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({ text, title, bgColor }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

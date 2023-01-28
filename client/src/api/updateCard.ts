import { API_URL } from "../utils/config";

export type card = {
  _id: string;
  title: string;
  bgColor: string;
};

export type deck = {
  _id: string;
  title: string;
  cards: card[];
};
export async function updateCard(
  title: string,
  bgColor: string,
  deckId: string,
  cardId: string
): Promise<deck> {
  const response = await fetch(`${API_URL}/cards/${deckId}`, {
    method: "PUT",
    body: JSON.stringify({ title, bgColor, cardId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(deckId);

  return response.json();
}

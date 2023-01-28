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

export async function deleteCard(
  deckId: string,
  cardIndex: number
): Promise<deck> {
  const response = await fetch(
    `${API_URL}/decks/${deckId}/cards/${cardIndex}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}
